"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

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
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={
        primary
          ? {
              x: springX,
              y: springY,
              background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))",
              color: "#fff",
              boxShadow: "0 14px 44px rgba(255,61,119,0.4)",
            }
          : { x: springX, y: springY, border: "1px solid var(--rule)", color: "var(--cream-dim)" }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center rounded-full font-poppins font-semibold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer select-none"
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 60]), { stiffness: 50, damping: 16 });
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section ref={ref} className="relative py-36 px-5 overflow-hidden" style={{ background: "var(--ink)" }}>
      {/* Warm glow */}
      <motion.div
        className="absolute pointer-events-none left-1/2 -translate-x-1/2"
        style={{
          top: "10%",
          y: glowY,
          width: "100vw",
          height: "80vh",
          background: "radial-gradient(ellipse 45% 50% at 50% 50%, rgba(255,61,119,0.18), rgba(255,138,61,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[3px] mb-7"
          style={{ color: "var(--cream-faint)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Prêt à passer à l&apos;action
        </motion.p>

        <motion.h2
          className="font-poppins font-extrabold mb-10"
          style={{ fontSize: "clamp(36px, 6.5vw, 80px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--cream)", scale: headingScale }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          Faites <span className="text-gradient">grandir</span>
          <br />
          votre marque.
        </motion.h2>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease }}
        >
          <MagneticButton href="/contact" primary>
            Discuter avec un expert
          </MagneticButton>
          <MagneticButton href="/realisations">Voir nos réalisations</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
