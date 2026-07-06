import { motion } from "framer-motion";
import { ShieldIcon } from "./icons.jsx";
import Reveal from "./motion/Reveal.jsx";

// SECTION 7 — The guarantee (standalone dark trust block)
export default function Guarantee() {
  return (
    <section className="guarantee">
      <div className="container">
        <Reveal>
          <div className="inner">
            <motion.div className="badge" whileHover={{ scale: 1.06 }}>
              <span className="badge-glow" />
              <ShieldIcon size={30} />
            </motion.div>
            <h2>Two weeks to be sure. Or your money back.</h2>
            <p>
              We're confident in our people because we vet them the same way we vet
              talent for our own companies. So your placement is protected: if your
              new hire isn't the right fit within the first two weeks, we'll refund
              your placement fee in full.
            </p>
            <p>
              The only condition: a refund means you part ways with the person. The
              guarantee protects you from a bad fit — it isn't a way to keep the
              hire for free. Fair to you, fair to us.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
