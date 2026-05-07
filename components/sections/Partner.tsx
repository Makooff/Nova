import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";

const features = [
  {
    title: "Réceptionniste IA",
    desc: "Agent vocal et textuel — accueil, qualification et redirection 24h/24",
  },
  {
    title: "Email AI",
    desc: "Boîte mail automatisée — lecture, classification, réponses et relances",
  },
  {
    title: "Payments AI",
    desc: "Paiements SMS via Stripe, dépôts automatiques, dashboard revenus",
  },
  {
    title: "Sites web sur mesure",
    desc: "Non proposé sur Qwillio.com — exclusif clients Nova",
  },
];

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block ml-1.5 shrink-0">
      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
            <p className="font-sora font-light text-sm text-mid leading-relaxed mb-8 max-w-md">
              Qwillio propose au grand public une réceptionniste IA, un agent Email AI
              et un agent Payments AI. En plus de ça, Qwillio conçoit des sites web
              sur mesure — mais uniquement pour les clients Nova, sans les proposer
              sur leur site public. Un avantage exclusif inclus dans le partenariat Nova.
            </p>
            <Link
              href="https://qwillio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-sora font-light text-sm text-black underline underline-offset-4 hover:text-mid transition-colors"
            >
              Visiter Qwillio.com
              <ArrowRight />
            </Link>
          </RevealWrapper>

          <div className="flex flex-col divide-y divide-border">
            {features.map((f, i) => (
              <RevealWrapper key={i} delay={i * 80}>
                <div className="py-4">
                  <p className="font-sora font-medium text-sm text-black leading-snug mb-0.5">
                    {f.title}
                  </p>
                  <p className="font-sora font-light text-xs text-mid leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
