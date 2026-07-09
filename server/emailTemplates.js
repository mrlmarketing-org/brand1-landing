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

// Case 1 — internal notification sent to CONTACT_TO_EMAIL when someone
// submits the role-details / contact form. Reply-to is set to the
// submitter's address by the caller so replying goes straight to them.
export function notificationEmail({ name, email, role, details }) {
  const bodyHtml = `
    <p style="margin:0 0 4px;">Someone just submitted the form on the site.</p>
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

// Case 2 — auto-reply sent to the submitter, mirroring the on-page
// success state in ContactForm.jsx ("Thanks — we've got your details").
export function confirmationEmail({ name, role }) {
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
