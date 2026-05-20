"use client";

import Link from "next/link";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";

const services = [
  { label: "Production Vidéo", href: "/services#video" },
  { label: "Campagnes Ads", href: "/services#ads" },
  { label: "Agents IA", href: "/services#ia" },
  { label: "Tarifs", href: "/contact" },
];

const agency = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/politique-de-confidentialite" },
  { label: "CGV", href: "/mentions-legales#cgv" },
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.10 0.007 55)" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p
              className="font-sora font-semibold text-[17px] mb-3"
              style={{ color: "oklch(0.93 0.012 70)" }}
            >
              Nova
            </p>
            <p
              className="font-sora font-light text-sm max-w-[200px] leading-relaxed"
              style={{ color: "oklch(0.42 0.007 62)" }}
            >
              Agence de production vidéo publicitaire en Belgique et en France.
            </p>
          </div>

          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.32 0.007 60)" }}
            >
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-sora font-light text-sm transition-colors duration-200"
                    style={{ color: "oklch(0.42 0.007 62)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "oklch(0.78 0.010 68)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "oklch(0.42 0.007 62)")
                    }
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.32 0.007 60)" }}
            >
              Agence
            </p>
            <ul className="flex flex-col gap-2.5">
              {agency.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="font-sora font-light text-sm transition-colors duration-200"
                    style={{ color: "oklch(0.42 0.007 62)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "oklch(0.78 0.010 68)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "oklch(0.42 0.007 62)")
                    }
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.32 0.007 60)" }}
            >
              Partenaire
            </p>
            <Link
              href="https://qwillio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group mb-2"
            >
              <QwillioLogo size={20} />
              <QwillioName size="15px" />
            </Link>
            <p
              className="font-sora font-light text-xs max-w-[160px] leading-relaxed"
              style={{ color: "oklch(0.32 0.007 60)" }}
            >
              Agents IA et réceptionniste digitale exclusifs Nova.
            </p>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.20 0.007 55)" }}
        >
          <p
            className="font-sora font-light text-xs"
            style={{ color: "oklch(0.32 0.007 60)" }}
          >
            &copy; {new Date().getFullYear()} Nova. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sora font-light text-xs transition-colors duration-200"
                style={{ color: "oklch(0.32 0.007 60)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(0.52 0.008 65)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "oklch(0.32 0.007 60)")
                }
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
