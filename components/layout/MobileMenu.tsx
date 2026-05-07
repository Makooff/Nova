"use client";

import Link from "next/link";
import { useEffect } from "react";
import QwillioLogo from "@/components/ui/QwillioLogo";
import QwillioName from "@/components/ui/QwillioName";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`mobile-menu fixed inset-0 z-40 bg-white flex flex-col items-center justify-center ${
        isOpen ? "open" : ""
      }`}
      aria-hidden={!isOpen}
    >
      <nav className="flex flex-col items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-sora font-light text-4xl text-black hover:text-mid transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="https://qwillio.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center gap-2 font-sora font-light text-4xl"
        >
          <QwillioLogo size={28} />
          <QwillioName />
        </Link>
      </nav>
      <div className="mt-12">
        <Link
          href="/contact"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-full bg-black text-white font-sora font-medium text-sm px-6 py-3 hover:bg-dark transition-colors"
        >
          Devis
        </Link>
      </div>
    </div>
  );
}
