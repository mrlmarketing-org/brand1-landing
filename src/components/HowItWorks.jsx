import { steps } from "../data/content.js";
import Reveal from "./motion/Reveal.jsx";

// SECTION 5 — How it works
// Every step's title and body show at once — no click-to-reveal. The
// previous version hid all but the active step's text behind a click,
// which read as sparse/empty on first paint. Near, Somewhere, and
// Recruitify all show every step statically instead.
export default function HowItWorks() {
  return (
    <section className="section section-alt" id="how">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">
            From "I need someone" to "I've got someone!" in days, not months.
          </h2>
        </div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="step-card">
                <div className="step-card-num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
