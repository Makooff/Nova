"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { vimeoId: "1195979451", category: "Production Vidéo", cols: "col-span-2 md:col-span-7" },
  { vimeoId: "1195979118", category: "Production Vidéo", cols: "col-span-2 md:col-span-5" },
  { vimeoId: "1195979119", category: "Production Vidéo", cols: "col-span-2 md:col-span-4" },
  { vimeoId: "1195979120", category: "Production Vidéo", cols: "col-span-2 md:col-span-5" },
  { vimeoId: "1195979122", category: "Production Vidéo", cols: "col-span-2 md:col-span-3" },
];

export default function RealisationsGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`${p.cols} rounded-[14px] overflow-hidden relative cursor-pointer group`}
            style={{ aspectRatio: "16/10", border: "1px solid oklch(0.22 0 0)" }}
            onClick={() => setSelectedId(p.vimeoId)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://vumbnail.com/${p.vimeoId}.jpg`}
              alt="Réalisation Nova"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Bottom gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, oklch(0.04 0 0 / 0.85) 0%, transparent 55%)",
              }}
            />
            {/* Play button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.96 0 0 / 0.12)",
                  border: "1px solid oklch(0.96 0 0 / 0.35)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" className="translate-x-0.5">
                  <path d="M0 0L14 8L0 16V0Z" fill="oklch(0.96 0 0)" />
                </svg>
              </div>
            </div>
            {/* Category label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "oklch(0.50 0 0)" }}
              >
                {p.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedId && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: "oklch(0.04 0 0 / 0.96)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedId(null)}
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
              className="absolute inset-0 w-full h-full rounded-xl"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
