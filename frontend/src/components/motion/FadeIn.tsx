"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        !reduced && "animate-fade-in-up opacity-0 [animation-fill-mode:forwards]",
        className
      )}
      style={!reduced ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
