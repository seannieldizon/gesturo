"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

type LottiePlayerProps = {
  src: string;
  loop?: boolean;
  className?: string;
};

/**
 * Uses lottie-web inside useEffect only (dynamic import). lottie-react + Turbopack/SSR
 * often leaves the player empty; loading the renderer on the client avoids that.
 */
export function LottiePlayer({ src, loop = true, className }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    (async () => {
      try {
        const [{ default: lottie }, res] = await Promise.all([
          import("lottie-web"),
          fetch(src),
        ]);
        if (cancelled) return;
        if (!res.ok) return;
        const data: unknown = await res.json();
        if (cancelled || !containerRef.current) return;
        if (!data || typeof data !== "object" || !("v" in data)) return;

        animRef.current?.destroy();
        animRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop,
          animationData: data,
          autoplay: true,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });
      } catch {
        /* ignore */
      }
    })();

    return () => {
      cancelled = true;
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [src, loop]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", minWidth: 1, minHeight: 1, overflow: "hidden" }}
    />
  );
}
