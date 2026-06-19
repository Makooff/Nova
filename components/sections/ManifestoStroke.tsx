"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Shared window where all lines fade out for good.
const OUT_START = 0.46;
const OUT_END = 0.54;

const lines = [
  { text: "On filme.", color: "var(--cream)", band: [0.04, 0.16] as const },
  { text: "On monte.", color: "var(--cream)", band: [0.16, 0.28] as const },
  { text: "Vos clients regardent.", color: "var(--cream-dim)", band: [0.28, 0.42] as const },
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
  // Appear over `band`, then disappear over the shared out-window and stay 0.
  const opacity = useTransform(
    progress,
    [band[0], band[1], OUT_START, OUT_END],
    [0, 1, 1, 0]
  );
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

  // Brand reveal arrives after the lines are fully gone, then holds to the end.
  const foveaOpacity = useTransform(scrollYProgress, [0.62, 0.76], [0, 1]);
  const foveaY = useTransform(scrollYProgress, [0.62, 0.82], ["40%", "0%"]);

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

        {/* Brand reveal — transparent, layers over the existing scroll background */}
        <motion.div
          style={{ opacity: foveaOpacity, y: foveaY }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-5"
        >
          <div className="flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
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
              className="mt-5 text-sm uppercase tracking-[0.3em] text-[var(--cream-dim)]"
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
