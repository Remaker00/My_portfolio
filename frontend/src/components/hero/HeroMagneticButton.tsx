"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

type HeroMagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function HeroMagneticButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: HeroMagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const { ref, springX, springY, onMouseMove, onMouseLeave } = useMagnetic(0.28);

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-medium transition-shadow",
    variant === "primary"
      ? "bg-foreground text-background shadow-lg shadow-accent/20 hover:shadow-accent/30"
      : "border border-border/80 bg-card/50 text-foreground backdrop-blur-md hover:border-accent/40 hover:bg-card/80",
    className
  );

  const inner = (
    <motion.span
      style={reduced ? undefined : { x: springX, y: springY }}
      className="relative z-10 flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const glow =
    variant === "primary" ? (
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-glow/0 opacity-0 transition-opacity group-hover:opacity-100" />
    ) : null;

  if (external || href.startsWith("#") || href.endsWith(".pdf")) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={reduced ? undefined : onMouseMove}
        onMouseLeave={reduced ? undefined : onMouseLeave}
        whileHover={reduced ? undefined : { scale: 1.03 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        className="group"
      >
        <a
          href={href}
          download={href.endsWith(".pdf") ? true : undefined}
          className={cn(base, "group")}
        >
          {glow}
          {inner}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduced ? undefined : onMouseMove}
      onMouseLeave={reduced ? undefined : onMouseLeave}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className="group"
    >
      <Link href={href} className={cn(base, "group")}>
        {glow}
        {inner}
      </Link>
    </motion.div>
  );
}
