import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import ServicesSimple from "@/components/sections/ServicesSimple";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <ServicesSimple />
      <CTA />
    </main>
  );
}
