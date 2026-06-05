export const heroCopy = {
  eyebrow: "Frontend Engineer · React · Next.js · TypeScript",
  headline: "Building fast, scalable, and user-focused web experiences.",
  subheadline:
    "Frontend Engineer with 3+ years of experience crafting high-performance applications using React, Next.js, and modern web technologies. Passionate about creating intuitive user experiences, scalable architectures, and production-ready products.",
  focus:
    "Currently building AI-powered products, scalable design systems, and performance-driven web applications.",
  availability: "Open to Frontend Engineer opportunities",
  trust: [
    "3+ years industry experience",
    "Production SaaS applications",
    "Performance & SEO focused",
  ],
} as const;

export const rotatingRoles = [
  "Frontend Engineer",
  "React Developer",
  "Next.js Specialist",
  "UI Systems Engineer",
] as const;

export const heroTechStack = [
  { name: "React", angle: 0 },
  { name: "Next.js", angle: 51 },
  { name: "TypeScript", angle: 103 },
  { name: "Tailwind", angle: 154 },
  { name: "Playwright", angle: 206 },
  { name: "Node.js", angle: 257 },
  { name: "Git", angle: 309 },
] as const;

export const heroMetrics = [
  { label: "Professional experience", value: "3+", suffix: "years" },
  { label: "Production applications", value: "8+", suffix: "projects" },
  { label: "Core technologies", value: "10+", suffix: "tools" },
] as const;

export const terminalLines = [
  { type: "prompt" as const, text: "nishant@portfolio ~ % whoami" },
  { type: "output" as const, text: "→ Frontend Engineer (React · Next.js)" },
  { type: "output" as const, text: "→ TypeScript · Tailwind · Playwright" },
  { type: "output" as const, text: "→ AI Products · Performance · SEO" },
  { type: "success" as const, text: "✓ Building experiences users love." },
];

export const commandMenuItems = [
  { label: "Projects", href: "#projects", shortcut: "P" },
  { label: "About", href: "#about", shortcut: "A" },
  { label: "Experience", href: "#experience", shortcut: "E" },
  { label: "Contact", href: "#contact", shortcut: "C" },
  { label: "Resume", href: "/Nishant_CV.pdf", shortcut: "R" },
] as const;