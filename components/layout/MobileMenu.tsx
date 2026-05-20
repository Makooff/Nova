"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Ads", href: "/campagne-ads" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/apropos" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ background: "oklch(0.06 0 0 / 0.98)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col items-center gap-7">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-sora font-light text-3xl transition-colors duration-200"
                  style={{ color: "oklch(0.65 0 0)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.96 0 0)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.65 0 0)")}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: navLinks.length * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-all duration-200 active:scale-[0.97]"
              style={{ background: "oklch(0.96 0 0)", color: "oklch(0.06 0 0)" }}
            >
              Contact
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
