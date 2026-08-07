import { BOOKING_URL } from "../data/content.js";
import { getStoredGclid } from "./gclid.js";

// Calendly forwards utm_* params into its invitee.created webhook payload
// (see server/calendlyWebhook.js), so this is how the gclid captured on
// landing gets carried through to the actual booking — Calendly's own
// form never shares anything back with this page directly.
function bookingUrl() {
  const gclid = getStoredGclid();
  if (!gclid) return BOOKING_URL;
  const separator = BOOKING_URL.includes("?") ? "&" : "?";
  return `${BOOKING_URL}${separator}utm_content=${encodeURIComponent(`gclid:${gclid}`)}`;
}

// Shared by every "Book a call" entry point (BookButton.jsx, the chat
// widget) so they all behave identically. Opens Calendly as an in-page
// popup via the widget script loaded in index.html; falls back to a
// normal navigation if that script hasn't finished loading yet (it's
// async) rather than leaving a dead button.
export function openCalendlyPopup() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: bookingUrl() });
  } else {
    window.open(bookingUrl(), "_blank", "noopener,noreferrer");
  }
}
