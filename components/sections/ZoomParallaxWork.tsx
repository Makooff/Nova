"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useInView } from "framer-motion";

const R2 = "https://pub-a93d9300f3144cee9101e92c2ba03175.r2.dev";
function r2(f: string) {
  return `${R2}/${encodeURIComponent("Vidéo")}/${encodeURIComponent(f)}`;
}

const videos = [
  r2("BOZAR_Become_a_Bozars_Young_Ambassador_(Campaign)_hd 1080p.MP4"),
  r2("Timeline_2_hd 1080p.MP4"),
  r2("Caballero - Rose Orangé (Clip Officiel).mp4"),
  r2("AutoSpaV2_hd 1080p.MP4"),
  r2("260508_CARWASH_COMMERCIAL_MONTAGE_V3_hd 1080p.MP4"),
  r2("VidAoAutospaP2V4_uhd 2160p.MP4"),
  r2("Timeline_3_hd 1080p.MP4"),
];

// Position overrides per index (matches ZoomParallax layout)
const positions: React.CSSProperties[] = [
  { position: "relative", height: "25vh", width: "25vw" },
  { position: "absolute", top: "-30vh", left: "5vw", height: "30vh", width: "35vw" },
  { position: "absolute", top: "-10vh", left: "-25vw", height: "45vh", width: "20vw" },
  { position: "absolute", top: "0", left: "27.5vw", height: "25vh", width: "25vw" },
  { position: "absolute", top: "27.5vh", left: "5vw", height: "25vh", width: "20vw" },
  { position: "absolute", top: "27.5vh", left: "-22.5vw", height: "25vh", width: "30vw" },
  { position: "absolute", top: "22.5vh", left: "25vw", height: "15vh", width: "15vw" },
];

export default function ZoomParallaxWork() {
  const container = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // CTA fades in as you near the end of the scroll
  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.75, 0.95], [20, 0]);

  return (
    <section style={{ background: "var(--ink)" }}>
      {/* Header */}
      <div className="px-5 pt-24 pb-12 max-w-5xl mx-auto" ref={headRef}>
        <motion.p
          className="font-mono text-[10px] uppercase tracking-wider mb-4"
          style={{ color: "var(--cream-faint)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Notre travail
        </motion.p>
        <motion.h2
          className="font-poppins font-extrabold"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.03em",
            color: "var(--cream)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Réalisations<span className="text-gradient">.</span>
        </motion.h2>
      </div>

      {/* Zoom parallax container */}
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {videos.map((src, index) => {
            const scale = scales[index % scales.length];
            const pos = positions[index];

            return (
              <motion.div
                key={index}
                style={{ scale }}
                className="absolute top-0 flex h-full w-full items-center justify-center"
              >
                <div style={pos} className="overflow-hidden rounded-[4px]">
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Dark vignette at edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(14,11,16,0.7) 100%)",
            }}
          />

          {/* CTA overlay — appears near scroll end */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <div className="text-center pointer-events-auto">
              <p
                className="font-mono text-[11px] uppercase tracking-wider mb-4"
                style={{ color: "var(--cream-faint)" }}
              >
                85+ clients · BE &amp; FR
              </p>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 rounded-full font-poppins font-semibold text-[15px] px-7 py-3.5 transition-all duration-200 active:scale-[0.97]"
                style={{
                  background: "rgba(245,240,236,0.10)",
                  border: "1px solid rgba(245,240,236,0.20)",
                  color: "var(--cream)",
                  backdropFilter: "blur(12px)",
                }}
              >
                Voir toutes les réalisations
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
