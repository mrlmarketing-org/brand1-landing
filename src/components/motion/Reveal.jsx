import { motion, useReducedMotion } from "framer-motion";

// Fade-up-into-view wrapper used across sections instead of repeating
// the same whileInView props everywhere. Defaults to `once: false` so
// items animate back out on the way past too, not just in on first
// sight — pass `once` explicitly to opt a specific item out. Skips
// motion entirely for users who've asked for reduced motion.
export default function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 18,
  once = false,
  amount = 0.3,
  className,
  as: Component = motion.div,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
