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
  { country: "Brazil", lat: -15.7942, lon: -47.8822 },
  { country: "Colombia", lat: 4.711, lon: -74.0721 },
  { country: "Nicaragua", lat: 12.1364, lon: -86.2514, dy: 20 },
  { country: "Argentina", lat: -34.6037, lon: -58.3816 },
];

// Network countries span more than a hemisphere in longitude (Asia/Africa
// on one side of the globe, Latin America on the other), so no single
// fixed orientation can keep all of them on the visible face at once.
// Instead the globe re-aims itself to face whichever pin is taking its
// turn (see the pin-cycling effect below). CENTER is just where it comes
// to rest after the initial spin-in, before that cycling takes over.
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

// Once settled, exactly one pin is on screen at a time: the globe turns
// to face it, it pings in (radar-style), holds briefly, then fades out —
// then the globe turns to the next country. Loops through the whole list
// forever. Countries live on both sides of the world (Asia/Africa and
// Latin America), so no fixed orientation could show them all at once —
// this cycle is what makes every one of them actually visible in turn.
const ROTATE_MS = 650;
const PIN_HOLD_MS = 1700;
const PIN_GAP_MS = 250;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// A d3-geo orthographic-projection globe that spins once into its
// resting position on mount, then turns to face each network country in
// turn — pinging it in, holding, fading out, then rotating on to the
// next — cycling through the whole list forever.
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
    if (!spinDone) return;
    let cancelled = false;
    let idx = 0;
    let currentLon = rotationLon;
    let rafId;
    const timers = [];

    // Rotates the globe to targetLon along the shortest path (so it never
    // spins the "long way" around just because a country's longitude wraps
    // past ±180°). Reduced motion skips the tween and jumps straight there.
    function rotateTo(targetLon, onDone) {
      if (reduceMotion) {
        currentLon = targetLon;
        setRotationLon(targetLon);
        onDone();
        return;
      }
      const from = currentLon;
      const delta = ((targetLon - from + 540) % 360) - 180;
      const to = from + delta;
      const start = performance.now();

      function tick(now) {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / ROTATE_MS);
        const lon = from + (to - from) * easeOutCubic(t);
        currentLon = lon;
        setRotationLon(lon);
        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          onDone();
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function takeTurn() {
      if (cancelled) return;
      rotateTo(pins[idx].lon, () => {
        if (cancelled) return;
        setActiveIndex(idx);
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setActiveIndex(-1);
            idx = (idx + 1) % pins.length;
            timers.push(setTimeout(takeTurn, PIN_GAP_MS));
          }, PIN_HOLD_MS)
        );
      });
    }

    takeTurn();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
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

    // Only whichever single pin is mid-turn is a candidate — the globe
    // has already rotated to face it by the time it's set active.
    const candidates = spinDone && activeIndex >= 0 ? [pins[activeIndex]] : [];

    // Only render pins that land on the visible side of the sphere — a
    // small margin keeps labels off the horizon edge. In practice this
    // always passes since the globe just rotated to face this pin; it's
    // a safety net, not load-bearing.
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
      aria-label="Globe highlighting the Philippines, Vietnam, Indonesia, Sri Lanka, India, Pakistan, Nigeria, Brazil, Colombia, Nicaragua, and Argentina"
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
                    duration: PIN_HOLD_MS / 1000,
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
