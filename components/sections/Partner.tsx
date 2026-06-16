"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";

const features = [
  { title: "Réceptionniste IA", desc: "Agent vocal et textuel — accueil, qualification et redirection 24h/24" },
  { title: "Email AI",          desc: "Boîte mail automatisée — lecture, classification, réponses et relances" },
  { title: "Payments AI",       desc: "Paiements SMS via Stripe, dépôts automatiques, dashboard revenus" },
  { title: "Sites web sur mesure", desc: "Non proposé sur Qwillio.com — exclusif clients Fovea" },
];

export default function Partner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} id="partenaire" className="py-20 px-5" style={{ background: "oklch(0.10 0 0)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider mb-6" style={{ color: "oklch(0.38 0 0)" }}>
              Partenaire Exclusif
            </p>
            <div className="flex items-center gap-3 mb-6">
              <QwillioLogo size={44} />
              <QwillioName size="44px" />
            </div>
            <p className="font-sora font-light text-sm leading-relaxed mb-8 max-w-md" style={{ color: "oklch(0.45 0 0)" }}>
              Qwillio propose au grand public une réceptionniste IA, un agent Email AI et un agent Payments AI.
              En plus, Qwillio conçoit des sites web sur mesure — uniquement pour les clients Fovea.
              Un avantage exclusif inclus dans le partenariat.
            </p>
            <Link
              href="https://qwillio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-sora font-light text-sm transition-colors"
              style={{ color: "oklch(0.75 0 0)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.75 0 0)")}
            >
              Visiter Qwillio.com
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1.5 shrink-0">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          <div className="flex flex-col" style={{ borderTop: "1px solid oklch(0.16 0 0)" }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="py-5"
                style={{ borderBottom: "1px solid oklch(0.16 0 0)" }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-sora font-medium text-sm leading-snug mb-0.5" style={{ color: "oklch(0.96 0 0)" }}>
                  {f.title}
                </p>
                <p className="font-sora font-light text-xs leading-relaxed" style={{ color: "oklch(0.45 0 0)" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
