"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const primaryStyle = {
    x: springX,
    y: springY,
    background: "oklch(0.93 0.012 70)",
    color: "oklch(0.13 0.008 55)",
  };

  const outlineStyle = {
    x: springX,
    y: springY,
    border: "1px solid oklch(0.26 0.008 55)",
    color: "oklch(0.78 0.010 68)",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={primary ? primaryStyle : outlineStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-7 py-3.5 transition-colors duration-200 cursor-pointer select-none"
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="py-32 px-5 relative overflow-hidden"
      style={{ background: "oklch(0.13 0.008 55)" }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, oklch(0.72 0.11 55 / 0.06) 0%, transparent 65%)",
        }}
      />

      {/* Rule top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{ background: "oklch(0.26 0.008 55)", height: "80px" }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[3px] mb-8"
          style={{ color: "oklch(0.42 0.007 62)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Prêt à passer à l&apos;action
        </motion.p>

        <motion.h2
          className="font-sora font-thin tracking-tighter mb-12"
          style={{
            fontSize: "clamp(42px, 8vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "oklch(0.93 0.012 70)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Votre prochaine
          <br />
          <span style={{ color: "oklch(0.35 0.008 55)" }}>
            vidéo commence ici.
          </span>
        </motion.h2>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton href="/contact" primary>
            Demander un devis
          </MagneticButton>
          <MagneticButton href="/realisations">
            Voir le showreel
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
