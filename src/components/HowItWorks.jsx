import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { steps } from "../data/content.js";
import Reveal from "./motion/Reveal.jsx";

// SECTION 5 — How it works
export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="section section-alt" id="how">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">
            From "I need someone" to "they're hired" in days, not months.
          </h2>
        </div>

        {/* Horizontal, click-to-expand timeline — desktop only. */}
        <div className="timeline">
          <div className="timeline-track">
            <svg className="timeline-line" viewBox="0 0 100 1" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>
            {steps.map((step, i) => (
              <button
                key={step.title}
                className={"timeline-node" + (active === i ? " active" : "")}
                onClick={() => setActive(i)}
              >
                <span className="timeline-num">{i + 1}</span>
                <span className="timeline-title">{step.title}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="timeline-detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p>{steps[active].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vertical list — mobile fallback, always shows full copy. */}
        <div className="steps">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="step">
                <div className="step-num">{i + 1}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
