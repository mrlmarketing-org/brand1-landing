import { useMemo } from "react";
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from "d3-geo";
import { feature } from "topojson-client";
import countries110m from "world-atlas/countries-110m.json";

const SIZE = 340;

// Real-world coordinates for a representative city in each country —
// used only to place the pin, not to claim precision beyond that.
const pins = [
  { country: "Philippines", lat: 14.5995, lon: 120.9842 },
  { country: "India", lat: 28.6139, lon: 77.209 },
  { country: "Nigeria", lat: 9.0765, lon: 7.3986 },
];

// The single point the globe is (statically) aimed at — chosen as the
// centroid of our three network countries, so all three land on the
// visible hemisphere at once. No rotation/animation from here.
const CENTER = { lon: 68, lat: 17 };

// A static (non-rotating) globe — via d3-geo orthographic projection —
// pre-aimed so the Philippines, India, and Nigeria all sit on the near
// side. Purely decorative, mirrors the flat WorldMap it replaces.
export default function Globe({ className }) {
  const { landPath, graticulePath, outlinePath, points } = useMemo(() => {
    const projection = geoOrthographic()
      .rotate([-CENTER.lon, -CENTER.lat])
      .clipAngle(90);
    projection.fitExtent(
      [
        [16, 16],
        [SIZE - 16, SIZE - 16],
      ],
      { type: "Sphere" }
    );
    const path = geoPath(projection);

    const all = feature(countries110m, countries110m.objects.countries).features;
    const graticule = geoGraticule().step([20, 20])();

    // Only render pins that land on the visible side of the sphere —
    // a small margin keeps labels off the horizon edge.
    const visiblePoints = pins
      .map((p) => {
        const distance = geoDistance([p.lon, p.lat], [CENTER.lon, CENTER.lat]);
        const [x, y] = projection([p.lon, p.lat]) || [0, 0];
        return { ...p, x, y, visible: distance < Math.PI / 2 - 0.08 };
      })
      .filter((p) => p.visible);

    return {
      landPath: all.map((c) => path(c)).filter(Boolean).join(" "),
      graticulePath: path(graticule),
      outlinePath: path({ type: "Sphere" }),
      points: visiblePoints,
    };
  }, []);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Globe highlighting the Philippines, India, and Nigeria"
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
      {points.map((p) => (
        <g key={p.country} className="map-pin-group">
          <circle className="map-pin-pulse" cx={p.x} cy={p.y} r={9} />
          <circle className="map-pin-dot" cx={p.x} cy={p.y} r={4} />
          <text className="map-pin-label" x={p.x} y={p.y - 12} textAnchor="middle">
            {p.country}
          </text>
        </g>
      ))}
    </svg>
  );
}
