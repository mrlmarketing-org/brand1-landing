import { Link } from "react-router-dom";
import { BOOKING_URL } from "../data/content.js";
import { getStoredGclid } from "../lib/gclid.js";
import { ArrowRight } from "./icons.jsx";

// Every "Book a call" button on the page uses this component, so
// they all behave the same way. If BOOKING_URL is set in content.js,
// it opens Calendly as an in-page popup (via the widget script loaded
// in index.html) instead of navigating away. If not, it sends people
// to the role-details form on the Start Hiring page.
export default function BookButton({ label = "Book a call", large = false }) {
  const className = large ? "btn btn-primary btn-lg" : "btn btn-primary";

  if (BOOKING_URL) {
    // Calendly forwards utm_* params into its invitee.created webhook
    // payload (see server/calendlyWebhook.js), so this is how the gclid
    // captured on landing gets carried through to the actual booking —
    // Calendly's own form never shares anything back with this page
    // directly.
    const bookingUrl = () => {
      const gclid = getStoredGclid();
      if (!gclid) return BOOKING_URL;
      const separator = BOOKING_URL.includes("?") ? "&" : "?";
      return `${BOOKING_URL}${separator}utm_content=${encodeURIComponent(`gclid:${gclid}`)}`;
    };

    const openPopup = () => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: bookingUrl() });
      } else {
        // Widget script hasn't finished loading yet (it's async) — fall
        // back to a normal navigation rather than a dead button.
        window.open(bookingUrl(), "_blank", "noopener,noreferrer");
      }
    };

    return (
      <button type="button" onClick={openPopup} className={className}>
        {label} <ArrowRight />
      </button>
    );
  }

  return (
    <Link to="/start-hiring#book" className={className}>
      {label} <ArrowRight />
    </Link>
  );
}
