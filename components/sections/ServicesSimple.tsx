"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { num: "01", label: "Production Vidéo" },
  { num: "02", label: "Campagnes Ads" },
  { num: "03", label: "Agents IA Qwillio" },
];

export default function ServicesSimple() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section ref={ref} className="py-28 px-5" style={{ background: "oklch(0.06 0 0)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col">
          {services.map((s, i) => (
            <div key={i}>
              <motion.div
                className="flex items-baseline gap-5 py-7"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.13, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="font-mono text-[11px] shrink-0 mt-1"
                  style={{ color: "oklch(0.38 0 0)" }}
                >
                  {s.num}
                </span>
                <span
                  className="font-sora font-thin tracking-tighter"
                  style={{
                    fontSize: "clamp(32px, 5vw, 60px)",
                    letterSpacing: "-0.04em",
                    color: "oklch(0.96 0 0)",
                  }}
                >
                  {s.label}
                </span>
              </motion.div>
              {i < services.length - 1 && (
                <motion.div
                  className="h-px origin-left"
                  style={{ background: "oklch(0.16 0 0)" }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: i * 0.13 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>
          ))}
        </div>

        <motion.p
          className="font-sora font-light mt-10 text-sm leading-relaxed"
          style={{ color: "oklch(0.40 0 0)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Tournage, montage, diffusion. Pour les entreprises BE &amp; FR.
        </motion.p>
      </div>
    </section>
  );
}
