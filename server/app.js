import express from "express";
import { Resend } from "resend";
import Anthropic from "@anthropic-ai/sdk";
import { BRAND } from "../src/data/content.js";
import {
  roleInquiryNotificationEmail,
  roleInquiryConfirmationEmail,
  contactNotificationEmail,
  contactConfirmationEmail,
  candidateNotificationEmail,
  candidateConfirmationEmail,
  chatEscalationNotificationEmail,
  chatEscalationConfirmationEmail,
} from "./emailTemplates.js";
import { calendlyWebhookHandler } from "./calendlyWebhook.js";
import { buildSystemPrompt, escalateToHumanTool } from "./chatKnowledgeBase.js";

// Lazily constructed so it always reads RESEND_API_KEY after env vars
// are loaded, regardless of which entry point (local server vs. the
// Vercel function wrapper in api/) imported this module first.
let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

let anthropic;
function getAnthropic() {
  if (!anthropic) anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return anthropic;
}

const app = express();

// Registered before the global express.json() below so this route gets
// the untouched raw body — signature verification needs the exact bytes
// Calendly signed, not JSON re-serialized by another parser.
//
// Single path segment deliberately (not /api/webhooks/calendly) — this
// Vercel project's vercel.json SPA-fallback rewrite has an unresolved bug
// where any /api/* path with 2+ segments gets swallowed by the rewrite
// before reaching this app at all, while single-segment paths work fine.
app.post("/api/calendly-webhook", express.raw({ type: "application/json" }), calendlyWebhookHandler);

app.use(express.json());

// Skips the check entirely if RECAPTCHA_API_KEY isn't set, so the
// feature is opt-in rather than breaking submissions before it's
// configured. Uses reCAPTCHA Enterprise's createAssessment endpoint —
// Google's recommended replacement for the legacy siteverify API, same
// site key, richer response. 0.5 is Google's own suggested cutoff for
// "likely human"; tune it down if real submissions start getting
// rejected, up if spam still gets through.
async function verifyRecaptcha(token, expectedAction) {
  if (!process.env.RECAPTCHA_API_KEY) return true;
  if (!token) return false;

  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/assessments?key=${process.env.RECAPTCHA_API_KEY}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: {
          token,
          siteKey: process.env.VITE_RECAPTCHA_SITE_KEY,
          expectedAction,
        },
      }),
    });
    const data = await res.json();

    if (!data.tokenProperties?.valid) {
      console.error("reCAPTCHA token invalid:", data.tokenProperties?.invalidReason);
      return false;
    }
    return data.tokenProperties.action === expectedAction && data.riskAnalysis?.score >= 0.5;
  } catch (err) {
    console.error("reCAPTCHA assessment request failed:", err);
    return false;
  }
}

// Both the homepage's secondary CTA (FinalCTA's role-details form,
// variant="role") and the Contact page's general-inquiry form
// (variant="subject") post here. `variant` picks which email copy to
// send — see server/emailTemplates.js — so a general contact message
// doesn't get mislabeled as a "role inquiry" in the inbox. Sends the
// submission to CONTACT_TO_EMAIL via Resend (with the visitor's own
// address set as reply-to), and a confirmation email back to the
// visitor. Shared as-is between the local server (server/index.js) and
// the Vercel function wrapper (api/[...all].js) — same code, two ways
// to run it.
app.post("/api/contact", async (req, res) => {
  const { name, email, role, details, variant, recaptchaToken } = req.body || {};

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Each form's own reCAPTCHA action name (see the getRecaptchaToken
  // call in the matching component) — matching it exactly here is part
  // of what reCAPTCHA checks, not just a label.
  const expectedAction = variant === "chat" ? "chat_escalate" : "contact_form";
  if (!(await verifyRecaptcha(recaptchaToken, expectedAction))) {
    return res.status(400).json({ error: "Failed spam verification." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error("Resend is not configured — set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  const from = process.env.RESEND_FROM_EMAIL || `${BRAND} <onboarding@resend.dev>`;
  const notification =
    variant === "subject"
      ? contactNotificationEmail({ name, email, subject: role, details })
      : variant === "candidate"
      ? candidateNotificationEmail({ name, email, role, details })
      : variant === "chat"
      ? chatEscalationNotificationEmail({ name, email, reason: role, transcript: details })
      : roleInquiryNotificationEmail({ name, email, role, details });
  const confirmation =
    variant === "subject"
      ? contactConfirmationEmail({ name, subject: role })
      : variant === "candidate"
      ? candidateConfirmationEmail({ name, role })
      : variant === "chat"
      ? chatEscalationConfirmationEmail({ name })
      : roleInquiryConfirmationEmail({ name, role });

  try {
    const { error } = await getResend().emails.send({
      from,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Failed to send email." });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Resend request failed:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }

  // Best-effort: the visitor's confirmation isn't the part the caller
  // is waiting on, so a failure here is logged, not surfaced to them.
  try {
    const { error } = await getResend().emails.send({
      from,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (error) console.error("Resend confirmation email error:", error);
  } catch (err) {
    console.error("Resend confirmation email request failed:", err);
  }
});

// In-memory sliding-window limiter, keyed by IP — this is the one
// endpoint on the site that costs money per request, so it gets a cap
// the contact form doesn't need. Good enough for a single Express
// process; would need a shared store (Redis, etc.) behind a load
// balancer with multiple instances.
const CHAT_RATE_LIMIT = 20;
const CHAT_RATE_WINDOW_MS = 10 * 60 * 1000;
const chatRequestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (chatRequestLog.get(ip) || []).filter((t) => now - t < CHAT_RATE_WINDOW_MS);
  timestamps.push(now);
  chatRequestLog.set(ip, timestamps);
  return timestamps.length > CHAT_RATE_LIMIT;
}

// Chat widget's message endpoint (see src/components/ChatWidget.jsx).
// Stateless like /api/contact — the client resends the full
// conversation on every turn, capped below to bound token growth on a
// long-running chat. When the model decides the conversation needs a
// person (see chatKnowledgeBase.js's escalation instructions), it calls
// the escalate_to_human tool instead of answering; that's surfaced back
// to the client as `escalate: true` so the widget can swap in the
// handoff form, which posts to /api/contact with variant="chat".
const MAX_CHAT_MESSAGES = 40;

app.post("/api/chat", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress;
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages — try again in a few minutes." });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Missing messages." });
  }
  if (messages.length > MAX_CHAT_MESSAGES) {
    return res.status(400).json({ error: "Conversation is too long — please start a new chat." });
  }
  if (messages.some((m) => typeof m?.content !== "string" || m.content.length > 2000)) {
    return res.status(400).json({ error: "Invalid message." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Anthropic is not configured — set ANTHROPIC_API_KEY.");
    return res.status(500).json({ error: "Chat is not configured yet." });
  }

  try {
    const response = await getAnthropic().messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      system: buildSystemPrompt(),
      tools: [escalateToHumanTool],
      messages,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    const escalateBlock = response.content.find(
      (b) => b.type === "tool_use" && b.name === "escalate_to_human"
    );

    res.json({
      reply,
      escalate: Boolean(escalateBlock),
      reason: escalateBlock?.input?.reason,
    });
  } catch (err) {
    console.error("Anthropic request failed:", err);
    return res.status(500).json({ error: "Failed to get a response." });
  }
});

export default app;
