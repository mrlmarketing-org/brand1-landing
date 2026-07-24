import Lenis from "lenis";

// Shared module-level instance so any component (Layout's nav-jump
// logic, a plain <a href="#hash"> link) can route a scroll through
// Lenis without prop-drilling or context. Stays null when the visitor
// prefers reduced motion or before Layout has mounted it — callers
// must fall back to native scrolling in that case.
export const smoothScroll = { lenis: null };

export function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  smoothScroll.lenis = lenis;

  let rafId;
  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
    smoothScroll.lenis = null;
  };
}

// Scrolls to a target (selector, element, or Y offset), preferring
// Lenis's eased scroll and falling back to native when it isn't
// running.
export function scrollToTarget(target, options = {}) {
  const { lenis } = smoothScroll;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, ...options });
    return;
  }
  const behavior = options.immediate ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior, block: "start" });
}
