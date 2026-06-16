"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PRESENTATION_URL =
  `https://pub-a93d9300f3144cee9101e92c2ba03175.r2.dev/${encodeURIComponent("Vidéo")}/${encodeURIComponent("48A22DD7-4B93-4DCE-BC1C-13C3FBD13E25.mov")}`;

export default function PresentationPreview() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <>
      {/* Preview — autoplay muted dès que la section entre dans le viewport */}
      <div ref={ref} className="w-full" style={{ aspectRatio: "16/9" }}>
        <motion.div
          className="w-full h-full rounded-2xl overflow-hidden relative cursor-pointer group"
          style={{ background: "oklch(0.06 0 0)", border: "1px solid oklch(0.16 0 0)" }}
          onClick={() => setOpen(true)}
          whileHover={{ borderColor: "oklch(0.30 0 0)" }}
          transition={{ duration: 0.2 }}
          role="button"
          aria-label="Voir la présentation Fovea en plein écran"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          {inView && (
            <video
              src={PRESENTATION_URL}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          )}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "oklch(0.04 0 0 / 0.50)" }}
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.96 0 0 / 0.12)", border: "1px solid oklch(0.96 0 0 / 0.40)", backdropFilter: "blur(8px)" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="18" viewBox="0 0 16 18" className="translate-x-0.5">
                <path d="M0 0L16 9L0 18V0Z" fill="oklch(0.96 0 0)" />
              </svg>
            </motion.div>
          </div>

          <div className="absolute bottom-5 left-6 pointer-events-none">
            <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "oklch(0.45 0 0)" }}>
              Fovea Production — Bruxelles · Cliquer pour le son
            </p>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen modal — avec son */}
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
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 font-sora text-sm transition-colors"
                style={{ color: "oklch(0.40 0 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.40 0 0)")}
              >
                Fermer ✕
              </button>
              <video
                src={PRESENTATION_URL}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "contain", background: "#000" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
