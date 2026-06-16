"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

const VIMEO_ID = "850854753";

export default function Showreel() {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fires the instant even 1px of the section enters the viewport
  const inView = useInView(sectionRef, { once: true, margin: "0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const bgY = useSpring(rawY, { stiffness: 60, damping: 18 });

  // Render iframe immediately on mount so it loads in the background
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-5 overflow-hidden"
      style={{ background: "oklch(0.06 0 0)" }}
    >
      <motion.div
        className="max-w-[1080px] mx-auto"
        initial={{ opacity: 0, scale: 0.97, y: 24 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative w-full rounded-[20px] overflow-hidden cursor-pointer group"
          style={{
            aspectRatio: "16/9",
            background: "black",
            border: "1px solid oklch(0.22 0 0)",
          }}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Ouvrir le showreel en plein écran"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          {/* iframe loads on mount — buffering in background before visible */}
          {isMounted && (
            <motion.div
              className="absolute inset-0"
              style={{ y: bgY }}
            >
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=1&background=1&loop=1&quality=auto`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: "scale(1.06)" }}
                frameBorder="0"
                allow="autoplay; fullscreen"
              />
            </motion.div>
          )}

          {/* Black overlay — fades out the instant section enters view */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "black" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: inView ? 0 : 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {/* Permanent dark gradient on top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.04 0 0 / 0.2) 0%, oklch(0.04 0 0 / 0.5) 100%)",
            }}
          />

          {/* Play button + label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <motion.div
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.96 0 0 / 0.1)",
                border: "1px solid oklch(0.96 0 0 / 0.35)",
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                className="translate-x-0.5"
              >
                <path d="M0 0L20 11L0 22V0Z" fill="oklch(0.96 0 0)" />
              </svg>
            </motion.div>

            <div className="flex flex-col items-center gap-1">
              <p
                className="font-sora font-thin text-lg tracking-tighter"
                style={{ color: "oklch(0.92 0 0)", letterSpacing: "-0.03em" }}
              >
                Showreel 2025
              </p>
              <p
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                Fovea Production
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen modal with sound */}
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: "oklch(0.04 0 0 / 0.96)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: "16/9" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 font-sora text-sm transition-colors"
              style={{ color: "oklch(0.45 0 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0 0)")}
            >
              Fermer
            </button>
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`}
              className="absolute inset-0 w-full h-full rounded-xl"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
