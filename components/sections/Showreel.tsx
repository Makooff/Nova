"use client";

import { useState } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function Showreel() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 px-5 bg-white">
      <RevealWrapper>
        <div className="max-w-[1080px] mx-auto">
          <div
            className="showreel-container relative w-full bg-black rounded-[20px] overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "16/9" }}
            onClick={() => setOpen(true)}
            role="button"
            aria-label="Ouvrir le showreel"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a]" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="play-circle w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="white"
                  className="translate-x-0.5"
                >
                  <path d="M0 0L18 10L0 20V0Z" />
                </svg>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                Showreel 2025
              </p>
            </div>
          </div>
        </div>
      </RevealWrapper>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-5"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white font-sora text-sm transition-colors"
              aria-label="Fermer"
            >
              Fermer
            </button>
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                Vidéo showreel 2025
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
