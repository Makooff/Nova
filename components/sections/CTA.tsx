"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

function MagneticButton({
  href, children, primary = false,
}: { href: string; children: React.ReactNode; primary?: boolean }) {
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
          ? { x: springX, y: springY, background: "oklch(0.96 0 0)", color: "oklch(0.06 0 0)" }
          : { x: springX, y: springY, border: "1px solid oklch(0.30 0 0)", color: "oklch(0.65 0 0)" }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-7 py-3.5 transition-colors duration-200 cursor-pointer select-none"
      whileHover={primary ? { background: "oklch(0.88 0 0)" } as never : { borderColor: "oklch(0.50 0 0)", color: "oklch(0.90 0 0)" } as never}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Background image parallax — moves up as you scroll down */
  const rawBgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgY = useSpring(rawBgY, { stiffness: 50, damping: 14 });

  /* Heading zoom — grows slightly as section enters viewport */
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1.0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-5 overflow-hidden"
      style={{ background: "oklch(0.04 0 0)" }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-[-15%] pointer-events-none"
        style={{ y: bgY, willChange: "transform" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=1600&auto=format&fit=crop&q=60"
          alt=""
          fill
          className="object-cover opacity-[0.05]"
          aria-hidden
        />
      </motion.div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, oklch(0.04 0 0 / 0.95) 100%)",
        }}
      />

      {/* Rule top — draws down */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{ background: "oklch(0.22 0 0)", height: "80px", originY: 0 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[3px] mb-8"
          style={{ color: "oklch(0.38 0 0)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Prêt à passer à l&apos;action
        </motion.p>

        {/* Heading with scroll zoom */}
        <motion.h2
          className="font-sora font-thin tracking-tighter mb-12"
          style={{
            fontSize: "clamp(42px, 8vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "oklch(0.96 0 0)",
            scale: headingScale,
            willChange: "transform",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Votre prochaine
          <br />
          <motion.span
            style={{ color: "oklch(0.32 0 0)" }}
            initial={{ color: "oklch(0.20 0 0)" }}
            animate={inView ? { color: "oklch(0.32 0 0)" } : {}}
            transition={{ delay: 0.5, duration: 1.2 }}
          >
            vidéo commence ici.
          </motion.span>
        </motion.h2>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton href="/contact" primary>
            Nous contacter
          </MagneticButton>
          <MagneticButton href="/realisations">
            Voir le showreel
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
