import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Animates a number from 0 to `value` once it scrolls into view.
// Formats with commas and optional prefix/suffix, e.g. prefix="$" suffix="+".
export default function CountUp({ value, prefix = "", suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
