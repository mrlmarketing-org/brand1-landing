import { DollarIcon, CalendarOffIcon, ShieldIcon, ListCheckIcon, GlobeIcon, HeartIcon } from "./icons.jsx";

// A logo marquee needs real client logos, which a new business doesn't
// have yet — so this shows the value props instead (flat fee, no
// markup, guarantee, talent network). Swap for real client logos once
// there are some worth showing. Each point gets its own icon + color
// (rather than a repeated checkmark) so the row reads as a set of
// distinct claims instead of one undifferentiated checklist. Static,
// not auto-scrolling — it sits right under the hero's globe, which is
// already the busiest thing on the page.
const points = [
  { text: "Flat one-time fee", Icon: DollarIcon, color: "#f5b942" },
  { text: "No monthly markup", Icon: CalendarOffIcon, color: "#ff6b5e" },
  { text: "2-week money-back guarantee", Icon: ShieldIcon, color: "#2f9bff" },
  { text: "Skills-tested talent", Icon: ListCheckIcon, color: "#b18bff" },
  { text: "A vetted network across 11 countries", Icon: GlobeIcon, color: "#33d1c9" },
  { text: "You own the relationship", Icon: HeartIcon, color: "#ff6fa5" },
];

export default function TrustMarquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {points.map(({ text, Icon, color }) => (
          <div className="marquee-card" key={text}>
            <span
              className="marquee-icon"
              style={{ color, background: `${color}24` }}
            >
              <Icon size={14} />
            </span>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
