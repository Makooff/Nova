"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const R2 = "https://pub-a93d9300f3144cee9101e92c2ba03175.r2.dev";
function r2(f: string) {
  return `${R2}/${encodeURIComponent("Vidéo")}/${encodeURIComponent(f)}`;
}

type Slide = {
  src: string;
  scale: number;
  className: string; // position + size of the inner frame
};

const slides: Slide[] = [
  {
    src: r2("BOZAR_Become_a_Bozars_Young_Ambassador_(Campaign)_hd 1080p.MP4"),
    scale: 4,
    className: "h-[25vh] w-[25vw]",
  },
  {
    src: r2("Timeline_2_hd 1080p.MP4"),
    scale: 5,
    className: "-top-[30vh] left-[5vw] h-[30vh] w-[35vw]",
  },
  {
    src: r2("Timeline_3_hd 1080p.MP4"),
    scale: 6,
    className: "-top-[10vh] -left-[25vw] h-[45vh] w-[20vw]",
  },
  {
    src: r2("Caballero - Rose Orangé (Clip Officiel).mp4"),
    scale: 5,
    className: "left-[27.5vw] h-[25vh] w-[25vw]",
  },
  {
    src: r2("AutoSpaV2_hd 1080p.MP4"),
    scale: 6,
    className: "top-[27.5vh] left-[5vw] h-[25vh] w-[20vw]",
  },
  {
    src: r2("VidAoAutospaP2V4_uhd 2160p.MP4"),
    scale: 8,
    className: "top-[27.5vh] -left-[22.5vw] h-[25vh] w-[30vw]",
  },
  {
    src: r2("260508_CARWASH_COMMERCIAL_MONTAGE_V3_hd 1080p.MP4"),
    scale: 9,
    className: "top-[22.5vh] left-[25vw] h-[15vh] w-[15vw]",
  },
];

function Slide({
  slide,
  progress,
}: {
  slide: Slide;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [0, 1], [1, slide.scale]);

  return (
    <motion.div style={{ scale }} className="absolute inset-0 flex items-center justify-center">
      <div className={`relative overflow-hidden ${slide.className}`}>
        <video
          src={slide.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default function ZoomParallaxWork() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Header fades + lifts away as the zoom takes over.
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  return (
    <section ref={ref} className="relative h-[220vh] md:h-[300vh] bg-[var(--ink)]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {slides.map((slide, i) => (
          <Slide key={i} slide={slide} progress={scrollYProgress} />
        ))}

        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-[14vh] text-center"
        >
          <span
            className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--cream-dim)]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            Notre travail
          </span>
          <h2 className="mt-4 text-[clamp(44px,7vw,96px)] font-extrabold leading-[0.95] text-[var(--cream)]">
            Réalisations.
          </h2>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-10 flex justify-center">
          <Link
            href="/realisations"
            className="pointer-events-auto rounded-full border border-[var(--rule)] bg-[var(--ink-2)]/70 px-5 sm:px-7 py-2.5 sm:py-3 text-[13px] sm:text-sm font-semibold text-[var(--cream)] backdrop-blur-md transition-colors hover:border-[var(--sun-1)] hover:text-[var(--sun-1)]"
          >
            Voir toutes nos réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
