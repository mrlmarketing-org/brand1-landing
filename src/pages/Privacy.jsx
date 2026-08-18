import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { BRAND } from "../data/content.js";
import {
  PRIVACY_EFFECTIVE_DATE as EFFECTIVE_DATE,
  PRIVACY_LAST_UPDATED as LAST_UPDATED,
  PRIVACY_PREAMBLE as preamble,
  PRIVACY_SECTIONS as sections,
} from "../data/legal.js";

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" path="/privacy" description={`Privacy policy for ${BRAND}.`} />

      <header className="page-hero page-hero-compact">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Legal</span>
            <h1>Privacy Policy</h1>
            <p className="subhead">
              Effective date: {EFFECTIVE_DATE} &middot; Last updated: {LAST_UPDATED}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="legal-body">
            <Reveal>
              <p>{preamble}</p>
            </Reveal>

            {sections.map((s) => (
              <Reveal key={s.heading} once amount={0.05}>
                <h3>{s.heading}</h3>
                {s.blocks.map((b, i) => {
                  if (b.type === "subheading") return <h4 key={i}>{b.text}</h4>;
                  if (b.type === "list")
                    return (
                      <ul key={i}>
                        {b.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  return <p key={i}>{b.text}</p>;
                })}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
