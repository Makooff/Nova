"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { vimeoId: "1195979451", vertical: false, cols: "col-span-2 md:col-span-7" },
  { vimeoId: "1195979118", vertical: false, cols: "col-span-2 md:col-span-5" },
  { vimeoId: "1195979119", vertical: true,  cols: "col-span-1 md:col-span-4" },
  { vimeoId: "1195979120", vertical: true,  cols: "col-span-1 md:col-span-4" },
  { vimeoId: "1195979122", vertical: false, cols: "col-span-2 md:col-span-4" },
];

export default function RealisationsGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3 items-start">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`${p.cols} rounded-[14px] overflow-hidden relative cursor-pointer group`}
            style={{
              aspectRatio: p.vertical ? "9/16" : "16/10",
              border: "1px solid oklch(0.18 0 0)",
              background: "oklch(0.08 0 0)",
            }}
            onClick={() => setSelectedId(p.vimeoId)}
          >
            {/* Looping video — fills frame */}
            <iframe
              src={`https://player.vimeo.com/video/${p.vimeoId}?autoplay=1&muted=1&background=1&loop=1&quality=auto`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: "scale(1.06)" }}
              frameBorder="0"
              allow="autoplay; fullscreen"
            />

            {/* Hover blur */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                background: "oklch(0.04 0 0 / 0.40)",
              }}
            />

            {/* Hover play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.96 0 0 / 0.12)",
                  border: "1px solid oklch(0.96 0 0 / 0.40)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" className="translate-x-0.5">
                  <path d="M0 0L14 8L0 16V0Z" fill="oklch(0.96 0 0)" />
                </svg>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen modal — rounded corners, close on outside click or Fermer */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ background: "oklch(0.04 0 0 / 0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
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
                onClick={() => setSelectedId(null)}
                className="absolute -top-10 right-0 font-sora text-sm transition-colors"
                style={{ color: "oklch(0.45 0 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0 0)")}
              >
                Fermer
              </button>
              <iframe
                src={`https://player.vimeo.com/video/${selectedId}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`}
                className="absolute inset-0 w-full h-full rounded-2xl"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
