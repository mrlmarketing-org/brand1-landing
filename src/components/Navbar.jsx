import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo.jsx";
import { MenuIcon, CloseIcon, ArrowRight } from "./icons.jsx";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "../data/content.js";

const navLinks = [
  { to: "/#how", label: "How it works" },
  { to: "/#roles", label: "Roles" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
];

// The navbar shows a shortened "(313-230-4252)" form rather than the
// full "+1 313-230-4252" used elsewhere (e.g. the footer) — derived
// here rather than as a second content.js setting, so there's still
// one canonical number to update.
const navPhone = `(${CONTACT_PHONE.replace(/^\+1\s*/, "")})`;

// Sticky top navigation. Section links point at "/#id" so they work
// the same whether you're already on the homepage or navigating in
// from another page (Layout's scroll-on-navigate handles the jump).
// Below the desktop breakpoint the link list collapses behind a
// hamburger toggle instead of disappearing outright.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // Close the mobile menu on every navigation, including in-page
  // section jumps (those only change the hash, not the pathname).
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Don't let the page scroll behind the open menu.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/">
          <Logo />
        </Link>
        <div className="nav-links">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="navbar-right">
          <a href={`tel:${CONTACT_PHONE_HREF}`} className="nav-call">
            Call Us {navPhone}
          </a>
          <div className="nav-cta-group">
            <Link to="/find-a-job" className="btn btn-secondary">
              Find a job
            </Link>
            <Link to="/start-hiring" className="btn btn-primary">
              Start hiring <ArrowRight />
            </Link>
          </div>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-links">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </div>
            <a href={`tel:${CONTACT_PHONE_HREF}`} className="mobile-menu-call">
              Call Us {navPhone}
            </a>
            <div className="mobile-menu-cta">
              <Link to="/find-a-job" className="btn btn-secondary btn-lg">
                Find a job
              </Link>
              <Link to="/start-hiring" className="btn btn-primary btn-lg">
                Start hiring <ArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
