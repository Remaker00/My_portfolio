"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { releases, type Release } from "@/content/releases";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";

export function ReleaseLog() {
  const [openId, setOpenId] = useState<string | null>(releases[0]?.id ?? null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  // j/k move between releases, like a code-review queue.
  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const step = event.key === "j" || event.key === "ArrowDown" ? 1 : event.key === "k" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + releases.length) % releases.length;
    triggers.current[next]?.focus();
  }

  return (
    <Section
      id="releases"
      index="01"
      title="Releases"
    >
      <ol className="border-b border-rule">
        {releases.map((release, index) => {
          const open = openId === release.id;
          const panelId = `release-${release.id}`;

          return (
            <li key={release.id} className="border-t border-rule">
              <h3>
                <button
                  ref={(node) => {
                    triggers.current[index] = node;
                  }}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : release.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-6 text-left sm:grid-cols-[4rem_1fr_10rem_9rem_1.5rem]"
                >
                  <span className="font-mono text-xs text-dim">R-{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-3xl leading-tight tracking-tight transition-colors group-hover:text-signal sm:text-4xl">
                      {release.product}
                    </span>
                    <span className="mt-1 block text-sm text-dim">{release.category}</span>
                  </span>
                  <StatusPill status={release.status} className="hidden sm:inline-flex" />
                  <span className="hidden font-mono text-xs text-dim sm:block">{release.period}</span>
                  <Plus
                    aria-hidden
                    className={cn("size-5 transition-transform duration-300 ease-out-expo", open && "rotate-45 text-signal")}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={`${release.product} release notes`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ReleaseNotes release={release} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function ReleaseNotes({ release }: { release: Release }) {
  return (
    <div className="grid gap-10 pb-10 sm:pl-[5rem] lg:grid-cols-[1fr_16rem]">
      <div className="space-y-8">
        <p className="max-w-2xl text-xl leading-relaxed text-pretty">{release.summary}</p>

        <NoteList heading="What I built" items={release.scope} marker="+" />
        {release.quality && <NoteList heading="How it was verified" items={release.quality} marker="✓" tone="pass" />}
      </div>

      <aside className="space-y-6">
        <StatusPill status={release.status} className="sm:hidden" />
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {release.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block font-display text-4xl leading-none">{metric.value}</span>
                <span className="mt-1 block font-mono text-xs text-dim">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {release.stack.map((tool) => (
            <li key={tool} className="rounded-full border border-rule px-2.5 py-1 font-mono text-[11px] text-dim">
              {tool}
            </li>
          ))}
        </ul>
        <a
          href={release.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ink underline decoration-rule underline-offset-4 hover:decoration-signal"
        >
          Open {new URL(release.url).hostname.replace(/^www\./, "")}
          <ArrowUpRight className="size-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </aside>
    </div>
  );
}

function NoteList({
  heading,
  items,
  marker,
  tone,
}: {
  heading: string;
  items: string[];
  marker: string;
  tone?: "pass";
}) {
  return (
    <div>
      <h4 className="font-mono text-xs tracking-wide text-dim uppercase">{heading}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed">
            <span aria-hidden className={cn("font-mono", tone === "pass" ? "text-pass" : "text-signal")}>
              {marker}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusPill({ status, className }: { status: Release["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border border-pass/40 px-2.5 py-1 font-mono text-[11px] text-pass",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-pass" />
      {status}
    </span>
  );
}
