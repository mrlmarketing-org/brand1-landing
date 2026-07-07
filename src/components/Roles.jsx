import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { roles } from "../data/content.js";
import { people } from "../data/people.js";
import Reveal from "./motion/Reveal.jsx";
import bookkeepingPhoto from "../assets/photos/bookkeeping-desk.jpg";
import developerPhoto from "../assets/photos/developer-code-screen.jpg";
import salesPhoto from "../assets/photos/sales-outreach-call.jpg";
import adminPhoto from "../assets/photos/admin-planner-desk.jpg";

// Maps each role title to a photo, in the same order roles are authored
// in content.js. Kept here (not in content.js) since it's presentational,
// not copy.
const rolePhotos = [
  { src: bookkeepingPhoto, alt: "A bookkeeper's desk with a calculator and paperwork" },
  { src: developerPhoto, alt: "A laptop screen showing program code" },
  { src: salesPhoto, alt: "A sales rep wearing a headset at his computer" },
  { src: adminPhoto, alt: "A weekly planner and phone on a desk" },
];

// SECTION 4 — Roles we place
export default function Roles() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section" id="roles">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Roles we place</span>
          <h2 className="section-title">
            Where we already have deep bench strength
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            These are the roles we staff every day inside our own operations — so
            we know exactly what "great" looks like.
          </p>
          <Reveal delay={0.1}>
            <div className="photo-stack">
              {people.map((photo) => (
                <img key={photo} src={photo} alt="" className="photo-stack-item" />
              ))}
              <span className="photo-stack-caption">The caliber of talent you'll meet</span>
            </div>
          </Reveal>
        </div>

        <div className="role-grid">
          {roles.map((role, i) => {
            const photo = rolePhotos[i % rolePhotos.length];
            const isOpen = openIndex === i;
            return (
              <Reveal key={role.title} delay={i * 0.05}>
                <motion.div
                  layout
                  className="role-card"
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex((cur) => (cur === i ? null : cur))}
                  onClick={() => setOpenIndex((cur) => (cur === i ? null : i))}
                >
                  <div className="role-card-photo">
                    <img src={photo.src} alt={photo.alt} />
                  </div>
                  <div className="role-card-body">
                    <h3>{role.title}</h3>
                    <p>{role.desc}</p>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="best-for"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="best-for-inner">
                            <strong>Best for:</strong> {role.bestFor}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <p className="roles-note">
          Don't see your role? If it can be done remotely, we can likely place
          it. Ask on your call.
        </p>
      </div>
    </section>
  );
}
