"use client";

import { heroMetrics } from "@/constants/hero";
import { fadeScale, showcaseFloat } from "@/animations/hero";
import { HeroTechOrbit } from "@/components/hero/HeroTechOrbit";
import { HeroTerminal } from "@/components/hero/HeroTerminal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

function MetricCard({
  label,
  value,
  suffix,
  delay,
}: {
  label: string;
  value: string;
  suffix: string;
  delay: number;
}) {
  const reduced = usePrefersReducedMotion();
  const Component = reduced ? "div" : motion.div;

  return (
    <Component
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay, duration: 0.5 },
          })}
      className="rounded-xl border border-border/50 bg-background/40 px-4 py-3 backdrop-blur-sm"
    >
      <p className="font-mono text-lg font-semibold text-foreground">
        {value}
        <span className="ml-1 text-xs font-normal text-muted">{suffix}</span>
      </p>
      <p className="mt-0.5 text-xs text-muted">{label}</p>
    </Component>
  );
}

export function HeroShowcase() {
  const reduced = usePrefersReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  const Wrapper = reduced ? "div" : motion.div;
  const wrapperProps = reduced
    ? { className: "relative w-full max-w-lg justify-self-center lg:justify-self-end" }
    : {
        variants: fadeScale,
        initial: "hidden",
        animate: "visible",
        className: "relative w-full max-w-lg justify-self-center lg:justify-self-end",
        style: { perspective: 1200 },
      };

  return (
    <Wrapper {...wrapperProps}>
      <motion.div
        onMouseMove={
          reduced
            ? undefined
            : (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set((e.clientX - rect.left) / rect.width);
                mouseY.set((e.clientY - rect.top) / rect.height);
              }
        }
        onMouseLeave={
          reduced
            ? undefined
            : () => {
                mouseX.set(0.5);
                mouseY.set(0.5);
              }
        }
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        variants={reduced ? undefined : showcaseFloat}
        initial="initial"
        animate="animate"
        className={cn(
          "relative rounded-3xl border border-white/10 bg-card/30 p-6 shadow-2xl shadow-accent/5 backdrop-blur-2xl",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-accent/10 before:to-transparent before:opacity-60"
        )}
      >
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted">Live interface</span>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
              AI-ready
            </span>
          </div>

          <HeroTerminal />

          <div className="grid grid-cols-3 gap-2">
            {heroMetrics.map((m, i) => (
              <MetricCard
                key={m.label}
                label={m.label}
                value={m.value}
                suffix={m.suffix}
                delay={0.6 + i * 0.1}
              />
            ))}
          </div>

          <div className="hidden sm:block">
            <HeroTechOrbit />
          </div>
        </div>

        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-glow/15 blur-2xl"
          aria-hidden
        />
      </motion.div>
    </Wrapper>
  );
}
