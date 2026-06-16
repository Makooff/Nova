"use client";

import { useRef } from "react";
import { motion, useInView, cubicBezier } from "framer-motion";

const ease = cubicBezier(0.16, 1, 0.3, 1);

function FilmIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="4" y="10" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="15" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="9" cy="25" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="31" cy="15" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="31" cy="25" r="2" fill="currentColor" opacity="0.5" />
      <line x1="15" y1="10" x2="15" y2="30" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <line x1="25" y1="10" x2="25" y2="30" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="6" y="24" width="7" height="10" rx="1.5" fill="currentColor" opacity="0.4" />
      <rect x="17" y="16" width="7" height="18" rx="1.5" fill="currentColor" opacity="0.65" />
      <rect x="28" y="8" width="7" height="26" rx="1.5" fill="currentColor" />
      <path d="M6 32L16 20L24 24L34 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M20 4L22.5 16.5L35 19L22.5 21.5L20 34L17.5 21.5L5 19L17.5 16.5L20 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="31" cy="9" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="9" cy="31" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

const services = [
  {
    num: "01",
    title: "Production Vidéo Publicitaire",
    desc: "Tournage et montage de vidéos pensées pour convertir. Chaque plan a un objectif publicitaire précis.",
    pills: ["Tournage", "Montage", "Motion design", "Multi-formats"],
    icon: <FilmIcon />,
    floatDuration: 3.8,
  },
  {
    num: "02",
    title: "Campagnes Publicitaires Ads",
    desc: "Lancement et gestion de vos campagnes sur toutes les plateformes. Les créatifs vidéo sont inclus.",
    pills: ["Meta Ads", "Google Ads", "LinkedIn", "TikTok"],
    icon: <ChartIcon />,
    floatDuration: 4.4,
  },
  {
    num: "03",
    title: "Agents IA Qwillio",
    desc: "Des agents IA sur-mesure pour automatiser vos workflows marketing et accélérer votre croissance.",
    pills: ["Automatisation", "IA", "Workflows"],
    icon: <SparkIcon />,
    floatDuration: 3.2,
  },
];

function ServiceRow({ svc, index }: { svc: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const fromLeft = index % 2 === 0;

  return (
    <div ref={ref}>
      <motion.div
        className="relative flex items-center gap-8 md:gap-16 py-12 overflow-hidden"
        initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease }}
      >
        {/* Ghost number */}
        <span
          aria-hidden
          className="absolute pointer-events-none select-none font-poppins font-extrabold"
          style={{
            fontSize: "clamp(120px, 16vw, 200px)",
            color: "var(--cream)",
            opacity: 0.04,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          {svc.num}
        </span>

        {/* Left — text */}
        <div className="flex-1 min-w-0 relative z-10">
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-4"
            style={{ color: "var(--cream-faint)" }}
          >
            {svc.num}
          </p>
          <h3
            className="font-poppins font-bold mb-4 leading-[1.1]"
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              letterSpacing: "-0.02em",
              color: "var(--cream)",
            }}
          >
            {svc.title}
          </h3>
          <p
            className="font-poppins font-normal text-[15px] leading-relaxed mb-6 max-w-[440px]"
            style={{ color: "var(--cream-dim)" }}
          >
            {svc.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {svc.pills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                style={{ border: "1px solid var(--rule)", color: "var(--cream-faint)" }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right — floating icon card */}
        <motion.div
          className="hidden md:flex shrink-0 items-center justify-center w-[120px] h-[120px] rounded-[20px]"
          style={{
            background: "var(--ink-3)",
            border: "1px solid var(--rule)",
            color: "var(--cream-dim)",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: svc.floatDuration, repeat: Infinity, ease: "easeInOut" }}
        >
          {svc.icon}
        </motion.div>
      </motion.div>

      {/* Line draw between rows */}
      {index < services.length - 1 && (
        <motion.div
          className="h-px origin-left"
          style={{ background: "var(--rule)" }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease }}
        />
      )}
    </div>
  );
}

export default function ServicesBlock() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-15%" });

  return (
    <section className="py-28 px-5" style={{ background: "var(--ink)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headRef}
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-4"
            style={{ color: "var(--cream-faint)" }}
          >
            Ce qu&apos;on fait
          </p>
          <h2
            className="font-poppins font-extrabold"
            style={{
              fontSize: "clamp(34px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              color: "var(--cream)",
            }}
          >
            Nos services<span className="text-gradient">.</span>
          </h2>
        </motion.div>

        <div>
          {services.map((svc, i) => (
            <ServiceRow key={i} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
