"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
};

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-5 backdrop-blur-xl",
        "shadow-lg shadow-black/20",
        glow && "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/10 before:to-transparent before:opacity-60",
        hover && "transition-colors hover:border-accent/25 hover:bg-card/55",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
