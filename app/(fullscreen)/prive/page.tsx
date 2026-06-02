"use client";

import RealisationsGrid from "@/components/sections/RealisationsGrid";

export default function PrivePage() {
  return (
    <main style={{ background: "oklch(0.06 0 0)", minHeight: "100dvh" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RealisationsGrid />

          <div className="mt-3">
            <video
              src="/videos/larookie-mrare.mov"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full rounded-[14px]"
              style={{
                aspectRatio: "16/9",
                objectFit: "cover",
                border: "1px solid oklch(0.18 0 0)",
                background: "oklch(0.08 0 0)",
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
