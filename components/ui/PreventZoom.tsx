"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');

    const resetZoom = () => {
      if (!meta) return;
      if (window.visualViewport && window.visualViewport.scale !== 1) {
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        );
        setTimeout(() => {
          meta.setAttribute(
            "content",
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          );
        }, 50);
      }
    };

    const preventTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    window.visualViewport?.addEventListener("resize", resetZoom);
    document.addEventListener("touchmove", preventTouchZoom, { passive: false });
    document.addEventListener("touchstart", preventTouchZoom, { passive: false });
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    return () => {
      window.visualViewport?.removeEventListener("resize", resetZoom);
      document.removeEventListener("touchmove", preventTouchZoom);
      document.removeEventListener("touchstart", preventTouchZoom);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return null;
}
