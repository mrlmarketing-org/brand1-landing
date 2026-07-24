import { BRAND, BOOKING_URL, CONTACT_EMAIL } from "../src/data/content.js";

// Shared with src/index.css design tokens (:root). Email clients can't read
// CSS custom properties, so the hex values are duplicated here by hand —
// keep this in sync if the site palette changes.
const COLORS = {
  bg: "#060f16",
  surface: "#0d1e28",
  ink: "#f2f7f4",
  body: "#b7c3bf",
  muted: "#83928c",
  accent: "#75cd25",
  accentSoft: "rgba(117, 205, 37, 0.12)",
  border: "rgba(255, 255, 255, 0.12)",
  btnText: "#08170d",
};

const FONT_DISPLAY = "'Montserrat', Arial, Helvetica, sans-serif";
const FONT_BODY = "'Poppins', Arial, Helvetica, sans-serif";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Renders a mono-column key/value block, e.g. the submitted form fields
// in the internal notification email. Values are user-submitted, so
// they're escaped before being dropped into the HTML.
function detailRows(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.accentSoft}; border-radius:12px; margin:16px 0;">
    ${rows
      .map(
        ([label, value]) => `
    <tr>
      <td style="padding:12px 8px 12px 16px; font-family:${FONT_BODY}; font-size:12px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${COLORS.muted}; white-space:nowrap; vertical-align:top; width:1%;">${escapeHtml(label)}</td>
      <td style="padding:12px 16px 12px 0; font-family:${FONT_BODY}; font-size:14px; line-height:1.6; color:${COLORS.ink}; vertical-align:top; white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>`
      )
      .join("")}
  </table>`;
}

// Common card shell — dark surface on dark background, green accent bar,
// matching the site's hero/eyebrow/button treatment (see src/index.css).
function layout({ preheader, eyebrow, heading, bodyHtml, ctaLabel, ctaUrl }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>${BRAND}</title>
  </head>
  <body style="margin:0; padding:0; background:${COLORS.bg};">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background:${COLORS.surface}; border:1px solid ${COLORS.border}; border-radius:16px;">
            <tr>
              <td style="padding:32px 40px 0;">
                <div style="font-family:${FONT_DISPLAY}; font-weight:700; font-size:18px; color:${COLORS.ink}; letter-spacing:-0.01em;">${BRAND}</div>
                <div style="height:3px; width:36px; background:${COLORS.accent}; border-radius:2px; margin-top:10px; font-size:0; line-height:0;">&nbsp;</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 4px;">
                <span style="display:inline-block; font-family:${FONT_BODY}; font-weight:600; font-size:12px; letter-spacing:0.09em; text-transform:uppercase; color:${COLORS.accent};">${escapeHtml(eyebrow)}</span>
                <h1 style="font-family:${FONT_DISPLAY}; font-weight:700; font-size:24px; line-height:1.28; color:${COLORS.ink}; margin:10px 0 0;">${escapeHtml(heading)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 40px 4px; font-family:${FONT_BODY}; font-size:15px; line-height:1.7; color:${COLORS.body};">
                ${bodyHtml}
              </td>
            </tr>
            ${
              ctaLabel
                ? `<tr>
              <td style="padding:20px 40px 8px;">
                <a href="${ctaUrl}" style="display:inline-block; background:${COLORS.accent}; color:${COLORS.btnText}; font-family:${FONT_BODY}; font-weight:600; font-size:15px; text-decoration:none; padding:13px 26px; border-radius:999px;">${escapeHtml(ctaLabel)}</a>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:32px 40px 32px;">
                <div style="border-top:1px solid ${COLORS.border}; padding-top:20px; font-family:${FONT_BODY}; font-size:12px; line-height:1.6; color:${COLORS.muted};">
                  ${BRAND} &middot; <a href="mailto:${CONTACT_EMAIL}" style="color:${COLORS.muted}; text-decoration:underline;">${CONTACT_EMAIL}</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Case 1 — the homepage's secondary CTA (FinalCTA's "Or send us the
// role details" form, variant="role"). Someone is hiring for a
// specific role, so the copy and the "Role" field are framed that way.
// Reply-to is set to the submitter's address by the caller so replying
// goes straight to them.
export function roleInquiryNotificationEmail({ name, email, role, details }) {
  const bodyHtml = `
    <p style="margin:0 0 4px;">Someone just submitted the role-details form on the site.</p>
    ${detailRows([
      ["Name", name],
      ["Email", email],
      ["Role", role],
      ["Details", details || "(none provided)"],
    ])}
    <p style="margin:12px 0 0; font-size:13px; color:${COLORS.muted};">Reply to this email to respond to ${escapeHtml(name)} directly.</p>
  `;

  return {
    subject: `New role inquiry: ${role}`,
    html: layout({
      preheader: `New inquiry from ${name} — ${role}`,
      eyebrow: "New inquiry",
      heading: "You've got a new role inquiry",
      bodyHtml,
    }),
    text: [
      `New role inquiry: ${role}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Role: ${role}`,
      "",
      "Details:",
      details || "(none provided)",
    ].join("\n"),
  };
}

