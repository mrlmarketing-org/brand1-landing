import { BRAND } from "../data/content.js";
import Reveal from "./motion/Reveal.jsx";
import teamPhoto from "../assets/photos/team-analytics-2.jpg";
import calloutPhoto from "../assets/photos/team-analytics-1.jpg";

// SECTION 3 — The solution
export default function Solution() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            We find your person. You own the relationship.
          </h2>
        </div>

        <div className="prose">
          <p>
            {BRAND} sources from a private network we've built and tested across
            our own companies — skills tests, interviews, English and
            communication screening included. You get a shortlist of people
            who've already cleared the bar.
          </p>
          <p>
            You pick who fits. From there, they're yours: hired directly, paid
            directly, managed like any other member of your team. You pay them
            an agreed-upon rate, and you pay us once for finding them — that's it.
          </p>
        </div>

        <Reveal>
          <div className="solution-photo">
            <img src={teamPhoto} alt="Workers reviewing an upward-trending analytics chart together" />
          </div>
        </Reveal>

        <Reveal x={-48} y={0}>
          <div className="callout" style={{ backgroundImage: `url(${calloutPhoto})` }}>
            <p>
              Most staffing agencies mark up your worker's wage 3–5x, forever. We
              don't touch their wage at all. You pay them directly, and you
              pay us once for finding them. That's it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
