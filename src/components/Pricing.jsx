import { motion, useReducedMotion } from "framer-motion";
import { pricing } from "../data/content.js";
import StartHiringButton from "./StartHiringButton.jsx";

// SECTION 6 — Pricing
export default function Pricing() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section on-light" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title">
            One flat fee. Paid once. That's the whole cost of working with us.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            You pay your professional their wage directly — we never mark it up.
            Our fee is a single flat placement charge based on the role.
          </p>
        </div>

        <div className="price-table">
          {pricing.map((row, i) => (
            <motion.div
              className="price-row"
              key={row.role}
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="role-name">{row.role}</span>
              <span className="fee">{row.fee}</span>
            </motion.div>
          ))}
        </div>
        <p className="price-note">Fees are flat per placement.</p>

        <div className="pricing-cta">
          <StartHiringButton label="Start hiring and find great talent" />
        </div>
      </div>
    </section>
  );
}
