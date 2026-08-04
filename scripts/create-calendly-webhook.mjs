// One-time setup: registers a Calendly webhook subscription so Calendly
// notifies /api/calendly-webhook whenever someone books a call (see
// server/calendlyWebhook.js). Requires the Standard plan or above —
// webhook access isn't available on Calendly's free tier.
//
// Run once per environment: `node scripts/create-calendly-webhook.mjs`
// You'll be prompted for a Calendly Personal Access Token (generate one at
// https://calendly.com/integrations/api_webhooks — it's used only for this
// one request, never stored) and the public URL of your deployed site.
//
// Unlike some webhook providers, Calendly doesn't generate the signing key
// for you — *you* pick a secret and send it in the request, and Calendly
// uses it to sign every future payload. This script generates a random one
// and prints it; copy it into CALENDLY_WEBHOOK_SIGNING_KEY in your .env
// (that's the only place it needs to end up — Calendly doesn't show it
// back to you again after this call).
import { createInterface } from "readline/promises";
import { randomBytes } from "crypto";

const rl = createInterface({ input: process.stdin, output: process.stdout });

async function prompt(question) {
  const answer = await rl.question(question);
  return answer.trim();
}

const token = await prompt("Calendly Personal Access Token: ");
const siteUrl = await prompt("Public site URL (e.g. https://example.com): ");
rl.close();

const signingKey = randomBytes(32).toString("hex");

const authHeaders = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const meRes = await fetch("https://api.calendly.com/users/me", { headers: authHeaders });
const me = await meRes.json();
if (!meRes.ok) {
  console.error("Failed to look up Calendly account:", me);
  process.exit(1);
}

const res = await fetch("https://api.calendly.com/webhook_subscriptions", {
  method: "POST",
  headers: authHeaders,
  body: JSON.stringify({
    url: `${siteUrl.replace(/\/$/, "")}/api/calendly-webhook`,
    events: ["invitee.created"],
    organization: me.resource.current_organization,
    scope: "organization",
    signing_key: signingKey,
  }),
});
const data = await res.json();

if (!res.ok) {
  console.error("Failed to create webhook subscription:", data);
  process.exit(1);
}

console.log("\nWebhook subscription created:", data.resource.uri);
console.log("Signing key (copy this into CALENDLY_WEBHOOK_SIGNING_KEY):");
console.log(signingKey);
