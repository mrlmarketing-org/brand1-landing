// Terms of Service and Privacy Policy content, pulled out of Terms.jsx /
// Privacy.jsx so the same text can also feed the chat widget's knowledge
// base (server/chatKnowledgeBase.js) without duplicating it — one source
// of truth for the legal pages and whatever the bot tells visitors about
// fees, liability, data handling, etc.
import { BRAND, CONTACT_EMAIL } from "./content.js";

export const TERMS_EFFECTIVE_DATE = "July 10, 2026";
export const TERMS_LAST_UPDATED = "July 9, 2026";

// Sourced from the client-provided, finalized Terms of Service doc
// (TOS- STAFFBRIGADE.pdf) — all fee/timeline/governing-law terms are
// now filled in, no bracketed placeholders left.
export const TERMS_PREAMBLE = `These Terms of Service ("Terms") govern your access to, and use of the website located at ${BRAND.toLowerCase()}.com (the "Site") and the placement services offered by ${BRAND} ("${BRAND}," "we," "us," or "our"). By accessing the Site or engaging our services, you ("Client," "you," or "your") agree to be bound by these Terms. If you do not agree, do not use the Site or our services.`;

export const TERMS_SECTIONS = [
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
      `Payment Terms. The Fee is due within seven (7) days of the Candidate's start date. Payment must be made via the method(s) specified by ${BRAND}.`,
      "No Refunds Except as Stated. Except as set forth in the Replacement Guarantee (Section 4), all Fees are non-refundable once earned.",
      "Late Payment. Fees not received by the due date may accrue interest at 1.5% per month or the maximum rate permitted by law, whichever is lower, and may result in suspension of ongoing services.",
    ],
  },
  {
    heading: "4. Replacement Guarantee",
    body: `If a placed Candidate's engagement ends (voluntarily or involuntarily) within sixty (60) days of their start date, ${BRAND} will source a replacement Candidate at no additional Fee, provided:`,
    list: [
      `Client notifies ${BRAND} in writing within ten (10) days of the engagement ending`,
      "Client has paid all Fees due",
      `The reason for the engagement ending is not attributable to Client's failure to provide agreed compensation or reasonable working conditions, and is not due to circumstances outside ${BRAND}'s control (e.g., Client's business closure, role elimination)`,
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
    body: `For twelve (12) months following an introduction to a Candidate, Client agrees not to engage that Candidate through an alternate channel or arrangement designed to avoid payment of the Fee. Any such engagement will obligate Client to pay the applicable Fee to ${BRAND}.`,
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
    body: `To the maximum extent permitted by law, ${BRAND}'s total liability arising out of or related to these Terms or the Services shall not exceed the Fees paid by Client to ${BRAND} in the 12 months preceding the claim. ${BRAND} shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including lost profits, arising from Client's engagement of any Candidate.`,
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
    body: "These Terms are governed by the laws of the State of Illinois, without regard to conflict-of-law principles. Any dispute arising out of or relating to these Terms or the Services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules, seated in Chicago, Illinois, except that either party may bring an individual claim in small-claims court. Claims must be brought in an individual capacity, and not as part of any class, collective, or representative action.",
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

export const PRIVACY_EFFECTIVE_DATE = "July 10, 2026";
export const PRIVACY_LAST_UPDATED = "July 9, 2026";

// Sourced from the client-provided Privacy Policy doc (Privacy Policy-
// StaffBrigade.pdf). Several data-retention periods and the rights-
// request response window still carry bracketed placeholder values in
// that source doc — preserved verbatim below, need real numbers before
// publishing.
export const PRIVACY_PREAMBLE = `This Privacy Policy explains how ${BRAND} ("${BRAND}," "we," "us," or "our") collects, uses, and shares personal information in connection with the website at ${BRAND.toLowerCase()}.com (the "Site") and our remote talent placement services (the "Services"). It applies to three groups: visitors to the Site, businesses that use us to hire ("Clients"), and the remote professionals we source and vet ("Candidates"). This Policy is separate from, and complements, our Terms of Service.`;

export const PRIVACY_SECTIONS = [
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
