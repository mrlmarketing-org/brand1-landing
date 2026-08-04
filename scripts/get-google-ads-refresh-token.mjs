// One-time setup: mints a Data Manager API refresh token via a local OAuth
// loopback flow. Run once per Google account being connected — the
// resulting refresh token doesn't expire on its own and is what
// server/googleAdsConversions.js uses to mint short-lived access tokens
// on every conversion upload. No developer token needed for this API.
//
// Run this authenticated as whichever Google account already has access
// to the Ads account (directly, or via a manager account it belongs to) —
// Google checks that account's current permissions on every call, not
// permissions at the time this token was minted.
//
// Prerequisites: a Google Cloud project with the Data Manager API enabled,
// and an OAuth 2.0 Client ID of type "Desktop app" (console.cloud.google.com
// > APIs & Services > Credentials). Run: `node scripts/get-google-ads-refresh-token.mjs`
import { createServer } from "http";
import { createInterface } from "readline/promises";

const PORT = 8901;
const REDIRECT_URI = `http://127.0.0.1:${PORT}`;

const rl = createInterface({ input: process.stdin, output: process.stdout });
const clientId = (await rl.question("Google OAuth Client ID: ")).trim();
const clientSecret = (await rl.question("Google OAuth Client Secret: ")).trim();
rl.close();

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", "https://www.googleapis.com/auth/datamanager");
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log("\nOpen this URL, sign in with the Google account tied to your Ads account, and approve access:\n");
console.log(authUrl.toString());
console.log("\nWaiting for the redirect back to this machine...");

const code = await new Promise((resolve, reject) => {
  const server = createServer((req, res) => {
    const url = new URL(req.url, REDIRECT_URI);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    res.end(error ? `Error: ${error}. You can close this tab.` : "Success — you can close this tab.");
    server.close();

    if (error) reject(new Error(error));
    else resolve(code);
  });
  server.listen(PORT);
});

const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
  }),
});
const tokenData = await tokenRes.json();

if (!tokenRes.ok) {
  console.error("Token exchange failed:", tokenData);
  process.exit(1);
}
if (!tokenData.refresh_token) {
  console.error(
    "No refresh_token in the response — this Google account may have already granted this app " +
      "access before. Revoke access at https://myaccount.google.com/permissions and run this again."
  );
  process.exit(1);
}

console.log("\nRefresh token (copy this into GOOGLE_ADS_REFRESH_TOKEN):");
console.log(tokenData.refresh_token);
