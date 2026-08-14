import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import BookButton from "../components/BookButton.jsx";
import TrustMarquee from "../components/TrustMarquee.jsx";
import FinalCTA from "../components/FinalCTA.jsx";
import { DollarIcon, CalendarOffIcon, ListCheckIcon, HeartIcon } from "../components/icons.jsx";
import { PRICING_RATE_LOW, PRICING_RATE_HIGH } from "../data/content.js";
import proposalPhoto from "../assets/photos/pricing-proposal-review.jpg";

// The homepage trust strip used to show these as pills (see git history
// for TrustMarquee.jsx before it switched to client logos) — moved here
// since they're specifically about the fee, which is what this page is
// about. Each point keeps its own icon + color rather than a repeated
// checkmark, same reasoning as the original: it reads as a set of
// distinct claims instead of one undifferentiated checklist.
const points = [
  { text: "Flat one-time fee", Icon: DollarIcon, color: "#f5b942" },
  { text: "No monthly markup", Icon: CalendarOffIcon, color: "#ff6b5e" },
  { text: "Skills-tested talent", Icon: ListCheckIcon, color: "#b18bff" },
  { text: "You own the relationship", Icon: HeartIcon, color: "#ff6fa5" },
];

// Own page (rather than a homepage section) so it can go into the
// mechanics — the rate range, why it's a range, what's included — at
// a level of detail that doesn't fit alongside nine other sections.
export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing"
        path="/pricing"
        description={`One-time placement fee, typically ${PRICING_RATE_LOW}–${PRICING_RATE_HIGH}% of your hire's first-year salary. No subscriptions, no monthly markup — you pay your hire's wage directly.`}
      />

      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Pricing</span>
            <h1>One placement fee, paid once.</h1>
            <p className="subhead">
              You pay your hire's wage directly. We charge a single one-time
              fee to find, vet, and place them.
            </p>
          </Reveal>
        </div>
      </header>

      <TrustMarquee />

      <section className="section on-light" id="rate">
        <div className="container pricing-grid">
          <Reveal>
            <div>
              <div className="rate-card">
                <span className="rate-figure">
                  {PRICING_RATE_LOW}–{PRICING_RATE_HIGH}%
                </span>
                <span className="rate-label">of your hire's first-year salary, one time</span>
                <p className="rate-note">
                  Your exact rate depends on factors like role, seniority, and
                  region. Rather than show you a number that might not fit your
                  situation, we confirm it on a quick call — no obligation
                  either way.
                </p>
                <BookButton label="Book a call to learn your rate" large />
              </div>

              <ul className="rate-points">
                {points.map(({ text, Icon, color }) => (
                  <li key={text}>
                    <span
                      className="rate-point-icon"
                      style={{ color, background: `${color}24` }}
                    >
                      <Icon size={14} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} x={32} y={0}>
            <div className="pricing-media">
              <img
                src={proposalPhoto}
                alt="Colleagues reviewing a proposal and budget numbers together"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
