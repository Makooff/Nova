"use client";

import { useRef, useCallback, memo, useState, CSSProperties } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  cubicBezier,
  type Variants,
} from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

const items = [
  { title: "Réalisation 01", category: "Production Vidéo", vimeoId: "1195979451", cols: "md:col-span-7" },
  { title: "Réalisation 02", category: "Production Vidéo", vimeoId: "1195979118", cols: "md:col-span-5" },
  { title: "Réalisation 03", category: "Production Vidéo", vimeoId: "1195979119", cols: "md:col-span-4" },
  { title: "Réalisation 04", category: "Production Vidéo", vimeoId: "1195979120", cols: "md:col-span-5" },
  { title: "Réalisation 05", category: "Production Vidéo", vimeoId: "1195979122", cols: "md:col-span-3" },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.1, duration: 0.85, ease: easeExpo },
  }),
};

const TiltItem = memo(function TiltItem({
  title, category, vimeoId, cols, index, inView, onClick,
}: {
  title: string; category: string; vimeoId: string;
  cols: string; index: number; inView: boolean;
  onClick: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div className={`${cols} perspective-1000`}>
      <motion.div
        className="rounded-[14px] overflow-hidden relative cursor-pointer group w-full h-full"
        style={
          {
            aspectRatio: "16/10",
            background: "oklch(0.10 0 0)",
            border: "1px solid oklch(0.22 0 0)",
            rotateX: springRX,
            rotateY: springRY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          } as CSSProperties
        }
        custom={index}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.25 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://vumbnail.com/${vimeoId}.jpg`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          style={{ transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)" }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, oklch(0.04 0 0 / 0.85) 0%, transparent 55%)",
          }}
        />

        {/* Hover sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: "linear-gradient(135deg, oklch(0.96 0 0 / 0.05) 0%, transparent 60%)",
          }}
        />

        {/* Play button (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.96 0 0 / 0.12)",
              border: "1px solid oklch(0.96 0 0 / 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" className="translate-x-0.5">
              <path d="M0 0L14 8L0 16V0Z" fill="oklch(0.96 0 0)" />
            </svg>
          </div>
        </div>

        {/* Info — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p
            className="font-mono text-[9px] uppercase tracking-wider mb-1"
            style={{ color: "oklch(0.50 0 0)" }}
          >
            {category}
          </p>
          <p
            className="font-sora font-light text-sm"
            style={{ color: "oklch(0.96 0 0)" }}
          >
            {title}
          </p>
        </div>
      </motion.div>
    </div>
  );
});

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
          {items.map((item, i) => (
            <TiltItem
              key={i}
              {...item}
              index={i}
              inView={inView}
              onClick={() => setSelectedId(item.vimeoId)}
            />
          ))}
        </div>
      </div>

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
    </section>
  );
}
