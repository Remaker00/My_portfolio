"use client";

import { siteConfig } from "@/constants/site";
import { socialLinks } from "@/constants/social";
import { Github, Linkedin, Mail } from "lucide-react";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted md:flex-row md:px-8">
        <p>
          &lt;/&gt; with care by{" "}
          <span className="font-medium text-foreground">{siteConfig.name}</span>{" "}
          · {year}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
