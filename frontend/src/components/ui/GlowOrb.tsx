"use client";

import { cn } from "@/lib/utils";

type GlowOrbProps = {
  className?: string;
  color?: "accent" | "glow" | "mixed";
};

export function GlowOrb({ className, color = "mixed" }: GlowOrbProps) {
  const gradient =
    color === "accent"
      ? "from-accent/30 to-transparent"
      : color === "glow"
        ? "from-glow/30 to-transparent"
        : "from-accent/25 via-glow/20 to-transparent";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-radial blur-3xl",
        gradient,
        className
      )}
    />
  );
}
