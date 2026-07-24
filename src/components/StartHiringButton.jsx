import { Link } from "react-router-dom";
import { ArrowRight } from "./icons.jsx";

// The homepage's primary CTAs all funnel to /start-hiring rather than
// opening the booking popup directly — that page is the one place
// businesses (as opposed to job seekers, sent to /find-a-job instead)
// land, so it's also where the actual "Book a call" action lives.
export default function StartHiringButton({ label = "Start hiring", large = false }) {
  const className = large ? "btn btn-primary btn-lg" : "btn btn-primary";

  return (
    <Link to="/start-hiring" className={className}>
      {label} <ArrowRight />
    </Link>
  );
}
