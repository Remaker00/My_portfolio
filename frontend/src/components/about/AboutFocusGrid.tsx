"use client";

import { aboutFocus } from "@/constants/about";
import { GlassCard } from "@/components/about/GlassCard";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";

export function AboutFocusGrid() {
  const reduced = usePrefersReducedMotion();

  return (
    <div>
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
        What I do
      </p>
      <RevealStagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {aboutFocus.map((item) => {
          const Icon = item.icon;
          return (
            <RevealItem key={item.title}>
              <GlassCard className="h-full p-4">
                <motion.div
                  whileHover={
                    reduced
                      ? undefined
                      : {
                          boxShadow: "0 0 28px rgba(129, 140, 248, 0.15)",
                        }
                  }
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              </GlassCard>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </div>
  );
}
