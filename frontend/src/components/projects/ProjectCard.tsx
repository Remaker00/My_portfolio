"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ExternalLink, Github } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  prominent?: boolean;
};

export function ProjectCard({ project, prominent }: ProjectCardProps) {
  const isProfessional = project.category === "professional";
  const displayBadge = project.badge ?? (project.highlight ? "Featured" : undefined);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl transition-all duration-300",
        "hover:border-accent/30 hover:bg-card/60 hover:shadow-xl hover:shadow-accent/5",
        prominent && "md:p-8",
        isProfessional && "border-accent/10"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          project.gradient
        )}
      />
      <div className="relative z-10 flex flex-1 flex-col">
        {project.client && (
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
            {project.client}
          </p>
        )}
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3
            className={cn(
              "font-semibold text-foreground",
              prominent ? "text-xl md:text-2xl" : "text-lg"
            )}
          >
            {project.title}
          </h3>
          {displayBadge && (
            <Badge
              className={cn(
                "shrink-0",
                isProfessional
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border text-muted"
              )}
            >
              {displayBadge}
            </Badge>
          )}
        </div>
        {project.period && (
          <p className="mb-3 font-mono text-xs text-muted">{project.period}</p>
        )}
        <p
          className={cn(
            "mb-6 flex-1 text-muted leading-relaxed",
            prominent && "text-base"
          )}
        >
          {project.description}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={project.liveUrl} variant="primary" size="sm" external>
            <ExternalLink size={16} />
            {isProfessional ? "View Platform" : "Live Demo"}
          </Button>
          {project.repoUrl && (
            <Button
              href={project.repoUrl}
              variant="secondary"
              size="sm"
              external
            >
              <Github size={16} />
              Source Code
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
