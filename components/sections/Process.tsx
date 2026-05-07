"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "1",
    label: "Brief",
    title: "Stratégie & Brief",
    desc: "Appel découverte, objectifs, angle créatif, plateforme et budget.",
  },
  {
    num: "2",
    label: "Production",
    title: "Tournage",
    desc: "Équipe technique, direction artistique, plateau ou terrain BE & FR.",
  },
  {
    num: "3",
    label: "Post-production",
    title: "Montage & Formats",
    desc: "Post-prod, retours client, déclinaisons Reels/Stories/YouTube/Display.",
  },
  {
    num: "4",
    label: "Lancement",
    title: "Diffusion & Suivi",
    desc: "Lancement campagne, suivi des performances, optimisation continue.",
  },
];

export default function Process() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("visible");
            }, i * 120);
            observer.unobserve(el);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="process" className="bg-[#1d1d1f] py-20 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/35 mb-3">
            Comment on travaille
          </p>
          <h2
            className="font-sora font-thin text-white tracking-tighter"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em" }}
          >
            Notre process
          </h2>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="process-step grid gap-6 pb-10"
              style={{ gridTemplateColumns: "80px 1fr" }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <span className="font-sora font-light text-sm text-white/60">
                    {step.num}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 w-px mt-3"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                )}
              </div>
              <div className="pb-2">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/35 mb-2">
                  {step.label}
                </p>
                <h3 className="font-sora font-light text-[28px] text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p
                  className="font-sora font-light text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
