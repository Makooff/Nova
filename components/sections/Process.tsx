"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const steps = [
  {
    num: "01", label: "Brief",
    title: "Stratégie & Brief",
    desc: "Appel découverte, objectifs, angle créatif, plateforme et budget.",
  },
  {
    num: "02", label: "Production",
    title: "Tournage",
    desc: "Équipe technique, direction artistique, plateau ou terrain BE & FR.",
  },
  {
    num: "03", label: "Post-production",
    title: "Montage & Formats",
    desc: "Post-prod, retours client, déclinaisons Reels/Stories/YouTube/Display.",
  },
  {
    num: "04", label: "Lancement",
    title: "Diffusion & Suivi",
    desc: "Lancement campagne, suivi des performances, optimisation continue.",
  },
];

function Step({
  step,
  index,
  total,
}: {
  step: (typeof steps)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18%" });

  return (
    <motion.div
      ref={ref}
      className="grid gap-6 pb-12"
      style={{ gridTemplateColumns: "72px 1fr" }}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Left col: circle + connector line */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative"
          style={{ border: "1px solid oklch(0.22 0 0)" }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Inner dot pulse when in view */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid oklch(0.35 0 0)" }}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.5 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <span
            className="font-mono text-[11px]"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            {step.num}
          </span>
        </motion.div>

        {/* Connector line — scaleY animates from 0 */}
        {index < total - 1 && (
          <motion.div
            className="flex-1 w-px mt-3"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.25 0 0), oklch(0.14 0 0))",
              minHeight: "40px",
              originY: 0,
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>

      {/* Right col: text */}
      <div className="pb-2">
        <motion.p
          className="font-mono text-[9px] uppercase tracking-wider mb-2"
          style={{ color: "oklch(0.38 0 0)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {step.label}
        </motion.p>
        <motion.h3
          className="font-sora font-light text-[26px] mb-2 leading-snug"
          style={{ color: "oklch(0.96 0 0)", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="font-sora font-light text-sm leading-relaxed"
          style={{ color: "oklch(0.38 0 0)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  /* Parallax on the section heading */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const headingY = useSpring(rawY, { stiffness: 50, damping: 14 });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 px-5 overflow-hidden"
      style={{ background: "oklch(0.06 0 0)" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="mb-16"
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: "oklch(0.38 0 0)" }}
          >
            Comment on travaille
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: "-0.04em",
              color: "oklch(0.96 0 0)",
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
