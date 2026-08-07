import Reveal from "./motion/Reveal.jsx";
import { GlobeIcon, ShieldIcon, ListCheckIcon, HeartIcon } from "./icons.jsx";
import teamPhoto from "../assets/photos/remote-video-call.jpg";

// Framed as parallel services (what we do for you), not sequential steps —
// the actual step-by-step process already lives in HowItWorks further down
// the page. No numbering here on purpose: these aren't a sequence, they're
// four things we handle so you don't have to. Exported (not just local)
// so the chat widget's "services" reply can quote this section directly
// instead of drifting out of sync with its own copy of the same list.
export const howWeHelp = [
  {
    icon: GlobeIcon,
    title: "Talent sourcing",
    body: "Every candidate comes from a private network we've built and tested across our own companies — not a cold resume pile.",
  },
  {
    icon: ShieldIcon,
    title: "Skills & vetting",
    body: "Skills tests, structured interviews, and English/communication screening — every candidate clears the bar before you ever see them.",
  },
  {
    icon: ListCheckIcon,
    title: "Shortlist & direct hire",
    body: "You interview a shortlist of finalists and hire your pick directly — no leasing, no staffing markup.",
  },
  {
    icon: HeartIcon,
    title: "You own it",
    body: "They're paid by you, managed by you, on your team like anyone else. No middleman, no leash back to us.",
  },
];

// SECTION 3 — The solution
export default function Solution() {
  return (
    <section className="section on-light" id="how-we-help">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How we help</span>
          <h2 className="section-title">
            We find your person. You own the relationship.
          </h2>
          <p className="solution-subhead">
            Every candidate clears skills tests, interviews, and communication screening before you
            ever see them.
          </p>
        </div>

        <div className="solution-grid">
          {howWeHelp.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="solution-card">
                <div className="solution-card-icon">
                  <s.icon size={20} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="solution-photo">
            <img src={teamPhoto} alt="A man on a video call with several remote teammates" />
            <div className="solution-photo-overlay">
              <span className="solution-photo-eyebrow">What "you own it" looks like</span>
              <span className="solution-photo-caption">
                They join your stand-ups, use your tools, and report to you — like anyone else
                you've hired.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
