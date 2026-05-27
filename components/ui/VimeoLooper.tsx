"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface Props {
  vimeoId: string;
  scale?: number;
  /** ms before crossfading from thumbnail to live video */
  delay?: number;
}

export default function VimeoLooper({ vimeoId, scale = 1.06, delay = 4000 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px 0px" });
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setVideoReady(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      {/* Vimeo iframe — loads when approaching viewport */}
      {inView && (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&background=1&loop=1&quality=360p&dnt=1`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
        />
      )}

      {/* Thumbnail — visible immediately, fades out once video is ready */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://vumbnail.com/${vimeoId}.jpg`}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          opacity: videoReady ? 0 : 1,
          transition: "opacity 1.2s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
