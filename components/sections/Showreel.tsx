"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

export default function Showreel() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-12%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Subtle parallax on the thumbnail as you scroll past */
  const rawY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const bgY = useSpring(rawY, { stiffness: 60, damping: 18 });

  return (
    <section
      ref={sectionRef}
      className="py-16 px-5 overflow-hidden"
      style={{ background: "oklch(0.06 0 0)" }}
    >
      <motion.div
        className="max-w-[1080px] mx-auto"
        initial={{ opacity: 0, scale: 0.93, y: 40 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative w-full rounded-[20px] overflow-hidden cursor-pointer group vignette"
          style={{
            aspectRatio: "16/9",
            background: "oklch(0.10 0 0)",
            border: "1px solid oklch(0.22 0 0)",
          }}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Ouvrir le showreel"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          {/* Ken Burns background image */}
          <motion.div
            className="absolute inset-0"
            style={{ y: bgY, willChange: "transform" }}
          >
            <div className="absolute inset-[-8%] ken-burns">
              <Image
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&auto=format&fit=crop"
                alt="Nova showreel"
                fill
                className="object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-700"
              />
            </div>
          </motion.div>

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.04 0 0 / 0.3) 0%, oklch(0.04 0 0 / 0.6) 100%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            {/* Play button with pulse ring */}
            <motion.div
              className="relative w-20 h-20 rounded-full flex items-center justify-center play-pulse"
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
                Showreel 2026
              </p>
              <p
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "oklch(0.45 0 0)" }}
              >
                Nova Production
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "oklch(0.96 0 0)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "oklch(0.45 0 0)")
              }
            >
              Fermer
            </button>
            <div
              className="w-full h-full rounded-xl overflow-hidden"
              style={{ border: "1px solid oklch(0.22 0 0)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1280&auto=format&fit=crop"
                alt="Showreel Nova"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
