import type { Metadata } from "next";
import RevealWrapper from "@/components/ui/RevealWrapper";
import RealisationsGrid from "@/components/sections/RealisationsGrid";

export const metadata: Metadata = {
  title: "Réalisations — Fovea | Portfolio Vidéo Publicitaire",
  description:
    "Découvrez nos réalisations vidéo pour des clients en Belgique et en France : spots publicitaires, films corporate, créatifs Ads.",
};

export default function RealisationsPage() {
  return (
    <main className="pt-[60px]" style={{ background: "oklch(0.06 0 0)" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-12">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.38 0 0)" }}
            >
              Notre travail
            </p>
            <h1
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Réalisations
            </h1>
          </RevealWrapper>

          <RealisationsGrid />
        </div>
      </section>
    </main>
  );
}
