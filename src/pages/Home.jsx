import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
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

// Every section below (after the hero) fades in as it scrolls into
// view and fades back out as it leaves — `once={false}` is what makes
// Reveal replay on every pass instead of just the first.
const sectionRevealProps = { once: false, amount: 0.15, y: 40 };

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        description="We find and vet a remote professional for your business. You hire them directly and pay them directly. One flat fee, once — no subscriptions, no wage markup."
      />
      <Hero /> {/* Section 1 — has its own entrance choreography already */}
      <TrustMarquee />
      <Reveal {...sectionRevealProps}>
        <Problem /> {/* Section 2 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <Solution /> {/* Section 3 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <Roles /> {/* Section 4 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <TalentNetwork />
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <HowItWorks /> {/* Section 5 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <Pricing /> {/* Section 6 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <Guarantee /> {/* Section 7 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <WhyUs /> {/* Section 8 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <FAQ /> {/* Section 9 */}
      </Reveal>
      <Reveal {...sectionRevealProps}>
        <FinalCTA /> {/* Section 10 */}
      </Reveal>
    </>
  );
}
