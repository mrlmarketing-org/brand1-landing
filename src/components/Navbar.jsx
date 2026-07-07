import { Link } from "react-router-dom";
import BookButton from "./BookButton.jsx";
import Logo from "./Logo.jsx";

// Sticky top navigation. Section links point at "/#id" so they work
// the same whether you're already on the homepage or navigating in
// from another page (Layout's scroll-on-navigate handles the jump).
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/">
          <Logo />
        </Link>
        <div className="nav-links">
          <Link to="/#how">How it works</Link>
          <Link to="/#roles">Roles</Link>
          <Link to="/#pricing">Pricing</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <BookButton label="Book a call" />
      </div>
    </nav>
  );
}
