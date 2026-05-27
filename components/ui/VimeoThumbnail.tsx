"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

interface Props {
  vimeoId: string;
  seekTo?: number;
  vertical?: boolean;
}

export default function VimeoThumbnail({ vimeoId, seekTo = 0 }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);

    // Wait for first play event (video buffered enough), then seek and pause
    const handlePlay = () => {
      player.off("play", handlePlay);
      player.setCurrentTime(seekTo).then(() => {
        player.pause();
      }).catch(() => {
        // Retry once if seek fails
        setTimeout(() => {
          player.setCurrentTime(seekTo).then(() => player.pause()).catch(() => {});
        }, 600);
      });
    };

    player.on("play", handlePlay);

    return () => {
      player.off("play", handlePlay);
      player.destroy();
    };
  }, [vimeoId, seekTo]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&background=1&loop=0&quality=auto`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ transform: "scale(1.06)" }}
      frameBorder="0"
      allow="autoplay; fullscreen"
    />
  );
}
