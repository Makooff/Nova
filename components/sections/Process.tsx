"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    label: "Brief",
    title: "Stratégie & Brief",
    desc: "Appel découverte, objectifs, angle créatif, plateforme et budget.",
  },
  {
    num: "02",
    label: "Production",
    title: "Tournage",
    desc: "Équipe technique, direction artistique, plateau ou terrain BE & FR.",
  },
  {
    num: "03",
    label: "Post-production",
    title: "Montage & Formats",
    desc: "Post-prod, retours client, déclinaisons Reels/Stories/YouTube/Display.",
  },
  {
    num: "04",
    label: "Lancement",
    title: "Diffusion & Suivi",
    desc: "Lancement campagne, suivi des performances, optimisation continue.",
  },
];

function Step({ step, index, total }: { step: (typeof steps)[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      className="grid gap-6 pb-12"
      style={{ gridTemplateColumns: "72px 1fr" }}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.05,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Left col — number + connector */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ border: "1px solid oklch(0.26 0.008 55)" }}
          animate={inView ? { borderColor: "oklch(0.72 0.11 55 / 0.5)" } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="font-mono text-[11px]" style={{ color: "oklch(0.72 0.11 55)" }}>
            {step.num}
          </span>
        </motion.div>
        {index < total - 1 && (
          <motion.div
            className="flex-1 w-px mt-3"
            style={{ background: "oklch(0.21 0.007 55)", minHeight: "40px" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>

      {/* Right col — content */}
      <div className="pb-2">
        <p className="font-mono text-[9px] uppercase tracking-wider mb-2" style={{ color: "oklch(0.42 0.007 62)" }}>
          {step.label}
        </p>
        <h3
          className="font-sora font-light text-[26px] mb-2 leading-snug"
          style={{ color: "oklch(0.93 0.012 70)", letterSpacing: "-0.02em" }}
        >
          {step.title}
        </h3>
        <p className="font-sora font-light text-sm leading-relaxed" style={{ color: "oklch(0.42 0.007 62)" }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="process"
      className="py-24 px-5"
      style={{ background: "oklch(0.10 0.007 55)" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-wider mb-3" style={{ color: "oklch(0.42 0.007 62)" }}>
            Comment on travaille
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: "-0.04em",
              color: "oklch(0.93 0.012 70)",
            }}
          >
            Notre process
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <Step key={i} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
