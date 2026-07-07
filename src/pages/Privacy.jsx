import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { BRAND, CONTACT_EMAIL } from "../data/content.js";

// Placeholder legal copy — see the note in Terms.jsx; have counsel
// review before publishing, especially the data-retention specifics.
const sections = [
  {
    heading: "1. Information we collect",
    body: "When you book a call or submit the contact form, we collect the information you provide directly — name, email, phone, and any details about the role or request you share with us.",
  },
  {
    heading: "2. How we use it",
    body: `We use this information to respond to your inquiry, scope your hiring needs, and provide ${BRAND}'s services. We don't sell your information to third parties.`,
  },
  {
    heading: "3. Candidate data",
    body: "Professionals in our network go through skills testing, interviews, and communication screening. Every professional signs an NDA before being introduced to a client, and access to sensitive client systems is scoped to what the role requires.",
  },
  {
    heading: "4. Data retention",
    body: "We retain contact and inquiry information for as long as needed to provide our services and comply with legal obligations. [CONFIRM: specific retention period]",
  },
  {
    heading: "5. Your rights",
    body: `You can request access to, correction of, or deletion of your personal information at any time by contacting ${CONTACT_EMAIL}.`,
  },
  {
    heading: "6. Cookies",
    body: "This site may use basic, privacy-respecting analytics to understand traffic. [CONFIRM: name any analytics/cookie tools actually in use before publishing]",
  },
  {
    heading: "7. Contact",
    body: `Questions about this policy can be sent to ${CONTACT_EMAIL}.`,
  },
];

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" path="/privacy" description={`Privacy policy for ${BRAND}.`} />

      <header className="page-hero page-hero-compact">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Legal</span>
            <h1>Privacy Policy</h1>
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
