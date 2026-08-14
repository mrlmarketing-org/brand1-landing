import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "./ChatWidget.jsx";
import { pushEvent } from "../lib/analytics.js";
import { captureGclid } from "../lib/gclid.js";
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

// Runs on every navigation (not just the first) since an ad could land
// someone on any route, not only the homepage.
function useGclidCapture() {
  const { search } = useLocation();
  useEffect(() => captureGclid(), [search]);
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
// the target can still reflow after this fires. A single scrollIntoView
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
  useGclidCapture();
  useCalendlyConversion();

  return (
    <>
      <Navbar />
      {/* Pages are lazy-loaded (see App.jsx) so a visitor only downloads
          the page they're actually on — Navbar/Footer stay outside this
          boundary so they render immediately rather than blanking out
          with the page content while its chunk loads. */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
      <ChatWidget />
    </>
  );
}
