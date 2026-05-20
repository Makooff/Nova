import type { Metadata } from "next";
import { CSSProperties } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Réalisations — Nova | Portfolio Vidéo Publicitaire",
  description:
    "Découvrez nos réalisations vidéo pour des clients en Belgique et en France : spots publicitaires, films corporate, créatifs Ads.",
};

const projects = [
  {
    title: "Campagne Printemps",
    client: "Groupe Belux",
    category: "Production Vidéo",
    year: "2024",
    bg: "oklch(0.15 0.010 55)",
    span: "md:col-span-7",
  },
  {
    title: "Retail Brand Film",
    client: "Atelier Nord",
    category: "Motion Design",
    year: "2024",
    bg: "oklch(0.20 0.009 55)",
    span: "md:col-span-5",
  },
  {
    title: "Google Ads Series",
    client: "TechStart Brussels",
    category: "Campagnes Ads",
    year: "2025",
    bg: "oklch(0.17 0.011 55)",
    span: "md:col-span-4",
  },
  {
    title: "Corporate Story",
    client: "InnovateBE",
    category: "Production Vidéo",
    year: "2025",
    bg: "oklch(0.13 0.009 55)",
    span: "md:col-span-5",
  },
  {
    title: "Social Creatives",
    client: "ModeMarket",
    category: "Meta Ads",
    year: "2025",
    bg: "oklch(0.19 0.008 55)",
    span: "md:col-span-3",
  },
  {
    title: "Launch Campaign",
    client: "NordicFR",
    category: "TikTok Ads",
    year: "2025",
    bg: "oklch(0.14 0.010 55)",
    span: "md:col-span-5",
  },
  {
    title: "Brand Identity Film",
    client: "Volta Concept",
    category: "Production Vidéo",
    year: "2024",
    bg: "oklch(0.16 0.009 55)",
    span: "md:col-span-7",
  },
];

const categories = ["Tous", "Production Vidéo", "Motion Design", "Campagnes Ads", "Meta Ads", "TikTok Ads"];

export default function RealisationsPage() {
  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.13 0.008 55)" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-12">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.42 0.007 62)" }}
            >
              Notre travail
            </p>
            <h1
              className="font-sora font-thin tracking-tighter mb-8"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.93 0.012 70)",
              }}
            >
              Réalisations
            </h1>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-colors"
                  style={
                    cat === "Tous"
                      ? { background: "oklch(0.72 0.11 55)", color: "oklch(0.13 0.008 55)" }
                      : { border: "1px solid oklch(0.26 0.008 55)", color: "oklch(0.42 0.007 62)" }
                  }
                >
                  {cat}
                </span>
              ))}
            </div>
          </RevealWrapper>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
            {projects.map((p, i) => (
              <RevealWrapper
                key={i}
                className={`${p.span} rounded-[14px] overflow-hidden relative cursor-pointer group`}
                style={{ aspectRatio: "16/10", background: p.bg, border: "1px solid oklch(0.26 0.008 55)" } as CSSProperties}
                delay={i * 50}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-mono text-[9px] uppercase tracking-wider"
                    style={{ color: "oklch(0.30 0.007 60)" }}
                  >
                    {p.category}
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to top, oklch(0.10 0.007 55 / 0.85) 0%, transparent 100%)",
                  }}
                >
                  <p
                    className="font-mono text-[9px] uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.52 0.008 65)" }}
                  >
                    {p.category} · {p.year}
                  </p>
                  <p
                    className="font-sora font-light text-sm"
                    style={{ color: "oklch(0.93 0.012 70)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="font-sora font-light text-xs mt-0.5"
                    style={{ color: "oklch(0.42 0.007 62)" }}
                  >
                    {p.client}
                  </p>
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
