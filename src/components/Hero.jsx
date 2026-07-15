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

// Each point lands on its own line, one after another.
const trustDelays = [0, 0.2, 0.45, 0.65];

// SECTION 1 — Hero
export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow eyebrow-shine eyebrow-accent">Hire once. No monthly markup.</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>Get a vetted remote professional for a fraction of a local hire.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="subhead">
              We source, test, and hand you a qualified pro. Two weeks to be sure it's a fit — or
              your money back.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-actions">
              <BookButton large />
              <a href="#how" className="btn-link">
                See how it works <ArrowDown />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hero-side">
          <Reveal delay={0.1} className="hero-globe-wrap">
            <Globe className="hero-globe" />
          </Reveal>
        </div>
      </div>

      <div className="container hero-flow">
        <div className="trust-strip">
          {trustPoints.map((point, i) => (
            <Reveal key={point} delay={trustDelays[i]}>
              <div className="trust-item">
                <CheckIcon />
                <span>{point}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Not Reveal-wrapped: its card resizes every couple of seconds as
            its internal demo cycles through stages, which fought with
            whileInView's viewport re-checks and made it look like it was
            constantly popping/resizing. */}
        <HiringFlowAnimation />
      </div>
    </header>
  );
}
