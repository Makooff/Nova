"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventZoom, { passive: false });
    document.addEventListener("gesturestart", preventGestureZoom);
    document.addEventListener("gesturechange", preventGestureZoom);

    return () => {
      document.removeEventListener("touchmove", preventZoom);
      document.removeEventListener("gesturestart", preventGestureZoom);
      document.removeEventListener("gesturechange", preventGestureZoom);
    };
  }, []);

  return null;
}
