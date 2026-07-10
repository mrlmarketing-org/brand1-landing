import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from "d3-geo";
import { feature } from "topojson-client";
import countries110m from "world-atlas/countries-110m.json";

const SIZE = 340;

// Real-world coordinates for a representative city in each country —
// used only to place the pin, not to claim precision beyond that.
// Ordered as a rough east-to-west sweep, since this is also the order
// pins take turns in once the globe settles. dx/dy/anchor let closely
// clustered pins (e.g. Pakistan sits right next to India) push their
// labels apart so they don't overlap when it's their turn; omitted
// fields fall back to a label centered just above the dot.
const pins = [
  { country: "Philippines", lat: 14.5995, lon: 120.9842, dy: 18 },
  { country: "Vietnam", lat: 21.0285, lon: 105.8542, dx: -10, dy: -10, anchor: "end" },
  { country: "Indonesia", lat: -6.2088, lon: 106.8456 },
  { country: "Sri Lanka", lat: 6.9271, lon: 79.8612 },
  { country: "India", lat: 28.6139, lon: 77.209, dy: 20 },
  { country: "Pakistan", lat: 33.6844, lon: 73.0479 },
  { country: "Nigeria", lat: 9.0765, lon: 7.3986 },
];

// The point the globe comes to rest on — chosen as the centroid of our
// network countries, so all of them end up on the visible hemisphere
// at once.
const CENTER = { lon: 80, lat: 15 };

// The globe spins in from this far east of CENTER on mount, then settles.
// Longitude-only so it reads as the sphere turning on its polar axis
// rather than tilting. One-time cost: a perpetual spin would mean
// recomputing the ~180-country landmass path every frame forever, which
// is real (if small) CPU/battery drain for a decorative element —
// spinning once into place gets the same "it turned to show us" feel
// for a bounded, one-off cost instead of an ongoing one.
const SPIN_FROM_OFFSET = 130;
const SPIN_MS = 1400;

// Once settled, exactly one pin is on screen at a time: it pings in
// (radar-style), holds briefly, then fades out — then the next country
// takes its turn. Loops through the whole list forever.
const PIN_TOTAL_MS = 1700;
const PIN_GAP_MS = 250;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// A d3-geo orthographic-projection globe that spins once into its
// resting position on mount — pre-aimed so the Philippines, Vietnam,
// Indonesia, Sri Lanka, India, Pakistan, and Nigeria all sit on the
// near side once settled. Once it settles, pins take turns — one at a
// time, radar-ping in, hold, fade out — cycling through the list forever.
export default function Globe({ className }) {
  const reduceMotion = useReducedMotion();
  const [rotationLon, setRotationLon] = useState(
    reduceMotion ? CENTER.lon : CENTER.lon + SPIN_FROM_OFFSET
  );
  const [spinDone, setSpinDone] = useState(reduceMotion);
  const [activeIndex, setActiveIndex] = useState(-1);
  const frameRef = useRef();

  useEffect(() => {
    if (reduceMotion) return;
    const from = CENTER.lon + SPIN_FROM_OFFSET;
    const to = CENTER.lon;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / SPIN_MS);
      setRotationLon(from + (to - from) * easeOutCubic(t));
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setSpinDone(true);
      }
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !spinDone) return;
    let cancelled = false;
    let idx = 0;
    const timers = [];

    function takeTurn() {
      if (cancelled) return;
      setActiveIndex(idx);
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setActiveIndex(-1);
          idx = (idx + 1) % pins.length;
          timers.push(setTimeout(takeTurn, PIN_GAP_MS));
        }, PIN_TOTAL_MS)
      );
    }

    takeTurn();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion, spinDone]);

  // The projection only needs fitExtent (which depends on the Sphere
  // outline, not rotation) computed once; rotating it and re-walking
  // the paths is the cheap part we redo per animation frame.
  const projection = useMemo(() => {
    const p = geoOrthographic().clipAngle(90);
    p.fitExtent(
      [
        [16, 16],
        [SIZE - 16, SIZE - 16],
      ],
      { type: "Sphere" }
    );
    return p;
  }, []);

  const countries = useMemo(
    () => feature(countries110m, countries110m.objects.countries).features,
    []
  );
  const graticule = useMemo(() => geoGraticule().step([20, 20])(), []);

  const { landPath, graticulePath, outlinePath, points } = useMemo(() => {
    projection.rotate([-rotationLon, -CENTER.lat]);
    const path = geoPath(projection);

    // reduceMotion shows the whole network at once (no motion, nothing
    // to miss); otherwise only whichever single pin is mid-turn.
    const candidates = reduceMotion
      ? pins
      : spinDone && activeIndex >= 0
        ? [pins[activeIndex]]
        : [];

    // Only render pins that land on the visible side of the sphere —
    // a small margin keeps labels off the horizon edge. CENTER is
    // chosen so all of them pass this check once the globe is at rest.
    const visiblePoints = candidates
      .map((p) => {
        const distance = geoDistance([p.lon, p.lat], [rotationLon, CENTER.lat]);
        const [x, y] = projection([p.lon, p.lat]) || [0, 0];
        return { ...p, x, y, visible: distance < Math.PI / 2 - 0.08 };
      })
      .filter((p) => p.visible);

    return {
      landPath: countries.map((c) => path(c)).filter(Boolean).join(" "),
      graticulePath: path(graticule),
      outlinePath: path({ type: "Sphere" }),
      points: visiblePoints,
    };
  }, [projection, countries, graticule, rotationLon, spinDone, activeIndex, reduceMotion]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Globe highlighting the Philippines, Vietnam, Indonesia, Sri Lanka, India, Pakistan, and Nigeria"
    >
      <defs>
        <radialGradient id="globeGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="rgba(117,205,37,0.22)" />
          <stop offset="55%" stopColor="rgba(13,30,40,0.9)" />
          <stop offset="100%" stopColor="rgba(4,20,28,1)" />
        </radialGradient>
      </defs>
      <path d={outlinePath} fill="url(#globeGradient)" />
      <path d={graticulePath} className="globe-graticule" />
      <path d={landPath} className="map-land" />
      <path d={outlinePath} className="globe-outline" />
      <AnimatePresence>
        {points.map((p) => (
          <motion.g
            key={p.country}
            className="map-pin-group"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    // pop in, hold, fade out — no blink
                    opacity: [0, 1, 1, 0],
                    scale: [0.4, 1.1, 1, 0.6],
                  }
            }
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={
              reduceMotion
                ? { duration: 0.35 }
                : {
                    duration: PIN_TOTAL_MS / 1000,
                    times: [0, 0.15, 0.75, 1],
                    ease: "easeInOut",
                  }
            }
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            {!reduceMotion && (
              <motion.circle
                className="map-pin-ping"
                cx={p.x}
                cy={p.y}
                r={7}
                initial={{ opacity: 0.6, scale: 0.7 }}
                animate={{ opacity: 0, scale: 2.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
            <circle className="map-pin-pulse" cx={p.x} cy={p.y} r={7} />
            <circle className="map-pin-dot" cx={p.x} cy={p.y} r={3.5} />
            <text
              className="map-pin-label"
              x={p.x + (p.dx || 0)}
              y={p.y + (p.dy ?? -12)}
              textAnchor={p.anchor || "middle"}
            >
              {p.country}
            </text>
          </motion.g>
        ))}
      </AnimatePresence>
    </svg>
  );
}
