import { heroCopy } from "@/constants/hero";
import { socialLinks } from "@/constants/social";
import { siteConfig } from "@/constants/site";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background shadow-lg shadow-accent/10 transition-transform hover:scale-[1.02] active:scale-[0.98]";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-card/50 px-7 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-transform hover:scale-[1.02] hover:border-accent/40 active:scale-[0.98]";

type HeroStaticContentProps = {
  commandMenu: React.ReactNode;
  roleLine: React.ReactNode;
};

export function HeroStaticContent({
  commandMenu,
  roleLine,
}: HeroStaticContentProps) {
  return (
    <div className="relative z-[1] flex flex-col">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {heroCopy.availability}
        </span>
        {commandMenu}
      </div>

      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
        {heroCopy.eyebrow}
      </p>

      <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
        {heroCopy.headline}
        <span className="mt-2 block bg-gradient-to-r from-foreground via-accent to-glow bg-clip-text text-transparent">
          {siteConfig.name}
        </span>
      </h1>

      <div className="relative z-0 mt-5 space-y-2">
        <p className="text-base leading-snug sm:text-lg">{roleLine}</p>
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {heroCopy.subheadline}
        </p>
      </div>

      <p className="mt-4 flex items-start gap-2 text-sm text-muted">
        <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
          ✦
        </span>
        <span>{heroCopy.focus}</span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className={btnPrimary}>
          View work
          <span aria-hidden>→</span>
        </a>
        <a href={siteConfig.resumeUrl} download className={btnSecondary}>
          Resume
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {heroCopy.trust.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/60 bg-card/30 px-3 py-1 text-xs text-muted backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="rounded-full border border-border/80 bg-card/40 px-3 py-2 text-xs text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
