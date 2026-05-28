"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const R2 = "https://pub-a93d9300f3144cee9101e92c2ba03175.r2.dev";

function r2(filename: string) {
  return `${R2}/${encodeURIComponent("Vidéo")}/${encodeURIComponent(filename)}`;
}

type VideoEntry = {
  type: "r2" | "youtube";
  src: string;
  vertical: boolean;
  cols: string;
};

const projects: VideoEntry[] = [
  // Row 1 — BOZAR pleine largeur
  { type: "r2",      src: r2("BOZAR_Become_a_Bozars_Young_Ambassador_(Campaign)_hd 1080p.MP4"), vertical: false, cols: "col-span-2 md:col-span-12" },
  // Row 2 — Les deux Timeline côte à côte
  { type: "r2",      src: r2("Timeline_2_hd 1080p.MP4"),                                         vertical: false, cols: "col-span-1 md:col-span-6" },
  { type: "r2",      src: r2("Timeline_3_hd 1080p.MP4"),                                         vertical: false, cols: "col-span-1 md:col-span-6" },
  // Row 3 — Caballero pleine largeur
  { type: "r2",      src: r2("Caballero - Rose Orangé (Clip Officiel).mp4"),                     vertical: false, cols: "col-span-2 md:col-span-12" },
  // Row 4 — Les deux portraits côte à côte
  { type: "r2",      src: r2("AutoSpaV2_hd 1080p.MP4"),                                          vertical: true,  cols: "col-span-1 md:col-span-6" },
  { type: "r2",      src: r2("VidAoAutospaP2V4_uhd 2160p.MP4"),                                 vertical: true,  cols: "col-span-1 md:col-span-6" },
  // Row 5 — CarWash pleine largeur
  { type: "r2",      src: r2("260508_CARWASH_COMMERCIAL_MONTAGE_V3_hd 1080p.MP4"),               vertical: false, cols: "col-span-2 md:col-span-12" },
];

function LoopContent({ p }: { p: VideoEntry }) {
  if (p.type === "youtube") {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${p.src}?autoplay=1&mute=1&loop=1&playlist=${p.src}&controls=0&rel=0&modestbranding=1&playsinline=1`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: "scale(1.06)" }}
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen"
      />
    );
  }
  return (
    <video
      src={p.src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ transform: "scale(1.06)" }}
    />
  );
}

function VideoItem({ p, onSelect }: { p: VideoEntry; onSelect: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <div
      ref={ref}
      className={`${p.cols} rounded-[14px] overflow-hidden relative cursor-pointer group`}
      style={{
        aspectRatio: p.vertical ? "9/16" : "16/9",
        border: "1px solid oklch(0.18 0 0)",
        background: "oklch(0.08 0 0)",
      }}
      onClick={onSelect}
    >
      {inView && <LoopContent p={p} />}

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
    </div>
  );
}

export default function RealisationsGrid() {
  const [selected, setSelected] = useState<VideoEntry | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3 items-start">
        {projects.map((p, i) => (
          <VideoItem key={i} p={p} onSelect={() => setSelected(p)} />
        ))}
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
              style={{ aspectRatio: selected.vertical ? "9/16" : "16/9" }}
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
              {selected.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selected.src}?autoplay=1&rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selected.src}
                  autoPlay
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full rounded-2xl"
                  style={{ objectFit: "contain", background: "#000" }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
