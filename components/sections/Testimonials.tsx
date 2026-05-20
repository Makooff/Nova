"use client";

import { useRef } from "react";
import { motion, useInView, cubicBezier, type Variants } from "framer-motion";

const easeExpo = cubicBezier(0.16, 1, 0.3, 1);

const testimonials = [
  {
    quote:
      "Nova a transformé notre communication visuelle. Le ROAS de nos campagnes a plus que quadruplé en trois mois. Une équipe réactive et vraiment créative.",
    name: "Sophie Marchand",
    role: "Directrice Marketing, Groupe Belux",
    initials: "SM",
  },
  {
    quote:
      "La vidéo produite pour notre lancement a généré 2,3 millions de vues organiques. Le retour sur investissement est exceptionnel — je recommande sans hésiter.",
    name: "Antoine Leroy",
    role: "CEO, TechStart Brussels",
    initials: "AL",
  },
  {
    quote:
      "Process fluide, équipe à l&apos;écoute et résultat qui dépasse nos attentes. Les agents IA Qwillio inclus dans le partenariat sont un vrai plus pour notre gestion.",
    name: "Claire Dumont",
    role: "Co-fondatrice, Atelier Nord",
    initials: "CD",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.75, ease: easeExpo },
  }),
};

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="oklch(0.72 0.11 55)">
      <path d="M7 1L8.6 5.3H13.2L9.6 8L10.9 12.3L7 9.7L3.1 12.3L4.4 8L0.8 5.3H5.4L7 1Z" />
    </svg>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="py-20 px-5"
      style={{ background: "oklch(0.10 0.007 55)" }}
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
            style={{ color: "oklch(0.42 0.007 62)" }}
          >
            Ce qu&apos;ils disent
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: "-0.04em",
              color: "oklch(0.93 0.012 70)",
            }}
          >
            Témoignages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="rounded-[14px] p-7 flex flex-col h-full"
              style={{
                background: "oklch(0.13 0.008 55)",
                border: "1px solid oklch(0.26 0.008 55)",
              }}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p
                className="font-sora font-light text-[15px] leading-relaxed flex-1 mb-6"
                style={{ color: "oklch(0.78 0.010 68)" }}
              >
                &quot;{t.quote}&quot;
              </p>
              <div
                className="pt-5 flex items-center gap-3"
                style={{ borderTop: "1px solid oklch(0.26 0.008 55)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.72 0.11 55 / 0.15)", border: "1px solid oklch(0.72 0.11 55 / 0.3)" }}
                >
                  <span
                    className="font-sora font-medium text-[11px]"
                    style={{ color: "oklch(0.72 0.11 55)" }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p
                    className="font-sora font-medium text-[13px]"
                    style={{ color: "oklch(0.93 0.012 70)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-sora font-light text-[11px]"
                    style={{ color: "oklch(0.42 0.007 62)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
