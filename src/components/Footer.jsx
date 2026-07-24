import { Link } from "react-router-dom";
import { BRAND, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, CONTACT_ADDRESS, SOCIAL_LINKS } from "../data/content.js";
import Logo from "./Logo.jsx";
import { FacebookIcon, InstagramIcon } from "./icons.jsx";
import { scrollToTarget } from "../lib/smoothScroll.js";

// Adapted from secuby.framer.website's footer: brand blurb + social,
// a couple of link columns, and a contact block, used on every page.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand-col">
          <Link to="/">
            <Logo />
          </Link>
          <p>Vetted remote professionals, one flat fee, once.</p>
          <div className="footer-social">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${BRAND} on Facebook`}>
              <FacebookIcon />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${BRAND} on Instagram`}>
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Company</span>
          <Link to="/">Home</Link>
          <Link to="/#how">How it works</Link>
          <Link to="/#roles">Roles</Link>
          <Link to="/#pricing">Pricing</Link>
          <Link to="/blog">Blog</Link>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Support</span>
          <Link to="/#faq">FAQ</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Contact</span>
          <span>{CONTACT_ADDRESS}</span>
          <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE}</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} {BRAND}. All rights reserved.
        </span>
        <button
          type="button"
          className="footer-top-link"
          onClick={() => scrollToTarget(0)}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
