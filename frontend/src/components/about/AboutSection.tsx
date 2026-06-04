"use client";

import { AboutBackground } from "@/components/about/AboutBackground";
import { AboutBento } from "@/components/about/AboutBento";
import { AboutFocusGrid } from "@/components/about/AboutFocusGrid";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      <AboutBackground />
      <Container className="relative z-[1]">
        <AboutBento />
        <Reveal delay={0.15} className="mt-14 md:mt-16">
          <AboutFocusGrid />
        </Reveal>
      </Container>
    </section>
  );
}
