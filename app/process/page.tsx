import type { Metadata } from "next";
import { CSSProperties } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Process — Fovea | Comment on travaille",
  description:
    "Notre process en 4 étapes : brief stratégique, tournage, post-production et lancement de campagne avec suivi des performances.",
};

const steps = [
  {
    num: "01",
    label: "Brief",
    title: "Stratégie & Brief",
    desc: "Appel découverte pour cerner vos objectifs, votre cible et votre angle créatif. On définit ensemble la plateforme prioritaire, le budget et les KPIs à atteindre.",
    details: [
      "Appel découverte 45 min",
      "Analyse de votre audience cible",
      "Définition de l'angle créatif",
      "Sélection des plateformes",
      "Cadrage budgétaire",
    ],
  },
  {
    num: "02",
    label: "Production",
    title: "Tournage",
    desc: "Notre équipe technique se déplace ou accueille votre projet en studio. Direction artistique soignée, tournage efficace, matière de qualité — en Belgique comme en France.",
    details: [
      "Équipe technique complète",
      "Direction artistique",
      "Tournage studio ou terrain",
      "BE & FR",
      "Casting si nécessaire",
    ],
  },
  {
    num: "03",
    label: "Post-production",
    title: "Montage & Formats",
    desc: "Post-production complète : montage, étalonnage, sound design, motion graphics. Deux rounds de retours clients inclus. Déclinaisons tous formats livrées à la fin.",
    details: [
      "Montage narratif",
      "Étalonnage colorimétrique",
      "Sound design & musique",
      "Motion graphics",
      "Déclinaisons Reels / Stories / YouTube / Display",
    ],
  },
  {
    num: "04",
    label: "Lancement",
    title: "Diffusion & Suivi",
    desc: "Mise en ligne des campagnes, paramétrage des audiences, A/B testing des créatifs. Reporting mensuel et optimisation continue pour maximiser votre ROAS.",
    details: [
      "Mise en ligne campagnes",
      "Paramétrage audiences",
      "A/B testing créatifs",
      "Reporting mensuel",
      "Optimisation continue",
    ],
  },
];

export default function ProcessPage() {
  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.04 0 0)" }}>
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <RevealWrapper className="mb-16">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              Comment on travaille
            </p>
            <h1
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Notre process
            </h1>
          </RevealWrapper>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <RevealWrapper
                key={i}
                className="grid gap-6 pb-12"
                style={{ gridTemplateColumns: "80px 1fr" } as CSSProperties}
                delay={i * 120}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ border: "1px solid oklch(0.22 0 0)" }}
                  >
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: "oklch(0.96 0 0)" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 w-px mt-3"
                      style={{ background: "oklch(0.16 0 0)", minHeight: "40px" }}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <p
                    className="font-mono text-[9px] uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.38 0 0)" }}
                  >
                    {step.label}
                  </p>
                  <h2
                    className="font-sora font-light text-[28px] mb-3 leading-snug"
                    style={{ color: "oklch(0.96 0 0)" }}
                  >
                    {step.title}
                  </h2>
                  <p
                    className="font-sora font-light text-sm leading-relaxed mb-5"
                    style={{ color: "oklch(0.45 0 0)" }}
                  >
                    {step.desc}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {step.details.map((d, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: "oklch(0.38 0 0)" }}
                        />
                        <span
                          className="font-sora font-light text-sm"
                          style={{ color: "oklch(0.45 0 0)" }}
                        >
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
