"use client";

import { navItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/90 shadow-sm shadow-black/10 backdrop-blur-xl"
          : "border-b border-border/20 bg-background/70 backdrop-blur-xl"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8"
        aria-label="Main navigation"
      >
        <button
          type="button"
          className="font-mono text-sm font-medium text-foreground transition-colors hover:text-accent"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          &lt;{siteConfig.name.split(" ")[0]} /&gt;
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = active === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-card text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={siteConfig.resumeUrl}
              download
              className="ml-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/50 hover:bg-card/50"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-card hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-card"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.resumeUrl}
              download
              className="block rounded-lg px-4 py-3 text-accent"
              onClick={() => setMobileOpen(false)}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
