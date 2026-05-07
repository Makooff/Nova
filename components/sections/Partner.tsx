import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";

const features = [
  {
    title: "Réceptionniste IA",
    desc: "Agent vocal et textuel — accueil et qualification 24h/24",
  },
  {
    title: "Agents IA de gestion",
    desc: "Automatisation des process — suivi, relances, reporting",
  },
  {
    title: "Sites web (exclusif Nova)",
    desc: "Non vendu au public — uniquement pour les clients Nova",
  },
];

export default function Partner() {
  return (
    <section id="partenaire" className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <RevealWrapper>
            <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-6">
              Partenaire Exclusif
            </p>
            <div className="flex items-center gap-3 mb-6">
              <QwillioLogo size={44} />
              <QwillioName size="44px" />
            </div>
            <p className="font-sora font-light text-sm text-mid leading-relaxed mb-6 max-w-md">
              Qwillio vend au grand public des réceptionnistes IA, des agents IA
              et des solutions de gestion d&apos;entreprise par IA. En dehors de
              ça, Qwillio crée également des sites web — mais uniquement pour
              les clients Nova, sans les proposer sur leur site public. Un
              avantage exclusif inclus dans le partenariat Nova.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-ghost px-4 py-2 mb-6">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#5B6BF5" }}
              />
              <span className="font-sora font-light text-xs text-mid">
                Accessible uniquement aux clients Nova
              </span>
            </div>
            <div>
              <Link
                href="https://qwillio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sora font-light text-sm text-black underline underline-offset-4 hover:text-mid transition-colors"
              >
                Visiter Qwillio.com &#8599;
              </Link>
            </div>
          </RevealWrapper>

          <div className="flex flex-col gap-4">
            {features.map((f, i) => (
              <RevealWrapper key={i} delay={i * 100}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-border">
                  <div
                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #5B6BF5, #9B5CF6)" }}
                  >
                    <QwillioLogo size={16} />
                  </div>
                  <div>
                    <p className="font-sora font-medium text-sm text-black mb-1">
                      {f.title}
                    </p>
                    <p className="font-sora font-light text-xs text-mid leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
