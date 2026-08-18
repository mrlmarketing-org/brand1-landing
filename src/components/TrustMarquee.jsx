import yourSpotRentedLogo from "../assets/logos/yourspotrented-logo.png";
import famousParkingLogo from "../assets/logos/famousparking-logo.svg";

// Real client logos, shown right under the hero as immediate social
// proof (this replaced an earlier value-props version once there were
// actual logos worth showing — see git history for that version).
// Add more entries here as new placements come in.
const partners = [
  { name: "YourSpotRented.com", logo: yourSpotRentedLogo, alt: "YourSpotRented.com logo" },
  { name: "Famous Parking", logo: famousParkingLogo, alt: "Famous Parking logo", className: "trust-logo-lg" },
];

// Sits right under the hero on both the homepage and the pricing page.
// `compact` sizes the logos down a step — used on Pricing, where the
// page-hero above is much shorter than the homepage's, so the strip's
// full-size logos read as oversized relative to it.
export default function TrustMarquee({ compact = false }) {
  return (
    <div className={`marquee${compact ? " marquee-compact" : ""}`}>
      <div className="container">
        <span className="marquee-label">Businesses that trust us</span>
        <div className="trust-logos">
          {partners.map((p) => (
            <div className="trust-logo" key={p.name}>
              <img src={p.logo} alt={p.alt} loading="lazy" className={p.className} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
