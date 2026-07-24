// ============================================================
// YOUR CONTENT LIVES HERE
// This is the single place to edit wording, prices, roles, and
// the two most important settings below. Change something here
// and it updates across the whole page.
// ============================================================

// -- SETTING 1: your brand name ------------------------------
// Replace this with your real business name. It appears in the
// navbar, headings, and footer automatically.
export const BRAND = "StaffBrigade";

// -- SETTING 2: your booking link ----------------------------
// Every "Book a call" button uses this. Paste your scheduling
// link here (e.g. your Calendly URL). While it's left empty,
// the buttons instead scroll down to the contact form at the
// bottom of the page, so nothing breaks in the meantime.
export const BOOKING_URL = "https://calendly.com/admin-staffbrigade"; // e.g. "https://calendly.com/yourname/15min"

// -- SETTING 3: contact details -------------------------------
// Used in the footer (the navbar's "Call Us" link shows a shortened
// form of this — see Navbar.jsx).
export const CONTACT_EMAIL = "admin@staffbrigade.com";
export const CONTACT_PHONE = "+1 313-230-4252";
export const CONTACT_PHONE_HREF = "+13132304252";
export const CONTACT_ADDRESS = "1000 Brickell Plaza, Unit 2708, Miami, FL 33130";

// -- SETTING 4: social links ----------------------------------
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61591536492693",
  instagram: "https://www.instagram.com/staffbrigade",
};

// -- SECTION 4: roles we place -------------------------------
export const roles = [
  {
    title: "Accounting & Bookkeeping",
    desc: "Full-cycle bookkeeping, reconciliations, invoicing, AP/AR, and cleanup.",
    bestFor:
      "Accounting firms adding capacity, and any business that needs its books handled without a $55K hire.",
  },
  {
    title: "Development & Automation",
    desc: "Developers and automation specialists who build the workflows, integrations, and tools that eliminate manual work.",
    bestFor:
      "Businesses with repetitive processes that should be automated.",
  },
  {
    title: "Sales & Outreach",
    desc: "Cold-email outreach, lead-pipeline generation, and sales support that keeps your funnel full.",
    bestFor:
      "Businesses with outbound sales needs who want to expand their pipeline.",
  },
  {
    title: "General Admin & Support",
    desc: "Inbox and calendar management, data entry, customer service, and the day-to-day work that eats your team's hours.",
    bestFor: "Businesses looking to improve their organizational systems.",
  },
];

// -- SECTION 5: how it works ---------------------------------
export const steps = [
  {
    title: "Tell us the role",
    body: "On a short call, we learn the role, the skills, and what great looks like for you — the software they need, the English level, the hours, the personality. Your bar becomes our brief.",
  },
  {
    title: "We source and vet",
    body: "We pull from our private network and put candidates through skills testing, structured interviews, and communication screening. You only meet people who've already passed.",
  },
  {
    title: "You interview and choose",
    body: "We send you a shortlist. You interview the finalists and pick the one who fits. No pressure, no filler candidates.",
  },
  {
    title: "You hire them directly",
    body: "They join your team, on your terms, paid by you. You pay us one flat placement fee — and you're done with us on billing.",
  },
  {
    title: "Try them risk-free for two weeks",
    body: "If it's not a fit in the first two weeks, you get your money back. (See the guarantee below.)",
  },
];

// -- SECTION 6: pricing --------------------------------------
// [CONFIRM] Final fees before publishing.
export const pricing = [
  { role: "General Admin & Support", fee: "$2,250" },
  { role: "Sales & Outreach", fee: "$2,700" },
  { role: "Accounting & Bookkeeping", fee: "$3,300" },
  { role: "Development & Automation", fee: "$4,800" },
];

// -- Countries our talent network spans (see WhyUs pillar 2, the FAQ,
// the hero globe, and the "Places we source our talent" section) —
// keep this in sync with Globe.jsx's `pins` list. --------------------
export const locations = [
  { name: "Philippines", code: "ph" },
  { name: "Vietnam", code: "vn" },
  { name: "Indonesia", code: "id" },
  { name: "Sri Lanka", code: "lk" },
  { name: "India", code: "in" },
  { name: "Pakistan", code: "pk" },
  { name: "Nigeria", code: "ng" },
  { name: "Brazil", code: "br" },
  { name: "Colombia", code: "co" },
  { name: "Nicaragua", code: "ni" },
  { name: "Argentina", code: "ar" },
];

// -- SECTION 8: why us (three pillars) -----------------------
export const pillars = [
  {
    title: "We run our own companies on this model",
    body: "was built by operators who've hired, tested, and managed remote professionals to run real, profitable businesses. We depend on ours every day — we're not guessing.",
    leadWithBrand: true,
  },
  {
    title: "A vetted network, not an open marketplace",
    body: "Our candidates come from a private network spanning Southeast Asia, South Asia, West Africa, and Latin America — people who've already proven themselves on real work. You're hiring from a bench, not a stranger pool.",
  },
  {
    title: "We screen for what actually matters",
    body: "Skills tests. Structured interviews. English and communication screening. We calibrate every search to your definition of great before a single candidate reaches you.",
  },
];

// -- SECTION 9: FAQ ------------------------------------------
export const faqs = [
  {
    q: "Where are your professionals based?",
    a: "Our network spans the Philippines, Vietnam, Indonesia, Sri Lanka, India, Pakistan, Nigeria, Brazil, Colombia, Nicaragua, and Argentina — regions with deep, skilled, English-fluent talent pools. We match you based on the role, the hours you need, and your communication requirements.",
  },
  {
    q: "How does payment work?",
    a: "You pay your professional their wage directly — we take no cut of it and never mark it up. You pay us one flat placement fee for finding and vetting them. That's the entire cost.",
  },
  {
    q: "Who manages the person day-to-day?",
    a: "You do. Once you hire them, they work as part of your team, on your systems, reporting to you — exactly like any other team member.",
  },
  {
    q: "How do you vet candidates?",
    a: "Every candidate goes through skills testing, a structured interview, and communication screening. Before we start, we align with you on exactly what the role requires, so you only meet people who clear your bar.",
  },
  {
    q: "How fast can I get someone?",
    a: "Because we source from an existing vetted network instead of starting from scratch, most roles are filled in days — not the weeks or months a traditional hire takes.",
  },
  {
    q: "What if it doesn't work out?",
    a: "Your first two weeks are covered by our money-back guarantee. If it's not a fit, we refund your placement fee — provided you part ways with the person.",
  },
  {
    q: "What stops me from just hiring the person and not paying you?",
    a: "Our placement agreement includes a standard non-circumvention clause: anyone we introduce to you is covered, so the fee is owed if you hire them. In practice, our clients don't want to — the fee is small, one-time, and the vetting we've done is the value.",
  },
  {
    q: "What hours will they work?",
    a: "We source professionals who can work the hours you need, including US-hours coverage. Back-office roles like bookkeeping, admin, and development tend to be flexible, while live roles such as customer service and sales are staffed to overlap with your working day. You set the final schedule directly with the professional, and we match you with people who fit it.",
  },
  {
    q: "Is my data safe?",
    a: "Data security matters, especially for roles that touch financial or customer information. As part of onboarding, professionals sign a confidentiality agreement covering your business information, and we vet for trustworthiness and relevant experience. For sensitive roles like accounting or customer service, we'll walk through access controls and data-handling practices with you — you decide what systems and information the professional can access, and we help you put sensible guardrails in place. We'll cover your specific requirements on the call.",
  },
];
