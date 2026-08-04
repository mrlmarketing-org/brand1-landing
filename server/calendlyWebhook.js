import { createHmac, timingSafeEqual } from "crypto";
import { uploadClickConversion } from "./googleAdsConversions.js";

const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

// Calendly signs the raw request body as `t=<unix ts>,v1=<hex hmac>` in the
// Calendly-Webhook-Signature header (see server/app.js — this route is
// mounted with express.raw() specifically so `rawBody` here is untouched
// bytes, not the re-serialized JSON express.json() would otherwise hand
// us, which wouldn't match the signature Calendly computed).
function isValidSignature(rawBody, header) {
  if (!header || !process.env.CALENDLY_WEBHOOK_SIGNING_KEY) return false;

  const parts = Object.fromEntries(
    header.split(",").map((part) => part.split("=").map((s) => s.trim()))
  );
  const { t: timestamp, v1: signature } = parts;
  if (!timestamp || !signature) return false;

  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const expected = createHmac("sha256", process.env.CALENDLY_WEBHOOK_SIGNING_KEY)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const signatureBuf = Buffer.from(signature, "hex");
  return expectedBuf.length === signatureBuf.length && timingSafeEqual(expectedBuf, signatureBuf);
}

// The gclid rides through Calendly's tracking.utm_content field (see
// BookButton.jsx for where it gets attached to the booking URL), prefixed
// so it doesn't collide with an actual utm_content value someone might
// have set up for other campaigns.
function extractGclid(tracking) {
  const utmContent = tracking?.utm_content;
  if (!utmContent?.startsWith("gclid:")) return null;
  return utmContent.slice("gclid:".length) || null;
}

export async function calendlyWebhookHandler(req, res) {
  const signatureHeader = req.get("Calendly-Webhook-Signature");
  const rawBody = req.body; // Buffer, thanks to express.raw()

  if (!isValidSignature(rawBody, signatureHeader)) {
    return res.status(401).json({ error: "Invalid signature." });
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return res.status(400).json({ error: "Invalid JSON." });
  }

  // Acknowledge immediately — Calendly retries on non-2xx or slow
  // responses, and the actual conversion upload isn't something the
  // caller needs to wait on.
  res.status(200).json({ ok: true });

  if (event.event !== "invitee.created") return;

  const { email, tracking, created_at, uri } = event.payload || {};
  const gclid = extractGclid(tracking);

  if (!email || !gclid) {
    console.log("Calendly booking has no attributable gclid — skipping Ads conversion upload.");
    return;
  }

  try {
    await uploadClickConversion({
      gclid,
      email,
      conversionDate: created_at ? new Date(created_at) : new Date(),
      // The invitee's own resource URI is unique and stable per booking —
      // using it as the transaction ID means a Calendly webhook retry
      // can't get double-counted as two conversions.
      transactionId: uri,
    });
  } catch (err) {
    console.error("Failed to upload Calendly booking as a Google Ads conversion:", err);
  }
}
