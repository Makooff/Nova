"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 4.2, decimals: 1, suffix: "×", label: "ROAS moyen sur nos campagnes" },
  { value: 312, decimals: 0, prefix: "+", suffix: "%", label: "de vues en moyenne sur 30 jours" },
  { value: 85, decimals: 0, suffix: "+", label: "marques accompagnées en BE & FR" },
];

const CountUp = memo(function CountUp({
  target,
  decimals,
  prefix = "",
  suffix = "",
  active,
}: {
  target: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = 72;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = () => {
      frame++;
      const progress = easeOut(Math.min(frame / totalFrames, 1));
      setCount(progress * target);
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
});

export default function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="py-28 px-5" style={{ background: "var(--ink)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.blockquote
          className="font-poppins font-semibold leading-[1.25] mb-4"
          style={{ fontSize: "clamp(24px, 3.4vw, 40px)", letterSpacing: "-0.02em", color: "var(--cream)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          «&nbsp;Travailler avec Fovea a été un vrai déclic. On était loin
          d&apos;exploiter notre potentiel sur les réseaux.&nbsp;»
        </motion.blockquote>
        <motion.p
          className="font-poppins text-sm mb-20"
          style={{ color: "var(--cream-faint)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          — Un client agréablement surpris.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-poppins font-extrabold text-gradient leading-none mb-3 tabular-nums"
                style={{ fontSize: "clamp(52px, 7vw, 76px)", letterSpacing: "-0.04em" }}
              >
                <CountUp target={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} active={inView} />
              </p>
              <p className="font-poppins font-normal text-sm leading-snug mx-auto max-w-[220px]" style={{ color: "var(--cream-dim)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
