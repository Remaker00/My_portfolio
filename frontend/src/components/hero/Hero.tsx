"use client";

import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroContent } from "@/components/hero/HeroContent";
import { HeroShowcase } from "@/components/hero/HeroShowcase";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24"
    >
      <HeroBackground />

      <div className="relative isolate z-[1] mx-auto grid max-w-6xl items-center gap-12 px-6 md:gap-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <HeroContent />
        <HeroShowcase />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className={cn(
          "absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-foreground",
          reduced && "hidden sm:flex"
        )}
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Explore
        </span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}
