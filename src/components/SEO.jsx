import { useEffect } from "react";
import { BRAND } from "../data/content.js";

const DEFAULT_DESCRIPTION =
  "We find and vet a remote professional for your business. You hire them directly and pay them directly. One flat fee, once — no subscriptions, no wage markup.";

function setMetaByName(name, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Sets per-page <title>, description, canonical link, and Open Graph /
// Twitter tags on mount. There's no server-side rendering here, so this
// runs client-side on route change — fine for this app's purposes, but
// if you later need crawlers to see per-page tags without executing JS,
// you'd move this to a pre-render/SSR step.
export default function SEO({ title, description = DEFAULT_DESCRIPTION, path = "/", image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${BRAND}` : `${BRAND} — Hire vetted remote professionals`;
    document.title = fullTitle;

    setMetaByName("description", description);
    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:url", `${window.location.origin}${path}`);
    setMetaByName("twitter:card", image ? "summary_large_image" : "summary");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);

    if (image) {
      const absoluteImage = image.startsWith("http") ? image : `${window.location.origin}${image}`;
      setMetaByProperty("og:image", absoluteImage);
      setMetaByName("twitter:image", absoluteImage);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${path}`);
  }, [title, description, path, image]);

  return null;
}
