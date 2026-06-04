"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let destroyed = false;
    let lenis: { destroy: () => void; raf: (time: number) => void } | null =
      null;
    let frame = 0;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const init = () => {
      if (destroyed) return;
      import("lenis").then(({ default: Lenis }) => {
        if (destroyed) return;
        document.documentElement.classList.add("lenis");
        lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        const raf = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    };

    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(init, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(init, 1200);
    }

    return () => {
      destroyed = true;
      if (idleId !== undefined) cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return <>{children}</>;
}
