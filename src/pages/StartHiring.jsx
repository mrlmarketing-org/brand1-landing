import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import BookButton from "../components/BookButton.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function StartHiring() {
  const { hash, key } = useLocation();
  const [highlightForm, setHighlightForm] = useState(false);

  // Links that point straight at the form (Roles' "just ask") use
  // #role-form specifically, distinct from BookButton's plain #book —
  // so this only fires for those, not every arrival at this section.
  // Keyed on `key` (unique per navigation) as well as `hash` so clicking
  // the same link again while already on this page re-triggers it.
  useEffect(() => {
    if (hash !== "#role-form") return;
    setHighlightForm(true);
    const id = setTimeout(() => setHighlightForm(false), 2200);
    return () => clearTimeout(id);
  }, [hash, key]);

  return (
    <>
      <SEO
        title="Start hiring"
        path="/start-hiring"
        description="Tell us the role. We'll bring you the person — vetted candidates in hand within days, for one flat fee, paid once."
      />

      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">For employers</span>
            <h1>Tell us the role. We'll bring you the person.</h1>
            <p className="subhead">
              One call is all it takes to get started. We'll learn what you
              need, and you'll have vetted candidates in hand within days —
              for one flat fee, paid once.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section on-light" id="book">
        <div className="container contact-grid">
          <Reveal className="hiring-cta">
            <h3>Prefer to talk it through?</h3>
            <p>
              Book a short call and we'll learn what you need — no forms
              required.
            </p>
            <BookButton large />
          </Reveal>

          <div id="role-form" className={highlightForm ? "role-form-highlight" : undefined}>
            <Reveal delay={0.1} x={32} y={0}>
              <ContactForm
                variant="role"
                title="Or send us the role details"
                subtitle="Prefer not to book yet? Give us the basics and we'll be in touch."
                submitLabel="Send role details"
                successBody="We'll reach out shortly to scope the role with you."
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
