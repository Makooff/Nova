"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const lines = [
  { text: "On filme.", color: "var(--cream)", band: [0.05, 0.22] as const },
  { text: "On monte.", color: "var(--cream)", band: [0.22, 0.4] as const },
  { text: "Vos clients regardent.", color: "var(--cream-dim)", band: [0.4, 0.6] as const },
];

function Line({
  text,
  color,
  band,
  progress,
}: {
  text: string;
  color: string;
  band: readonly [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [band[0], band[1]], [0, 1]);
  const y = useTransform(progress, [band[0], band[1]], [60, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        color,
        fontFamily: "var(--font-poppins)",
        fontWeight: 800,
        fontSize: "clamp(52px, 8vw, 110px)",
        lineHeight: 1.02,
      }}
      className="block"
    >
      {text}
    </motion.span>
  );
}

export default function ManifestoStroke() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Organic stroke traced as the section scrolls.
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Bottom card rises from below in the final third.
  const cardY = useTransform(scrollYProgress, [0.6, 1], ["120%", "0%"]);
  const cardOpacity = useTransform(scrollYProgress, [0.62, 0.75], [0, 1]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[var(--ink)]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Traced organic path */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="manifesto-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF8A3D" />
              <stop offset="100%" stopColor="#FF3D77" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -60 620 C 280 460, 460 760, 720 560 S 1180 300, 1520 520"
            stroke="url(#manifesto-stroke)"
            strokeWidth={16}
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* Manifesto lines */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          {lines.map((l) => (
            <Line key={l.text} {...l} progress={scrollYProgress} />
          ))}
        </div>

        {/* Bottom reveal card */}
        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          className="absolute inset-x-0 bottom-0 z-20"
        >
          <div className="mx-3 mb-3 flex flex-col items-center justify-center rounded-3xl bg-[var(--ink-2)] px-6 py-[7vh] text-center">
            <span
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 800,
                fontSize: "15vw",
                lineHeight: 0.9,
                background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Fovea.
            </span>
            <p
              className="mt-4 text-sm uppercase tracking-[0.3em] text-[var(--cream-dim)]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Belgique · France · contact@fovea.be
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
