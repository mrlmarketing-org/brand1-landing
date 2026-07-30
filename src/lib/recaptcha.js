// Requests a fresh reCAPTCHA v3 token scoped to a specific action right
// before form submission (see the script tag in index.html). Resolves to
// null if the site key isn't configured or the script hasn't loaded (e.g.
// blocked by an ad blocker) so a missing token degrades to "unverified"
// server-side rather than blocking the form entirely.
export function getRecaptchaToken(action) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey || !window.grecaptcha) return Promise.resolve(null);

  return new Promise((resolve) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action }).then(resolve).catch(() => resolve(null));
    });
  });
}
