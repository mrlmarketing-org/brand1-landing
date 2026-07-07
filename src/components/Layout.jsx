import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// React Router doesn't scroll for you on navigation. This jumps to a
// #hash target when one's present (giving the render a tick to land
// first) and otherwise resets to the top of the new page.
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0 });
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
