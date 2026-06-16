"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  cubicBezier,
  type Variants,
} from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);
const SHOWREEL_ID = "850854753";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: easeExpo },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax glow + content
  const glowY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), { stiffness: 50, damping: 18 });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), { stiffness: 60, damping: 18 });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // 3D tilt on video card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 160, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center overflow-hidden px-5 pt-[120px] pb-20"
      style={{ minHeight: "100dvh", background: "var(--ink)" }}
    >
      {/* Warm radial glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "50%",
          x: "-50%",
          y: glowY,
          scale: glowScale,
          width: "120vw",
          height: "90vh",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(255,61,119,0.20) 0%, rgba(255,138,61,0.14) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[3px] mb-7"
          style={{ color: "var(--cream-faint)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Agence de production vidéo · BE &amp; FR
        </motion.p>

        <h1
          className="font-poppins font-extrabold leading-[1.02] mb-7"
          style={{ fontSize: "clamp(40px, 7vw, 86px)", letterSpacing: "-0.03em" }}
        >
          <motion.span className="block" style={{ color: "var(--cream)" }} custom={0} variants={wordVariants} initial="hidden" animate="visible">
            On filme. On monte.
          </motion.span>
          <motion.span className="block text-shimmer" custom={1} variants={wordVariants} initial="hidden" animate="visible">
            Vous convertissez.
          </motion.span>
        </h1>

        <motion.p
          className="font-poppins font-normal text-[16px] md:text-[18px] leading-relaxed mb-9 max-w-[560px]"
          style={{ color: "var(--cream-dim)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: easeExpo }}
        >
          Des vidéos publicitaires pensées pour la performance, et des campagnes
          Ads qui transforment l&apos;attention en clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7, ease: easeExpo }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full font-poppins font-semibold text-[15px] px-7 py-3.5 transition-all duration-200 active:scale-[0.97]"
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
        </motion.div>
      </motion.div>

      {/* VSL video card — 3D tilt */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mt-14"
        style={{ perspective: "1100px", opacity: contentOpacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1.0, ease: easeExpo }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.button
          onClick={() => setOpen(true)}
          className="relative w-full rounded-[20px] overflow-hidden block cursor-pointer group"
          style={{
            aspectRatio: "16/9",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            border: "1px solid rgba(245,240,236,0.12)",
            background: "var(--ink-2)",
            boxShadow: "0 40px 100px rgba(255,61,119,0.18), 0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${SHOWREEL_ID}?autoplay=1&muted=1&background=1&loop=1&quality=auto`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ transform: "scale(1.02)" }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            aria-hidden
          />
          <div className="absolute inset-0" style={{ background: "rgba(14,11,16,0.18)" }} />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))",
                boxShadow: "0 0 0 10px rgba(255,61,119,0.12), 0 10px 40px rgba(255,61,119,0.45)",
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="22" height="24" viewBox="0 0 22 24" className="translate-x-0.5">
                <path d="M0 0L22 12L0 24V0Z" fill="#fff" />
              </svg>
            </motion.div>
          </div>
        </motion.button>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ background: "rgba(8,6,9,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              style={{ aspectRatio: "16/9" }}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeExpo }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 font-poppins text-sm transition-colors"
                style={{ color: "var(--cream-dim)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
              >
                Fermer
              </button>
              <iframe
                src={`https://player.vimeo.com/video/${SHOWREEL_ID}?autoplay=1&title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full rounded-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
