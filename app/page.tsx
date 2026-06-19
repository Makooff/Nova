import Hero from "@/components/sections/Hero";
import ManifestoStroke from "@/components/sections/ManifestoStroke";
import StatsBand from "@/components/sections/StatsBand";
import ZoomParallaxWork from "@/components/sections/ZoomParallaxWork";
import ServicesCarousel from "@/components/sections/ServicesCarousel";
import Testimonials from "@/components/sections/Testimonials";
import Method from "@/components/sections/Method";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ManifestoStroke />
      <StatsBand />
      <ZoomParallaxWork />
      <ServicesCarousel />
      <Testimonials />
      <Method />
      <FinalCTA />
    </main>
  );
}
