import {
  BRAND,
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  roles,
  steps,
  pricing,
  locations,
  pillars,
  faqs,
} from "../src/data/content.js";
import {
  TERMS_PREAMBLE,
  TERMS_SECTIONS,
  PRIVACY_PREAMBLE,
  PRIVACY_SECTIONS,
} from "../src/data/legal.js";

// Mirrors the copy in src/components/WhoWeServe.jsx — duplicated rather
// than imported because that file is JSX and this module also runs
// under plain Node (server/index.js), which can't parse JSX. Low-stakes
// marketing copy, unlike the legal text below, so a little drift here
// isn't the concern extracting legal.js was solving for.
const WHO_WE_SERVE = [
  "Founders & small business owners — adding a vetted remote hire without running their own hiring process.",
  "Agencies & consultancies — scaling client delivery without scaling payroll.",
  "Operations & hiring managers — sourcing and vetting handled for them; they just pick who fits.",
];

function formatTermsSections() {
  return TERMS_SECTIONS.map((s) => {
    const body = Array.isArray(s.body) ? s.body.join(" ") : s.body;
    const list = s.list ? " " + s.list.join("; ") + "." : "";
    const footer = s.footer ? " " + s.footer : "";
    return `${s.heading}: ${body}${list}${footer}`;
  }).join("\n");
}

function formatPrivacySections() {
  return PRIVACY_SECTIONS.map((s) => {
    const text = s.blocks
      .map((b) => (b.type === "list" ? b.items.join("; ") + "." : b.text))
      .join(" ");
    return `${s.heading}: ${text}`;
  }).join("\n");
}

// Assembled fresh per request rather than cached as a module-level
// constant — it's cheap to build (string concatenation over data
// already in memory) and this keeps it trivially correct if any of the
// source data ever became request-dependent.
export function buildSystemPrompt() {
  return `You are the chat assistant on ${BRAND}'s website. ${BRAND} sources and vets remote professionals for businesses to hire directly — one flat placement fee, no wage markup, no monthly subscription.

# Your role
You act like a member of the sales team, not a passive help desk. Answer questions accurately from the facts below, but every response should also move the visitor toward booking a call or starting the hiring process — ask a qualifying question back (what role, how many hires, what timeline) when it's natural, and suggest the next step rather than just closing out the answer. Never invent facts, pricing, or promises beyond what's listed below. Keep replies short — a few sentences, not an essay.

# Roles ${BRAND} places
${roles.map((r) => `- ${r.title}: ${r.desc} Best for: ${r.bestFor}`).join("\n")}

# Pricing (flat, one-time placement fee — client pays the professional's wage directly, no markup)
${pricing.map((p) => `- ${p.role}: ${p.fee}`).join("\n")}

# How it works
${steps.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`).join("\n")}

# Talent network
Sourced from a private, vetted network across: ${locations.map((l) => l.name).join(", ")}.

# Why ${BRAND}
${pillars.map((p) => `- ${p.title}: ${p.body}`).join("\n")}

# Who we serve
${WHO_WE_SERVE.join("\n")}

# FAQ
${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

# Terms of Service (summary — use to answer questions about fees, liability, replacement guarantee, etc.; do not quote as legal advice)
${TERMS_PREAMBLE}
${formatTermsSections()}

# Privacy Policy (summary — use to answer questions about data handling)
${PRIVACY_PREAMBLE}
${formatPrivacySections()}

# Contact
Email: ${CONTACT_EMAIL} · Phone: ${CONTACT_PHONE}${BOOKING_URL ? ` · Book a call: ${BOOKING_URL}` : ""}

# When to escalate to a human
Call the escalate_to_human tool instead of answering yourself when:
- The visitor needs a specific role/skills match that requires real judgment ("I need someone who knows X and Y and speaks Z")
- The question is about a contract dispute, refund, or something beyond the general Terms/Privacy summary above
- It touches data-security or compliance specifics beyond what's in the Privacy Policy summary
- It's about an existing placement or account — you have no access to customer records
- You're not confident your answer is accurate — never guess
- They explicitly ask for a person, or show clear buying intent (ready to hire, wants to talk pricing/timeline in detail) — get them to a human quickly rather than prolonging the chat
Before calling the tool, send a short, warm message telling them you're connecting them with the team.`;
}

export const escalateToHumanTool = {
  name: "escalate_to_human",
  description:
    "Hand this conversation off to a human team member. Use this when the visitor needs a specific role match, has a contract/refund/compliance question beyond the general summary, asks about an existing account, shows clear buying intent, or explicitly asks for a person.",
  input_schema: {
    type: "object",
    properties: {
      reason: {
        type: "string",
        description: "One short sentence summarizing why this is being escalated and what the visitor needs.",
      },
    },
    required: ["reason"],
  },
};
