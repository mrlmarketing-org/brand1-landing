import Reveal from "./motion/Reveal.jsx";
import yourSpotRentedLogo from "../assets/logos/yourspotrented-logo.png";
import famousParkingLogo from "../assets/logos/famousparking-logo.svg";

// Real client logos, added once there were some worth showing (see the
// note in TrustMarquee.jsx, which covers this same "no logos yet" gap
// with value props instead). Add more entries here as new placements
// come in — no other markup changes needed.
const partners = [
  { name: "YourSpotRented.com", logo: yourSpotRentedLogo, alt: "YourSpotRented.com logo" },
  { name: "Famous Parking", logo: famousParkingLogo, alt: "Famous Parking logo" },
];

// SECTION — Businesses we've helped staff
export default function Partners() {
  return (
    <section className="section on-light section-alt" id="partners">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Who we've helped</span>
          <h2 className="section-title">Businesses we've helped staff.</h2>
        </div>

        <Reveal>
          <div className="partners-row">
            {partners.map((p) => (
              <div className="partner-logo" key={p.name}>
                <img src={p.logo} alt={p.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
