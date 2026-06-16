"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import DashboardMockup from "@/components/ui/DashboardMockup";

const ease = [0.16, 1, 0.3, 1] as const;

type Variant = "strategy" | "production" | "data";

const cards: {
  num: string;
  label: string;
  title: string;
  desc: string;
  variant: Variant;
}[] = [
  {
    num: "01",
    label: "01 / Stratégie",
    title: "Conception stratégique",
    desc: "On analyse votre marché, on conçoit un angle créatif qui parle à votre cible, puis on scénarise des vidéos pensées pour convertir.",
    variant: "strategy",
  },
  {
    num: "02",
    label: "02 / Production",
    title: "Production vidéo",
    desc: "Tournage, direction artistique et montage haut de gamme. Des formats déclinés pour Reels, TikTok, YouTube et Display.",
    variant: "production",
  },
  {
    num: "03",
    label: "03 / Data",
    title: "Gestion publicitaire & Data",
    desc: "On diffuse, on mesure et on optimise vos campagnes en continu pour faire croître l'impact réel sur votre chiffre d'affaires.",
    variant: "data",
  },
];

function MethodCard({ card, index, total }: { card: (typeof cards)[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  // Slight scale-down for cards underneath as they stack
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 120px", "end 120px"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, index < total - 1 ? 0.94 : 1]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${96 + index * 18}px` }}
    >
      <motion.div
        className="grad-border rounded-[28px] overflow-hidden"
        style={{ scale, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center" style={{ background: "var(--ink-2)" }}>
          {/* Left — text */}
          <div>
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="font-poppins font-extrabold leading-none"
                style={{ fontSize: "clamp(40px, 5vw, 60px)", color: "rgba(245,240,236,0.10)", letterSpacing: "-0.04em" }}
              >
                {card.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--cream-faint)" }}>
                {card.label}
              </span>
            </div>
            <h3
              className="font-poppins font-bold mb-4"
              style={{ fontSize: "clamp(26px, 3.4vw, 40px)", letterSpacing: "-0.02em", color: "var(--cream)" }}
            >
              {card.title}
            </h3>
            <p className="font-poppins font-normal text-[15px] leading-relaxed mb-7 max-w-[420px]" style={{ color: "var(--cream-dim)" }}>
              {card.desc}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-poppins font-semibold text-sm px-5 py-2.5 transition-all duration-200 active:scale-[0.97]"
              style={{
                background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(255,61,119,0.30)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="11" rx="2" stroke="#fff" strokeWidth="1.4" />
                <path d="M2 6h12M6 1.5v3M10 1.5v3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Réserver un appel
            </Link>
          </div>

          {/* Right — animated mockup */}
          <div className="h-full">
            <DashboardMockup variant={card.variant} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Method() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-15%" });

  return (
    <section className="py-28 px-5" style={{ background: "var(--ink)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color: "var(--cream-faint)" }}>
            Comment on travaille
          </p>
          <h2 className="font-poppins font-extrabold" style={{ fontSize: "clamp(34px, 5vw, 60px)", letterSpacing: "-0.03em", color: "var(--cream)" }}>
            Notre <span className="text-gradient">méthode.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {cards.map((card, i) => (
            <MethodCard key={i} card={card} index={i} total={cards.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
