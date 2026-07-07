import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { MailIcon, PhoneIcon, PinIcon } from "../components/icons.jsx";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, CONTACT_ADDRESS } from "../data/content.js";

// Adapted from secuby.framer.website/contact: a short heading, contact
// info alongside the form (not below it), same form/backend as the
// homepage's final CTA — just the "role" field relabeled "Subject".
export default function Contact() {
  return (
    <>
      <SEO
        title="Contact us"
        path="/contact"
        description="Tell us what you need — we usually reply within one business day."
      />

      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Get in touch</span>
            <h1>Contact us</h1>
            <p className="subhead">
              We're here to help — tell us what you need and we'll get back to
              you within one business day.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <h3>Contact information</h3>
            <ul>
              <li>
                <PinIcon />
                <div>
                  <span className="contact-info-label">Location</span>
                  <span>{CONTACT_ADDRESS}</span>
                </div>
              </li>
              <li>
                <PhoneIcon />
                <div>
                  <span className="contact-info-label">Phone</span>
                  <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE}</a>
                </div>
              </li>
              <li>
                <MailIcon />
                <div>
                  <span className="contact-info-label">Email</span>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} x={32} y={0}>
            <ContactForm
              variant="subject"
              submitLabel="Send message"
              successTitle="Thanks — your message is in"
              successBody="We'll get back to you within one business day."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
