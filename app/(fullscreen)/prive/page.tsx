"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import RealisationsGrid from "@/components/sections/RealisationsGrid";

function LastVideoCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 22 });
  const [selected, setSelected] = useState(false);

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
    <>
      <motion.div
        style={{ perspective: "900px" }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          className="w-full rounded-[14px] overflow-hidden relative cursor-pointer group"
          style={{
            aspectRatio: "16/9",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            border: "1px solid oklch(0.18 0 0)",
            background: "oklch(0.08 0 0)",
            boxShadow: "0 24px 56px oklch(0 0 0 / 0.55)",
          }}
          onClick={() => setSelected(true)}
          whileTap={{ scale: 0.97 }}
        >
          <video
            src="/videos/larookie-mrare.mov"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ transform: "scale(1.06)" }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)", background: "oklch(0.04 0 0 / 0.40)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.96 0 0 / 0.12)", border: "1px solid oklch(0.96 0 0 / 0.40)", backdropFilter: "blur(8px)" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="14" height="16" viewBox="0 0 14 16" className="translate-x-0.5">
                <path d="M0 0L14 8L0 16V0Z" fill="oklch(0.96 0 0)" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ background: "oklch(0.04 0 0 / 0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              style={{ aspectRatio: "16/9" }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(false)}
                className="absolute -top-10 right-0 font-sora text-sm transition-colors"
                style={{ color: "oklch(0.45 0 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0 0)")}
              >
                Fermer
              </button>
              <video
                src="/videos/larookie-mrare.mov"
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full rounded-2xl"
                style={{ objectFit: "contain", background: "#000" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PrivePage() {
  return (
    <main style={{ background: "oklch(0.06 0 0)", minHeight: "100dvh" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              Notre travail
            </p>
            <h1
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Réalisations
            </h1>
          </div>

          <RealisationsGrid />

          <div className="mt-3">
            <LastVideoCard />
          </div>
        </div>
      </section>
    </main>
  );
}
