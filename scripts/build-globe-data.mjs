// Generates src/data/globe-countries.json — a simplified copy of
// world-atlas's country topology for the Hero globe (see Globe.jsx).
//
// Globe.jsx re-projects every country's geometry on every animation
// frame (it's an actually-rotating orthographic globe, not a sliding
// image), so path complexity is a per-frame CPU cost, not a one-time
// load cost. The raw world-atlas 110m data is detailed enough to cost
// ~75ms/frame to project — well over a 16ms frame budget — for detail
// that's imperceptible on a 340px decorative sphere. q=0.6 was chosen
// by benchmarking (see PR/commit history) as the most aggressive
// simplification that still keeps every country referenced in Globe's
// `pins` list (small ones like Sri Lanka/Nicaragua are the first to
// get dropped entirely at higher simplification levels) — it cut
// average per-frame cost from ~75ms to ~24ms.
//
// Re-run this (`node scripts/build-globe-data.mjs`) only if Globe's
// `pins` list adds a country, or if world-atlas is upgraded.
import { writeFileSync } from "fs";
import { presimplify, quantile, simplify, filter, filterWeight } from "topojson-simplify";
import topology from "../node_modules/world-atlas/countries-110m.json" with { type: "json" };

const Q = 0.6;

let topo = presimplify(topology);
const minWeight = quantile(topo, Q);
topo = simplify(topo, minWeight);
topo = filter(topo, filterWeight(topo, minWeight));

// simplify() re-expresses every point as raw floating-point degrees
// (e.g. 178.12438124381248) instead of world-atlas's original compact
// integer-delta encoding — full precision nobody asked for on a 340px
// decorative globe. Rounding to 3 decimals (~110m, already this
// dataset's advertised resolution) throws away noise the projection
// wouldn't render anyway and buys back most of the byte cost simplify()
// otherwise adds.
const ROUND = 1e3;
topo.arcs = topo.arcs.map((arc) =>
  arc.map(([x, y]) => [Math.round(x * ROUND) / ROUND, Math.round(y * ROUND) / ROUND])
);

writeFileSync(
  new URL("../src/data/globe-countries.json", import.meta.url),
  JSON.stringify(topo)
);

console.log(`Wrote src/data/globe-countries.json (${JSON.stringify(topo).length} bytes)`);
