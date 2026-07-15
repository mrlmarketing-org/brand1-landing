import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BookButton from "./BookButton.jsx";
import Logo from "./Logo.jsx";
import { MenuIcon, CloseIcon } from "./icons.jsx";

const navLinks = [
  { to: "/#how", label: "How it works" },
  { to: "/#roles", label: "Roles" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

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
          <BookButton />
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
            {/* BookButton opens a Calendly popup rather than navigating
                when BOOKING_URL is set, so the location-change effect
                above won't catch it — close explicitly on click too. */}
            <div onClick={() => setMenuOpen(false)}>
              <BookButton large />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
