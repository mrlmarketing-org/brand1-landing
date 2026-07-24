import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { BRAND, CONTACT_EMAIL } from "../data/content.js";

const EFFECTIVE_DATE = "July 10, 2026";
const LAST_UPDATED = "July 9, 2026";

// Sourced from the client-provided Privacy Policy doc (Privacy Policy-
// StaffBrigade.pdf). Several data-retention periods and the rights-
// request response window still carry bracketed placeholder values in
// that source doc — preserved verbatim below, need real numbers before
// publishing.
const preamble = `This Privacy Policy explains how ${BRAND} ("${BRAND}," "we," "us," or "our") collects, uses, and shares personal information in connection with the website at ${BRAND.toLowerCase()}.com (the "Site") and our remote talent placement services (the "Services"). It applies to three groups: visitors to the Site, businesses that use us to hire ("Clients"), and the remote professionals we source and vet ("Candidates"). This Policy is separate from, and complements, our Terms of Service.`;

const sections = [
  {
    heading: "1. Information We Collect",
    blocks: [
      { type: "subheading", text: "Information you provide directly" },
      {
        type: "list",
        items: [
          "From Clients: name, business name, email, phone, role requirements, compensation and hiring details, and billing or payment information.",
          "From Candidates: name, contact details, resume or CV, work history, education, skills, work eligibility information, and responses provided during interviews or assessments.",
          "From anyone who contacts us: the information contained in your messages, form submissions, or scheduling requests.",
        ],
      },
      { type: "subheading", text: "Information collected automatically" },
      {
        type: "p",
        text: "When you use the site, we may automatically collect device and usage data such as IP address, browser type, pages viewed, and referring pages, through cookies and similar technologies.",
      },
    ],
  },
  {
    heading: "2. How We Use Information",
    blocks: [
      { type: "p", text: "We use personal information to:" },
      {
        type: "list",
        items: [
          "Provide the services, including sourcing, vetting, matching, and introducing Candidates to Clients",
          "Communicate with you about engagements, placements, scheduling, and support",
          "Process payments and administer our placement fees and any replacement guarantee",
          "Operate, maintain, secure, and improve the Site and Services",
          "Comply with legal obligations and enforce our Terms of Service",
        ],
      },
    ],
  },
  {
    heading: "3. How We Share Information",
    blocks: [
      {
        type: "p",
        text: "Sharing Candidate information with Clients is central to how the Services work. When we introduce a Candidate to a Client, we share the Candidate's relevant profile information (such as resume, work history, and vetting results) with that Client, so the Client can evaluate and decide whether to engage the Candidate. Candidates should expect their information to be shared with prospective hiring businesses for this purpose.",
      },
      { type: "p", text: "We also share personal information:" },
      {
        type: "list",
        items: [
          "With service providers who process data on our behalf — for example, email (Zoho Mail), website hosting, our database, payment processing, and any analytics or background-check providers we use.",
          "For legal reasons — to comply with law, respond to lawful requests, or protect our rights, users, or the public",
          "In a business transfer — in connection with a merger, acquisition, or sale of assets",
        ],
      },
      {
        type: "p",
        text: "We do not sell personal information for money, and we do not share personal information for cross-context behavioral advertising.",
      },
    ],
  },
  {
    heading: "4. Cookies and Tracking Technologies",
    blocks: [
      {
        type: "p",
        text: "We use cookies and similar technologies to operate the site, remember preferences, and understand usage. You can control cookies through your browser settings.",
      },
    ],
  },
  {
    heading: "5. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We keep personal information only for as long as it serves a purpose described in this Policy and then delete or de-identify it. How long we keep information depends on the type of data and why we hold it. The periods below are our general guidelines; we may keep information longer where necessary to comply with law, resolve disputes, enforce our agreements, or substantiate placement fees.",
      },
      { type: "subheading", text: "Retention by category" },
      {
        type: "list",
        items: [
          "Candidate profile and vetting data (resume, work history, assessment results): kept while the Candidate is active in our pool and for [24 months] after the Candidate's last activity, then deleted or de-identified, unless the Candidate asks to remain active.",
          "Client account and engagement records kept for the duration of the relationship and for [3 years] after the last engagement.",
          "Financial and billing records (invoices, fees and payment records): kept for [7 years] to meet tax, accounting, and recordkeeping obligations.",
          "Marketing and newsletter data kept until you unsubscribe, after which we retain a minimal suppression record so we can continue to honor your opt-out.",
          "Website usage and analytics data kept for [14 months], or the default retention period of the analytics tool we use.",
          "General correspondence and support messages kept for [2 years], unless part of an active matter or engagement.",
        ],
      },
      {
        type: "p",
        text: "Legal holds: we may retain any information for longer where required to do so by law, or where reasonably needed to establish, exercise, or defend legal claims.",
      },
      {
        type: "p",
        text: "Candidates may ask us to delete their information at any time, as described in Section 7, subject to records we are required to keep by law.",
      },
    ],
  },
  {
    heading: "6. Data Security",
    blocks: [
      {
        type: "p",
        text: "We use industry-standard safeguards, including encryption in transit and access controls that limit access to authorized personnel, to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    heading: "7. Your Rights and Choices",
    blocks: [
      { type: "subheading", text: "Rights available to everyone" },
      {
        type: "list",
        items: [
          "Access — request a copy of the personal information we hold about you.",
          "Correction — ask us to fix information that is inaccurate or incomplete.",
          "Deletion — ask us to delete your personal information, subject to the legal exceptions described below.",
          "Opt out of marketing — unsubscribe from marketing emails at any time using the link in any message.",
          "Withdraw consent — where we rely on your consent, you may withdraw it at any time; this does not affect processing already carried out.",
        ],
      },
      { type: "subheading", text: "How to exercise your rights" },
      {
        type: "list",
        items: [
          "Submit a request using the contact details in Section 11.",
          "We may need to verify your identity before acting on a request to protect your information.",
          "We aim to respond within the timeframe required by applicable law (generally within [45 days]) and will tell you if we need more time.",
          "We do not charge a fee for reasonable requests, and we will not discriminate against you for exercising your rights.",
          "An authorized agent may submit a request on your behalf with proof of authorization.",
        ],
      },
      { type: "subheading", text: "California residents (CCPA/CPRA)" },
      { type: "p", text: "If you are a California resident, you have the right to:" },
      {
        type: "list",
        items: [
          "Know and access the categories and specific pieces of personal information we collect, the sources, the purposes for collecting it, and the categories of third parties we disclose it to.",
          "Delete personal information we hold about you, subject to legal exceptions.",
          "Correct inaccurate personal information.",
          `Opt out of the "sale" or "sharing" of personal information. As noted in Section 3, we do not sell personal information for money and do not share it for cross-context behavioral advertising.`,
          "Limit the use of sensitive personal information to what is necessary to provide the Services.",
          "Not receiving discriminatory treatment for exercising any of these rights.",
        ],
      },
      {
        type: "p",
        text: `California's "Shine the Light" law (Civil Code § 1798.83) also lets California residents request information about disclosures of personal information to third parties for those third parties' own direct marketing.`,
      },
      { type: "subheading", text: "Other U.S. state privacy laws" },
      {
        type: "p",
        text: "Residents of states with comprehensive privacy laws — including Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana, and a growing number of others — may have similar rights to access, correct, delete, and obtain a portable copy of their personal information, to opt out of targeted advertising, sale, and certain profiling, and to appeal a denial of a request.",
      },
      { type: "subheading", text: "EU, UK, and other international users" },
      {
        type: "p",
        text: "If the EU or UK GDPR applies to our processing of your information, you also have the rights to access, rectification, erasure, restriction of processing, data portability, and to object to processing, as well as the right to lodge a complaint with your local data protection authority. Where we rely on consent, you may withdraw it at any time. Where we transfer personal information across borders, we use appropriate safeguards.",
      },
      { type: "subheading", text: "A note for Candidates" },
      {
        type: "p",
        text: "Because introducing you to Clients means sharing your profile with them, you can ask us at any time to stop considering you for placements or to delete your profile. Please note that once we have shared your information with a specific Client, we cannot retrieve it from that Client; we will, however, stop sharing it further and delete it from our own systems on request, subject to records we must keep by law.",
      },
    ],
  },
  {
    heading: "8. Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "The Site and Services are intended for adults and are not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided us with information, contact us and we will delete it.",
      },
    ],
  },
  {
    heading: "9. Third-Party Sites",
    blocks: [
      {
        type: "p",
        text: "The Site may link to third-party websites or tools we do not control. Their privacy practices are governed by their own policies, not this one.",
      },
    ],
  },
  {
    heading: "10. Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: `We may update this Policy from time to time. We will post the updated version with a new "Last Updated" date, and continued use of the Site or Services after changes are posted constitutes acceptance of the revised Policy.`,
      },
    ],
  },
  {
    heading: "11. Contact Us",
    blocks: [
      { type: "p", text: `For privacy questions or to exercise your rights, contact us at ${CONTACT_EMAIL}.` },
    ],
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
            <p className="subhead">
              Effective date: {EFFECTIVE_DATE} &middot; Last updated: {LAST_UPDATED}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section on-light">
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
