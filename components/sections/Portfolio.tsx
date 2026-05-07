import { CSSProperties } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";

const items = [
  {
    title: "Campagne Printemps",
    category: "Production Vidéo",
    gradient: "from-[#1a1a2e] to-[#16213e]",
    cols: "md:col-span-7",
  },
  {
    title: "Retail Brand Film",
    category: "Motion Design",
    gradient: "from-[#e8e8e8] to-[#d0d0d0]",
    cols: "md:col-span-5",
    dark: false,
  },
  {
    title: "Google Ads Series",
    category: "Campagnes Ads",
    gradient: "from-[#1e3a5f] to-[#0d2137]",
    cols: "md:col-span-4",
  },
  {
    title: "Corporate Story",
    category: "Production Vidéo",
    gradient: "from-[#2a1a1a] to-[#1a0f0f]",
    cols: "md:col-span-5",
  },
  {
    title: "Social Creatives",
    category: "Meta Ads",
    gradient: "from-[#f0ebe3] to-[#e0d8cc]",
    cols: "md:col-span-3",
    dark: false,
  },
];

interface PortfolioItemProps {
  title: string;
  category: string;
  gradient: string;
  cols: string;
  dark?: boolean;
  delay?: number;
}

function PortfolioItem({ title, category, gradient, cols, dark = true, delay = 0 }: PortfolioItemProps) {
  return (
    <RevealWrapper
      className={`portfolio-item ${cols} rounded-[14px] overflow-hidden relative cursor-pointer`}
      style={{ aspectRatio: "16/10" } as CSSProperties}
      delay={delay}
    >
      <div
        className={`bg-img absolute inset-0 bg-gradient-to-br ${gradient}`}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-mono text-[9px] uppercase tracking-wider ${dark ? "text-white/15" : "text-black/15"}`}>
          {category}
        </span>
      </div>
      <div className="overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
        <p className="font-mono text-[9px] uppercase tracking-wider text-white/60 mb-1">
          {category}
        </p>
        <p className="font-sora font-light text-white text-sm">{title}</p>
      </div>
    </RevealWrapper>
  );
}

export default function Portfolio() {
  return (
    <section id="realisations" className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-3">
            Notre travail
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em" }}
          >
            Réalisations
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
          {items.map((item, i) => (
            <PortfolioItem key={i} {...item} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
