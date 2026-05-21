"use client";

import { useRef, CSSProperties } from "react";
import Image from "next/image";
import { motion, useInView, cubicBezier, type Variants } from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

const items = [
  { title: "Campagne Printemps", category: "Production Vidéo", photo: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=900&auto=format&fit=crop", cols: "md:col-span-7" },
  { title: "Retail Brand Film",  category: "Motion Design",    photo: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&auto=format&fit=crop", cols: "md:col-span-5" },
  { title: "Google Ads Series",  category: "Campagnes Ads",    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop", cols: "md:col-span-4" },
  { title: "Corporate Story",    category: "Production Vidéo", photo: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=700&auto=format&fit=crop", cols: "md:col-span-5" },
  { title: "Social Creatives",   category: "Meta Ads",         photo: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop", cols: "md:col-span-3" },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.75, ease: easeExpo },
  }),
};

function PortfolioItem({ title, category, photo, cols, index, inView }: {
  title: string; category: string; photo: string; cols: string; index: number; inView: boolean;
}) {
  return (
    <motion.div
      className={`${cols} rounded-[14px] overflow-hidden relative cursor-pointer group`}
      style={{ aspectRatio: "16/10", background: "oklch(0.10 0 0)", border: "1px solid oklch(0.22 0 0)" } as CSSProperties}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={photo}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, oklch(0.04 0 0 / 0.8) 0%, transparent 60%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: "oklch(0.55 0 0)" }}>
          {category}
        </p>
        <p className="font-sora font-light text-sm" style={{ color: "oklch(0.96 0 0)" }}>
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
    <section ref={ref} id="realisations" className="py-20 px-5" style={{ background: "oklch(0.06 0 0)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color: "oklch(0.38 0 0)" }}>
            Notre travail
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em", color: "oklch(0.96 0 0)" }}
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
