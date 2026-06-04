"use client";

import { heroTechStack } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function HeroTechOrbit() {
  const reduced = usePrefersReducedMotion();
  const radius = 118;

  return (
    <div className="relative mx-auto h-[280px] w-[280px]">
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/20 bg-accent/5"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-accent/30 bg-card/80 shadow-lg shadow-accent/10 backdrop-blur-xl">
        <motion.div
          className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-glow"
          animate={
            reduced
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }
          }
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      {heroTechStack.map((tech, i) => {
        const rad = (tech.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={tech.name}
            className="absolute left-1/2 top-1/2"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
          >
            <motion.span
              className={cn(
                "inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-border/80 bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-md",
                !reduced && "hover:border-accent/50 hover:text-accent"
              )}
              animate={
                reduced ? undefined : { y: [0, -4, 0] }
              }
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {tech.name}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
