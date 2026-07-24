import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import ContactForm from "../components/ContactForm.jsx";

export default function FindAJob() {
  return (
    <>
      <SEO
        title="Find a job"
        path="/find-a-job"
        description="Looking for remote work? Tell us what you're looking to do and we'll reach out if there's a fit."
      />

      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">For job seekers</span>
            <h1>Find a job</h1>
            <p className="subhead">
              Tell us what you're looking to do. If there's a fit with one of
              our clients, we'll reach out.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section on-light">
        <div className="container form-page">
          <Reveal x={0} y={16}>
            <ContactForm
              variant="candidate"
              submitLabel="Submit"
              successTitle="Thanks — we've got your details"
              successBody="We'll be in touch if there's a fit with one of our clients."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
