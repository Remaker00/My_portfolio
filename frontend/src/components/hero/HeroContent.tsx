"use client";

import { heroCopy } from "@/constants/hero";
import { socialLinks } from "@/constants/social";
import { siteConfig } from "@/constants/site";
import { heroItem, heroStagger } from "@/animations/hero";
import { HeroCommandMenu } from "@/components/hero/HeroCommandMenu";
import { HeroMagneticButton } from "@/components/hero/HeroMagneticButton";
import { HeroRotatingRole } from "@/components/hero/HeroRotatingRole";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function HeroContent() {
  const reduced = usePrefersReducedMotion();

  const Wrapper = reduced ? "div" : motion.div;
  const wrapperProps = reduced
    ? { className: "relative z-[1] flex flex-col" }
    : {
        variants: heroStagger,
        initial: "hidden",
        animate: "visible",
        className: "relative z-[1] flex flex-col",
      };

  const Item = reduced ? "div" : motion.div;
  const itemProps = reduced ? {} : { variants: heroItem };

  return (
    <Wrapper {...wrapperProps}>
      <Item {...itemProps} className="mb-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {heroCopy.availability}
        </span>
        <HeroCommandMenu />
      </Item>

      <Item {...itemProps}>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
          {heroCopy.eyebrow}
        </p>
      </Item>

      <Item {...itemProps} className="relative z-0">
        <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
          {heroCopy.headline}
          <span className="mt-2 block bg-gradient-to-r from-foreground via-accent to-glow bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>
      </Item>

      <Item {...itemProps} className="relative z-0 mt-5 space-y-2">
        <p className="text-base leading-snug sm:text-lg">
          <HeroRotatingRole />
        </p>
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {heroCopy.subheadline}
        </p>
      </Item>

      <Item {...itemProps} className="mt-4 flex items-start gap-2 text-sm text-muted">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-accent" />
        <span>{heroCopy.focus}</span>
      </Item>

      <Item {...itemProps} className="mt-8 flex flex-wrap gap-3">
        <HeroMagneticButton href="#projects" variant="primary">
          View work
          <ArrowRight size={16} />
        </HeroMagneticButton>
        <HeroMagneticButton href={siteConfig.resumeUrl} variant="secondary" external>
          Resume
        </HeroMagneticButton>
      </Item>

      <Item {...itemProps} className="mt-8 flex flex-wrap gap-2">
        {heroCopy.trust.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/60 bg-card/30 px-3 py-1 text-xs text-muted backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </Item>

      <Item {...itemProps} className="mt-10 flex items-center gap-3">
        {socialLinks.map((link) => {
          const Icon = socialIcons[link.icon];
          return (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={reduced ? undefined : { scale: 1.08, y: -2 }}
              className="rounded-full border border-border/80 bg-card/40 p-2.5 text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <Icon size={18} />
            </motion.a>
          );
        })}
      </Item>
    </Wrapper>
  );
}
