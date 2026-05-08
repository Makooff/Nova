"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    const getMetaViewport = () =>
      document.querySelector('meta[name="viewport"]');

    const resetScale = () => {
      const meta = getMetaViewport();
      if (!meta) return;
      // Toggle minimum-scale to force iOS Safari to snap back to 1
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      );
    };

    const handleTouchEnd = () => {
      const scale = window.visualViewport?.scale ?? 1;
      if (scale !== 1) {
        resetScale();
      }
    };

    const handleViewportResize = () => {
      const scale = window.visualViewport?.scale ?? 1;
      if (scale < 0.99 || scale > 1.01) {
        // Small delay to let the gesture finish, then snap back
        setTimeout(resetScale, 0);
        setTimeout(resetScale, 100);
        setTimeout(resetScale, 300);
      }
    };

    const blockGesture = (e: Event) => e.preventDefault();

    window.visualViewport?.addEventListener("resize", handleViewportResize);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("gesturestart", blockGesture);
    document.addEventListener("gesturechange", blockGesture);
    document.addEventListener("gestureend", resetScale);
    window.addEventListener("focus", resetScale);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) resetScale();
    });

    resetScale();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("gesturestart", blockGesture);
      document.removeEventListener("gesturechange", blockGesture);
      document.removeEventListener("gestureend", resetScale);
      window.removeEventListener("focus", resetScale);
    };
  }, []);

  return null;
}
