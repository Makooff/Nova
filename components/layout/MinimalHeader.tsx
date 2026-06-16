"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MinimalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center px-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scrolled ? "rgba(14, 11, 16, 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="select-none flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 800,
              fontSize: "22px",
              letterSpacing: "-0.02em",
              color: "var(--cream)",
            }}
          >
            FOVEA
          </span>
          <span
            className="inline-block w-[7px] h-[7px] rounded-full"
            style={{ background: "linear-gradient(120deg, var(--sun-1), var(--sun-2))" }}
          />
        </Link>

        <div className="flex items-center gap-2.5">
          <Link
            href="/realisations"
            className="hidden sm:inline-flex items-center font-poppins font-medium text-[13px] transition-colors duration-200"
            style={{ color: "var(--cream-dim)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-dim)")}
          >
            Réalisations
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full font-poppins font-semibold text-[12px] uppercase tracking-wide px-4 py-[9px] transition-all duration-200 active:scale-[0.97]"
            style={{
              border: "1px solid rgba(245,240,236,0.25)",
              color: "var(--cream)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--sun-2)";
              e.currentTarget.style.background = "rgba(255,61,119,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,240,236,0.25)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
