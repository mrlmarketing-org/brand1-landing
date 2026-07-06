import { useMemo } from "react";
import { geoNaturalEarth1, geoPath, geoBounds } from "d3-geo";
import { feature } from "topojson-client";
import countries110m from "world-atlas/countries-110m.json";

const WIDTH = 340;
const HEIGHT = 210;

// Real-world coordinates for a representative city in each country —
// used only to place the pin, not to claim precision beyond that.
const pins = [
  { country: "Philippines", lat: 14.5995, lon: 120.9842 },
  { country: "India", lat: 28.6139, lon: 77.209 },
  { country: "Nigeria", lat: 9.0765, lon: 7.3986 },
];

// Frames just the Africa-to-Southeast-Asia band our network spans,
// instead of the whole world (mostly empty ocean we don't need). Uses
// Point geometries (not a Polygon ring) so d3's adaptive resampling
// doesn't misread the box as wrapping the whole globe.
const framingCorners = {
  type: "FeatureCollection",
  features: [
    [-18, -18],
    [150, -18],
    [150, 40],
    [-18, 40],
  ].map((coordinates) => ({ type: "Feature", geometry: { type: "Point", coordinates } })),
};

// A real (if low-resolution) world outline — via d3-geo + world-atlas
// topojson data — with pins on the three countries our network is in.
// Purely decorative background element.
export default function WorldMap({ className }) {
  const { countryPath, points } = useMemo(() => {
    const all = feature(countries110m, countries110m.objects.countries).features;
    // Drop Antarctica (and anything else stretching to the far south) —
    // it's outside the region we care about and distorts badly when cropped.
    const countries = all.filter((f) => geoBounds(f)[0][1] > -55);

    const projection = geoNaturalEarth1().fitExtent(
      [
        [0, 0],
        [WIDTH, HEIGHT],
      ],
      framingCorners
    );
    const path = geoPath(projection);
    return {
      countryPath: countries.map((c) => path(c)).join(" "),
      points: pins.map((p) => {
        const [x, y] = projection([p.lon, p.lat]);
        return { ...p, x, y };
      }),
    };
  }, []);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="World map highlighting the Philippines, India, and Nigeria"
    >
      <path d={countryPath} className="map-land" />
      {points.map((p) => (
        <g key={p.country} className="map-pin-group">
          <circle className="map-pin-pulse" cx={p.x} cy={p.y} r={10} />
          <circle className="map-pin-dot" cx={p.x} cy={p.y} r={4.5} />
          <text className="map-pin-label" x={p.x} y={p.y + 20} textAnchor="middle">
            {p.country}
          </text>
        </g>
      ))}
    </svg>
  );
}
