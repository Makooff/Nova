import RevealWrapper from "@/components/ui/RevealWrapper";

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

export default function Testimonials() {
  return (
    <section className="py-20 px-5 bg-ghost">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-3">
            Ce qu&apos;ils disent
          </p>
          <h2
            className="font-sora font-thin tracking-tighter"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em" }}
          >
            Témoignages
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <RevealWrapper key={i} delay={i * 80}>
              <div className="testimonial-card bg-white border border-border rounded-[14px] p-7 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#1d1d1f">
                      <path d="M7 1L8.6 5.3H13.2L9.6 8L10.9 12.3L7 9.7L3.1 12.3L4.4 8L0.8 5.3H5.4L7 1Z" />
                    </svg>
                  ))}
                </div>
                <p className="font-sora font-light text-[17px] text-black leading-relaxed flex-1 mb-6">
                  &quot;{t.quote}&quot;
                </p>
                <div className="border-t border-border pt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shrink-0">
                    <span className="font-sora font-medium text-[11px] text-white">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-sora font-medium text-[13px] text-black">
                      {t.name}
                    </p>
                    <p className="font-sora font-light text-[11px] text-mid">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
