import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <section className="section not-found on-light">
      <SEO title="Page not found" path="/404" description="This page doesn't exist." />
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">404</span>
          <h2 className="section-title">That page doesn't exist.</h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            The link may be old, or the page may have moved.
          </p>
        </div>
        <p style={{ textAlign: "center" }}>
          <Link to="/" className="btn-link">
            Back to the homepage
          </Link>
        </p>
      </div>
    </section>
  );
}
