import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { pushEvent } from "../lib/analytics.js";
import { initSmoothScroll, scrollToTarget } from "../lib/smoothScroll.js";

// Lenis takes over wheel/touch scrolling for the whole app for the
// life of the tab, so it's started once here rather than per-route.
function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), []);
}

// GTM's built-in triggers don't see React Router navigations (no real
// page load happens), so each route change is pushed as a custom
// "page_view" event. In GTM this feeds a GA4 event tag rather than the
// GA4 config tag's automatic page_view, since that only fires once on
// the initial script load.
function useDataLayerPageview() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    pushEvent("page_view", {
      page_path: pathname + search,
      page_location: window.location.href,
    });
  }, [pathname, search]);
}

// Calendly's popup widget (loaded in index.html, opened from
// BookButton.jsx) posts a message to the parent window when someone
// actually completes a booking — as opposed to just opening the
// popup. That's the real conversion moment. Listening once here
// (Layout mounts once for the whole app) covers every BookButton on
// every page.
function useCalendlyConversion() {
  useEffect(() => {
    function handleMessage(e) {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        pushEvent("calendly_booking_scheduled");
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
}

// React Router doesn't scroll for you on navigation. This jumps to a
// #hash target when one's present and otherwise resets to the top of
// the new page.
//
// Google Fonts load with display=swap (index.html), so headings above
// the target can still reflow — and the hero's animated flow-card
// resizes on its own timer — after this fires. A single scrollIntoView
// call can end up targeting a position that then shifts out from under
// it. Rather than guess a timeout long enough to cover every case, this
// watches the page for layout shifts with a ResizeObserver and
// re-corrects for a few seconds after navigating.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true });
      return;
    }

    const el = document.querySelector(hash);
    if (!el) return;

    const scrollToEl = () => scrollToTarget(el);
    scrollToEl();

    let lastTop = el.getBoundingClientRect().top;
    const observer = new ResizeObserver(() => {
      const top = el.getBoundingClientRect().top;
      if (Math.abs(top - lastTop) > 4) scrollToEl();
      lastTop = top;
    });
    observer.observe(document.body);

    // Stop watching after a few seconds so this can't fight a user who
    // scrolls away on their own later in the visit.
    const stopId = window.setTimeout(() => observer.disconnect(), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(stopId);
    };
  }, [pathname, hash]);
}

export default function Layout() {
  useSmoothScroll();
  useScrollOnNavigate();
  useDataLayerPageview();
  useCalendlyConversion();

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
