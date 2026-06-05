"use client";

import {
  aboutClients,
  aboutCopy,
  aboutIntro,
  aboutMetrics,
} from "@/constants/about";
import { siteConfig } from "@/constants/site";
import { AboutNowPanel } from "@/components/about/AboutNowPanel";
import { AboutProfileCard } from "@/components/about/AboutProfileCard";
import { GlassCard } from "@/components/about/GlassCard";
import { HeroMagneticButton } from "@/components/hero/HeroMagneticButton";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function AboutBento() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
      {/* Profile — spans 2 rows on desktop */}
      <Reveal className="lg:col-span-4 lg:row-span-2">
        <AboutProfileCard />
      </Reveal>

      {/* Intro + microcopy */}
      <Reveal delay={0.05} className="lg:col-span-8">
        <GlassCard glow className="h-full">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {aboutCopy.label}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {aboutCopy.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            {aboutCopy.subtitle}
          </p>
          <ul className="mt-6 space-y-2">
            {aboutIntro.map((line, i) => (
              <motion.li
                key={line}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="flex gap-2 text-sm text-muted sm:text-base"
              >
                <span className="text-accent">—</span>
                <span>{line}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6">
            <HeroMagneticButton href={siteConfig.resumeUrl} variant="secondary" external>
              Download resume
              <ArrowRight size={16} />
            </HeroMagneticButton>
          </div>
        </GlassCard>
      </Reveal>

      {/* Metrics */}
      <RevealStagger className="grid gap-4 sm:grid-cols-3 lg:col-span-5">
        {aboutMetrics.map((m) => (
          <RevealItem key={m.label}>
            <GlassCard className="text-center sm:text-left">
              <p className="font-mono text-2xl font-semibold text-foreground sm:text-3xl">
                {m.value}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground/90">
                {m.label}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-muted">{m.detail}</p>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealStagger>

      {/* Currently */}
      <Reveal delay={0.1} className="lg:col-span-3">
        <AboutNowPanel />
      </Reveal>

      {/* Clients strip */}
      {/* <Reveal delay={0.12} className="lg:col-span-12">
        <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Production clients
            </p>
            <p className="mt-1 text-sm text-foreground/80">
              Interfaces delivered in live commercial environments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {aboutClients.map((name) => (
              <span
                key={name}
                className="rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
              >
                {name}
              </span>
            ))}
          </div>
        </GlassCard>
      </Reveal> */}
    </div>
  );
}
