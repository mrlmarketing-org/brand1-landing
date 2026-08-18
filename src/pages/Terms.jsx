import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { BRAND } from "../data/content.js";
import {
  TERMS_EFFECTIVE_DATE as EFFECTIVE_DATE,
  TERMS_LAST_UPDATED as LAST_UPDATED,
  TERMS_PREAMBLE as preamble,
  TERMS_SECTIONS as sections,
} from "../data/legal.js";

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions" path="/terms" description={`Terms and conditions for using ${BRAND}.`} />

      <header className="page-hero page-hero-compact">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Legal</span>
            <h1>Terms &amp; Conditions</h1>
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
                {(Array.isArray(s.body) ? s.body : [s.body]).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.footer && <p>{s.footer}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
