import { BRAND } from "../data/content.js";
import Reveal from "./motion/Reveal.jsx";
import AgencyComparison from "./AgencyComparison.jsx";

// SECTION 3 — The solution
export default function Solution() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            We find your person. You keep everything after that.
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
            directly, managed like any other member of your team. One flat
            placement fee, and that's the last you'll hear from our billing.
          </p>
        </div>

        <Reveal>
          <AgencyComparison />
        </Reveal>

        <div className="callout">
          <h4>What makes this different</h4>
          <p>
            Most staffing agencies mark up your worker's wage 3–5x, forever. We
            don't touch their wage at all. You pay them what they earn, and you
            pay us once for finding them. That's it.
          </p>
        </div>
      </div>
    </section>
  );
}
