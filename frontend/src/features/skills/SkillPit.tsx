"use client";

import { useEffect, useRef, useState } from "react";
import { Shuffle } from "lucide-react";
import { Section } from "@/components/Section";
import { skillGroups, skills, type SkillGroup } from "@/content/skills";
import { cn } from "@/lib/cn";
import { createBodies, hitTest, shake, step, STEP, type Body, type Pointer } from "./physics";

const groupStyle: Record<SkillGroup, string> = {
  build: "bg-ink text-paper",
  optimize: "bg-signal text-[#151514]",
  integrate: "border border-ink/25 bg-paper text-ink",
};

export function SkillPit() {
  const boxRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<(HTMLLIElement | null)[]>([]);
  const bodiesRef = useRef<Body[]>([]);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0, vx: 0, vy: 0, active: false, grabbed: -1 });
  const lastMoveRef = useRef(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = box.clientWidth;
    let height = box.clientHeight;
    let frame = 0;
    let last = 0;
    let lag = 0;
    let visible = false;

    const radii = () => ballRefs.current.map((el) => (el?.offsetWidth ?? 80) / 2);

    const render = () => {
      bodiesRef.current.forEach((b, i) => {
        const el = ballRefs.current[i];
        if (el) el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) rotate(${b.angle}rad)`;
      });
    };

    const tick = (now: number) => {
      // Fixed timestep so the simulation behaves the same at 60Hz and 120Hz.
      lag += Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      while (lag >= STEP) {
        step(bodiesRef.current, pointerRef.current, width, height);
        lag -= STEP;
      }
      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!bodiesRef.current.length) {
        bodiesRef.current = createBodies(radii(), width, height);
        setLive(true);
      }
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    // Only simulate while the pit is on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;
        if (visible) start();
        else cancelAnimationFrame(frame);
      },
      { threshold: 0.25 },
    );
    io.observe(box);

    const ro = new ResizeObserver(() => {
      width = box.clientWidth;
      height = box.clientHeight;
      const r = radii();
      bodiesRef.current.forEach((b, i) => (b.r = r[i]));
    });
    ro.observe(box);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  function toLocal(event: React.PointerEvent) {
    const rect = boxRef.current!.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function onPointerMove(event: React.PointerEvent) {
    const p = pointerRef.current;
    const { x, y } = toLocal(event);
    const dt = Math.max(1, event.timeStamp - lastMoveRef.current) / 1000;
    lastMoveRef.current = event.timeStamp;
    // Smooth the cursor velocity so a flick feels like a flick, not a jitter.
    p.vx = p.vx * 0.5 + ((x - p.x) / dt) * 0.5;
    p.vy = p.vy * 0.5 + ((y - p.y) / dt) * 0.5;
    p.x = x;
    p.y = y;
    p.active = true;
  }

  function onPointerDown(event: React.PointerEvent) {
    const { x, y } = toLocal(event);
    const index = hitTest(bodiesRef.current, x, y);
    Object.assign(pointerRef.current, { x, y, vx: 0, vy: 0, active: true, grabbed: index });
    if (index !== -1) event.currentTarget.setPointerCapture(event.pointerId);
  }

  function release() {
    pointerRef.current.grabbed = -1;
  }

  return (
    <Section
      id="skills"
      index="04"
      title="Toolchain"
      aside={<span className="hidden sm:inline">push · grab · throw</span>}
    >
      <div
        ref={boxRef}
        data-live={live || undefined}
        onPointerMove={live ? onPointerMove : undefined}
        onPointerDown={live ? onPointerDown : undefined}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={() => {
          pointerRef.current.active = false;
        }}
        className="relative h-[27rem] touch-pan-y overflow-hidden rounded-sm border border-rule bg-sheet select-none sm:h-[32rem]"
      >
        <ul
          aria-label="Skills"
          className={cn("h-full", !live && "flex flex-wrap content-end items-end justify-center gap-2 p-4")}
        >
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              ref={(node) => {
                ballRefs.current[i] = node;
              }}
              data-group={skill.group}
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full px-2 text-center leading-tight font-medium",
                skill.core ? "size-[5.5rem] text-xs sm:size-32 sm:text-base" : "size-[4.5rem] text-[10px] sm:size-[6.5rem] sm:text-sm",
                groupStyle[skill.group],
                live && "absolute top-0 left-0 cursor-grab touch-none will-change-transform active:cursor-grabbing",
              )}
            >
              {skill.name}
            </li>
          ))}
        </ul>

        {live && (
          <button
            type="button"
            onClick={() => shake(bodiesRef.current)}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper/80 px-3 py-1.5 font-mono text-xs backdrop-blur transition-colors hover:border-ink"
          >
            <Shuffle className="size-3.5" aria-hidden />
            Shake
          </button>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-dim" aria-label="Legend">
        {(Object.keys(skillGroups) as SkillGroup[]).map((group) => (
          <li key={group} className="flex items-center gap-2">
            <span aria-hidden className={cn("size-3 rounded-full", groupStyle[group])} />
            {skillGroups[group]}
          </li>
        ))}
        <li className="sm:ml-auto">bigger = used daily</li>
      </ul>
    </Section>
  );
}
