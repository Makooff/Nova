import type { Metadata } from "next";
import Image from "next/image";
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
    photo: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=900&auto=format&fit=crop",
    span: "md:col-span-7",
  },
  {
    title: "Retail Brand Film",
    client: "Atelier Nord",
    category: "Motion Design",
    year: "2024",
    photo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&auto=format&fit=crop",
    span: "md:col-span-5",
  },
  {
    title: "Google Ads Series",
    client: "TechStart Brussels",
    category: "Campagnes Ads",
    year: "2025",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
    span: "md:col-span-4",
  },
  {
    title: "Corporate Story",
    client: "InnovateBE",
    category: "Production Vidéo",
    year: "2025",
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&auto=format&fit=crop",
    span: "md:col-span-5",
  },
  {
    title: "Social Creatives",
    client: "ModeMarket",
    category: "Meta Ads",
    year: "2025",
    photo: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop",
    span: "md:col-span-3",
  },
  {
    title: "Launch Campaign",
    client: "NordicFR",
    category: "TikTok Ads",
    year: "2025",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&auto=format&fit=crop",
    span: "md:col-span-5",
  },
  {
    title: "Brand Identity Film",
    client: "Volta Concept",
    category: "Production Vidéo",
    year: "2024",
    photo: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&auto=format&fit=crop",
    span: "md:col-span-7",
  },
];

const categories = ["Tous", "Production Vidéo", "Motion Design", "Campagnes Ads", "Meta Ads", "TikTok Ads"];

export default function RealisationsPage() {
  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.06 0 0)" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-12">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              Notre travail
            </p>
            <h1
              className="font-sora font-thin tracking-tighter mb-8"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
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
                      ? { background: "oklch(0.96 0 0)", color: "oklch(0.06 0 0)" }
                      : { border: "1px solid oklch(0.22 0 0)", color: "oklch(0.38 0 0)" }
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
                style={{ aspectRatio: "16/10", border: "1px solid oklch(0.22 0 0)" } as CSSProperties}
                delay={i * 50}
              >
                <Image
                  src={p.photo}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    background: "linear-gradient(to top, oklch(0.04 0 0 / 0.9) 0%, transparent 100%)",
                  }}
                >
                  <p
                    className="font-mono text-[9px] uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.45 0 0)" }}
                  >
                    {p.category} · {p.year}
                  </p>
                  <p
                    className="font-sora font-light text-sm"
                    style={{ color: "oklch(0.96 0 0)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="font-sora font-light text-xs mt-0.5"
                    style={{ color: "oklch(0.38 0 0)" }}
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
