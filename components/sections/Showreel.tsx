"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Showreel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="py-16 px-5"
      style={{ background: "oklch(0.13 0.008 55)" }}
    >
      <motion.div
        className="max-w-[1080px] mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative w-full rounded-[20px] overflow-hidden cursor-pointer"
          style={{
            aspectRatio: "16/9",
            background: "oklch(0.10 0.007 55)",
            border: "1px solid oklch(0.26 0.008 55)",
          }}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Ouvrir le showreel"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.72 0.11 55 / 0.04) 0%, transparent 70%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.11 55 / 0.12)",
                border: "1px solid oklch(0.72 0.11 55 / 0.3)",
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                className="translate-x-0.5"
              >
                <path d="M0 0L18 10L0 20V0Z" fill="oklch(0.72 0.11 55)" />
              </svg>
            </motion.div>
            <p
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: "oklch(0.42 0.007 62)" }}
            >
              Showreel 2026
            </p>
          </div>
        </div>
      </motion.div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: "oklch(0.08 0.006 55 / 0.95)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 font-sora text-sm transition-colors"
              style={{ color: "oklch(0.52 0.008 65)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "oklch(0.93 0.012 70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "oklch(0.52 0.008 65)")
              }
              aria-label="Fermer"
            >
              Fermer
            </button>
            <div
              className="w-full h-full rounded-xl flex items-center justify-center"
              style={{
                background: "oklch(0.10 0.007 55)",
                border: "1px solid oklch(0.26 0.008 55)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: "oklch(0.32 0.007 60)" }}
              >
                Vidéo showreel 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
