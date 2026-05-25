"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { Children } from "react";

type StaggerChildrenProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <div
          key={index}
          className="h-full animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
