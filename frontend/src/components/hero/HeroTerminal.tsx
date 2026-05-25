"use client";

import { terminalLines } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function HeroTerminal() {
  const reduced = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduced ? terminalLines.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= terminalLines.length) clearInterval(id);
    }, 520);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="rounded-xl border border-border/60 bg-background/60 p-4 font-mono text-xs backdrop-blur-md">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-muted">ai-terminal</span>
      </div>
      <div className="space-y-1.5">
        {terminalLines.slice(0, visibleCount).map((line, idx) => (
          <motion.div
            key={idx}
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              line.type === "prompt" && "text-foreground",
              line.type === "output" && "text-muted",
              line.type === "success" && "text-emerald-400"
            )}
          >
            {line.text}
          </motion.div>
        ))}
        {!reduced && visibleCount < terminalLines.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
        )}
      </div>
    </div>
  );
}
