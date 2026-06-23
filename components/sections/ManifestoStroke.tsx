"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, cubicBezier, type MotionValue } from "framer-motion";

const ease = cubicBezier(0.16, 1, 0.3, 1);

const lines = [
  { text: "On filme.", color: "var(--cream)", delay: 0.10 },
  { text: "On monte.", color: "var(--cream)", delay: 0.45 },
  { text: "Vos clients regardent.", color: "var(--cream-dim)", delay: 0.85 },
];

function SvgPath({ pathLength }: { pathLength: MotionValue<number> }) {
  return (
    <svg
      width="900"
      height="2200"
      viewBox="0 0 900 2200"
      fill="none"
      overflow="visible"
      className="absolute pointer-events-none select-none"
      style={{ top: "-10%", left: "50%", transform: "translateX(-60%)", opacity: 0.9 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="nova-stroke-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8A3D" />
          <stop offset="100%" stopColor="#FF3D77" />
        </linearGradient>
      </defs>
      <motion.path
        d="
          M 450 0
          C 750 180, 120 320, 380 520
          C 640 720, 820 860, 500 1060
          C 180 1260, 80 1400, 360 1580
          C 640 1760, 880 1880, 580 2050
          C 400 2130, 320 2180, 450 2200
        "
        stroke="url(#nova-stroke-grad)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength }}
      />
    </svg>
  );
}

export default function ManifestoStroke() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // Text fades in at start, fades out at 60%
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.70], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  // Bottom card slides up into view from 65% onward
  const cardY = useTransform(scrollYProgress, [0.60, 1], ["100%", "0%"]);
  const cardOpacity = useTransform(scrollYProgress, [0.60, 0.75], [0, 1]);

  return (
    <section
      ref={container}
      className="relative h-[300vh]"
      style={{ background: "var(--ink)" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* Animated SVG path */}
        <SvgPath pathLength={pathLength} />

        {/* Manifesto text */}
        <motion.div
          ref={textRef}
          className="relative z-10 text-center px-5"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[3px] mb-8"
            style={{ color: "var(--cream-faint)" }}
          >
            Agence · BE &amp; FR
          </motion.p>

          <div className="flex flex-col items-center gap-1 md:gap-2">
            {lines.map((line, i) => (
              <motion.span
                key={i}
                className="block font-poppins font-extrabold leading-[1.05]"
                style={{
                  fontSize: "clamp(44px, 7.5vw, 108px)",
                  letterSpacing: "-0.03em",
                  color: line.color,
                }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.85, delay: line.delay, ease }}
              >
                {line.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom reveal card */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-end pb-16 pt-20"
          style={{
            y: cardY,
            opacity: cardOpacity,
            background: "var(--ink-2)",
            borderTop: "1px solid var(--rule)",
          }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-6"
            style={{ color: "var(--cream-faint)" }}
          >
            Production vidéo publicitaire
          </p>

          <h2
            className="font-poppins font-extrabold text-center leading-none mb-6"
            style={{
              fontSize: "clamp(64px, 14vw, 200px)",
              letterSpacing: "-0.04em",
              color: "var(--cream)",
              opacity: 0.96,
            }}
          >
            Fovea<span className="text-gradient">.</span>
          </h2>

          <div
            className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-wider"
            style={{ color: "var(--cream-faint)" }}
          >
            <span>Belgique · Bruxelles</span>
            <span style={{ color: "var(--rule)" }}>·</span>
            <span>France · Paris</span>
            <span style={{ color: "var(--rule)" }}>·</span>
            <span>contact@fovea.be</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
