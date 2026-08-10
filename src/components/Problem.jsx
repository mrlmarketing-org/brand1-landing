import Reveal from "./motion/Reveal.jsx";
import bookkeepingPhoto from "../assets/photos/bookkeeping-desk.jpg";
import customerServicePhoto from "../assets/photos/customer-service-agent.jpg";
import developerPhoto from "../assets/photos/developer-code-screen.jpg";

// The paragraph this used to be — "Where do you find people? How do you know
// they can actually do the job? What if their English isn't what the profile
// promised?" — condensed into scannable chips instead of a wall of text.
const questions = [
  "Can they actually do the job?",
  "Is their English good enough?",
  "Can I trust a stranger?",
];

// The developer role leads as the big, photo-led moment — highest number,
// strongest anchor for "local hiring is expensive." The other two stay as
// smaller supporting stats beside it rather than repeating the same
// treatment three times over.
const featured = {
  value: 120000,
  label: "A developer costs you",
  photo: developerPhoto,
  alt: "A laptop screen showing program code",
};
const supportingCosts = [
  {
    value: 55000,
    label: "US bookkeeper",
    photo: bookkeepingPhoto,
    alt: "A bookkeeper's desk with a calculator and paperwork",
  },
  {
    value: 40000,
    label: "Customer-service rep",
    note: "before benefits",
    photo: customerServicePhoto,
    alt: "A customer-service agent wearing a headset",
  },
];

// SECTION 2 — The problem
export default function Problem() {
  return (
    <section className="section">
      <div className="container">
        <div className="problem-before">
          <Reveal className="problem-before-media">
            <img src={featured.photo} alt={featured.alt} />
            <div className="problem-before-overlay">
              <span className="problem-before-eyebrow">{featured.label}</span>
              <span className="problem-before-figure">
                ${featured.value.toLocaleString("en-US")}+/yr
              </span>
            </div>
          </Reveal>

          <div className="problem-before-copy">
            <Reveal>
              <h2 className="section-title">
                Local hiring in the US is expensive. Remote is smart — we do the finding, vetting,
                and testing for you.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="problem-stat-list">
                {supportingCosts.map((c) => (
                  <div className="problem-stat-row" key={c.label}>
                    <img src={c.photo} alt={c.alt} />
                    <span className="problem-stat-label">
                      {c.label}
                      {c.note && <span className="problem-stat-note"> ({c.note})</span>}
                    </span>
                    <span className="problem-stat-amount">
                      ${c.value.toLocaleString("en-US")}+
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="prose">
          <Reveal>
            <p>
              So you either overpay, or the work doesn't get done. Remote fixes the money — but
              raises new questions:
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="question-chips">
            {questions.map((q) => (
              <span key={q}>{q}</span>
            ))}
          </div>
        </Reveal>

        <div className="prose">
          <Reveal delay={0.1}>
            <p>
              Most agencies "solve" this by marking the wage up 3–5x — hidden in a monthly fee you
              can't see into.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="problem-after">
            <div className="problem-after-copy">
              <p className="problem-after-lead">
                We give you direct access to vetted professionals across Southeast Asia, South
                Asia, West Africa, and Latin America — the same caliber of work, for a fraction of
                a US salary.
              </p>
              <p className="problem-after-fee">
                One flat fee, once. <span className="accent-text">No markup, ever.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
