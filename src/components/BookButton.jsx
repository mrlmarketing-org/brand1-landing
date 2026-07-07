import { Link } from "react-router-dom";
import { BOOKING_URL } from "../data/content.js";
import { ArrowRight } from "./icons.jsx";

// Every "Book a call" button on the page uses this component, so
// they all behave the same way. If BOOKING_URL is set in content.js,
// it opens Calendly as an in-page popup (via the widget script loaded
// in index.html) instead of navigating away. If not, it scrolls down
// to the role-details form at the bottom of the page.
export default function BookButton({ label = "Book a 15-minute call", large = false }) {
  const className = large ? "btn btn-primary btn-lg" : "btn btn-primary";

  if (BOOKING_URL) {
    const openPopup = () => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: BOOKING_URL });
      } else {
        // Widget script hasn't finished loading yet (it's async) — fall
        // back to a normal navigation rather than a dead button.
        window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
      }
    };

    return (
      <button type="button" onClick={openPopup} className={className}>
        {label} <ArrowRight />
      </button>
    );
  }

  return (
    <Link to="/#book" className={className}>
      {label} <ArrowRight />
    </Link>
  );
}
