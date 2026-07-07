import BookButton from "./BookButton.jsx";
import { CheckIcon, ArrowDown } from "./icons.jsx";
import HiringFlowAnimation from "./HiringFlowAnimation.jsx";
import Globe from "./Globe.jsx";
import Reveal from "./motion/Reveal.jsx";

const trustPoints = [
  "Flat one-time fee",
  "Fluent, skills-tested talent",
  "2-week money-back guarantee",
  "Built by operators who staff their own companies this way",
];

// Row 1 holds the first two points, which land one after another
// (not simultaneously) even though they share a line. Rows 2 and 3
// each get their own point, arriving afterward, alone.
const trustDelays = [0, 0.2, 0.45, 0.65];

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
        </div>

        <div className="hero-side">
          <Globe className="hero-globe" />

          <div className="hero-actions">
            <BookButton large />
            <a href="#how" className="btn-link">
              See how it works <ArrowDown />
            </a>
          </div>
        </div>
      </div>

      <div className="container hero-flow">
        <div className="trust-strip">
          {trustPoints.map((point, i) => (
            <Reveal
              key={point}
              delay={trustDelays[i]}
              className={i >= 2 ? "trust-row-solo" : undefined}
            >
              <div className="trust-item">
                <CheckIcon />
                <span>{point}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <HiringFlowAnimation />
      </div>
    </header>
  );
}
