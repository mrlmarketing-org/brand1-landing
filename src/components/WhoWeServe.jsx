import Reveal from "./motion/Reveal.jsx";
import founderPhoto from "../assets/photos/founder-portrait.jpg";
import agencyPhoto from "../assets/photos/agency-team-meeting.jpg";
import hiringPhoto from "../assets/photos/hiring-handshake.jpg";

// Inspired by somewhere.com's "Who We Serve" section — customer personas,
// not job roles (Roles.jsx already covers the roles we staff). Photos
// sourced from Pexels (free for commercial use, no attribution required —
// same terms as the rest of this project's stock photos).
const audiences = [
  {
    photo: founderPhoto,
    alt: "A confident business owner",
    title: "Founders & small business owners",
    body: "You're doing five jobs at once. Add a vetted remote hire without the overhead of running your own hiring process.",
  },
  {
    photo: agencyPhoto,
    alt: "A team of consultants collaborating around a laptop",
    title: "Agencies & consultancies",
    body: "Scale client delivery without scaling payroll. Add capacity for the work, not another full-time local salary.",
  },
  {
    photo: hiringPhoto,
    alt: "Two colleagues shaking hands after a hire",
    title: "Operations & hiring managers",
    body: "You know exactly what the role needs. We source and vet the person — you just pick who fits.",
  },
];

// SECTION — Who we serve
export default function WhoWeServe() {
  return (
    <section className="section on-light section-alt" id="who-we-serve">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Who we serve</span>
          <h2 className="section-title">Built for whoever's doing the hiring.</h2>
        </div>

        <div className="who-grid">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="who-card">
                <div className="who-card-photo">
                  <img src={a.photo} alt={a.alt} />
                </div>
                <div className="who-card-body">
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
