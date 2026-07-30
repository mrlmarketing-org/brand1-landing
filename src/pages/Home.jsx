import SEO from "../components/SEO.jsx";
import Hero from "../components/Hero.jsx";
import TrustMarquee from "../components/TrustMarquee.jsx";
import Problem from "../components/Problem.jsx";
import Solution from "../components/Solution.jsx";
import Roles from "../components/Roles.jsx";
import TalentNetwork from "../components/TalentNetwork.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Pricing from "../components/Pricing.jsx";
import Guarantee from "../components/Guarantee.jsx";
import WhyUs from "../components/WhyUs.jsx";
import FAQ from "../components/FAQ.jsx";
import FinalCTA from "../components/FinalCTA.jsx";

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        description="We find and vet a remote professional for your business. You hire them directly and pay them directly. One flat fee, once — no subscriptions, no wage markup."
      />
      <Hero /> {/* Section 1 — has its own entrance choreography already */}
      <TrustMarquee />
      {/* Sections render with their background always opaque — each one
          already fades its own inner content (cards, rows, paragraphs) in
          via its own <Reveal> usage. An earlier version also wrapped the
          whole section in a fading/translating Reveal, which meant the
          section's own colored background was invisible for the first
          ~15% it scrolled into view — exposing the dark page background
          underneath, most visible right at a dark-to-light seam. */}
      <Problem /> {/* Section 2 */}
      <Solution /> {/* Section 3 */}
      <Roles /> {/* Section 4 */}
      <TalentNetwork />
      <HowItWorks /> {/* Section 5 */}
      <Pricing /> {/* Section 6 */}
      <Guarantee /> {/* Section 7 */}
      <WhyUs /> {/* Section 8 */}
      <FAQ /> {/* Section 9 */}
      <FinalCTA /> {/* Section 10 */}
    </>
  );
}
