import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import CTA from "@/components/sections/CTA";
import PresentationPreview from "@/components/ui/PresentationPreview";

export const metadata: Metadata = {
  title: "À propos — Fovea | Agence Vidéo & Ads Belgique & France",
  description:
    "Fovea est une agence de production vidéo publicitaire fondée en Belgique. Découvrez notre histoire, notre équipe et les valeurs qui guident chaque projet.",
};

const team = [
  {
    name: "Maxime Durand",
    role: "Directeur & Fondateur",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Léa Fontaine",
    role: "Directrice Artistique",
    photo: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "Thomas Berger",
    role: "Chef Opérateur",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sara Kowalski",
    role: "Stratège Ads",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const values = [
  {
    num: "01",
    title: "Résultats d'abord",
    desc: "Chaque décision créative est guidée par un objectif mesurable. Nous ne produisons pas pour impressionner — nous produisons pour convertir.",
  },
  {
    num: "02",
    title: "Exécution sans compromis",
    desc: "Direction artistique, cadrage, montage : chaque détail compte. La qualité n'est pas négociable, quel que soit le budget.",
  },
  {
    num: "03",
    title: "Partenariat réel",
    desc: "Nous nous impliquons dans votre croissance comme si c'était la nôtre. Votre ROAS est notre indicateur de succès.",
  },
];

export default function AProposPage() {
  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.06 0 0)" }}>

      {/* Hero */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-16">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              Notre histoire
            </p>
            <h1
              className="font-sora font-thin tracking-tighter mb-8 max-w-3xl"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Une agence construite pour les annonceurs ambitieux
            </h1>
            <p
              className="font-sora font-light text-base leading-relaxed max-w-2xl"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              Fovea est née d&apos;un constat simple : la plupart des agences produisent de belles vidéos,
              mais peu s&apos;assurent qu&apos;elles performent. Depuis notre fondation en Belgique, nous avons
              choisi de tout aligner sur un seul objectif — la croissance de nos clients.
            </p>
          </RevealWrapper>

          {/* Presentation video — opens fullscreen with voiceover */}
          <RevealWrapper>
            <PresentationPreview />
          </RevealWrapper>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-5" style={{ background: "oklch(0.04 0 0)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <RevealWrapper>
              <p
                className="font-mono text-[10px] uppercase tracking-wider mb-4"
                style={{ color: "oklch(0.38 0 0)" }}
              >
                Depuis 2019
              </p>
              <h2
                className="font-sora font-thin tracking-tighter mb-6"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  letterSpacing: "-0.04em",
                  color: "oklch(0.96 0 0)",
                }}
              >
                Belgique & France, <br />un seul standard
              </h2>
              <p
                className="font-sora font-light text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                Nous opérons depuis Bruxelles avec une capacité de production en France.
                Notre studio de référence nous permet de livrer un rendu cinématographique,
                même sur des projets à contraintes budgétaires serrées.
              </p>
              <p
                className="font-sora font-light text-sm leading-relaxed mb-8"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                En cinq ans, nous avons accompagné plus de 80 marques — du lancement de produit
                au scale publicitaire sur Meta, Google et TikTok. Chaque projet enrichit notre
                compréhension de ce qui convertit vraiment.
              </p>
              <div className="flex gap-8">
                {[
                  { value: "80+", label: "Clients accompagnés" },
                  { value: "5 ans", label: "D'expertise" },
                  { value: "BE & FR", label: "Présence" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-sora font-light text-2xl mb-1"
                      style={{ color: "oklch(0.96 0 0)" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{ color: "oklch(0.38 0 0)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealWrapper>

            <RevealWrapper delay={150}>
              <div
                className="w-full rounded-2xl overflow-hidden relative"
                style={{ aspectRatio: "4/3", border: "1px solid oklch(0.16 0 0)" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop"
                  alt="Behind the scenes Fovea"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-14">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              Ce qui nous guide
            </p>
            <h2
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Nos valeurs
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <RevealWrapper key={i} delay={i * 100}>
                <div
                  className="p-7 rounded-2xl h-full"
                  style={{ background: "oklch(0.10 0 0)", border: "1px solid oklch(0.22 0 0)" }}
                >
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider mb-5"
                    style={{ color: "oklch(0.38 0 0)" }}
                  >
                    {v.num}
                  </p>
                  <h3
                    className="font-sora font-light text-xl mb-3 leading-snug"
                    style={{ color: "oklch(0.96 0 0)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-sora font-light text-sm leading-relaxed"
                    style={{ color: "oklch(0.45 0 0)" }}
                  >
                    {v.desc}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-5" style={{ background: "oklch(0.04 0 0)" }}>
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-14">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              L&apos;équipe
            </p>
            <h2
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Les personnes derrière Fovea
            </h2>
          </RevealWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <RevealWrapper key={i} delay={i * 80}>
                <div className="group">
                  <div
                    className="w-full rounded-xl overflow-hidden relative mb-4"
                    style={{ aspectRatio: "3/4", border: "1px solid oklch(0.16 0 0)" }}
                  >
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, oklch(0.04 0 0 / 0.6) 0%, transparent 50%)" }}
                    />
                  </div>
                  <p
                    className="font-sora font-light text-sm mb-0.5"
                    style={{ color: "oklch(0.96 0 0)" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: "oklch(0.38 0 0)" }}
                  >
                    {member.role}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center font-sora font-light text-sm transition-colors hover:text-white"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              Rejoindre l&apos;équipe
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block ml-1.5 shrink-0">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </RevealWrapper>
        </div>
      </section>

      <CTA />
    </main>
  );
}
