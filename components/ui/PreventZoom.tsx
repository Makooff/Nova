"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    const forceReset = () => {
      const meta = document.querySelector('meta[name="viewport"]');
      if (!meta) return;
      meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no");
    };

    const checkZoom = () => {
      const scale = window.visualViewport?.scale ?? 1;
      if (scale < 0.99) {
        forceReset();
        // Force browser to re-evaluate by toggling the value
        setTimeout(forceReset, 30);
        setTimeout(forceReset, 100);
      }
    };

    const blockMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    const blockGesture = (e: Event) => e.preventDefault();

    window.visualViewport?.addEventListener("resize", checkZoom);
    window.visualViewport?.addEventListener("scroll", checkZoom);
    document.addEventListener("touchstart", blockMultiTouch, { passive: false });
    document.addEventListener("touchmove", blockMultiTouch, { passive: false });
    document.addEventListener("gesturestart", blockGesture);
    document.addEventListener("gesturechange", blockGesture);
    document.addEventListener("gestureend", blockGesture);

    // Reset on page focus (e.g. coming back from AA menu)
    window.addEventListener("focus", forceReset);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) forceReset();
    });

    forceReset();

    return () => {
      window.visualViewport?.removeEventListener("resize", checkZoom);
      window.visualViewport?.removeEventListener("scroll", checkZoom);
      document.removeEventListener("touchstart", blockMultiTouch);
      document.removeEventListener("touchmove", blockMultiTouch);
      document.removeEventListener("gesturestart", blockGesture);
      document.removeEventListener("gesturechange", blockGesture);
      document.removeEventListener("gestureend", blockGesture);
      window.removeEventListener("focus", forceReset);
    };
  }, []);

  return null;
}
