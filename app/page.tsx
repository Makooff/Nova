import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import Showreel from "@/components/sections/Showreel";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Partner from "@/components/sections/Partner";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Showreel />
      <Stats />
      <Services />
      <Portfolio />
      <Process />
      <Partner />
      <Testimonials />
      <CTA />
    </main>
  );
}
