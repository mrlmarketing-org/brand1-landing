import { BOOKING_URL, roles, steps, PRICING_RATE_LOW, PRICING_RATE_HIGH, locations, faqs } from "../src/data/content.js";

// Keyword-matched stand-in for the real Claude-backed /api/chat, used
// when ANTHROPIC_API_KEY isn't set (see server/app.js). Exists so the
// widget is fully demoable — same UI, same escalation flow — without
// needing an API key set up yet. No code changes needed to switch back
// to real answers later: app.js picks whichever this file or the real
// Anthropic call runs purely based on whether the env var is present.
const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "do", "does", "what", "how", "can", "i",
  "you", "your", "to", "for", "of", "in", "on", "and", "or", "it", "my",
  "me", "we", "us", "with", "about", "will", "would", "if", "be",
]);

function keywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function overlapScore(a, b) {
  const setB = new Set(b);
  return a.filter((w) => setB.has(w)).length;
}

// Phrases that should always trigger a handoff, so the escalation flow
// is reliably demoable rather than depending on fuzzy matching.
const ESCALATE_TRIGGERS = [
  "talk to a human", "talk to someone", "speak to someone", "speak to a human",
  "real person", "sales rep", "call me", "book a call", "get started",
  "sign me up", "ready to hire", "ready to start", "talk to your team",
];

function buildBookingNudge() {
  return BOOKING_URL
    ? ` If you'd rather just talk it through, you can grab a time on our calendar: ${BOOKING_URL}`
    : "";
}

export function getDemoReply(messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = (lastUser?.content || "").toLowerCase();

  if (ESCALATE_TRIGGERS.some((t) => text.includes(t))) {
    return {
      reply: "Happy to connect you with our team directly — leave your details below and someone will follow up shortly.",
      escalate: true,
      reason: "Visitor asked to talk to a person / showed buying intent.",
    };
  }

  const q = keywords(text);
  // Fully anchored (^...$), not just a prefix match — "hello" alone is
  // a bare greeting, but "hello what services do you offer" has a real
  // question after it and should fall through to the buckets below
  // instead of getting short-circuited into the generic greeting menu.
  if (q.length === 0 || /^(hi|hey|hello|sup|yo)[\s!.,]*$/.test(text.trim())) {
    return {
      reply: `Hi! I can help with pricing, the roles we place, how the process works, or our guarantee. What would you like to know?${buildBookingNudge()}`,
      escalate: false,
    };
  }

  // Top-of-funnel "what do you even do" question — checked first since
  // it's the most likely opener in a live demo and shouldn't fall
  // through to the low-confidence escalate fallback.
  if (
    ["service", "services", "offer", "offers", "offering", "provide", "do you do", "help with", "assist", "about you", "who are you", "what is staffbrigade", "tell me about"].some(
      (w) => text.includes(w)
    )
  ) {
    const list = roles.map((r) => r.title).join(", ");
    return {
      reply: `We find and vet remote professionals for you to hire directly — one flat fee, no monthly markup. We place people across ${list}. Want pricing, or how the process works?${buildBookingNudge()}`,
      escalate: false,
    };
  }

  // Topic buckets checked before the generic FAQ match — these cover the
  // questions most likely to come up in a live walkthrough.
  if (["price", "pricing", "cost", "fee", "fees", "much", "charge"].some((w) => text.includes(w))) {
    return {
      reply: `We charge one flat, one-time placement fee — no monthly markup, ever: ${PRICING_RATE_LOW}–${PRICING_RATE_HIGH}% of your hire's first-year salary, paid once. You pay your hire's wage directly; exact rate depends on role and seniority.${buildBookingNudge()}`,
      escalate: false,
    };
  }
  if (["role", "roles", "hire for", "position", "job"].some((w) => text.includes(w))) {
    const list = roles.map((r) => r.title).join(", ");
    return {
      reply: `We place people across four areas: ${list}. Want me to connect you with the team about a specific role?${buildBookingNudge()}`,
      escalate: false,
    };
  }
  if (["process", "how does it work", "how it works", "steps", "work"].some((w) => text.includes(w))) {
    const list = steps.map((s, i) => `${i + 1}) ${s.title}`).join(", ");
    return { reply: `Here's how it works: ${list}.${buildBookingNudge()}`, escalate: false };
  }
  if (["guarantee", "refund", "money back", "money-back"].some((w) => text.includes(w))) {
    const faq = faqs.find((f) => f.q.toLowerCase().includes("doesn't work out"));
    return { reply: faq?.a || "We offer a two-week money-back guarantee.", escalate: false };
  }
  if (["countries", "where", "based", "located", "network"].some((w) => text.includes(w))) {
    return {
      reply: `Our vetted network spans ${locations.map((l) => l.name).join(", ")}.${buildBookingNudge()}`,
      escalate: false,
    };
  }

  // Generic FAQ match by keyword overlap.
  let best = null;
  let bestScore = 0;
  for (const f of faqs) {
    const score = overlapScore(q, keywords(f.q));
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  if (best && bestScore >= 2) {
    return { reply: `${best.a}${buildBookingNudge()}`, escalate: false };
  }

  return {
    reply: `Good question — I want to make sure you get an accurate answer, so let's connect you with our team.${buildBookingNudge()}`,
    escalate: true,
    reason: "No confident match in demo mode — escalating rather than guessing.",
  };
}
