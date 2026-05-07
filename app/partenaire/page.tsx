import type { Metadata } from "next";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Partenaire Qwillio — Nova | Agents IA Exclusifs",
  description:
    "Qwillio est le partenaire exclusif de Nova. Réceptionnistes IA, agents de gestion et sites web — accessibles uniquement aux clients Nova.",
};

const features = [
  {
    title: "Réceptionniste IA",
    desc: "Agent vocal et textuel disponible 24h/24 pour accueillir, qualifier et rediriger vos prospects. Zéro appel manqué, zéro opportunité perdue.",
    pills: ["Vocal", "Textuel", "24h/24", "Qualification"],
  },
  {
    title: "Agents IA de gestion",
    desc: "Automatisez votre gestion interne : suivi des dossiers clients, relances automatiques, reporting consolidé et coordination d'équipe sans effort.",
    pills: ["Suivi dossiers", "Relances auto", "Reporting", "Coordination"],
  },
  {
    title: "Sites web (exclusif Nova)",
    desc: "Qwillio conçoit des sites web performants — mais uniquement pour les clients Nova. Cette prestation n'est pas proposée sur le site public de Qwillio.",
    pills: ["Design", "Performance", "SEO", "Exclusif Nova"],
  },
];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mid">
      {label}
    </span>
  );
}

export default function PartenairePage() {
  return (
    <main className="pt-[52px]">
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-6">
              Partenaire exclusif
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <QwillioLogo size={56} />
              <QwillioName size="56px" />
            </div>
            <p className="font-sora font-light text-sm text-mid max-w-xl mx-auto leading-relaxed mb-6">
              Qwillio vend au grand public des réceptionnistes IA, des agents IA et des
              solutions de gestion d&apos;entreprise par IA. En dehors de ça, Qwillio
              crée également des sites web — mais uniquement pour les clients Nova, sans
              les proposer sur leur site public. Un avantage exclusif inclus dans le
              partenariat Nova.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-ghost px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full" style={{ background: "#5B6BF5" }} />
              <span className="font-sora font-light text-xs text-mid">
                Accessible uniquement aux clients Nova
              </span>
            </div>
            <div className="flex justify-center">
              <Link
                href="https://qwillio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sora font-light text-sm text-black underline underline-offset-4 hover:text-mid transition-colors"
              >
                Visiter Qwillio.com &#8599;
              </Link>
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealWrapper key={i} delay={i * 100}>
                <div className="p-7 rounded-2xl border border-border h-full flex flex-col">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                    style={{ background: "linear-gradient(135deg, #5B6BF5, #9B5CF6)" }}
                  >
                    <QwillioLogo size={18} />
                  </div>
                  <h3 className="font-sora font-light text-[20px] text-black mb-3 leading-snug">
                    {f.title}
                  </h3>
                  <p className="font-sora font-light text-sm text-mid leading-relaxed mb-5 flex-1">
                    {f.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {f.pills.map((p) => (
                      <Pill key={p} label={p} />
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 bg-ghost">
        <div className="max-w-3xl mx-auto text-center">
          <RevealWrapper>
            <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
              Comment y accéder
            </p>
            <h2
              className="font-sora font-thin tracking-tighter mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em" }}
            >
              Un avantage inclus dans votre partenariat Nova
            </h2>
            <p className="font-sora font-light text-sm text-mid leading-relaxed mb-8 max-w-md mx-auto">
              Ces outils Qwillio ne sont pas disponibles séparément. Ils font partie
              intégrante de la collaboration Nova — un avantage que vous activez dès
              le début de votre projet.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-black text-white font-sora font-medium text-sm px-6 py-3 hover:bg-dark transition-colors"
            >
              Démarrer avec Nova
            </Link>
          </RevealWrapper>
        </div>
      </section>

      <CTA />
    </main>
  );
}
