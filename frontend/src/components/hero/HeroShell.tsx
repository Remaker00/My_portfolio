"use client";

import dynamic from "next/dynamic";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const HeroShowcase = dynamic(
  () =>
    import("@/components/hero/HeroShowcase").then((m) => ({
      default: m.HeroShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="hidden min-h-[420px] w-full max-w-lg justify-self-center rounded-3xl border border-border/20 bg-card/10 lg:block lg:justify-self-end"
        aria-hidden
      />
    ),
  }
);

type HeroShellProps = {
  children: React.ReactNode;
};

export function HeroShell({ children }: HeroShellProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24"
    >
      <HeroBackground />

      <div className="relative isolate z-[1] mx-auto grid max-w-6xl items-center gap-12 px-6 md:gap-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {children}
        <HeroShowcase />
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className={cn(
          "absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-foreground",
          !reduced && "animate-bounce"
        )}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Explore
        </span>
        <ChevronDown size={20} aria-hidden />
      </a>
    </section>
  );
}
