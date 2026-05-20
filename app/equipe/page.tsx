import type { Metadata } from "next";
import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Notre Équipe — Nova | L'équipe derrière vos vidéos",
  description:
    "Réalisateurs, directeurs photo, monteurs, stratèges Ads — rencontrez l'équipe Nova qui tourne et optimise vos campagnes en Belgique et en France.",
};

const team = [
  {
    name: "Maxime Durand",
    role: "Directeur Créatif & Fondateur",
    bio: "12 ans de publicité à Paris et Bruxelles. A dirigé des campagnes pour des marques comme L'Oréal, Decathlon et BNP Paribas. Obsédé par le rapport entre créativité et conversion.",
    seed: "nova-max",
    skills: ["Direction artistique", "Stratégie créative", "Copywriting"],
  },
  {
    name: "Léa Fontaine",
    role: "Directrice Photo",
    bio: "Formatée à l'École Louis-Lumière, Léa apporte une maîtrise de la lumière naturelle et artificielle qui définit l'esthétique des vidéos Nova — épurée, contrastée, mémorable.",
    seed: "nova-lea",
    skills: ["Cinématographie", "Éclairage", "Color grading"],
  },
  {
    name: "Thomas Berger",
    role: "Responsable Campagnes Ads",
    bio: "Certifié Google et Meta, Thomas gère des budgets publicitaires de 500 K€/an. Son mantra : chaque centime doit travailler. ROAS moyen des comptes Nova : 4,2×.",
    seed: "nova-thomas",
    skills: ["Google Ads", "Meta Ads", "TikTok", "Analytics"],
  },
  {
    name: "Sara Kowalski",
    role: "Chef de Projet & Montage",
    bio: "Sara coordonne chaque production de A à Z et assure le montage final. Rapide, rigoureuse, elle garantit les délais et la cohérence narrative de chaque format livré.",
    seed: "nova-sara",
    skills: ["Montage Premiere", "Motion graphics", "Gestion de projet"],
  },
  {
    name: "Jules Martin",
    role: "Motion Designer",
    bio: "After Effects, Cinema 4D, Lottie — Jules maîtrise toute la chaîne du motion design. Il transforme les concepts en animations qui retiennent l'attention dans les 3 premières secondes.",
    seed: "nova-jules",
    skills: ["After Effects", "Cinema 4D", "Animation 2D/3D"],
  },
  {
    name: "Amina Benali",
    role: "Stratège Contenu & SEO",
    bio: "Ancienne journaliste reconvertie au contenu de marque, Amina structure les scripts et les stratégies éditoriales pour que chaque vidéo serve aussi le référencement et le funnel.",
    seed: "nova-amina",
    skills: ["Scripting", "SEO vidéo", "Content strategy"],
  },
];

const values = [
  {
    title: "Conversion avant tout",
    desc: "Chaque décision créative est validée par une question : est-ce que ça fait agir le spectateur ? L'esthétique est au service de la performance.",
  },
  {
    title: "Transparence totale",
    desc: "Reporting hebdomadaire, accès direct aux dashboards, coûts détaillés. Aucune boîte noire entre votre budget et vos résultats.",
  },
  {
    title: "Équipe dédiée",
    desc: "Vous travaillez avec les mêmes personnes du brief au bilan. Pas de rotation, pas d'outsourcing invisible. Votre projet, notre équipe.",
  },
];

export default function EquipePage() {
  return (
    <main className="pt-[56px]" style={{ background: "oklch(0.06 0 0)" }}>

      {/* Hero */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: "oklch(0.38 0 0)" }}>
              L&apos;équipe
            </p>
            <h1
              className="font-sora font-thin tracking-tighter mb-6"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em", color: "oklch(0.96 0 0)" }}
            >
              Les visages derrière<br />vos campagnes
            </h1>
            <p className="font-sora font-light text-base leading-relaxed max-w-xl" style={{ color: "oklch(0.45 0 0)" }}>
              6 experts, une seule obsession : produire des vidéos qui convertissent.
              Réalisateurs, directeurs photo, stratèges Ads et motion designers — tous bilingues FR/BE.
            </p>
          </RevealWrapper>

          {/* Team grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <RevealWrapper key={i} delay={i * 80}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid oklch(0.16 0 0)" }}
                >
                  {/* Photo */}
                  <div className="relative w-full" style={{ aspectRatio: "4/3", background: "oklch(0.10 0 0)" }}>
                    <Image
                      src={`https://picsum.photos/seed/${member.seed}/600/450`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, oklch(0.06 0 0) 0%, transparent 50%)" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6" style={{ background: "oklch(0.08 0 0)" }}>
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: "oklch(0.38 0 0)" }}>
                      {member.role}
                    </p>
                    <h2
                      className="font-sora font-light text-xl mb-3 leading-snug"
                      style={{ color: "oklch(0.96 0 0)", letterSpacing: "-0.02em" }}
                    >
                      {member.name}
                    </h2>
                    <p className="font-sora font-light text-sm leading-relaxed mb-4" style={{ color: "oklch(0.45 0 0)" }}>
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ border: "1px solid oklch(0.18 0 0)", color: "oklch(0.38 0 0)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-5" style={{ background: "oklch(0.04 0 0)" }}>
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-14">
            <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color: "oklch(0.38 0 0)" }}>
              Nos engagements
            </p>
            <h2
              className="font-sora font-thin tracking-tighter"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em", color: "oklch(0.96 0 0)" }}
            >
              Ce qui nous différencie
            </h2>
          </RevealWrapper>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: "1px solid oklch(0.14 0 0)", borderRadius: "18px", overflow: "hidden" }}
          >
            {values.map((v, i) => (
              <RevealWrapper
                key={i}
                className="p-8"
                style={{
                  background: "oklch(0.06 0 0)",
                  borderRight: i < values.length - 1 ? "1px solid oklch(0.14 0 0)" : undefined,
                }}
                delay={i * 100}
              >
                <h3
                  className="font-sora font-light text-lg mb-3 leading-snug"
                  style={{ color: "oklch(0.96 0 0)", letterSpacing: "-0.02em" }}
                >
                  {v.title}
                </h3>
                <p className="font-sora font-light text-sm leading-relaxed" style={{ color: "oklch(0.42 0 0)" }}>
                  {v.desc}
                </p>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Big team photo */}
      <section className="px-5 pb-0" style={{ background: "oklch(0.04 0 0)" }}>
        <div className="max-w-6xl mx-auto">
          <RevealWrapper>
            <div
              className="relative w-full rounded-t-[20px] overflow-hidden"
              style={{ aspectRatio: "21/9", background: "oklch(0.10 0 0)" }}
            >
              <Image
                src="https://picsum.photos/seed/nova-team-full/1400/600"
                alt="Équipe Nova au complet"
                fill
                className="object-cover grayscale"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, oklch(0.04 0 0 / 0.6) 0%, transparent 50%)" }}
              />
              <div className="absolute bottom-6 left-8">
                <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "oklch(0.38 0 0)" }}>
                  Nova Production — Bruxelles, 2026
                </p>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      <CTA />
    </main>
  );
}
