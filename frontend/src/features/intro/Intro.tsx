import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";

const manifest = [
  ["role", profile.role],
  ["based", profile.location],
  ["shipping", profile.experience],
  ["status", profile.availability],
] as const;

export function Intro() {
  return (
    <section id="top" aria-label="Introduction" className="grid gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1fr_18rem] lg:gap-16 lg:pb-24">
      <div>
        <p className="mb-6 font-mono text-xs tracking-wide text-dim uppercase">
          {profile.role}
        </p>
        <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-balance">
          I ship frontends that hold up in <em className="text-signal">production.</em>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-dim text-pretty">{profile.summary}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#releases"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            Read the release notes <ArrowDown className="size-4" aria-hidden />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            Email me <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <a href={profile.links.github} aria-label="GitHub" className="rounded-full p-3 text-dim transition-colors hover:text-ink">
            <GitHubIcon className="size-5" />
          </a>
          <a href={profile.links.linkedin} aria-label="LinkedIn" className="rounded-full p-3 text-dim transition-colors hover:text-ink">
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>

      <aside aria-label="At a glance" className="flex items-center gap-5 self-end lg:block">
        <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-full bg-sheet ring-1 ring-rule ring-offset-4 ring-offset-paper sm:w-28 lg:mx-auto lg:mb-8 lg:w-52">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 1024px) 13rem, 7rem"
            className="object-cover object-center"
            priority
          />
        </div>
        <dl className="min-w-0 flex-1 divide-y divide-rule border-y border-rule font-mono text-xs">
          {manifest.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 py-2.5">
              <dt className="text-dim">{key}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-2.5">
            <dt className="text-dim">releases</dt>
            <dd className="text-right">
              4 live products
            </dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}
