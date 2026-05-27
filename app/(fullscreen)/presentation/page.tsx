"use client";

import { useState } from "react";

export default function PresentationPage() {
  const [started, setStarted] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
      }}
    >
      {started ? (
        <iframe
          src="/nova-presentation/index.html"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setStarted(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "#050505",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              style={{ marginLeft: 3 }}
            >
              <path d="M0 0L22 12L0 24V0Z" fill="rgba(255,255,255,0.9)" />
            </svg>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "system-ui, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Cliquer pour lancer
          </p>
        </button>
      )}
    </div>
  );
}
