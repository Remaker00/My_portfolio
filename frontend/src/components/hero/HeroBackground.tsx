"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; size: number };

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const mouse = useMousePosition(!reduced);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: Math.random() * 1.5 + 0.5,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx + (mouse.x - 0.5) * 0.00008;
        p.y += p.vy + (mouse.y - 0.5) * 0.00008;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(129, 140, 248, 0.35)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mouse.x, mouse.y, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at ${mouse.x * 100}% ${mouse.y * 100}%,
              rgba(129, 140, 248, 0.18),
              transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 15%,
              rgba(167, 139, 250, 0.12),
              transparent 50%),
            radial-gradient(ellipse 60% 50% at 10% 80%,
              rgba(99, 102, 241, 0.1),
              transparent 55%)
          `,
        }}
      />
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]"
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-1/4 h-[420px] w-[420px] rounded-full bg-glow/15 blur-[100px]"
        animate={reduced ? undefined : { x: [0, -35, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-accent/10 via-transparent to-glow/10 animate-gradient-shift"
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {!reduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
    </div>
  );
}
