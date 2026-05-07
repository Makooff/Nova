import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";

export default function Hero() {
  return (
    <section className="min-h-svh flex flex-col pt-[52px]">
      <div className="flex-1 flex flex-col items-center text-center px-5 pt-10 pb-6">
        <h1
          className="font-sora font-thin leading-[1.08] mb-6"
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

        <p className="font-sora font-light text-[17px] text-mid max-w-[420px] leading-relaxed mb-8">
          Vidéos publicitaires tournées et montées pour convertir, campagnes Ads
          et accès exclusif aux agents IA Qwillio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/realisations" variant="fill" size="lg">
            Voir le showreel
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Nos services
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pb-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-black origin-top scroll-line" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-light">
            Scroll
          </span>
        </div>
        <div className="w-full">
          <Marquee />
        </div>
      </div>
    </section>
  );
}
