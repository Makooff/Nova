import RevealWrapper from "@/components/ui/RevealWrapper";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="arrow-icon"
    >
      <path
        d="M2 12L12 2M12 2H5M12 2V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mid">
      {label}
    </span>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-ghost py-20 px-5">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-3">
            Ce que nous faisons
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em" }}
          >
            Nos services
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-[18px] overflow-hidden bg-white">
          <RevealWrapper
            className="service-card relative p-8 border-b border-b-border md:border-b-0 md:border-r md:border-r-border"
            delay={0}
          >
            <Link href="/services#video" className="absolute inset-0" aria-label="Production Vidéo Publicitaire" />
            <div className="flex items-start justify-between mb-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-light">
                Service 01
              </p>
              <ArrowIcon />
            </div>
            <h3 className="font-sora font-light text-[22px] text-black mb-3 leading-snug">
              Production Vidéo Publicitaire
            </h3>
            <p className="font-sora font-light text-sm text-mid leading-relaxed mb-6">
              Tournage et montage de vidéos pensées pour convertir. Chaque plan a
              un objectif publicitaire précis.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Tournage", "Montage", "Motion design", "Multi-formats"].map((p) => (
                <Pill key={p} label={p} />
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper className="service-card relative p-8" delay={80}>
            <Link href="/services#ads" className="absolute inset-0" aria-label="Campagnes Publicitaires Ads" />
            <div className="flex items-start justify-between mb-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-light">
                Service 02
              </p>
              <ArrowIcon />
            </div>
            <h3 className="font-sora font-light text-[22px] text-black mb-3 leading-snug">
              Campagnes Publicitaires Ads
            </h3>
            <p className="font-sora font-light text-sm text-mid leading-relaxed mb-6">
              Lancement et gestion de vos campagnes sur toutes les plateformes.
              Les créatifs vidéo sont inclus.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Google Ads", "Meta Ads", "LinkedIn", "TikTok"].map((p) => (
                <Pill key={p} label={p} />
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
