import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Animates a number from 0 to `value` once, the first time it scrolls
// into view. Writes each tick straight to the text node via a ref
// instead of React state — routing ~60 updates/sec through setState
// meant a full React re-render on every animation frame, which on
// mobile was heavy enough to visibly stutter the whole page while
// several of these animated in at once (only 0.08s apart).
// Formats with commas and optional prefix/suffix, e.g. prefix="$" suffix="+".
export default function CountUp({ value, prefix = "", suffix = "", duration = 1.4 }) {
  const containerRef = useRef(null);
  const digitsRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const formatted = value.toLocaleString("en-US");

  useEffect(() => {
    if (!inView || !digitsRef.current) return;
    if (reduceMotion) {
      digitsRef.current.textContent = formatted;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        digitsRef.current.textContent = Math.round(v).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion, formatted]);

  return (
    <span ref={containerRef}>
      {prefix}
      <span ref={digitsRef}>{reduceMotion ? formatted : "0"}</span>
      {suffix}
    </span>
  );
}
