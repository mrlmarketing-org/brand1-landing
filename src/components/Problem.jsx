import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./motion/Reveal.jsx";
import CountUp from "./motion/CountUp.jsx";
import Logo from "./Logo.jsx";
import bookkeepingPhoto from "../assets/photos/bookkeeping-desk.jpg";
import customerServicePhoto from "../assets/photos/customer-service-agent.jpg";
import developerPhoto from "../assets/photos/developer-code-screen.jpg";

// The paragraph this used to be — "Where do you find people? How do you know
// they can actually do the job? What if their English isn't what the profile
// promised?" — condensed into scannable chips instead of a wall of text.
const questions = [
  "Can they actually do the job?",
  "Is their English good enough?",
  "Can I trust a stranger?",
];

const MAX = 120000;
// Ordered tallest to shortest so the bars read as a descending staircase,
// same as the reference comp — StaffBrigade's flat fee lands last as the
// payoff, not a value to compare 1:1 against a salary.
const costs = [
  {
    value: 120000,
    label: "Developer",
    photo: developerPhoto,
    alt: "A laptop screen showing program code",
  },
  {
    value: 55000,
    label: "US bookkeeper",
    photo: bookkeepingPhoto,
    alt: "A bookkeeper's desk with a calculator and paperwork",
  },
  {
    value: 40000,
    label: "Customer-service rep",
    note: "before benefits",
    photo: customerServicePhoto,
    alt: "A customer-service agent wearing a headset",
  },
];

function CostRow({ label, note, value, amountLabel, percent, photo, photoNode, alt, highlight, delay }) {
  const reduceMotion = useReducedMotion();
  const resolvedPercent = percent ?? Math.round((value / MAX) * 100);

  return (
    <Reveal delay={delay}>
      <div className={highlight ? "cost-row cost-row-highlight" : "cost-row"}>
        <div className="cost-row-photo">{photoNode || <img src={photo} alt={alt} />}</div>
        <div className="cost-row-body">
          <div className="cost-row-head">
            <span className="cost-row-label">
              {label}
              {note && <span className="cost-row-note"> ({note})</span>}
            </span>
            <span className="cost-row-amount">
              {value != null ? <CountUp value={value} prefix="$" suffix="+" /> : amountLabel}
            </span>
          </div>
          <div className="cost-bar-track">
            <motion.div
              className="cost-bar"
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: `${resolvedPercent}%` }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// SECTION 2 — The problem
export default function Problem() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            Local hiring is expensive. Remote is smart — we do the finding, vetting, and testing
            for you.
          </h2>
        </div>

        <div className="cost-panel">
          <div className="cost-panel-label">What one local hire costs you per year</div>
          <div className="cost-list">
            {costs.map((c, i) => (
              <CostRow key={c.label} {...c} delay={i * 0.08} />
            ))}
            <CostRow
              label="StaffBrigade — one flat fee"
              amountLabel="a fraction"
              percent={9}
              photoNode={<Logo size={76} showWord={false} />}
              highlight
              delay={costs.length * 0.08}
            />
          </div>
        </div>

        <div className="prose">
          <Reveal>
            <p>
              So you either overpay, or the work doesn't get done. Remote fixes the money — but
              raises new questions:
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="question-chips">
            {questions.map((q) => (
              <span key={q}>{q}</span>
            ))}
          </div>
        </Reveal>

        <div className="prose">
          <Reveal delay={0.1}>
            <p>
              Most agencies "solve" this by marking the wage up 3–5x — hidden in a monthly fee you
              can't see into.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="transition-line">
              We charge one flat fee, once. <span className="accent-text">No markup, ever.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
