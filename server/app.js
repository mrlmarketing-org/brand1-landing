import express from "express";
import { Resend } from "resend";

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

// The role-details form on the landing page posts here. Sends the
// submission to CONTACT_TO_EMAIL via Resend, with the visitor's own
// address set as reply-to so you can just hit "reply". Shared as-is
// between the local server (server/index.js) and the Vercel function
// wrapper (api/[...all].js) — same code, two ways to run it.
app.post("/api/contact", async (req, res) => {
  const { name, email, role, details } = req.body || {};

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error("Resend is not configured — set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return res.status(500).json({ error: "Email is not configured yet." });
  }

  try {
    const { error } = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "StaffingFixed <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New role inquiry: ${role}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Role: ${role}`,
        "",
        "Details:",
        details || "(none provided)",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Failed to send email." });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Resend request failed:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default app;
