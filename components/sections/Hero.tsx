import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";

export default function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col justify-between text-center pt-[90px]">
      <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto px-5">
        <h1
          className="font-sora font-thin leading-[1.08]"
          style={{
            fontSize: "clamp(44px, 9vw, 100px)",
            letterSpacing: "-0.04em",
          }}
        >
          On filme.
          <br />
          On monte.
          <br />
          <span className="text-light">Vos clients regardent.</span>
        </h1>

        <p className="font-sora font-light text-[17px] text-mid max-w-[420px] leading-relaxed">
          Vidéos publicitaires tournées et montées pour convertir, campagnes Ads
          et accès exclusif aux agents IA Qwillio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Button href="/realisations" variant="fill" size="lg">
            Voir le showreel
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Nos services
          </Button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-black origin-top scroll-line" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-light">
              Scroll
            </span>
          </div>
        </div>
        <Marquee />
      </div>
    </section>
  );
}
