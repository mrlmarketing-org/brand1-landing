import { motion, useReducedMotion } from "framer-motion";
import CountUp from "./motion/CountUp.jsx";

const SIZE = 140;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// A single animated progress ring — the workhorse behind both halves
// of the comparison below.
function Donut({ percent, color, trackColor, label, sublabel }) {
  const reduceMotion = useReducedMotion();
  const offset = CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="donut">
      <div className="donut-ring">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={trackColor}
            strokeWidth={STROKE}
            fill="none"
          />
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={color}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            initial={reduceMotion ? false : { strokeDashoffset: CIRCUMFERENCE }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="donut-center">
          <span className="donut-percent">
            <CountUp value={percent} suffix="%" />
          </span>
        </div>
      </div>
      <p className="donut-label">{label}</p>
      <p className="donut-sublabel">{sublabel}</p>
    </div>
  );
}

// Visualizes the callout copy as two progress rings instead of a
// boxes-and-arrows flowchart: where the wage actually goes, traditional
// agency vs. this model.
export default function AgencyComparison() {
  return (
    <div className="agency-compare">
      <div className="compare-col">
        <span className="compare-label">Traditional agency</span>
        <Donut
          percent={22}
          color="var(--accent-blue)"
          trackColor="var(--border)"
          label="Reaches the worker"
          sublabel="The rest — 3–5x their wage — disappears into agency markup, every month."
        />
      </div>

      <div className="compare-col compare-col-highlight">
        <span className="compare-label">This model</span>
        <Donut
          percent={100}
          color="var(--accent)"
          trackColor="var(--accent-soft)"
          label="Reaches the worker"
          sublabel="Plus one flat placement fee, paid once. No markup, ever."
        />
      </div>
    </div>
  );
}
