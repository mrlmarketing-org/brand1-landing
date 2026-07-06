import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./motion/Reveal.jsx";
import CountUp from "./motion/CountUp.jsx";
import { DollarStackIcon } from "./icons.jsx";

// The paragraph this used to be — "Where do you find people? How do you know
// they can actually do the job? What if their English isn't what the profile
// promised?" — condensed into scannable chips instead of a wall of text.
const questions = [
  "Can they actually do the job?",
  "Is their English good enough?",
  "Can I trust a stranger?",
];

const MAX = 120000;
const costs = [
  { value: 55000, label: "A US bookkeeper's cost", color: "var(--accent)" },
  { value: 40000, label: "A customer-service rep, before benefits", color: "var(--accent-blue)" },
  { value: 120000, label: "A developer's cost", color: "var(--ink)" },
];

function CostCard({ value, label, color, delay }) {
  const reduceMotion = useReducedMotion();
  const percent = Math.round((value / MAX) * 100);

  return (
    <Reveal delay={delay}>
      <div className="cost-card">
        <div className="cost-card-icon" style={{ background: color }}>
          <DollarStackIcon size={20} />
        </div>
        <div className="amount">
          <CountUp value={value} prefix="$" suffix="+" />
        </div>
        <div className="label">{label}</div>
        <div className="cost-bar-track">
          <motion.div
            className="cost-bar"
            style={{ background: color }}
            initial={reduceMotion ? false : { width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
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
            Hiring locally is slow and expensive. Hiring remote is a minefield.
          </h2>
        </div>

        {/* The three cost figures from the copy, pulled out for emphasis. */}
        <div className="cost-row">
          {costs.map((c, i) => (
            <CostCard key={c.label} {...c} delay={i * 0.08} />
          ))}
        </div>

        <div className="prose">
          <Reveal>
            <p>
              So you either overpay for roles that don't need to be local — or you
              leave the work undone and stay stuck. Going remote <em>should</em> fix
              that. But then you hit a new wall:
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
              Most agencies that "solve" this quietly bill you 3–5x what the worker
              actually earns, hidden inside a monthly fee you can't see into.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="transition-line">
              We do it differently — and we do it once.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
