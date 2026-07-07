import BookButton from "./BookButton.jsx";
import ContactForm from "./ContactForm.jsx";

// SECTION 10 — Final CTA. The id="book" here is where every
// "Book a call" button scrolls to when no booking link is set.
export default function FinalCTA() {
  return (
    <section className="final-cta" id="book">
      <div className="container">
        <div className="final-inner">
          <h2>Tell us the role. We'll bring you the person.</h2>
          <p>
            One call is all it takes to get started. We'll learn what you need,
            and you'll have vetted candidates in hand within days — for one flat
            fee, paid once.
          </p>
          <div className="final-actions">
            <BookButton large />
          </div>

          <ContactForm
            variant="role"
            title="Or send us the role details and we'll reach out"
            subtitle="Prefer not to book yet? Give us the basics and we'll be in touch."
            submitLabel="Send role details"
            successBody="We'll reach out shortly to scope the role with you."
          />
        </div>
      </div>
    </section>
  );
}
