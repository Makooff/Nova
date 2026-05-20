"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, cubicBezier, type Variants } from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
      style={{ border: "1px solid oklch(0.22 0 0)", color: "oklch(0.45 0 0)" }}
    >
      {label}
    </span>
  );
}

const services = [
  {
    num: "Service 01",
    title: "Production Vidéo Publicitaire",
    desc: "Tournage et montage de vidéos pensées pour convertir. Chaque plan a un objectif publicitaire précis.",
    pills: ["Tournage", "Montage", "Motion design", "Multi-formats"],
    href: "/services#video",
    ariaLabel: "Production Vidéo Publicitaire",
  },
  {
    num: "Service 02",
    title: "Campagnes Publicitaires Ads",
    desc: "Lancement et gestion de vos campagnes sur toutes les plateformes. Les créatifs vidéo sont inclus.",
    pills: ["Google Ads", "Meta Ads", "LinkedIn", "TikTok"],
    href: "/campagne-ads",
    ariaLabel: "Campagnes Publicitaires Ads",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.14, duration: 0.75, ease: easeExpo },
  }),
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="services"
      className="py-24 px-5"
      style={{ background: "oklch(0.10 0 0)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color: "oklch(0.38 0 0)" }}>
            Ce que nous faisons
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em", color: "oklch(0.96 0 0)" }}
          >
            Nos services
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[18px] overflow-hidden"
          style={{ border: "1px solid oklch(0.22 0 0)" }}
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              className="relative p-8 group"
              style={{
                background: "oklch(0.06 0 0)",
                borderRight: i === 0 ? "1px solid oklch(0.22 0 0)" : undefined,
              }}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ backgroundColor: "oklch(0.10 0 0)" }}
              transition={{ duration: 0.3 }}
            >
              <Link href={svc.href} className="absolute inset-0" aria-label={svc.ariaLabel} />
              <div className="flex items-start justify-between mb-6">
                <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "oklch(0.38 0 0)" }}>
                  {svc.num}
                </p>
                <motion.span
                  className="opacity-0 translate-x-[-4px] translate-y-[4px]"
                  style={{ color: "oklch(0.75 0 0)" }}
                  whileHover={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowIcon />
                </motion.span>
              </div>
              <h3
                className="font-sora font-light text-[22px] mb-3 leading-snug"
                style={{ color: "oklch(0.96 0 0)" }}
              >
                {svc.title}
              </h3>
              <p
                className="font-sora font-light text-sm leading-relaxed mb-6"
                style={{ color: "oklch(0.48 0 0)" }}
              >
                {svc.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {svc.pills.map((p) => <Pill key={p} label={p} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
