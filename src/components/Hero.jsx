import StartHiringButton from "./StartHiringButton.jsx";
import { ArrowDown } from "./icons.jsx";
import HiringFlowAnimation from "./HiringFlowAnimation.jsx";
import Globe from "./Globe.jsx";
import Reveal from "./motion/Reveal.jsx";
import CountUp from "./motion/CountUp.jsx";
import { scrollToTarget } from "../lib/smoothScroll.js";

const heroStats = [
  { value: 2, suffix: " weeks", label: "money-back window", color: "var(--accent)" },
  { value: 0, prefix: "$", label: "monthly markup", color: "var(--cream)" },
  { value: 100, suffix: "%", label: "pre-vetted talent", color: "var(--accent)" },
];

// SECTION 1 — Hero
export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Hire once. No monthly markup.</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>Hire a vetted remote professional for a fraction of a local hire.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="subhead">
              We source, test, and hand you a qualified pro. Two weeks to be sure it's a fit — or
              your money back.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hero-actions">
              <StartHiringButton large />
              <a
                href="#how"
                className="btn-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#how");
                }}
              >
                See how it works <ArrowDown />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="hero-stats">
              {heroStats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <div className="hero-stat-value" style={{ color: s.color }}>
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
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
        {/* Not Reveal-wrapped: its card resizes every couple of seconds as
            its internal demo cycles through stages, which fought with
            whileInView's viewport re-checks and made it look like it was
            constantly popping/resizing. */}
        <HiringFlowAnimation />
      </div>
    </header>
  );
}
