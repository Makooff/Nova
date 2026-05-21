"use client";

import Link from "next/link";
import Image from "next/image";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";

const services = [
  { label: "Production Vidéo", href: "/services#video" },
  { label: "Campagne Ads", href: "/campagne-ads" },
  { label: "Agents IA", href: "/services#ia" },
  { label: "Tarifs", href: "/contact" },
];

const agency = [
  { label: "À propos", href: "/apropos" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/politique-de-confidentialite" },
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.06 0 0)" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Image
                src="/logo-nova.png"
                alt="Nova"
                width={72}
                height={24}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="font-sora font-light text-sm max-w-[200px] leading-relaxed" style={{ color: "oklch(0.35 0 0)" }}>
              Agence de production vidéo publicitaire en Belgique et en France.
            </p>
          </div>

          {[{ label: "Services", links: services }, { label: "Agence", links: agency }].map((col) => (
            <div key={col.label}>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: "oklch(0.28 0 0)" }}>
                {col.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="font-sora font-light text-sm transition-colors duration-200"
                      style={{ color: "oklch(0.38 0 0)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.75 0 0)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.38 0 0)")}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: "oklch(0.28 0 0)" }}>
              Partenaire
            </p>
            <Link href="https://qwillio.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mb-2">
              <QwillioLogo size={20} />
              <QwillioName size="15px" />
            </Link>
            <p className="font-sora font-light text-xs max-w-[160px] leading-relaxed" style={{ color: "oklch(0.28 0 0)" }}>
              Agents IA et réceptionniste digitale exclusifs Nova.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid oklch(0.12 0 0)" }}>
          <p className="font-sora font-light text-xs" style={{ color: "oklch(0.28 0 0)" }}>
            &copy; {new Date().getFullYear()} Nova. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sora font-light text-xs transition-colors duration-200"
                style={{ color: "oklch(0.28 0 0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.55 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.28 0 0)")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
