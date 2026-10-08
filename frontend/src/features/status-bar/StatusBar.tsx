import { profile } from "@/content/profile";

const nav = [
  { label: "Releases", href: "#releases" },
  { label: "Audit", href: "#audit" },
  { label: "Log", href: "#log" },
  { label: "Toolchain", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export function StatusBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 font-mono text-xs sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-ink">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-pass opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-pass" />
          </span>
          {profile.handle}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-5">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-dim transition-colors hover:text-ink sm:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            className="rounded-full border border-ink px-3 py-1 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
