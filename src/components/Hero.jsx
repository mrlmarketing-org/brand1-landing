import BookButton from "./BookButton.jsx";
import { CheckIcon, ArrowDown } from "./icons.jsx";
import HiringFlowAnimation from "./HiringFlowAnimation.jsx";
import WorldMap from "./WorldMap.jsx";

const trustPoints = [
  "Flat one-time fee",
  "Fluent, skills-tested talent",
  "2-week money-back guarantee",
  "Built by operators who staff their own companies this way",
];

// SECTION 1 — Hero
export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-shine">Hire remote. Pay once. Own the relationship.</span>
          <h1>
            Get a vetted remote professional for a fraction of a local hire — and
            pay one flat fee, one time.
          </h1>
          <p className="subhead">
            We source, test, and hand you a qualified bookkeeper, developer, sales
            rep, or admin. You hire them directly, pay them directly, and manage
            them as your own. One flat placement fee. No monthly markup on their
            wage — ever.
          </p>
          <div className="hero-actions">
            <BookButton large />
            <a href="#how" className="btn-link">
              See how it works <ArrowDown />
            </a>
          </div>

          <div className="trust-strip">
            {trustPoints.map((point) => (
              <div className="trust-item" key={point}>
                <CheckIcon />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <WorldMap className="hero-map" />
          <HiringFlowAnimation />
        </div>
      </div>
    </header>
  );
}
