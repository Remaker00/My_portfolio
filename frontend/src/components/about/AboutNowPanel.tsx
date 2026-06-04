"use client";

import { aboutNow } from "@/constants/about";
import { GlassCard } from "@/components/about/GlassCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";
import { Radio } from "lucide-react";

export function AboutNowPanel() {
  const reduced = usePrefersReducedMotion();

  return (
    <GlassCard glow className="h-full">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          {!reduced && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          Currently
        </span>
        <Radio size={14} className="ml-auto text-muted" />
      </div>
      <ul className="space-y-3">
        {aboutNow.map((line, i) => (
          <motion.li
            key={line}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-2 text-sm text-muted"
          >
            <span className="font-mono text-accent/80">→</span>
            <span className="text-foreground/90">{line}</span>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  );
}
