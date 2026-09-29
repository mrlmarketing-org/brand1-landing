# Fixed Staffing — landing site and booking funnel

Marketing site for a remote staffing service, with the whole funnel wired up behind it: an AI chat that answers from a knowledge base, Calendly booking with webhook confirmation, transactional email, and Google Ads conversion tracking.

**Live:** https://fixed-staffing.vercel.app · React · Express · Claude API

---

## Why it is more than a landing page

A landing page's job ends at the booking. This one carries the whole path from first visit to a confirmed call, which means it has to handle the parts that happen after the visitor leaves the tab.

- **Calendly webhook** (`server/calendlyWebhook.js`) — the booking is confirmed server-side rather than trusted from the browser redirect, so a closed tab does not lose the booking.
- **Google Ads conversions** (`server/googleAdsConversions.js`) fire from the server on that confirmed booking, not on a button click. Client-side conversion tracking counts intent; this counts outcomes.
- **Transactional email** through Resend, with templates kept in `server/emailTemplates.js`.
- **AI chat** built on the Anthropic SDK, answering from a curated knowledge base (`server/chatKnowledgeBase.js`) rather than open-ended generation — a staffing site that improvises its own pricing is a liability. Ships with a demo mode (`server/chatDemoMode.js`) so the site runs and the chat still demonstrates itself without an API key.

## The globe

The hero globe is rendered from **TopoJSON** with `d3-geo`, using country data pre-built at compile time by `scripts/build-globe-data.mjs` rather than fetched at runtime — a marketing page should not spend its first second downloading a world atlas.

## Structure

```
src/        React front end (Vite), smooth scrolling via Lenis
server/     Express app: chat, Calendly webhook, ads conversions, email
api/        Vercel serverless entry ([...all].js) fronting the Express app
scripts/    Build-time data prep and one-off setup utilities
```

The same Express app runs locally as a normal server and in production as a single Vercel function, so there is one code path to reason about rather than two.

## Running locally

```bash
cp .env.example .env
npm install
npm run dev
```

Every integration degrades rather than crashes when its key is absent.

## Stack

React · Vite · Express · `@anthropic-ai/sdk` · Resend · `d3-geo` + `topojson-client` · Framer Motion · Lenis

---

Built by [Jeremy Ahamioje](https://github.com/JeremyAhamioje).
