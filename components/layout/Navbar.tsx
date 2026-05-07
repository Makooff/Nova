"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Process", href: "/process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-sora font-semibold text-[17px] text-black tracking-tight"
          >
            Nova
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sora font-light text-sm text-mid hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://qwillio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sora font-light text-sm text-mid hover:text-black transition-colors"
            >
              <QwillioLogo size={18} />
              <QwillioName size="14px" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-black text-white font-sora font-medium text-[12px] px-4 py-[7px] hover:bg-dark transition-colors"
            >
              Devis
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-[5px] p-1 z-50 relative"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span
                className={`block w-5 h-px bg-black transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-black transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-black transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
