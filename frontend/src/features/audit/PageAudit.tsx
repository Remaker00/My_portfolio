"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { checks, observeVitals, type CheckResult, type CheckStatus } from "./checks";

const glyph: Record<CheckStatus, string> = { pass: "✓", warn: "!", fail: "✗", info: "i" };
const tone: Record<CheckStatus, string> = {
  pass: "text-pass",
  warn: "text-warn",
  fail: "text-fail",
  info: "text-dim",
};

type Phase = "idle" | "running" | "done";

export function PageAudit() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [results, setResults] = useState<CheckResult[]>([]);
  const vitals = useRef<ReturnType<typeof observeVitals> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    vitals.current = observeVitals();
    return () => vitals.current?.disconnect();
  }, []);

  async function run() {
    setPhase("running");
    setResults([]);
    const snapshot = vitals.current?.read() ?? { lcp: null, cls: 0 };

    for (const check of checks) {
      const result = check(document, snapshot);
      setResults((previous) => [...previous, result]);
      // Stream results like a CI log; skip the pacing for reduced motion.
      if (!reduceMotion) await new Promise((resolve) => setTimeout(resolve, 90));
    }
    setPhase("done");
  }

  const counts = results.reduce(
    (acc, r) => ({ ...acc, [r.status]: acc[r.status] + 1 }),
    { pass: 0, warn: 0, fail: 0, info: 0 } as Record<CheckStatus, number>,
  );

  return (
    <Section id="audit" index="02" title="Audit this page" aside={<span>runs in your browser</span>}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Don&rsquo;t take my word for it. <span className="text-dim">Check the page you&rsquo;re reading.</span>
          </p>
          <p className="mt-6 max-w-md leading-relaxed text-dim">
            {checks.length} real checks — Core Web Vitals, accessibility and SEO — measured live against this document. No
            pre-recorded scores.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={run}
              disabled={phase === "running"}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {phase === "idle" ? <Play className="size-4" aria-hidden /> : <RotateCcw className="size-4" aria-hidden />}
              {phase === "idle" ? "Run audit" : phase === "running" ? "Running…" : "Run again"}
            </button>
            <a
              href={`${profile.links.source}/blob/main/frontend/src/features/audit/checks.ts`}
              className="font-mono text-xs text-dim underline decoration-rule underline-offset-4 hover:text-ink"
            >
              read the checks
            </a>
          </div>
        </div>

        <div
          className="min-h-[22rem] rounded-sm border border-rule bg-sheet font-mono text-xs"
          role="log"
          aria-live="polite"
          aria-label="Audit results"
        >
          <div className="flex items-center justify-between border-b border-rule px-4 py-3 text-dim">
            <span>$ audit ./index.html</span>
            {phase === "done" && (
              <span data-testid="audit-summary">
                <span className="text-pass">{counts.pass} passed</span>
                {counts.warn > 0 && <span className="text-warn"> · {counts.warn} warn</span>}
                {counts.fail > 0 && <span className="text-fail"> · {counts.fail} failed</span>}
              </span>
            )}
          </div>

          {phase === "idle" ? (
            <p className="px-4 py-6 text-dim">Waiting. Press “Run audit”.</p>
          ) : (
            <ol className="divide-y divide-rule/60 px-4 py-2">
              {results.map((result) => (
                <motion.li
                  key={result.id}
                  initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-[1rem_1fr_auto] items-baseline gap-3 py-2"
                  data-status={result.status}
                >
                  <span aria-hidden className={tone[result.status]}>
                    {glyph[result.status]}
                  </span>
                  <span>
                    <span className="sr-only">{result.status}: </span>
                    {result.label}
                    {result.hint && <span className="ml-2 text-dim">({result.hint})</span>}
                  </span>
                  <span className={cn("text-right", tone[result.status])}>{result.value}</span>
                </motion.li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </Section>
  );
}
