"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { mediaSrc as r2 } from "@/lib/media";

const works = [
  { src: r2("BOZAR_Become_a_Bozars_Young_Ambassador_(Campaign)_hd 1080p.MP4"), vertical: false },
  { src: r2("Caballero - Rose Orangé (Clip Officiel).mp4"), vertical: false },
  { src: r2("AutoSpaV2_hd 1080p.MP4"), vertical: true },
  { src: r2("260508_CARWASH_COMMERCIAL_MONTAGE_V3_hd 1080p.MP4"), vertical: false },
];

function WorkItem({ src, vertical, index }: { src: string; vertical: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [selected, setSelected] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        className="relative overflow-hidden cursor-pointer group"
        style={{ aspectRatio: vertical ? "9/16" : "16/9", maxHeight: vertical ? "90vh" : "75vh" }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.0, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setSelected(true)}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "oklch(0.04 0 0 / 0.35)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.96 0 0 / 0.12)",
              border: "1px solid oklch(0.96 0 0 / 0.45)",
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
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ background: "oklch(0.04 0 0 / 0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              style={{ aspectRatio: vertical ? "9/16" : "16/9" }}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
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
                src={src}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full rounded-xl"
                style={{ objectFit: "contain", background: "#000" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SelectedWork() {
  return (
    <section style={{ background: "oklch(0.06 0 0)" }}>
      <div className="flex flex-col gap-[3px]">
        {works.map((w, i) => (
          <div
            key={i}
            className={`w-full flex ${w.vertical ? "justify-center" : ""}`}
            style={{ background: "oklch(0.04 0 0)" }}
          >
            <WorkItem src={w.src} vertical={w.vertical} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
