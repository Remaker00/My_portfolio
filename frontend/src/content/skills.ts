export type SkillGroup = "build" | "optimize" | "integrate";

export type Skill = {
  name: string;
  group: SkillGroup;
  /** Core skills render as larger balls. */
  core?: boolean;
};

export const skillGroups: Record<SkillGroup, string> = {
  build: "Build",
  optimize: "Optimize & verify",
  integrate: "Integrate & ship",
};

export const skills: Skill[] = [
  { name: "React", group: "build", core: true },
  { name: "Next.js", group: "build", core: true },
  { name: "TypeScript", group: "build", core: true },
  { name: "JavaScript", group: "build" },
  { name: "Redux", group: "build" },
  { name: "Tailwind CSS", group: "build" },
  { name: "SSR / SSG", group: "build" },
  { name: "System Design", group: "build" },
  { name: "Core Web Vitals", group: "optimize", core: true },
  { name: "Performance", group: "optimize", core: true },
  { name: "Caching & Revalidation", group: "optimize" },
  { name: "Playwright", group: "optimize", core: true },
  { name: "SEO", group: "optimize" },
  { name: "REST APIs", group: "integrate" },
  { name: "Payments", group: "integrate" },
  { name: "Node.js", group: "integrate" },
  { name: "Express", group: "integrate" },
  { name: "RAG", group: "integrate" },
  { name: "Postman", group: "integrate" },
  { name: "Git & GitHub", group: "integrate" },
  { name: "Vercel", group: "integrate" },
];
