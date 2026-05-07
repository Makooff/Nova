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
    gradient: "from-[#1a1a2e] to-[#16213e]",
    span: "md:col-span-7",
  },
  {
    title: "Retail Brand Film",
    client: "Atelier Nord",
    category: "Motion Design",
    year: "2024",
    gradient: "from-[#e8e8e8] to-[#d0d0d0]",
    span: "md:col-span-5",
    light: true,
  },
  {
    title: "Google Ads Series",
    client: "TechStart Brussels",
    category: "Campagnes Ads",
    year: "2025",
    gradient: "from-[#1e3a5f] to-[#0d2137]",
    span: "md:col-span-4",
  },
  {
    title: "Corporate Story",
    client: "InnovateBE",
    category: "Production Vidéo",
    year: "2025",
    gradient: "from-[#2a1a1a] to-[#1a0f0f]",
    span: "md:col-span-5",
  },
  {
    title: "Social Creatives",
    client: "ModeMarket",
    category: "Meta Ads",
    year: "2025",
    gradient: "from-[#f0ebe3] to-[#e0d8cc]",
    span: "md:col-span-3",
    light: true,
  },
  {
    title: "Launch Campaign",
    client: "NordicFR",
    category: "TikTok Ads",
    year: "2025",
    gradient: "from-[#0f2027] to-[#203a43]",
    span: "md:col-span-5",
  },
  {
    title: "Brand Identity Film",
    client: "Volta Concept",
    category: "Production Vidéo",
    year: "2024",
    gradient: "from-[#3d0e61] to-[#1a0530]",
    span: "md:col-span-7",
  },
];

const categories = ["Tous", "Production Vidéo", "Motion Design", "Campagnes Ads", "Meta Ads", "TikTok Ads"];

export default function RealisationsPage() {
  return (
    <main className="pt-[52px]">
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
              Notre travail
            </p>
            <h1
              className="font-sora font-thin tracking-tighter mb-8"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em" }}
            >
              Réalisations
            </h1>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${
                    cat === "Tous"
                      ? "bg-black text-white"
                      : "border border-border text-mid hover:border-black hover:text-black"
                  }`}
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
                className={`portfolio-item ${p.span} rounded-[14px] overflow-hidden relative cursor-pointer`}
                style={{ aspectRatio: "16/10" } as CSSProperties}
                delay={i * 50}
              >
                <div
                  className={`bg-img absolute inset-0 bg-gradient-to-br ${p.gradient}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-mono text-[9px] uppercase tracking-wider ${p.light ? "text-black/15" : "text-white/15"}`}>
                    {p.category}
                  </span>
                </div>
                <div className="overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/60 mb-1">
                    {p.category} · {p.year}
                  </p>
                  <p className="font-sora font-light text-white text-sm">{p.title}</p>
                  <p className="font-sora font-light text-white/50 text-xs mt-0.5">{p.client}</p>
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
