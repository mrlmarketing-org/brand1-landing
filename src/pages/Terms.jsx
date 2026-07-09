import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { BRAND, CONTACT_EMAIL } from "../data/content.js";

const LAST_UPDATED = "July 9, 2026";

// Sourced from the client-provided Terms of Service draft. Several
// clauses still carry bracketed placeholders in that source doc
// (fee trigger/timeline, late-payment interest rate, replacement
// guarantee window, non-circumvention duration, governing-law state,
// dispute-resolution method) — those are preserved verbatim below and
// need a real value before publishing.
const preamble = `These Terms of Service ("Terms") govern your access to and use of the website located at ${BRAND.toLowerCase()}.com (the "Site") and the placement services offered by ${BRAND} ("${BRAND}," "we," "us," or "our"). By accessing the Site or engaging our services, you ("Client," "you," or "your") agree to be bound by these Terms. If you do not agree, do not use the Site or our services.`;

const sections = [
  {
    heading: "1. Description of Services",
    body: [
      `${BRAND} identifies, sources, and vets remote professionals ("Candidates") on behalf of businesses seeking to hire ("Placement Services"). We connect you with Candidates whom you may choose to engage directly.`,
      `Important: ${BRAND} is a placement and sourcing service only. We do not employ, contract with, supervise, or manage Candidates once introduced to you. Any employment, contractor, or working relationship formed between you and a Candidate is solely between you and that Candidate.`,
    ],
  },
  {
    heading: "2. No Employment Relationship",
    body: `${BRAND} is not the employer, co-employer, or contracting party of any Candidate. We do not:`,
    list: [
      "Set Candidate wages, hours, or working conditions",
      "Process payroll or payments between you and a Candidate",
      "Supervise, direct, or control the work performed by a Candidate",
      "Provide benefits, tax withholding, or other employer-related services",
    ],
    footer:
      "You are solely responsible for determining the appropriate legal classification (employee vs. independent contractor), for compliance with applicable labor, tax, immigration, and employment laws, and for any agreements, payments, and working relationship terms you establish directly with a Candidate.",
  },
  {
    heading: "3. Fees and Payment",
    body: [
      `Flat Placement Fee. In exchange for Placement Services, Client agrees to pay ${BRAND} a one-time, flat placement fee ("Fee") as quoted at the time of engagement. The Fee is not a recurring charge, subscription, or wage markup.`,
      "Payment Terms. The Fee is due [upon Candidate acceptance of an offer / within X days of Candidate start date — specify your actual trigger and timeline]. Payment must be made via the method(s) specified by " +
        BRAND +
        ".",
      "No Refunds Except as Stated. Except as set forth in the Replacement Guarantee (Section 4), all Fees are non-refundable once earned.",
      "Late Payment. Fees not received by the due date may accrue interest at [X%] per month or the maximum rate permitted by law, whichever is lower, and may result in suspension of ongoing services.",
    ],
  },
  {
    heading: "4. Replacement Guarantee",
    body: `If a placed Candidate's engagement ends (voluntarily or involuntarily) within [30/60/90] days of their start date, ${BRAND} will source a replacement Candidate at no additional Fee, provided:`,
    list: [
      `Client notifies ${BRAND} in writing within [X] days of the engagement ending`,
      "Client has paid all Fees due",
      `The reason for the engagement ending is not attributable to Client's failure to provide agreed compensation, reasonable working conditions, or is not due to circumstances outside ${BRAND}'s control (e.g., Client's business closure, role elimination)`,
    ],
    footer:
      "The Replacement Guarantee is the sole and exclusive remedy for a Candidate placement that does not work out.",
  },
  {
    heading: "5. Candidate Vetting Disclaimer",
    body: `${BRAND} conducts a vetting process that may include resume review, skills assessment, and/or interviews. However:`,
    list: [
      "We do not guarantee the accuracy of information Candidates provide (including credentials, work history, or eligibility to work)",
      "We do not guarantee Candidate job performance, conduct, reliability, or fit",
      "Client is responsible for conducting its own due diligence, including background checks, reference checks, and verification of work eligibility, as it deems necessary before engaging any Candidate",
    ],
  },
  {
    heading: "6. Client Responsibilities",
    body: "Client agrees to:",
    list: [
      "Provide accurate information about the role, compensation, and requirements",
      "Engage with Candidates in good faith and in compliance with applicable law",
      "Not misrepresent the nature of the engagement to a Candidate",
      "Pay Candidates directly and in accordance with whatever agreement Client and Candidate establish",
    ],
  },
  {
    heading: "7. Non-Circumvention",
    body: `For [12] months following an introduction to a Candidate, Client agrees not to engage that Candidate through an alternate channel or arrangement designed to avoid payment of the Fee. Any such engagement will obligate Client to pay the applicable Fee to ${BRAND}.`,
  },
  {
    heading: "8. Intellectual Property",
    body: `The Site, including its content, design, and underlying technology, is owned by ${BRAND} and protected by applicable intellectual property laws. You may not copy, reproduce, or create derivative works from the Site without our written permission.`,
  },
  {
    heading: "9. Confidentiality",
    body: "Each party agrees to keep confidential any non-public business, financial, or candidate information disclosed by the other party in connection with the services, and to use such information solely for purposes of the engagement.",
  },
  {
    heading: "10. Disclaimer of Warranties",
    body: `The Site and Services are provided "as is" and "as available," without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. ${BRAND} does not warrant that any Candidate will meet Client's expectations or that the Services will be uninterrupted or error-free.`,
  },
  {
    heading: "11. Limitation of Liability",
    body: `To the maximum extent permitted by law, ${BRAND}'s total liability arising out of or related to these Terms or the Services shall not exceed the Fees paid by Client to ${BRAND} in the [12] months preceding the claim. ${BRAND} shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including lost profits, arising from Client's engagement of any Candidate.`,
  },
  {
    heading: "12. Indemnification",
    body: `Client agrees to indemnify and hold harmless ${BRAND} from any claims, damages, or liabilities arising from Client's engagement, employment, or treatment of a Candidate, including claims related to wage and hour law, discrimination, wrongful termination, or misclassification.`,
  },
  {
    heading: "13. Termination",
    body: `${BRAND} may suspend or terminate access to the Site or Services at any time for violation of these Terms. Client may discontinue use of the Services at any time; outstanding Fees remain due.`,
  },
  {
    heading: "14. Governing Law and Dispute Resolution",
    body: "These Terms are governed by the laws of the State of [Illinois / your chosen state], without regard to conflict of law principles. Any dispute arising under these Terms shall be resolved through [binding arbitration in [City, State] / the courts of [County, State] — choose one].",
  },
  {
    heading: "15. Changes to These Terms",
    body: "We may update these Terms from time to time. Continued use of the Site or Services after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    heading: "16. Contact",
    body: `Questions about these Terms can be directed to ${CONTACT_EMAIL}.`,
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
            <p className="subhead">
              Effective date: {LAST_UPDATED} &middot; Last updated: {LAST_UPDATED}
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
              <Reveal key={s.heading}>
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
