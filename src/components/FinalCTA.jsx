import StartHiringButton from "./StartHiringButton.jsx";

// SECTION 10 — Final CTA.
export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-inner">
          <h2>Tell us the role. We'll bring you the person.</h2>
          <p>
            One call is all it takes to get started. We'll learn what you need,
            and you'll have vetted candidates in hand within days — for one flat
            fee, paid once.
          </p>
          <div className="final-actions">
            <StartHiringButton large />
          </div>
        </div>
      </div>
    </section>
  );
}
