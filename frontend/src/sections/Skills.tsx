"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { SectionShell } from "@/components/layout/SectionShell";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/constants/skills";

export function Skills() {
  return (
    <SectionShell id="skills" className="bg-card/20">
      <FadeIn>
        <SectionHeading
          label="Skills"
          title="Tools I work with daily."
          description="Categorized stack — frontend engineering, test automation, and professional delivery practices."
        />
      </FadeIn>

      <StaggerChildren className="grid gap-6 md:grid-cols-3">
        {skillCategories.map((category) => (
          <Card key={category.title} className="h-full">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              {category.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-border/80 bg-background/50 px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </StaggerChildren>
    </SectionShell>
  );
}
