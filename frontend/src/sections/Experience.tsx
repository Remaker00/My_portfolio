import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceItems } from "@/constants/experience";
import Image from "next/image";

export function Experience() {
  return (
    <SectionShell id="experience" className="bg-card/20">
      <FadeIn>
        <SectionHeading
          label="Experience"
          title="The journey so far."
          description="From engineering fundamentals through full-time frontend delivery on commercial platforms."
        />
      </FadeIn>

      <div className="relative">
        <div
          className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent/50 via-border to-transparent md:block"
          aria-hidden
        />

        <ul className="space-y-8">
          {experienceItems.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1}>
              <li className="relative flex gap-6 md:gap-8">
                <div className="relative z-10 hidden shrink-0 md:block">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                </div>

                <article className="flex flex-1 flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl transition-colors hover:border-accent/30 md:flex-row md:items-start">
                  {item.logo ? (
                    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-background/50">
                      <Image
                        src={item.logo}
                        alt={item.organization}
                        fill
                        className="object-contain p-1"
                        sizes="96px"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-accent"
                      aria-hidden
                    >
                      Pro
                    </div>
                  )}
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
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
