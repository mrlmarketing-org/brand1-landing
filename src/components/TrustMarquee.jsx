import { CheckIcon } from "./icons.jsx";

// A logo marquee needs real client logos, which a new business doesn't
// have yet — so this scrolls the value props instead (flat fee, no
// markup, guarantee, talent network). Swap for real client logos once
// there are some worth showing.
const points = [
  "Flat one-time fee",
  "No monthly markup",
  "2-week money-back guarantee",
  "Skills-tested talent",
  "A vetted network across 11 countries",
  "You own the relationship",
];

export default function TrustMarquee() {
  const items = [...points, ...points];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((point, i) => (
          <div className="marquee-card" key={`${point}-${i}`}>
            <span className="marquee-icon">
              <CheckIcon size={14} />
            </span>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}
