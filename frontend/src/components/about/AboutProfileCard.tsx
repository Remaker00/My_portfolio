"use client";

import { aboutHighlights } from "@/constants/about";
import { siteConfig } from "@/constants/site";
import { floatY } from "@/animations/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

export function AboutProfileCard() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      variants={reduced ? undefined : floatY}
      initial="initial"
      animate="animate"
      className="relative h-full min-h-[320px] lg:min-h-0"
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 via-glow/20 to-transparent opacity-60 blur-2xl" />
      <motion.div
        whileHover={reduced ? undefined : { scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-card/50 p-5 backdrop-blur-xl",
          "shadow-2xl shadow-accent/5"
        )}
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-xl">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-accent via-glow to-accent/30 opacity-80" />
          <div className="relative m-[2px] h-[calc(100%-4px)] overflow-hidden rounded-[10px] bg-background">
            <Image
              src="/pic.png"
              alt={`${siteConfig.name} profile`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 280px, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-lg font-semibold text-foreground">{siteConfig.name}</p>
          <p className="font-mono text-xs text-accent">{siteConfig.title}</p>
          <p className="mt-1 text-xs text-muted">{siteConfig.location}</p>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {aboutHighlights.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-[10px] text-muted"
            >
              <Icon size={12} className="text-accent" />
              {text}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
