import type { Metadata } from "next";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services — Nova | Production Vidéo & Campagnes Ads",
  description:
    "Découvrez nos 3 services : production vidéo publicitaire, gestion de campagnes Ads et agents IA Qwillio en exclusivité pour les clients Nova.",
};

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-mid">
      {label}
    </span>
  );
}

export default function ServicesPage() {
  return (
    <main className="pt-[52px]">
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-16">
            <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
              Ce que nous faisons
            </p>
            <h1
              className="font-sora font-thin tracking-tighter"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em" }}
            >
              Nos services
            </h1>
          </RevealWrapper>

          {/* Service 01 */}
          <RevealWrapper id="video" className="mb-16 pb-16 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
                  Service 01
                </p>
                <h2
                  className="font-sora font-thin tracking-tighter mb-5"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em" }}
                >
                  Production Vidéo Publicitaire
                </h2>
                <p className="font-sora font-light text-sm text-mid leading-relaxed mb-6">
                  Chaque vidéo est conçue avec un objectif publicitaire précis. De la
                  stratégie créative au montage final, nous produisons des contenus vidéo
                  qui convertissent — pas seulement qui impressionnent.
                </p>
                <p className="font-sora font-light text-sm text-mid leading-relaxed mb-8">
                  Nos équipes opèrent en Belgique et en France, avec un studio de
                  référence et la capacité de tourner sur le terrain de vos clients.
                  Chaque livrable est décliné aux formats requis : Reels, Stories,
                  YouTube, Display.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Tournage", "Montage", "Motion design", "Multi-formats", "Direction artistique", "Script"].map((p) => (
                    <Pill key={p} label={p} />
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white font-sora font-medium text-sm px-6 py-3 hover:bg-dark transition-colors"
                >
                  Demander un devis vidéo
                </Link>
              </div>
              <div
                className="w-full rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </RevealWrapper>

          {/* Service 02 */}
          <RevealWrapper id="ads" className="mb-16 pb-16 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div
                className="w-full rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] order-2 md:order-1"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="order-1 md:order-2">
                <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
                  Service 02
                </p>
                <h2
                  className="font-sora font-thin tracking-tighter mb-5"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em" }}
                >
                  Campagnes Publicitaires Ads
                </h2>
                <p className="font-sora font-light text-sm text-mid leading-relaxed mb-6">
                  Nous lançons et gérons vos campagnes publicitaires sur toutes les
                  plateformes majeures. Les créatifs vidéo sont inclus dans notre offre,
                  ce qui vous garantit une cohérence totale entre le message et
                  l&apos;exécution.
                </p>
                <p className="font-sora font-light text-sm text-mid leading-relaxed mb-8">
                  Notre objectif est simple : maximiser votre ROAS. Nous analysons, testons
                  et optimisons en continu pour que chaque euro investi travaille davantage.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Google Ads", "Meta Ads", "LinkedIn", "TikTok", "YouTube Ads", "Display"].map((p) => (
                    <Pill key={p} label={p} />
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white font-sora font-medium text-sm px-6 py-3 hover:bg-dark transition-colors"
                >
                  Lancer une campagne
                </Link>
              </div>
            </div>
          </RevealWrapper>

          {/* Service 03 */}
          <RevealWrapper id="ia">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <QwillioLogo size={18} />
                  <QwillioName size="13px" />
                  <span className="font-sora font-light text-xs text-mid">
                    — Exclusif clients Nova
                  </span>
                </div>
                <h2
                  className="font-sora font-thin tracking-tighter mb-5"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.04em" }}
                >
                  Agents IA de Gestion
                </h2>
                <p className="font-sora font-light text-sm text-mid leading-relaxed mb-6">
                  En partenariat exclusif avec Qwillio, les clients Nova ont accès à des
                  agents IA qui automatisent la gestion interne : suivi de dossiers,
                  relances automatiques, reporting en temps réel et coordination d&apos;équipe.
                </p>
                <p className="font-sora font-light text-sm text-mid leading-relaxed mb-8">
                  Ces outils ne sont pas vendus au grand public. Ils sont inclus dans le
                  partenariat Nova, ce qui vous donne un avantage opérationnel concret
                  dès le début de notre collaboration.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Gestion IA", "Reporting", "Automatisation", "Coordination", "Exclusif Nova"].map((p) => (
                    <Pill key={p} label={p} />
                  ))}
                </div>
                <Link
                  href="/partenaire"
                  className="inline-flex items-center justify-center rounded-full border border-black text-black font-sora font-medium text-sm px-6 py-3 hover:bg-ghost transition-colors"
                >
                  En savoir plus sur Qwillio
                </Link>
              </div>
              <div
                className="w-full rounded-2xl"
                style={{
                  aspectRatio: "4/3",
                  background: "linear-gradient(135deg, #5B6BF5 0%, #9B5CF6 100%)",
                  opacity: 0.15,
                }}
              />
            </div>
          </RevealWrapper>
        </div>
      </section>

      <CTA />
    </main>
  );
}
