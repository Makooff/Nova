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
import VimeoThumbnail from "@/components/ui/VimeoThumbnail";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

// seekTo = specific frame in seconds | vertical = portrait aspect ratio
const items = [
  { vimeoId: "1195979451", seekTo: 10,  vertical: false, cols: "col-span-2 md:col-span-7" },
  { vimeoId: "1195979118", seekTo: 30,  vertical: false, cols: "col-span-2 md:col-span-5" },
  { vimeoId: "1195979119", seekTo: 17,  vertical: true,  cols: "col-span-1 md:col-span-4" },
  { vimeoId: "1195979120", seekTo: 9,   vertical: true,  cols: "col-span-1 md:col-span-4" },
  { vimeoId: "1195979122", seekTo: 0,   vertical: false, cols: "col-span-2 md:col-span-4" },
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
  vimeoId, seekTo, vertical, cols, index, inView, onClick,
}: {
  vimeoId: string; seekTo: number; vertical: boolean;
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
    <div className={cols}>
      <motion.div
        className="rounded-[14px] overflow-hidden relative cursor-pointer group w-full"
        style={
          {
            aspectRatio: vertical ? "9/16" : "16/10",
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
        <VimeoThumbnail vimeoId={vimeoId} seekTo={seekTo} />

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

        {/* Play button on hover */}
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

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 items-start">
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
