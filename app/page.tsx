import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import ServicesBlock from "@/components/sections/ServicesBlock";
import Testimonials from "@/components/sections/Testimonials";
import Method from "@/components/sections/Method";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBand />
      <ServicesBlock />
      <Testimonials />
      <Method />
      <FinalCTA />
    </main>
  );
}
