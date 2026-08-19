import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "../data/content.js";
import { Chevron } from "./icons.jsx";
import Reveal from "./motion/Reveal.jsx";

// SECTION 9 — FAQ. Click a question to expand its answer (accordion).
export default function FAQ() {
  // Tracks which question is open. null means all closed.
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <h2>FAQ</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.03, 0.2)}>
                <div className="faq-item">
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                  >
                    {item.q}
                    <Chevron />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="faq-a">
                          {item.a}
                          {/* These answers were drafted from the document's notes
                              and should be confirmed before going live. */}
                          {item.draft && (
                            <div>
                              <span className="draft-tag">Draft — confirm before publishing</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
