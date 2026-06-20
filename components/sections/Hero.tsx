"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  cubicBezier,
  type Variants,
} from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeExpo } },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: glow drifts, content lifts + fades as you scroll away.
  const glowY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), { stiffness: 50, damping: 18 });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), { stiffness: 60, damping: 18 });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden pt-28 pb-20 sm:pt-[120px] sm:pb-24"
      style={{ background: "var(--ink)" }}
    >
      {/* Blurred video background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }} aria-hidden>
        <video
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ filter: "blur(22px) saturate(1.1)" }}
        />
      </motion.div>

      {/* Dark veil for legibility */}
      <div className="absolute inset-0 z-0" style={{ background: "rgba(14,11,16,0.62)" }} aria-hidden />

      {/* Warm radial glow mixed over the video */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-10%",
          left: "50%",
          x: "-50%",
          y: glowY,
          scale: glowScale,
          width: "120vw",
          height: "90vh",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
        aria-hidden
      >
        <motion.div
          className="h-full w-full"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(255,61,119,0.30) 0%, rgba(255,138,61,0.20) 35%, transparent 70%)" }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom fade into page */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--ink))" }}
        aria-hidden
      />

      {/* Content — left aligned to the header gutter (max-w-6xl + px-5) */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full max-w-3xl flex-col items-start text-left"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-[10px] uppercase tracking-[3px] mb-4"
          style={{ color: "var(--cream-dim)" }}
        >
          Agence de production vidéo · BE &amp; FR
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-poppins font-extrabold leading-[1.02]"
          style={{ fontSize: "clamp(40px, 7vw, 86px)", letterSpacing: "-0.03em", color: "var(--cream)" }}
        >
          Multipliez votre
          <span className="block text-shimmer">chiffre d&apos;affaires.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl font-poppins text-[16px] md:text-[18px] leading-relaxed"
          style={{ color: "var(--cream-dim)" }}
        >
          Vidéo publicitaire et campagnes Ads conçues pour faire croître vos ventes&nbsp;— de la stratégie au tournage en passant par la diffusion.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex w-full flex-col sm:flex-row sm:w-auto sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full font-poppins font-semibold text-[15px] px-7 py-3.5 transition-all duration-200 active:scale-[0.97]"
            style={{
              background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))",
              color: "#fff",
              boxShadow: "0 12px 40px rgba(255,61,119,0.35)",
            }}
          >
            Discuter avec un expert
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href="/realisations"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-poppins font-semibold text-[15px] text-[var(--cream)] backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Voir nos réalisations
          </Link>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
