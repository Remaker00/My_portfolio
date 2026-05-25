"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";

export function AboutBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgb(var(--background))_85%)]" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129,140,248,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,140,248,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-[100px]"
        animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-glow/10 blur-[90px]"
        animate={reduced ? undefined : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
