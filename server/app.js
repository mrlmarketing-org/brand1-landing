import express from "express";
import { Resend } from "resend";
import { BRAND } from "../src/data/content.js";
import {
  roleInquiryNotificationEmail,
  roleInquiryConfirmationEmail,
  contactNotificationEmail,
  contactConfirmationEmail,
} from "./emailTemplates.js";

// Lazily constructed so it always reads RESEND_API_KEY after env vars
// are loaded, regardless of which entry point (local server vs. the
// Vercel function wrapper in api/) imported this module first.
let resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const app = express();
app.use(express.json());

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
  const { name, email, role, details, variant } = req.body || {};

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error("Resend is not configured — set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  const from = process.env.RESEND_FROM_EMAIL || `${BRAND} <onboarding@resend.dev>`;
  const notification =
    variant === "subject"
      ? contactNotificationEmail({ name, email, subject: role, details })
      : roleInquiryNotificationEmail({ name, email, role, details });
  const confirmation =
    variant === "subject"
      ? contactConfirmationEmail({ name, subject: role })
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

export default app;
