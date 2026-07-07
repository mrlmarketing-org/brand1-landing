// ============================================================
// Dummy blog content — placeholders to demonstrate the page and
// its layout. Swap these for real posts (or wire up a CMS) before
// publishing; keep the same shape (slug/title/excerpt/date/photo/body).
// ============================================================
import developerPhoto from "../assets/photos/developer-code-screen.jpg";
import bookkeepingPhoto from "../assets/photos/bookkeeping-desk.jpg";
import teamAnalytics1 from "../assets/photos/team-analytics-1.jpg";
import teamAnalytics2 from "../assets/photos/team-analytics-2.jpg";

export const blogPosts = [
  {
    slug: "vetting-checklist-before-a-candidate-reaches-you",
    title: "The checklist we run before any candidate reaches you",
    excerpt:
      "Skills tests, structured interviews, and communication screening — what each one actually catches, and why we don't skip any of them.",
    date: "2026-05-04",
    photo: developerPhoto,
    body: [
      "Most of the \"bad remote hire\" stories we hear trace back to skipping one of three steps: a real skills test, a structured interview, or a communication screening. Each one catches a different failure mode.",
      "The skills test catches candidates whose resume outpaces their actual ability — surprisingly common, and expensive to discover after you've onboarded someone.",
      "The structured interview catches the gap between \"can do the work\" and \"will do the work the way your team needs it done.\" We ask every candidate the same core questions so answers are actually comparable.",
      "The communication screening catches the thing a resume can't show you: whether a real-time conversation with this person, in English, under mild pressure, is going to be smooth or a struggle.",
      "None of this is exotic. It's the same bar we hold candidates to inside our own companies — we just don't cut corners on it because someone is hiring remotely instead of down the hall.",
    ],
  },
  {
    slug: "real-cost-of-a-bad-hire",
    title: "The real cost of a bad hire isn't the salary",
    excerpt:
      "The wage is the visible cost. The re-hiring cycle, the lost weeks, and the work that has to be redone are the ones that actually hurt.",
    date: "2026-04-18",
    photo: bookkeepingPhoto,
    body: [
      "When a hire doesn't work out, the salary you paid them is rarely the biggest line item. The bigger costs are the ones that don't show up on an invoice: the weeks the role sat effectively unfilled, the manager time spent managing out a bad fit, and the rework on anything they touched.",
      "That's the case for vetting properly before someone joins your team, not after. A two-week guarantee helps if things go wrong — but the goal is to make it rare that you need it.",
    ],
  },
  {
    slug: "why-agencies-markup-wages",
    title: "Why staffing agencies markup wages 3–5x — and how to avoid it",
    excerpt:
      "The traditional agency model bills you monthly, forever, as a percentage of your hire's wage. Here's what that actually costs over a year.",
    date: "2026-03-22",
    photo: teamAnalytics1,
    body: [
      "Most staffing agencies aren't paid to find you a great hire — they're paid to keep billing you. That's the structural reason the traditional model charges a recurring markup on top of your hire's wage, indefinitely, instead of a single fee for the actual work of sourcing and vetting.",
      "Run the math over 12 months and the gap is substantial: a markup model can cost multiples of a flat, one-time placement fee for the exact same hire. The incentive problem is the real issue — an agency on a recurring markup has no reason to ever let go of the middleman role.",
    ],
  },
  {
    slug: "why-philippines-india-nigeria",
    title: "Why we hire from the Philippines, India, and Nigeria",
    excerpt:
      "Deep, English-fluent talent pools, strong overlap with US working hours, and a track record we've tested inside our own companies first.",
    date: "2026-02-09",
    photo: teamAnalytics2,
    body: [
      "We didn't pick these three countries because they're inexpensive. We picked them because they're where we found deep benches of skilled, English-fluent professionals we could vet rigorously and trust with real client-facing and back-office work.",
      "We built the network by hiring this way inside our own companies first — the same bar we hold candidates to for you is the one we've relied on ourselves.",
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
