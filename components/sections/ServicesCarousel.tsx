"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";

const ease = cubicBezier(0.16, 1, 0.3, 1);

function FilmIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="4" y="10" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="15" r="2" fill="currentColor" />
      <circle cx="9" cy="25" r="2" fill="currentColor" />
      <circle cx="31" cy="15" r="2" fill="currentColor" />
      <circle cx="31" cy="25" r="2" fill="currentColor" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="6" y="24" width="7" height="10" rx="1.5" fill="currentColor" />
      <rect x="17" y="16" width="7" height="18" rx="1.5" fill="currentColor" />
      <rect x="28" y="8" width="7" height="26" rx="1.5" fill="currentColor" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M20 4L22.5 16.5L35 19L22.5 21.5L20 34L17.5 21.5L5 19L17.5 16.5L20 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  {
    id: "production",
    num: "01",
    label: "Production vidéo",
    icon: <FilmIcon />,
    video: "/videos/bozar.mp4",
    description: "Tournage et montage de vidéos pensées pour convertir — chaque plan a un objectif.",
  },
  {
    id: "ads",
    num: "02",
    label: "Campagnes Ads",
    icon: <ChartIcon />,
    video: "/videos/carwash.mp4",
    description: "Lancement et gestion de vos campagnes sur Meta, Google, TikTok & LinkedIn.",
  },
  {
    id: "ia",
    num: "03",
    label: "Agents IA Qwillio",
    icon: <SparkIcon />,
    video: "/videos/autospa.mp4",
    description: "Des agents IA sur-mesure pour automatiser vos workflows marketing.",
  },
];

const AUTO_PLAY_INTERVAL = 3800;
const ITEM_HEIGHT = 68;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function ServicesCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);
  const prevStep = useCallback(() => setStep((prev) => prev - 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const len = FEATURES.length;
    let d = index - currentIndex;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-5" style={{ background: "var(--ink)" }}>
      <div className="max-w-5xl mx-auto mb-10 sm:mb-12">
        <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: "var(--cream-faint)" }}>
          Ce qu&apos;on fait
        </p>
        <h2
          className="font-poppins font-extrabold"
          style={{ fontSize: "clamp(34px, 5vw, 64px)", letterSpacing: "-0.03em", color: "var(--cream)" }}
        >
          Nos services<span className="text-gradient">.</span>
        </h2>
      </div>

      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
      >
        {/* Mobile — horizontal title nav with glass arrows over the gradient + media */}
        <div className="overflow-hidden rounded-[1.5rem] lg:hidden" style={{ border: "1px solid var(--rule)" }}>
          {/* Gradient header: ‹ active title › */}
          <div
            className="relative flex items-center gap-3 px-4 py-5"
            style={{ background: "linear-gradient(150deg, var(--sun-1) 0%, var(--sun-2) 100%)" }}
          >
            <button
              onClick={prevStep}
              aria-label="Service précédent"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform active:scale-90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative h-12 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={FEATURES[currentIndex].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease }}
                  className="absolute inset-0 flex items-center justify-center gap-2.5 rounded-full bg-white px-4"
                  style={{ color: "var(--sun-2)" }}
                >
                  <span>{FEATURES[currentIndex].icon}</span>
                  <span className="font-poppins font-semibold text-[14px] uppercase tracking-tight whitespace-nowrap">
                    {FEATURES[currentIndex].label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextStep}
              aria-label="Service suivant"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform active:scale-90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Active media + caption */}
          <div className="relative aspect-[4/3]" style={{ background: "var(--ink-2)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={FEATURES[currentIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <video
                  src={FEATURES[currentIndex].video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-24 flex flex-col justify-end"
                  style={{ background: "linear-gradient(to top, rgba(8,6,9,0.92), rgba(8,6,9,0.3) 50%, transparent)" }}
                >
                  <p className="font-poppins font-semibold text-[15px] leading-tight" style={{ color: "var(--cream)" }}>
                    {FEATURES[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop — animated chip + media carousel */}
        <div
          className="relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] hidden lg:flex lg:flex-row lg:aspect-video"
          style={{ border: "1px solid var(--rule)" }}
        >
          {/* Left — rotating chips on sunset panel */}
          <div
            className="w-full lg:w-[42%] min-h-[230px] sm:min-h-[280px] lg:h-full relative z-30 flex items-center justify-center lg:justify-start overflow-hidden px-6 sm:px-8 md:px-14"
            style={{ background: "linear-gradient(150deg, var(--sun-1) 0%, var(--sun-2) 100%)" }}
          >
            <div
              className="relative w-full h-full flex items-center justify-center lg:justify-start z-20"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
                maskImage: "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
              }}
            >
              {FEATURES.map((feature, index) => {
                const isActive = index === currentIndex;
                const wrappedDistance = wrap(-(FEATURES.length / 2), FEATURES.length / 2, index - currentIndex);

                return (
                  <motion.div
                    key={feature.id}
                    style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.35,
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className="relative flex items-center gap-3 px-6 md:px-7 py-3.5 rounded-full transition-all duration-500 text-left group border font-poppins"
                      style={
                        isActive
                          ? { background: "#fff", color: "var(--sun-2)", borderColor: "#fff" }
                          : { background: "transparent", color: "rgba(255,255,255,0.62)", borderColor: "rgba(255,255,255,0.25)" }
                      }
                    >
                      <span style={{ color: isActive ? "var(--sun-2)" : "rgba(255,255,255,0.5)" }}>
                        {feature.icon}
                      </span>
                      <span className="font-semibold text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — media carousel */}
          <div
            className="flex-1 min-h-[380px] sm:min-h-[420px] lg:h-full relative flex items-center justify-center py-10 sm:py-14 px-6 md:px-10 overflow-hidden"
            style={{ background: "var(--ink-2)", borderTop: "1px solid var(--rule)" }}
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] aspect-[4/5] flex items-center justify-center">
              {FEATURES.map((feature, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={feature.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                    className="absolute inset-0 rounded-[1.8rem] overflow-hidden origin-center"
                    style={{ border: "6px solid var(--ink)", pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <video
                      src={feature.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover transition-all duration-700"
                      style={{ filter: isActive ? "none" : "grayscale(1) blur(2px) brightness(0.75)" }}
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-7 pt-28 flex flex-col justify-end pointer-events-none"
                          style={{ background: "linear-gradient(to top, rgba(8,6,9,0.92), rgba(8,6,9,0.35) 45%, transparent)" }}
                        >
                          <div
                            className="px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] w-fit mb-3"
                            style={{ background: "var(--ink)", color: "var(--cream)", border: "1px solid var(--rule)" }}
                          >
                            {feature.num} • {feature.label}
                          </div>
                          <p className="font-poppins font-semibold text-lg md:text-xl leading-tight tracking-tight" style={{ color: "var(--cream)" }}>
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className="absolute top-6 left-6 flex items-center gap-2.5 transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0 }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: "var(--sun-1)", boxShadow: "0 0 10px var(--sun-1)" }} />
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: "rgba(245,240,236,0.8)" }}>
                        Showreel
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
