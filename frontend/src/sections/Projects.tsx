import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { SectionShell } from "@/components/layout/SectionShell";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  learningProjects,
  professionalProjects,
} from "@/constants/projects";
import { cn } from "@/lib/utils";

function ProjectGroup({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-20 last:mb-0", className)}>
      <FadeIn>
        <div className="mb-10 border-b border-border/60 pb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </FadeIn>
      {children}
    </div>
  );
}

export function Projects() {
  return (
    <SectionShell id="projects">
      <FadeIn>
        <SectionHeading
          label="Work"
          title="Production delivery & foundational builds."
          description="Client-facing platforms engineered in professional settings, alongside early projects that document my progression into frontend development."
        />
      </FadeIn>

      <ProjectGroup
        eyebrow="Professional · Client & Workplace"
        title="Enterprise & commercial platforms"
        description="Production systems delivered for clients and employers — architected for reliability, regulatory rigor, and sustained commercial operation. These engagements reflect accountable engineering in live business environments."
      >
        <StaggerChildren className="grid gap-6 lg:grid-cols-3">
          {professionalProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              prominent
            />
          ))}
        </StaggerChildren>
      </ProjectGroup>

      <ProjectGroup
        eyebrow="Learning · Early Portfolio"
        title="Foundational projects & skill development"
        description="Deliberate learning builds from my formative phase — deployed applications that established core competencies in React, APIs, and shipping before transitioning into professional client delivery."
      >
        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {learningProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </StaggerChildren>
      </ProjectGroup>
    </SectionShell>
  );
}
