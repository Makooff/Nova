"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Source = "vimeo" | "youtube";

interface Project {
  id: string;
  source: Source;
  vertical: boolean;
  cols: string;
}

const projects: Project[] = [
  { id: "850854753",   source: "vimeo",   vertical: false, cols: "col-span-2 md:col-span-12" },
  { id: "1195979120",  source: "vimeo",   vertical: false, cols: "col-span-2 md:col-span-8" },
  { id: "1195979118",  source: "vimeo",   vertical: true,  cols: "col-span-2 md:col-span-4" },
  { id: "1195979122",  source: "vimeo",   vertical: false, cols: "col-span-2 md:col-span-12" },
  { id: "1195979451",  source: "vimeo",   vertical: true,  cols: "col-span-2 md:col-span-4" },
  { id: "1195979119",  source: "vimeo",   vertical: false, cols: "col-span-2 md:col-span-8" },
  { id: "rv5PLylcqjg", source: "youtube", vertical: false, cols: "col-span-2 md:col-span-12" },
];

function loopSrc(id: string, source: Source) {
  if (source === "youtube") {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1`;
  }
  return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&background=1&loop=1&quality=auto`;
}

function modalSrc(id: string, source: Source) {
  if (source === "youtube") {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`;
}

function iframeAllow(source: Source, modal = false) {
  if (source === "youtube") return "autoplay; encrypted-media; fullscreen";
  return modal ? "autoplay; fullscreen; picture-in-picture" : "autoplay; fullscreen";
}

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      ref={ref}
      id="realisations"
      className="py-20 px-5"
      style={{ background: "oklch(0.06 0 0)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-wider mb-3"
            style={{ color: "oklch(0.38 0 0)" }}
          >
            Notre travail
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: "-0.04em",
              color: "oklch(0.96 0 0)",
            }}
          >
            Réalisations
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 items-start">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`${p.cols} rounded-[14px] overflow-hidden relative cursor-pointer group`}
              style={{
                aspectRatio: p.vertical ? "9/16" : "16/9",
                border: "1px solid oklch(0.18 0 0)",
                background: "oklch(0.08 0 0)",
              }}
              onClick={() => setSelected(p)}
            >
              {inView && (
                <iframe
                  src={loopSrc(p.id, p.source)}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ transform: "scale(1.06)" }}
                  frameBorder="0"
                  allow={iframeAllow(p.source)}
                />
              )}

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
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ background: "oklch(0.04 0 0 / 0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
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
                onClick={() => setSelected(null)}
                className="absolute -top-10 right-0 font-sora text-sm transition-colors"
                style={{ color: "oklch(0.45 0 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0 0)")}
              >
                Fermer
              </button>
              <iframe
                src={modalSrc(selected.id, selected.source)}
                className="absolute inset-0 w-full h-full rounded-2xl"
                frameBorder="0"
                allow={iframeAllow(selected.source, true)}
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
