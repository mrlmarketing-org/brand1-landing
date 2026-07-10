import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

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
      window.scrollTo({ top: 0 });
      return;
    }

    const el = document.querySelector(hash);
    if (!el) return;

    const scrollToEl = () => el.scrollIntoView({ behavior: "smooth", block: "start" });
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
  useScrollOnNavigate();

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
