"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function Showreel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="py-16 px-5" style={{ background: "oklch(0.06 0 0)" }}>
      <motion.div
        className="max-w-[1080px] mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="relative w-full rounded-[20px] overflow-hidden cursor-pointer group"
          style={{ aspectRatio: "16/9", background: "oklch(0.10 0 0)", border: "1px solid oklch(0.22 0 0)" }}
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Ouvrir le showreel"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          {/* Background photo */}
          <Image
            src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&auto=format&fit=crop"
            alt="Nova showreel"
            fill
            className="object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.96 0 0 / 0.12)", border: "1px solid oklch(0.96 0 0 / 0.3)" }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" className="translate-x-0.5">
                <path d="M0 0L18 10L0 20V0Z" fill="oklch(0.96 0 0)" />
              </svg>
            </motion.div>
            <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "oklch(0.55 0 0)" }}>
              Showreel 2026
            </p>
          </div>
        </div>
      </motion.div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: "oklch(0.04 0 0 / 0.95)" }}
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
              style={{ color: "oklch(0.45 0 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0 0)")}
            >
              Fermer
            </button>
            <div
              className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden"
              style={{ border: "1px solid oklch(0.22 0 0)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1280&auto=format&fit=crop"
                alt="Showreel Nova"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
