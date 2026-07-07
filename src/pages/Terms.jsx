import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { BRAND, CONTACT_EMAIL } from "../data/content.js";

// Placeholder legal copy — structurally complete, but have counsel
// review the actual terms (fee/refund/non-circumvention language
// especially) before this goes live. Mirrors the draft-tag convention
// already used for unconfirmed FAQ answers.
const sections = [
  {
    heading: "1. Acceptance of these terms",
    body: `By booking a call, submitting the contact form, or otherwise engaging ${BRAND} to source and vet a professional, you agree to these terms.`,
  },
  {
    heading: "2. What we provide",
    body: `${BRAND} sources, tests, and vets remote professionals and introduces a shortlist of candidates. You interview and choose who to hire. Once hired, that person works directly for you — they are not our employee or contractor, and we are not a party to your working relationship with them.`,
  },
  {
    heading: "3. Placement fees",
    body: "Our fee is a single, flat placement charge based on the role, due once you hire a candidate we introduced. We do not take a percentage of, or markup on, the wage you pay your hire.",
  },
  {
    heading: "4. Money-back guarantee",
    body: "If a placement isn't the right fit within the first two weeks, we'll refund the placement fee in full, provided you stop engaging the candidate. This guarantee protects against a bad fit — it is not a way to retain the hire for free.",
  },
  {
    heading: "5. Non-circumvention",
    body: "Any candidate we introduce to you is covered by a standard non-circumvention clause: the placement fee is owed if you hire them, whether directly or through another arrangement, within the covered period.",
  },
  {
    heading: "6. Limitation of liability",
    body: `${BRAND} is not liable for the actions, performance, or conduct of any candidate after they are hired. Our responsibility ends at sourcing, vetting, and introduction.`,
  },
  {
    heading: "7. Changes to these terms",
    body: "We may update these terms from time to time. Continued use of our services after a change constitutes acceptance of the updated terms.",
  },
  {
    heading: "8. Contact",
    body: `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
  },
];

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions" path="/terms" description={`Terms and conditions for using ${BRAND}.`} />

      <header className="page-hero page-hero-compact">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Legal</span>
            <h1>Terms &amp; Conditions</h1>
            <p className="subhead">Last updated: [CONFIRM date before publishing]</p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="draft-tag legal-draft-tag">
              Placeholder legal text — have counsel review before publishing.
            </div>
          </Reveal>

          <div className="legal-body">
            {sections.map((s) => (
              <Reveal key={s.heading}>
                <h3>{s.heading}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
