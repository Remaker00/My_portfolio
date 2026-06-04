"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; size: number };

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition(!reduced && !isMobile && isVisible);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || isMobile || !isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = Array.from({ length: 24 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: Math.random() * 1.2 + 0.4,
    }));

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx + (mouse.x - 0.5) * 0.00006;
        p.y += p.vy + (mouse.y - 0.5) * 0.00006;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(129, 140, 248, 0.3)";
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mouse.x, mouse.y, reduced, isMobile, isVisible]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at ${mouse.x * 100}% ${mouse.y * 100}%,
              rgba(129, 140, 248, 0.18),
              transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 15%,
              rgba(167, 139, 250, 0.12),
              transparent 50%)
          `,
        }}
      />
      <div
        className={cn(
          "absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]",
          !reduced && "animate-float"
        )}
      />
      <div
        className={cn(
          "absolute -right-1/4 bottom-1/4 h-[420px] w-[420px] rounded-full bg-glow/15 blur-[100px]",
          !reduced && "animate-float [animation-delay:1.5s]"
        )}
      />
      <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-accent/10 via-transparent to-glow/10 animate-gradient-shift" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {!reduced && !isMobile && isVisible && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-50"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
    </div>
  );
}
