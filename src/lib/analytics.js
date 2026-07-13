// Pushes custom events to the GTM dataLayer (see the GTM snippet in
// index.html). Guarded to production builds only, so `npm run dev`
// sessions don't pollute real GA4/Ads conversion data — use GTM's
// Preview mode against a deployed build to test tag firing instead.
export function pushEvent(event, params = {}) {
  if (!import.meta.env.PROD) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
