"use client";

import { useRef, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  cubicBezier,
  type Variants,
} from "framer-motion";
import Marquee from "@/components/ui/Marquee";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.75, ease: easeExpo },
  }),
};

const lines = ["On filme.", "On monte.", "Vos clients regardent."];

const TiltCard = memo(function TiltCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-9, 9]);
  const springRotX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springRotY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      className="perspective-800 hidden md:block shrink-0"
      style={{ width: "340px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full rounded-[20px] overflow-hidden"
        style={{
          aspectRatio: "3/4",
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=800&auto=format&fit=crop"
          alt="Équipe Nova en tournage"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.06 0 0 / 0.75) 0%, transparent 55%)",
          }}
        />
        {/* Specular sheen that follows tilt */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0 0 / 0.07) 0%, transparent 60%)",
            rotateX: springRotX,
            rotateY: springRotY,
          }}
        />
        <div className="absolute bottom-5 left-5 right-5">
          <p
            className="font-mono text-[9px] uppercase tracking-wider"
            style={{ color: "oklch(0.45 0 0)" }}
          >
            Nova Production · Tournage
          </p>
        </div>
      </motion.div>
    </div>
  );
});

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Text parallax — moves up faster than scroll = depth */
  const rawTextY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textY = useSpring(rawTextY, { stiffness: 60, damping: 18 });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* Background image zoom-out as you scroll */
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100dvh", background: "oklch(0.06 0 0)" }}
    >
      {/* Cinematic full-bleed background image with scroll zoom */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale, willChange: "transform" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=1600&auto=format&fit=crop&q=80"
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          priority
          aria-hidden
        />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, oklch(0.04 0 0 / 0.8) 100%)",
        }}
      />

      {/* Main content with parallax */}
      <motion.div
        className="relative flex-1 flex flex-col md:flex-row items-center max-w-6xl mx-auto w-full px-5 pt-[56px]"
        style={{ y: textY, opacity: contentOpacity }}
      >
        {/* LEFT — text */}
        <div className="flex-1 flex flex-col justify-center py-16 md:py-0 md:pr-16">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[3px] mb-8"
            style={{ color: "oklch(0.45 0 0)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Agence de Production Vidéo
          </motion.p>

          <h1
            className="font-sora font-thin leading-[1.06] mb-8"
            style={{
              fontSize: "clamp(42px, 7.5vw, 88px)",
              letterSpacing: "-0.04em",
            }}
          >
            {lines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                style={{
                  color:
                    i === 2 ? "oklch(0.38 0 0)" : "oklch(0.96 0 0)",
                }}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="font-sora font-light text-[16px] leading-relaxed mb-10 max-w-[400px]"
            style={{ color: "oklch(0.48 0 0)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Vidéos publicitaires tournées et montées pour convertir. Campagnes
            Ads et agents IA Qwillio pour les entreprises BE &amp; FR.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/realisations"
              className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-all duration-200 active:scale-[0.97]"
              style={{ background: "oklch(0.96 0 0)", color: "oklch(0.06 0 0)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "oklch(0.85 0 0)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "oklch(0.96 0 0)")
              }
            >
              Voir le showreel
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-all duration-200 active:scale-[0.97]"
              style={{
                border: "1px solid oklch(0.22 0 0)",
                color: "oklch(0.65 0 0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.45 0 0)";
                e.currentTarget.style.color = "oklch(0.96 0 0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.22 0 0)";
                e.currentTarget.style.color = "oklch(0.65 0 0)";
              }}
            >
              Nos services
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — 3D tilt card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard />
        </motion.div>
      </motion.div>

      {/* Bottom — scroll indicator + marquee */}
      <motion.div
        className="relative flex flex-col items-center gap-2 pb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="w-px h-8 origin-top scroll-line"
            style={{ background: "oklch(0.75 0 0)" }}
          />
          <span
            className="font-mono text-[9px] uppercase tracking-wider"
            style={{ color: "oklch(0.38 0 0)" }}
          >
            Scroll
          </span>
        </div>
        <Marquee />
      </motion.div>
    </section>
  );
}
