"use client";

import { useEffect, useState } from "react";

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  return position;
}
