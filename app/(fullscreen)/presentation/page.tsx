"use client";

import { useState } from "react";

const PRESENTATION_URL =
  `https://pub-a93d9300f3144cee9101e92c2ba03175.r2.dev/${encodeURIComponent("Vidéo")}/${encodeURIComponent("48A22DD7-4B93-4DCE-BC1C-13C3FBD13E25.mov")}`;

export default function PresentationPage() {
  const [started, setStarted] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#050505" }}>
      {started ? (
        <video
          src={PRESENTATION_URL}
          autoPlay
          controls
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <button
          onClick={() => setStarted(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            background: "#050505", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "28px",
          }}
        >
          <div style={{ width: 88, height: 88, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
            <svg width="22" height="24" viewBox="0 0 22 24" style={{ marginLeft: 3 }}>
              <path d="M0 0L22 12L0 24V0Z" fill="rgba(255,255,255,0.9)" />
            </svg>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "system-ui, sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
            Cliquer pour lancer
          </p>
        </button>
      )}
    </div>
  );
}
