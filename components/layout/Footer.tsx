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
    <footer className="bg-[#1d1d1f] text-white">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-sora font-semibold text-[17px] mb-3">Nova</p>
            <p className="font-sora font-light text-sm text-white/40 max-w-[200px] leading-relaxed">
              Agence de production vidéo publicitaire en Belgique et en France.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/35 mb-4">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-sora font-light text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/35 mb-4">
              Agence
            </p>
            <ul className="flex flex-col gap-2.5">
              {agency.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="font-sora font-light text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/35 mb-4">
              Partenaire
            </p>
            <Link
              href="https://qwillio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <QwillioLogo size={20} />
              <QwillioName size="15px" />
            </Link>
            <p className="font-sora font-light text-xs text-white/35 mt-2 max-w-[160px] leading-relaxed">
              Agents IA et réceptionniste digitale exclusifs Nova.
            </p>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="font-sora font-light text-xs text-white/30">
            &copy; {new Date().getFullYear()} Nova. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sora font-light text-xs text-white/30 hover:text-white/60 transition-colors"
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
