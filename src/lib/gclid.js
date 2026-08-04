// Captures the Google Ads click ID (gclid) from the landing URL so it can
// be re-attached to a Calendly booking later (see BookButton.jsx). Without
// this, a booking made through Calendly's popup can't be traced back to the
// ad click that brought the visitor in, since Calendly's own form never
// sees anything from the parent page.
const STORAGE_KEY = "sb_gclid";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // matches Google's own click-through attribution window

export function captureGclid() {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  if (!gclid) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ gclid, storedAt: Date.now() }));
}

export function getStoredGclid() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const { gclid, storedAt } = JSON.parse(raw);
    if (!gclid || Date.now() - storedAt > TTL_MS) return null;
    return gclid;
  } catch {
    return null;
  }
}
