"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 120, suffix: "+", label: "Vidéos produites" },
  { value: 85, suffix: "+", label: "Clients" },
  { value: 4, suffix: "×", label: "ROAS moyen" },
  { value: 2, suffix: "", label: "Marchés BE & FR" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  active,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  index: number;
}) {
  const count = useCountUp(value, 1200, active);

  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6"
      style={{
        borderRight: index < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : undefined,
      }}
    >
      <p
        className="font-sora font-thin text-white leading-none mb-2"
        style={{ fontSize: "54px", letterSpacing: "-0.04em" }}
      >
        {count}{suffix}
      </p>
      <p className="font-sora text-[13px] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#1d1d1f]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} index={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
