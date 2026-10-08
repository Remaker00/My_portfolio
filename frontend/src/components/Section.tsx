import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

/** A numbered section with a mono rule header, e.g. "02 — Releases". */
export function Section({ id, index, title, aside, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-rule py-16 sm:py-24", className)}>
      <header className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-xs tracking-wide text-dim uppercase">
        <h2 id={`${id}-title`} className="flex items-baseline gap-3">
          <span className="text-signal">{index}</span>
          <span className="text-ink">{title}</span>
        </h2>
        {aside}
      </header>
      {children}
    </section>
  );
}
