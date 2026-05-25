"use client";

import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl",
        hover &&
          "transition-all duration-300 hover:border-accent/30 hover:bg-card/60 hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      {children}
    </div>
  );
}
