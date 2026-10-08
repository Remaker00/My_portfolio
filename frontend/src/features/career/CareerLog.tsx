import { career } from "@/content/career";
import { Section } from "@/components/Section";

export function CareerLog() {
  return (
    <Section id="log" index="03" title="Career log" aside={<span>git log --oneline --graph</span>}>
      <ol className="relative ml-1.5 border-l border-rule">
        {career.map((entry) => (
          <li key={entry.id} className="relative pb-12 pl-8 last:pb-0">
            <span
              aria-hidden
              className={
                entry.latest
                  ? "absolute top-1.5 -left-[7px] size-3 rounded-full bg-signal ring-4 ring-paper"
                  : "absolute top-1.5 -left-[5px] size-2 rounded-full bg-dim ring-4 ring-paper"
              }
            />
            <p className="font-mono text-xs text-dim">
              {entry.period}
              {entry.latest && <span className="ml-3 text-signal">HEAD</span>}
            </p>
            <h3 className="mt-2 text-xl font-medium tracking-tight">
              {entry.role} <span className="text-dim">@ {entry.organization}</span>
            </h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-dim">{entry.note}</p>
            {entry.impact && (
              <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
                {entry.impact.map((item) => (
                  <div key={item.label} className="bg-sheet px-4 py-3">
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl leading-none">{item.value}</span>
                      <span className="mt-1 block font-mono text-[11px] text-dim">{item.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