// Case 2 — auto-reply for the role-details form, mirroring FinalCTA's
// success copy ("We'll reach out shortly to scope the role with you.").
export function roleInquiryConfirmationEmail({ name, role }) {
  const firstName = (name || "").trim().split(/\s+/)[0] || "there";
  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 14px;">
      Thanks for reaching out about <strong style="color:${COLORS.ink};">${escapeHtml(role)}</strong>.
      We've got your details, and someone from our team will follow up shortly.
    </p>
    <p style="margin:0;">
      ${BOOKING_URL ? "In the meantime, feel free to grab a time on our calendar so we can talk through what you need." : "In the meantime, feel free to reply to this email with anything else that's useful context."}
    </p>
  `;

  return {
    subject: `Thanks — we've got your details, ${firstName}`,
    html: layout({
      preheader: "Thanks — we've got your details and will be in touch shortly.",
      eyebrow: "You're all set",
      heading: "Thanks — we've got your details",
      bodyHtml,
      ctaLabel: BOOKING_URL ? "Book a call" : undefined,
      ctaUrl: BOOKING_URL || undefined,
    }),
    text: [
      `Hi ${firstName},`,
      "",
      `Thanks for reaching out about ${role}. We've got your details, and someone from our team will follow up shortly.`,
      BOOKING_URL ? `\nBook a call: ${BOOKING_URL}` : "",
    ].join("\n"),
  };
}

// Case 2b — the Find a Job page's form (variant="candidate"). A job
// seeker, not a business — the "role" field here is what they're
// looking to do, not a role someone is hiring for, so the copy and
// subject line are framed for that audience instead.
export function candidateNotificationEmail({ name, email, role, details }) {
  const bodyHtml = `
    <p style="margin:0 0 4px;">Someone just submitted the Find a Job form on the site.</p>
    ${detailRows([
      ["Name", name],
      ["Email", email],
      ["Looking to do", role],
      ["Details", details || "(none provided)"],
    ])}
    <p style="margin:12px 0 0; font-size:13px; color:${COLORS.muted};">Reply to this email to respond to ${escapeHtml(name)} directly.</p>
  `;

  return {
    subject: `New candidate inquiry: ${role}`,
    html: layout({
      preheader: `New candidate inquiry from ${name} — ${role}`,
      eyebrow: "New candidate",
      heading: "You've got a new candidate inquiry",
      bodyHtml,
    }),
    text: [
      `New candidate inquiry: ${role}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Looking to do: ${role}`,
      "",
      "Details:",
      details || "(none provided)",
    ].join("\n"),
  };
}

// Case 2c — auto-reply for the Find a Job form. No promise of a role —
// just confirms receipt, since placement depends on client demand.
export function candidateConfirmationEmail({ name, role }) {
  const firstName = (name || "").trim().split(/\s+/)[0] || "there";
  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 14px;">
      Thanks for telling us about <strong style="color:${COLORS.ink};">${escapeHtml(role)}</strong>.
      We've got your details on file, and we'll reach out if there's a fit with one of our clients.
    </p>
    <p style="margin:0;">In the meantime, feel free to reply to this email with anything else that's useful context.</p>
  `;

  return {
    subject: `Thanks — we've got your details, ${firstName}`,
    html: layout({
      preheader: "Thanks — we've got your details and will reach out if there's a fit.",
      eyebrow: "You're all set",
      heading: "Thanks — we've got your details",
      bodyHtml,
    }),
    text: [
      `Hi ${firstName},`,
      "",
      `Thanks for telling us about ${role}. We've got your details on file, and we'll reach out if there's a fit with one of our clients.`,
    ].join("\n"),
  };
}

// Case 3 — the Contact page's general-inquiry form (variant="subject").
// Same shell, but framed around a free-text subject/message rather than
// a role, so it isn't mislabeled as a "role inquiry" in the inbox.
export function contactNotificationEmail({ name, email, subject, details }) {
  const bodyHtml = `
    <p style="margin:0 0 4px;">Someone just submitted the contact form on the site.</p>
    ${detailRows([
      ["Name", name],
      ["Email", email],
      ["Subject", subject],
      ["Message", details || "(none provided)"],
    ])}
    <p style="margin:12px 0 0; font-size:13px; color:${COLORS.muted};">Reply to this email to respond to ${escapeHtml(name)} directly.</p>
  `;

  return {
    subject: `New contact message: ${subject}`,
    html: layout({
      preheader: `New message from ${name} — ${subject}`,
      eyebrow: "New message",
      heading: "You've got a new message",
      bodyHtml,
    }),
    text: [
      `New contact message: ${subject}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      details || "(none provided)",
    ].join("\n"),
  };
}

// Case 4 — auto-reply for the Contact page, mirroring its success copy
// ("Thanks — your message is in" / one-business-day reply time).
export function contactConfirmationEmail({ name, subject }) {
  const firstName = (name || "").trim().split(/\s+/)[0] || "there";
  const bodyHtml = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 14px;">
      Thanks for reaching out about <strong style="color:${COLORS.ink};">${escapeHtml(subject)}</strong>.
      We've got your message, and we'll get back to you within one business day.
    </p>
    <p style="margin:0;">In the meantime, feel free to reply to this email with anything else that's useful context.</p>
  `;

  return {
    subject: `Thanks — your message is in, ${firstName}`,
    html: layout({
      preheader: "Thanks — your message is in. We'll reply within one business day.",
      eyebrow: "You're all set",
      heading: "Thanks — your message is in",
      bodyHtml,
    }),
    text: [
      `Hi ${firstName},`,
      "",
      `Thanks for reaching out about ${subject}. We've got your message, and we'll get back to you within one business day.`,
    ].join("\n"),
  };
}
