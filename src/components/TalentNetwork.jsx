import { locations } from "../data/content.js";
import Reveal from "./motion/Reveal.jsx";
import flagPH from "flag-icons/flags/4x3/ph.svg";
import flagVN from "flag-icons/flags/4x3/vn.svg";
import flagID from "flag-icons/flags/4x3/id.svg";
import flagLK from "flag-icons/flags/4x3/lk.svg";
import flagIN from "flag-icons/flags/4x3/in.svg";
import flagPK from "flag-icons/flags/4x3/pk.svg";
import flagNG from "flag-icons/flags/4x3/ng.svg";
import flagBR from "flag-icons/flags/4x3/br.svg";
import flagCO from "flag-icons/flags/4x3/co.svg";
import flagNI from "flag-icons/flags/4x3/ni.svg";
import flagAR from "flag-icons/flags/4x3/ar.svg";

// Actual flag SVGs, not emoji — flag emoji render as plain two-letter
// codes on systems without a color-emoji font (common on Linux, and
// not guaranteed anywhere), so they're not reliable here.
const flagByCode = {
  ph: flagPH,
  vn: flagVN,
  id: flagID,
  lk: flagLK,
  in: flagIN,
  pk: flagPK,
  ng: flagNG,
  br: flagBR,
  co: flagCO,
  ni: flagNI,
  ar: flagAR,
};

// SECTION — Places we source our talent. Same country list as the
// hero globe's pins (keep them in sync — see the comment on
// `locations` in content.js).
export default function TalentNetwork() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Where we source</span>
          <h2 className="section-title">Places we source our talent</h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginTop: 12 }}>
            A private network across Southeast Asia, South Asia, West Africa,
            and Latin America — built and tested across our own operations.
          </p>
        </div>

        <div className="flag-grid">
          {locations.map((loc, i) => (
            <Reveal key={loc.name} delay={i * 0.04}>
              <div className="flag-card">
                <span className="flag-card-flag">
                  <img src={flagByCode[loc.code]} alt="" />
                </span>
                <span className="flag-card-name">{loc.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
