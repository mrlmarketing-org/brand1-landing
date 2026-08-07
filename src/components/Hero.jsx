import StartHiringButton from "./StartHiringButton.jsx";
import { ArrowDown } from "./icons.jsx";
import HiringFlowAnimation from "./HiringFlowAnimation.jsx";
import Globe from "./Globe.jsx";
import Reveal from "./motion/Reveal.jsx";
import { scrollToTarget } from "../lib/smoothScroll.js";

// SECTION 1 — Hero
export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-pattern-mask" aria-hidden="true">
        <div className="hero-pattern" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Hire once. No monthly markup.</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>Hire A players with a powerful impact for 90% less than US based companies.</h1>
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
        </div>
      </div>

      {/* Comes after hero-copy in source order so mobile (.hero-side
          reverts to position:static there) stacks text above globe;
          on desktop the absolute positioning puts it behind the text
          regardless of DOM order. */}
      <div className="hero-side">
        <Reveal delay={0.1} className="hero-globe-wrap">
          <Globe className="hero-globe" />
        </Reveal>
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
