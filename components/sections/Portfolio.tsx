"use client";

import { useRef, CSSProperties } from "react";
import { motion, useInView, cubicBezier, type Variants } from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

const items = [
  {
    title: "Campagne Printemps",
    category: "Production Vidéo",
    bg: "oklch(0.15 0.010 55)",
    cols: "md:col-span-7",
  },
  {
    title: "Retail Brand Film",
    category: "Motion Design",
    bg: "oklch(0.20 0.009 55)",
    cols: "md:col-span-5",
  },
  {
    title: "Google Ads Series",
    category: "Campagnes Ads",
    bg: "oklch(0.17 0.011 55)",
    cols: "md:col-span-4",
  },
  {
    title: "Corporate Story",
    category: "Production Vidéo",
    bg: "oklch(0.13 0.009 55)",
    cols: "md:col-span-5",
  },
  {
    title: "Social Creatives",
    category: "Meta Ads",
    bg: "oklch(0.19 0.008 55)",
    cols: "md:col-span-3",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.75, ease: easeExpo },
  }),
};

interface PortfolioItemProps {
  title: string;
  category: string;
  bg: string;
  cols: string;
  index: number;
  inView: boolean;
}

function PortfolioItem({ title, category, bg, cols, index, inView }: PortfolioItemProps) {
  return (
    <motion.div
      className={`${cols} rounded-[14px] overflow-hidden relative cursor-pointer`}
      style={{ aspectRatio: "16/10", background: bg, border: "1px solid oklch(0.26 0.008 55)" } as CSSProperties}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-mono text-[9px] uppercase tracking-wider"
          style={{ color: "oklch(0.30 0.007 60)" }}
        >
          {category}
        </span>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          background: "linear-gradient(to top, oklch(0.10 0.007 55 / 0.85) 0%, transparent 100%)",
        }}
      >
        <p
          className="font-mono text-[9px] uppercase tracking-wider mb-1"
          style={{ color: "oklch(0.52 0.008 65)" }}
        >
          {category}
        </p>
        <p
          className="font-sora font-light text-sm"
          style={{ color: "oklch(0.93 0.012 70)" }}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="realisations"
      className="py-20 px-5"
      style={{ background: "oklch(0.13 0.008 55)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: "oklch(0.42 0.007 62)" }}
          >
            Notre travail
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: "-0.04em",
              color: "oklch(0.93 0.012 70)",
            }}
          >
            Réalisations
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
          {items.map((item, i) => (
            <PortfolioItem key={i} {...item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
