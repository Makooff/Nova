"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Vidéos produites" },
  { value: 85,  suffix: "+", label: "Clients" },
  { value: 4,   suffix: "×", label: "ROAS moyen" },
  { value: 2,   suffix: "",  label: "Marchés BE & FR" },
];

const CountUp = memo(function CountUp({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = 60;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = () => {
      frame++;
      const progress = easeOut(Math.min(frame / totalFrames, 1));
      setCount(Math.floor(progress * target));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
});

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      style={{ background: "oklch(0.10 0.007 55)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center py-14 px-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid oklch(0.21 0.007 55)"
                    : undefined,
              }}
            >
              <p
                className="font-sora font-thin leading-none mb-2 font-mono tabular-nums"
                style={{
                  fontSize: "52px",
                  letterSpacing: "-0.04em",
                  color: "oklch(0.72 0.11 55)",
                }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </p>
              <p
                className="font-sora text-[12px] text-center tracking-wide"
                style={{ color: "oklch(0.42 0.007 62)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
