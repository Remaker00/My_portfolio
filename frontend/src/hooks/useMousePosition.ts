"use client";

import { useEffect, useState } from "react";

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let nextX = 0.5;
    let nextY = 0.5;

    const handleMove = (e: MouseEvent) => {
      nextX = e.clientX / window.innerWidth;
      nextY = e.clientY / window.innerHeight;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setPosition({ x: nextX, y: nextY });
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return position;
}
