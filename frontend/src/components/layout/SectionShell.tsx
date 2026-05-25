"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionShellProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 md:py-28", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
