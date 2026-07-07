import { BRAND, pillars } from "../data/content.js";
import { CheckIcon } from "./icons.jsx";
import Reveal from "./motion/Reveal.jsx";

// Condensed reinforcement of facts already stated in the Problem and
// Solution sections (monthly markup, wage cuts, middleman) — not new claims.
const otherAgencyPoints = ["Monthly fees, forever", "Wage markup on top", "Agency stays the middleman"];
const usPoints = ["One flat fee, paid once", "Direct hire, no markup", "You own the relationship"];

// SECTION 8 — Why us (three pillars)
export default function WhyUs() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why Us</span>
          <h2 className="section-title">
            We're not a job board. We're operators who hire this way ourselves.
          </h2>
        </div>

        <Reveal>
          <div className="compare-strip">
            <div className="compare-strip-col">
              <span className="compare-strip-label">Other agencies</span>
              <ul>
                {otherAgencyPoints.map((point) => (
                  <li key={point} className="compare-strip-no">
                    <span>✕</span> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="compare-strip-col compare-strip-col-accent">
              <span className="compare-strip-label">{BRAND}</span>
              <ul>
                {usPoints.map((point) => (
                  <li key={point}>
                    <CheckIcon size={15} /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="pillars">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.35} duration={0.7}>
              <div className="pillar">
                <div className="marker" />
                <h3>{pillar.title}</h3>
                <p>
                  {/* One pillar starts with the brand name, so we prepend it. */}
                  {pillar.leadWithBrand ? `${BRAND} ${pillar.body}` : pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
