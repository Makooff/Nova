import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function CTA() {
  return (
    <section className="py-24 px-5 bg-[#1d1d1f] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,107,245,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-4xl mx-auto text-center relative">
        <RevealWrapper>
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/35 mb-6">
            Prêt à passer à l&apos;action
          </p>
          <h2
            className="font-sora font-thin text-white tracking-tighter mb-10"
            style={{ fontSize: "clamp(42px, 8vw, 96px)", letterSpacing: "-0.04em", lineHeight: 1.08 }}
          >
            Votre prochaine
            <br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>
              vidéo commence ici.
            </span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-black font-sora font-medium text-sm px-6 py-3 hover:bg-offwhite transition-colors"
            >
              Demander un devis
            </Link>
            <Link
              href="/realisations"
              className="inline-flex items-center justify-center rounded-full border text-white font-sora font-medium text-sm px-6 py-3 hover:bg-white/5 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              Voir le showreel
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
