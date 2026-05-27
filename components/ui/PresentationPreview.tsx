"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PresentationPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Preview card — replaces the hero image */}
      <motion.div
        className="w-full rounded-2xl overflow-hidden relative cursor-pointer group"
        style={{
          aspectRatio: "21/9",
          background: "oklch(0.06 0 0)",
          border: "1px solid oklch(0.16 0 0)",
        }}
        onClick={() => setOpen(true)}
        whileHover={{ borderColor: "oklch(0.30 0 0)" }}
        transition={{ duration: 0.2 }}
        role="button"
        aria-label="Voir la présentation Nova en plein écran"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        {/* Background: low-opacity Vimeo thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://vumbnail.com/850854753.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-[1.04] group-hover:opacity-35 transition-opacity duration-500"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 50%, oklch(0.06 0 0 / 0.4) 0%, oklch(0.04 0 0 / 0.9) 100%)",
          }}
        />

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          {/* Play button */}
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.96 0 0 / 0.10)",
              border: "1px solid oklch(0.96 0 0 / 0.30)",
              backdropFilter: "blur(8px)",
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <svg width="16" height="18" viewBox="0 0 16 18" className="translate-x-0.5">
              <path d="M0 0L16 9L0 18V0Z" fill="oklch(0.96 0 0)" />
            </svg>
          </motion.div>

          {/* Label */}
          <div className="flex flex-col items-center gap-1">
            <p
              className="font-sora font-thin text-lg tracking-tighter"
              style={{ color: "oklch(0.92 0 0)", letterSpacing: "-0.03em" }}
            >
              Présentation Nova
            </p>
            <p
              className="font-mono text-[9px] uppercase tracking-wider"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              Motion design · 58s · Voix off
            </p>
          </div>
        </div>

        {/* Corner label */}
        <div className="absolute bottom-5 left-6">
          <p
            className="font-mono text-[9px] uppercase tracking-wider"
            style={{ color: "oklch(0.35 0 0)" }}
          >
            Nova Production — Bruxelles
          </p>
        </div>

        {/* Duration badge */}
        <div
          className="absolute bottom-5 right-6 px-2 py-1 rounded"
          style={{ background: "oklch(0.10 0 0)", border: "1px solid oklch(0.20 0 0)" }}
        >
          <span className="font-mono text-[9px]" style={{ color: "oklch(0.45 0 0)" }}>
            0:58
          </span>
        </div>
      </motion.div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: "oklch(0.02 0 0 / 0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 font-sora text-sm transition-colors"
                style={{ color: "oklch(0.40 0 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.40 0 0)")}
              >
                Fermer ✕
              </button>

              {/* Presentation iframe — full screen, audio enabled */}
              <iframe
                src="/nova-presentation/index.html"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
