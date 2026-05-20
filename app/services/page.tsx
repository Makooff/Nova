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
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
      style={{ border: "1px solid oklch(0.26 0.008 55)", color: "oklch(0.52 0.008 65)" }}
    >
      {label}
    </span>
  );
}

export default function ServicesPage() {
  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.13 0.008 55)" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-16">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.42 0.007 62)" }}
            >
              Ce que nous faisons
            </p>
            <h1
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.93 0.012 70)",
              }}
            >
              Nos services
            </h1>
          </RevealWrapper>

          {/* Service 01 */}
          <RevealWrapper
            id="video"
            className="mb-16 pb-16"
            style={{ borderBottom: "1px solid oklch(0.26 0.008 55)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-wider mb-4"
                  style={{ color: "oklch(0.42 0.007 62)" }}
                >
                  Service 01
                </p>
                <h2
                  className="font-sora font-thin tracking-tighter mb-5"
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    letterSpacing: "-0.04em",
                    color: "oklch(0.93 0.012 70)",
                  }}
                >
                  Production Vidéo Publicitaire
                </h2>
                <p
                  className="font-sora font-light text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.52 0.008 65)" }}
                >
                  Chaque vidéo est conçue avec un objectif publicitaire précis. De la
                  stratégie créative au montage final, nous produisons des contenus vidéo
                  qui convertissent — pas seulement qui impressionnent.
                </p>
                <p
                  className="font-sora font-light text-sm leading-relaxed mb-8"
                  style={{ color: "oklch(0.52 0.008 65)" }}
                >
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
                  className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-colors"
                  style={{
                    background: "oklch(0.72 0.11 55)",
                    color: "oklch(0.13 0.008 55)",
                  }}
                >
                  Demander un devis vidéo
                </Link>
              </div>
              <div
                className="w-full rounded-2xl"
                style={{
                  aspectRatio: "4/3",
                  background: "oklch(0.17 0.010 55)",
                  border: "1px solid oklch(0.26 0.008 55)",
                }}
              />
            </div>
          </RevealWrapper>

          {/* Service 02 */}
          <RevealWrapper
            id="ads"
            className="mb-16 pb-16"
            style={{ borderBottom: "1px solid oklch(0.26 0.008 55)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div
                className="w-full rounded-2xl order-2 md:order-1"
                style={{
                  aspectRatio: "4/3",
                  background: "oklch(0.17 0.010 55)",
                  border: "1px solid oklch(0.26 0.008 55)",
                }}
              />
              <div className="order-1 md:order-2">
                <p
                  className="font-mono text-[10px] uppercase tracking-wider mb-4"
                  style={{ color: "oklch(0.42 0.007 62)" }}
                >
                  Service 02
                </p>
                <h2
                  className="font-sora font-thin tracking-tighter mb-5"
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    letterSpacing: "-0.04em",
                    color: "oklch(0.93 0.012 70)",
                  }}
                >
                  Campagnes Publicitaires Ads
                </h2>
                <p
                  className="font-sora font-light text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.52 0.008 65)" }}
                >
                  Nous lançons et gérons vos campagnes publicitaires sur toutes les
                  plateformes majeures. Les créatifs vidéo sont inclus dans notre offre,
                  ce qui vous garantit une cohérence totale entre le message et
                  l&apos;exécution.
                </p>
                <p
                  className="font-sora font-light text-sm leading-relaxed mb-8"
                  style={{ color: "oklch(0.52 0.008 65)" }}
                >
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
                  className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-colors"
                  style={{
                    background: "oklch(0.72 0.11 55)",
                    color: "oklch(0.13 0.008 55)",
                  }}
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
                  <span
                    className="font-sora font-light text-xs"
                    style={{ color: "oklch(0.42 0.007 62)" }}
                  >
                    — Exclusif clients Nova
                  </span>
                </div>
                <h2
                  className="font-sora font-thin tracking-tighter mb-5"
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    letterSpacing: "-0.04em",
                    color: "oklch(0.93 0.012 70)",
                  }}
                >
                  Agents IA de Gestion
                </h2>
                <p
                  className="font-sora font-light text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.52 0.008 65)" }}
                >
                  En partenariat exclusif avec Qwillio, les clients Nova bénéficient
                  de la suite complète d&apos;agents IA : réceptionniste vocale et textuelle,
                  Email AI (boîte mail entièrement automatisée) et Payments AI (liens de
                  paiement SMS, Stripe natif, facturation automatique).
                </p>
                <p
                  className="font-sora font-light text-sm leading-relaxed mb-8"
                  style={{ color: "oklch(0.52 0.008 65)" }}
                >
                  En plus de ça, Qwillio crée des sites web sur mesure exclusivement
                  pour les clients Nova — une prestation non disponible sur Qwillio.com.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Réceptionniste IA", "Email AI", "Payments AI", "Sites sur mesure", "Exclusif Nova"].map((p) => (
                    <Pill key={p} label={p} />
                  ))}
                </div>
                <Link
                  href="/partenaire"
                  className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-colors"
                  style={{
                    border: "1px solid oklch(0.26 0.008 55)",
                    color: "oklch(0.78 0.010 68)",
                  }}
                >
                  En savoir plus sur Qwillio
                </Link>
              </div>
              <div
                className="w-full rounded-2xl"
                style={{
                  aspectRatio: "4/3",
                  background: "oklch(0.17 0.010 55)",
                  border: "1px solid oklch(0.26 0.008 55)",
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
