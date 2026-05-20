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
  { label: "Réalisations", href: "/realisations" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ background: "oklch(0.10 0.007 55 / 0.98)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden={!isOpen}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-sora font-light text-4xl transition-colors duration-200"
                  style={{ color: "oklch(0.78 0.010 68)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "oklch(0.93 0.012 70)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "oklch(0.78 0.010 68)")
                  }
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: navLinks.length * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full font-sora font-medium text-sm px-6 py-3 transition-all duration-200 active:scale-[0.97]"
              style={{
                background: "oklch(0.72 0.11 55)",
                color: "oklch(0.13 0.008 55)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "oklch(0.80 0.10 55)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "oklch(0.72 0.11 55)")
              }
            >
              Devis
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
