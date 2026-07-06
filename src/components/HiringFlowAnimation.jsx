import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckIcon } from "./icons.jsx";
import { people } from "../data/people.js";

const STAGE_MS = 2600;

const vettingItems = ["Skills", "English", "Interviews"];
const shortlist = people.slice(0, 3);
const hire = people[2];

const stages = ["role", "finding", "vetting", "shortlist", "hire"];

// The hero's flagship visual: a small looping "window" that cycles
// through the hiring flow described in the copy (role -> sourcing ->
// vetting -> shortlist -> hire) instead of a static illustration.
export default function HiringFlowAnimation() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % stages.length);
    }, STAGE_MS);
    return () => clearInterval(id);
  }, []);

  const stage = stages[index];

  return (
    <div className="flow-card">
      <div className="flow-card-chrome">
        <span />
        <span />
        <span />
      </div>

      <div className="flow-card-body">
        <AnimatePresence mode="wait">
          {stage === "role" && (
            <motion.div
              key="role"
              className="flow-stage"
              {...fadeProps(reduceMotion)}
            >
              <div className="flow-bubble">
                <span className="flow-bubble-label">You</span>
                <p>“We need a bookkeeper, ~20 hrs/week.”</p>
              </div>
            </motion.div>
          )}

          {stage === "finding" && (
            <motion.div
              key="finding"
              className="flow-stage"
              {...fadeProps(reduceMotion)}
            >
              <p className="flow-stage-title">Finding candidates…</p>
              <div className="flow-progress">
                <motion.div
                  className="flow-progress-bar"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STAGE_MS / 1000 - 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {stage === "vetting" && (
            <motion.div
              key="vetting"
              className="flow-stage"
              {...fadeProps(reduceMotion)}
            >
              <p className="flow-stage-title">Vetting</p>
              <ul className="flow-checklist">
                {vettingItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.25 * i + 0.2 }}
                  >
                    <CheckIcon size={15} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {stage === "shortlist" && (
            <motion.div
              key="shortlist"
              className="flow-stage"
              {...fadeProps(reduceMotion)}
            >
              <p className="flow-stage-title">Your shortlist</p>
              <div className="flow-avatars">
                {shortlist.map((photo, i) => (
                  <motion.div
                    className="flow-avatar"
                    key={photo}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.15 * i + 0.15 }}
                  >
                    <img src={photo} alt="" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "hire" && (
            <motion.div
              key="hire"
              className="flow-stage"
              {...fadeProps(reduceMotion)}
            >
              <div className="flow-hire">
                <div className="flow-avatar flow-avatar-lg">
                  <img src={hire} alt="" />
                  <span className="flow-hire-badge">
                    <CheckIcon size={12} />
                  </span>
                </div>
                <p className="flow-stage-title">Your hire</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flow-dots">
        {stages.map((s, i) => (
          <span key={s} className={i === index ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

function fadeProps(reduceMotion) {
  if (reduceMotion) return {};
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  };
}
