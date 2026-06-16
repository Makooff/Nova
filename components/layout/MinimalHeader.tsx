"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MinimalHeader() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center px-5"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="select-none">
          <span
            style={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: "-0.01em",
              color: "oklch(0.96 0 0)",
            }}
          >
            FOVEA
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/realisations"
            className="inline-flex items-center justify-center rounded-full font-sora font-medium text-[12px] px-4 py-[7px] transition-all duration-200 active:scale-[0.97]"
            style={{ border: "1px solid oklch(0.26 0 0)", color: "oklch(0.60 0 0)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.48 0 0)";
              e.currentTarget.style.color = "oklch(0.96 0 0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.26 0 0)";
              e.currentTarget.style.color = "oklch(0.60 0 0)";
            }}
          >
            Réalisations
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full font-sora font-medium text-[12px] px-4 py-[7px] transition-all duration-200 active:scale-[0.97]"
            style={{ background: "oklch(0.96 0 0)", color: "oklch(0.06 0 0)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.82 0 0)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.96 0 0)")}
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
