import { motion, useReducedMotion } from "framer-motion";

// Fade-up-into-view wrapper used across sections instead of repeating
// the same whileInView props everywhere. Skips motion entirely for
// users who've asked for reduced motion.
export default function Reveal({
  children,
  delay = 0,
  y = 18,
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
