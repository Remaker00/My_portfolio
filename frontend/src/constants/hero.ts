export const heroCopy = {
  eyebrow: "Frontend Engineer · Motion & Systems",
  headline: "Interfaces engineered with precision.",
  subheadline:
    "Crafting scalable frontends, cinematic motion, and AI-ready product experiences for teams that ship.",
  focus: "Currently: PoweredByAI · Playwright E2E · Design systems",
  availability: "Open to frontend roles",
  trust: ["Production client work", "Playwright automation", "Performance-first UI"],
} as const;

export const rotatingRoles = [
  "Frontend Developer",
  "UI Systems Engineer",
  "Motion Designer",
  "AI Product Builder",
] as const;

export const heroTechStack = [
  { name: "React", angle: 0 },
  { name: "Next.js", angle: 51 },
  { name: "TypeScript", angle: 103 },
  { name: "Tailwind", angle: 154 },
  { name: "Motion", angle: 206 },
  { name: "Playwright", angle: 257 },
  { name: "Node.js", angle: 309 },
] as const;

export const heroMetrics = [
  { label: "AI tools platform", value: "10K+", suffix: "listings" },
  { label: "Client delivery", value: "3", suffix: "production apps" },
  { label: "Current build", value: "8+", suffix: "months" },
] as const;

export const terminalLines = [
  { type: "prompt" as const, text: "nishant@portfolio ~ % analyze --stack" },
  { type: "output" as const, text: "→ React · Next.js · TypeScript · Tailwind" },
  { type: "output" as const, text: "→ Motion systems · Playwright · AI UX" },
  { type: "success" as const, text: "✓ Ready to ship immersive interfaces." },
];

export const commandMenuItems = [
  { label: "View Projects", href: "#projects", shortcut: "P" },
  { label: "About", href: "#about", shortcut: "A" },
  { label: "Experience", href: "#experience", shortcut: "E" },
  { label: "Contact", href: "#contact", shortcut: "C" },
  { label: "Download Resume", href: "/Nishant_CV.pdf", shortcut: "R" },
] as const;
