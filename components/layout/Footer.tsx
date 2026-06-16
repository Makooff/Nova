"use client";

import Link from "next/link";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/politique-de-confidentialite" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", borderTop: "1px solid var(--rule)" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 800,
                  fontSize: "26px",
                  letterSpacing: "-0.02em",
                  color: "var(--cream)",
                }}
              >
                FOVEA
              </span>
              <span
                className="inline-block w-[8px] h-[8px] rounded-full"
                style={{ background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))" }}
              />
            </Link>
            <p className="font-poppins font-normal text-sm max-w-[260px] leading-relaxed" style={{ color: "var(--cream-faint)" }}>
              Agence de production vidéo publicitaire en Belgique et en France.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-poppins font-medium text-sm transition-colors duration-200"
                style={{ color: "var(--cream-dim)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--rule)" }}>
          <p className="font-poppins text-xs" style={{ color: "var(--cream-faint)" }}>
            &copy; {new Date().getFullYear()} Fovea. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-poppins text-xs transition-colors duration-200"
                style={{ color: "var(--cream-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-faint)")}
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
