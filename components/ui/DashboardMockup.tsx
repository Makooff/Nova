"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function Surface({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-full rounded-2xl p-5 overflow-hidden relative"
      style={{
        background: "linear-gradient(160deg, rgba(245,240,236,0.04), rgba(245,240,236,0.015))",
        border: "1px solid rgba(245,240,236,0.08)",
      }}
    >
      {children}
    </div>
  );
}

/* 01 — Stratégie : skeleton d'une maquette d'idée */
function StrategyMock({ inView }: { inView: boolean }) {
  return (
    <Surface>
      <div className="flex flex-col gap-3 h-full">
        <motion.div
          className="h-7 w-1/2 rounded-md"
          style={{ background: "rgba(245,240,236,0.10)" }}
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-3 rounded"
            style={{ background: "rgba(245,240,236,0.06)", width: `${90 - i * 12}%` }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease }}
          />
        ))}
        <div className="flex gap-3 mt-auto">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="flex-1 h-20 rounded-xl"
              style={{
                background:
                  i === 1
                    ? "linear-gradient(135deg, rgba(255,138,61,0.22), rgba(255,61,119,0.22))"
                    : "rgba(245,240,236,0.05)",
                border: "1px solid rgba(245,240,236,0.06)",
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
            />
          ))}
        </div>
      </div>
    </Surface>
  );
}

/* 02 — Production : timeline / waveform */
function ProductionMock({ inView }: { inView: boolean }) {
  const bars = Array.from({ length: 28 });
  return (
    <Surface>
      <div className="flex flex-col h-full gap-4">
        <motion.div
          className="h-3 w-1/3 rounded"
          style={{ background: "rgba(245,240,236,0.10)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        />
        <div className="flex items-center justify-center gap-[3px] flex-1">
          {bars.map((_, i) => {
            const h = 20 + Math.abs(Math.sin(i * 0.9)) * 70;
            const hot = i > 9 && i < 15;
            return (
              <motion.div
                key={i}
                className="w-[4px] rounded-full"
                style={{
                  background: hot
                    ? "linear-gradient(to top, var(--sun-1), var(--sun-2))"
                    : "rgba(245,240,236,0.18)",
                }}
                initial={{ height: 4, opacity: 0 }}
                animate={inView ? { height: `${h}%`, opacity: 1 } : {}}
                transition={{ delay: i * 0.02, duration: 0.5, ease }}
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-8 rounded-lg flex-1"
              style={{ background: "rgba(245,240,236,0.05)", border: "1px solid rgba(245,240,236,0.06)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
            />
          ))}
        </div>
      </div>
    </Surface>
  );
}

/* 03 — Data : dashboard performance */
function DataMock({ inView }: { inView: boolean }) {
  const metrics = [
    { label: "ROAS", value: "4.2×", delta: "+18%", up: true },
    { label: "REVENU", value: "12.4k€", delta: "+24%", up: true },
    { label: "CPA", value: "8.30€", delta: "-11%", up: true },
  ];
  const bars = [40, 48, 44, 60, 56, 68, 64, 76, 72, 88, 84, 100];
  return (
    <Surface>
      <div className="flex flex-col h-full gap-3">
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--cream-faint)" }}>
          Aperçu des performances
        </p>
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              className="rounded-xl p-2.5"
              style={{ background: "rgba(245,240,236,0.05)", border: "1px solid rgba(245,240,236,0.07)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease }}
            >
              <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{ color: "var(--cream-faint)" }}>
                {m.label}
              </p>
              <p className="font-poppins font-bold text-[15px] leading-none mb-1" style={{ color: "var(--cream)" }}>
                {m.value}
              </p>
              <p className="font-poppins font-medium text-[10px] text-gradient">{m.delta}</p>
            </motion.div>
          ))}
        </div>
        <div
          className="flex-1 rounded-xl p-3 flex items-end gap-[5px]"
          style={{ background: "rgba(245,240,236,0.03)", border: "1px solid rgba(245,240,236,0.06)" }}
        >
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-[3px]"
              style={{
                background:
                  i === bars.length - 1
                    ? "linear-gradient(to top, var(--sun-1), var(--sun-2))"
                    : "rgba(245,240,236,0.12)",
              }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : {}}
              transition={{ delay: 0.25 + i * 0.04, duration: 0.6, ease }}
            />
          ))}
        </div>
      </div>
    </Surface>
  );
}

export default function DashboardMockup({ variant }: { variant: "strategy" | "production" | "data" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  return (
    <div ref={ref} className="w-full h-full min-h-[240px]">
      {variant === "strategy" && <StrategyMock inView={inView} />}
      {variant === "production" && <ProductionMock inView={inView} />}
      {variant === "data" && <DataMock inView={inView} />}
    </div>
  );
}
