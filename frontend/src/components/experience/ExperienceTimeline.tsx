"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "@/types";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

function getRoleInitials(role: string): string {
  return role
    .split(/\s+/)
    .map((word) => word.match(/[a-zA-Z]/)?.[0])
    .filter((char): char is string => Boolean(char))
    .slice(0, 2)
    .map((char) => char.toUpperCase())
    .join("");
}

function getNodeCenter(node: HTMLElement, container: HTMLElement): number {
  const nodeRect = node.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return nodeRect.top - containerRect.top + nodeRect.height / 2;
}

type ExperienceTimelineProps = {
  items: ExperienceItem[];
};

const SCROLL_SPEED = 1.75;

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nodeOffsets, setNodeOffsets] = useState<number[]>([]);
  const [activeNodes, setActiveNodes] = useState<boolean[]>(() =>
    items.map(() => false),
  );
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const timelineProgress = useTransform(scrollYProgress, (value) =>
    Math.min(1, Math.max(0, value * SCROLL_SPEED)),
  );

  const progressHeight = useTransform(
    timelineProgress,
    (value) => `${value * 100}%`,
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const height = container.offsetHeight;
      if (height === 0) return;

      const offsets = nodeRefs.current.map((node) => {
        if (!node) return 0;
        return getNodeCenter(node, container) / height;
      });

      setNodeOffsets(offsets);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  useMotionValueEvent(timelineProgress, "change", (latest) => {
    if (reduced || nodeOffsets.length === 0) return;
    setActiveNodes(nodeOffsets.map((offset) => latest >= offset));
  });

  useLayoutEffect(() => {
    if (reduced) {
      setActiveNodes(Array.from({ length: items.length }, () => true));
      return;
    }

    if (nodeOffsets.length === 0) return;
    setActiveNodes(
      nodeOffsets.map((offset) => timelineProgress.get() >= offset),
    );
  }, [reduced, nodeOffsets, items.length, timelineProgress]);

  return (
    <div ref={containerRef} className="relative">
      <div
        className="absolute left-6 top-0 hidden h-full w-px bg-border md:block"
        aria-hidden
      />

      {reduced ? (
        <div
          className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent/70 to-accent/40 md:block"
          aria-hidden
        />
      ) : (
        <motion.div
          className="absolute left-6 top-0 hidden w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-accent/40 md:block"
          style={{ height: progressHeight }}
          aria-hidden
        />
      )}

      <ul className="space-y-8">
        {items.map((item, index) => {
          const initials = getRoleInitials(item.role);
          const isActive = activeNodes[index];

          return (
            <FadeIn key={item.id} delay={index * 0.1}>
              <li className="relative flex gap-6 md:gap-8">
                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className="relative z-10 hidden shrink-0 md:block"
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border bg-card transition-colors duration-500",
                      isActive ? "border-accent/40" : "border-border",
                    )}
                  >
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full transition-all duration-500",
                        isActive
                          ? "scale-100 bg-accent"
                          : "scale-75 bg-muted/40",
                      )}
                    />
                  </div>
                </div>

                <article className="flex flex-1 flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl transition-colors hover:border-accent/30 md:flex-row md:items-start">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent"
                    aria-hidden
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <time className="font-mono text-xs text-muted">
                        {item.period}
                      </time>
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {item.organization}
                    </p>
                    <p className="mt-3 text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            </FadeIn>
          );
        })}
      </ul>
    </div>
  );
}
