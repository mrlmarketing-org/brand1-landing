import { BRAND } from "../data/content.js";
import Reveal from "./motion/Reveal.jsx";
import { ShieldIcon, ListCheckIcon, HeartIcon } from "./icons.jsx";
import teamPhoto from "../assets/photos/team-analytics-2.jpg";

const steps = [
  {
    num: "01",
    icon: ShieldIcon,
    title: "We vet them",
    body: `Sourced from a private network ${BRAND} has built and tested across our own companies.`,
  },
  {
    num: "02",
    icon: ListCheckIcon,
    title: "You pick who fits",
    body: "You get a shortlist of people who've already cleared the bar. Choose your person.",
  },
  {
    num: "03",
    icon: HeartIcon,
    title: "You own it",
    body: "Hired, paid, and managed directly — like anyone on your team. No middleman, no leash back to us.",
  },
];

// SECTION 3 — The solution
export default function Solution() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            We find your person. You own the relationship.
          </h2>
          <p className="solution-subhead">
            Every candidate clears skills tests, interviews, and communication screening before you
            ever see them.
          </p>
        </div>

        <div className="solution-grid">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="solution-card">
                <div className="solution-card-head">
                  <span className="solution-card-num">{s.num}</span>
                  <div className="solution-card-icon">
                    <s.icon size={20} />
                  </div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="solution-photo">
            <img src={teamPhoto} alt="Workers reviewing an upward-trending analytics chart together" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
