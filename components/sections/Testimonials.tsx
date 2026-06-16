"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    name: "Sophie Marchand",
    when: "Il y a 2 mois",
    initials: "SM",
    color: "#FF8A3D",
    quote:
      "Fovea a transformé notre communication visuelle. Le ROAS de nos campagnes a plus que quadruplé en trois mois. Une équipe réactive et vraiment créative.",
  },
  {
    name: "Antoine Leroy",
    when: "Il y a 2 mois",
    initials: "AL",
    color: "#FF3D77",
    quote:
      "La vidéo produite pour notre lancement a généré 2,3 millions de vues organiques. Le retour sur investissement est exceptionnel — je recommande sans hésiter.",
  },
  {
    name: "Claire Dumont",
    when: "Il y a 3 mois",
    initials: "CD",
    color: "#FF6B4D",
    quote:
      "Process fluide, équipe à l'écoute et résultat qui dépasse nos attentes. On se sent vraiment accompagné du brief jusqu'à la diffusion.",
  },
  {
    name: "Karim Benali",
    when: "Il y a 1 mois",
    initials: "KB",
    color: "#FF8A3D",
    quote:
      "Attirer du monde vers ma boutique n'était pas évident. Grâce à Fovea, ma présence sur les réseaux a explosé et les ventes ont suivi.",
  },
  {
    name: "Élodie Renard",
    when: "Il y a 3 mois",
    initials: "ER",
    color: "#FF3D77",
    quote:
      "Très bonne expérience. L'équipe prend le temps pendant le tournage, surtout avec les personnes pas à l'aise devant la caméra. On se sent en confiance.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FFB400">
          <path d="M7 1L8.6 5.3H13.2L9.6 8L10.9 12.3L7 9.7L3.1 12.3L4.4 8L0.8 5.3H5.4L7 1Z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.05l3.01-2.33z" fill="#FBBC05" />
      <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="py-28" style={{ background: "var(--ink)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <motion.h2
          className="font-poppins font-extrabold text-center mb-14"
          style={{ fontSize: "clamp(30px, 4.6vw, 54px)", letterSpacing: "-0.03em", color: "var(--cream)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          Ce que disent nos <span className="text-gradient">clients.</span>
        </motion.h2>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Arrows */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Précédent"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center transition-colors"
          style={{ border: "1px solid var(--rule)", background: "rgba(14,11,16,0.7)", color: "var(--cream-dim)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Suivant"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center transition-colors"
          style={{ border: "1px solid var(--rule)", background: "rgba(14,11,16,0.7)", color: "var(--cream-dim)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <motion.div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-5 md:px-14 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[300px] md:w-[360px] rounded-2xl p-6 flex flex-col"
              style={{ background: "var(--ink-2)", border: "1px solid var(--rule)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: t.color }}
                >
                  <span className="font-poppins font-bold text-[13px] text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="font-poppins font-semibold text-[14px]" style={{ color: "var(--cream)" }}>{t.name}</p>
                  <p className="font-poppins text-[11px]" style={{ color: "var(--cream-faint)" }}>{t.when}</p>
                </div>
              </div>
              <p className="font-poppins font-normal text-[14px] leading-relaxed flex-1 mb-5" style={{ color: "var(--cream-dim)" }}>
                {t.quote}
              </p>
              <div className="flex items-center justify-between">
                <Stars />
                <GoogleG />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
