import { createHash } from "crypto";

// Uploads a click conversion (a booking, tied back to the ad click via
// gclid) to Google Ads, carrying the invitee's hashed email as enhanced
// conversion data. This is the server-side equivalent of in-page enhanced
// conversions code — necessary here because the actual conversion (a
// Calendly booking) happens inside Calendly's own popup, which never
// exposes the visitor's email back to this site's JS. See
// calendlyWebhook.js for where this gets called from.
//
// Uses the Data Manager API (datamanager.googleapis.com), not the legacy
// Google Ads API ConversionUploadService — Google now rejects new
// integrations on the legacy endpoint with CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE
// (confirmed against this account). The Data Manager API replaces it for
// new integrations and, unlike the legacy API, needs no developer token —
// just an OAuth token with the datamanager scope (see
// scripts/get-google-ads-refresh-token.mjs).
//
// Deliberately hand-rolled against the plain REST API (fetch + OAuth
// refresh) rather than a client library, to match how verifyRecaptcha() in
// app.js already talks to Google's REST APIs directly.

let cachedToken = null; // { accessToken, expiresAt }

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.accessToken;
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Google OAuth token refresh failed: ${data.error_description || data.error}`);
  }

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.accessToken;
}

// Per Google's Data Manager API formatting guide: lowercase, trim
// whitespace, then (Gmail/Googlemail only) drop dots and any +suffix
// before the @ — Google's own matching normalizes Gmail addresses this
// way regardless of how the visitor typed it in.
function normalizeEmail(email) {
  let normalized = email.trim().toLowerCase().replace(/\s+/g, "");
  const [local, domain] = normalized.split("@");
  if (domain === "gmail.com" || domain === "googlemail.com") {
    normalized = `${local.split("+")[0].replace(/\./g, "")}@${domain}`;
  }
  return normalized;
}

function hashEmail(email) {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex");
}

function isConfigured() {
  return Boolean(
    process.env.GOOGLE_ADS_CLIENT_ID &&
      process.env.GOOGLE_ADS_CLIENT_SECRET &&
      process.env.GOOGLE_ADS_REFRESH_TOKEN &&
      process.env.GOOGLE_ADS_CUSTOMER_ID &&
      process.env.GOOGLE_ADS_CONVERSION_ACTION_ID
  );
}

// `conversionDate` is a JS Date for when the booking actually happened
// (not when the webhook arrived — Calendly can retry deliveries).
// `transactionId` should be stable per booking so Calendly's webhook
// retries can't double-count the same conversion.
export async function uploadClickConversion({ gclid, email, conversionDate, transactionId }) {
  if (!isConfigured()) {
    console.warn("Google Ads conversion upload skipped — GOOGLE_ADS_* env vars are not fully set.");
    return;
  }

  const destination = {
    operatingAccount: { accountType: "GOOGLE_ADS", accountId: process.env.GOOGLE_ADS_CUSTOMER_ID },
    productDestinationId: process.env.GOOGLE_ADS_CONVERSION_ACTION_ID,
    ...(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID && {
      // Only needed if this Ads account is managed under an MCC — omit
      // GOOGLE_ADS_LOGIN_CUSTOMER_ID otherwise.
      loginAccount: { accountType: "GOOGLE_ADS", accountId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID },
    }),
  };

  const event = {
    adIdentifiers: { gclid },
    eventTimestamp: conversionDate.toISOString(),
    eventSource: "WEB",
    transactionId,
    userData: { userIdentifiers: [{ emailAddress: hashEmail(email) }] },
  };

  const requestBody = { destinations: [destination], events: [event], encoding: "HEX" };

  if (process.env.GOOGLE_ADS_DRY_RUN === "true") {
    console.log("[dry run] would ingest conversion event:", JSON.stringify(requestBody, null, 2));
    return;
  }

  const accessToken = await getAccessToken();
  const res = await fetch("https://datamanager.googleapis.com/v1/events:ingest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // A non-JSON body (e.g. an HTML error page from Google's API gateway)
  // would otherwise surface as an opaque JSON.parse crash that hides the
  // actual HTTP status.
  const rawBody = await res.text();
  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    console.error(`Google Ads conversion upload failed: HTTP ${res.status} — ${rawBody.slice(0, 500)}`);
    return;
  }

  if (!res.ok) {
    console.error("Google Ads conversion upload failed:", JSON.stringify(data));
    return;
  }
  if (data.fieldWarnings?.length) {
    console.warn("Google Ads conversion upload succeeded with warnings:", JSON.stringify(data.fieldWarnings));
  }

  console.log("Ingested conversion event for gclid:", gclid, "requestId:", data.requestId);
}
