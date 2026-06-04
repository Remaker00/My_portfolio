import {
  Accessibility,
  Cpu,
  Layers,
  Palette,
  Rocket,
  Sparkles,
  Gauge,
  TestTube2,
} from "lucide-react";

export const aboutCopy = {
  label: "About",
  title: "Product-minded frontend engineer.",
  subtitle: "Frontend systems built for scale. Shipped in production.",
} as const;

export const aboutIntro = [
  "I design and ship interfaces that feel fast, intentional, and premium.",
  "Full-time frontend developer — client platforms, AI products, compliance SaaS.",
  "MVIT · Sharpener · now building at production scale.",
] as const;

export const aboutMetrics = [
  { value: "10K+", label: "AI listings shipped", detail: "PoweredByAI" },
  { value: "3", label: "Production client apps", detail: "Live platforms" },
  { value: "8+", label: "Months on flagship build", detail: "Ongoing delivery" },
] as const;

export const aboutClients = [
  "PoweredByAI",
  "EnviroByte",
  "Lift Local",
] as const;

export const aboutNow = [
  "Building AI marketplace interfaces at scale",
  "Hardening flows with Playwright E2E suites",
  "Refining motion systems & interaction quality",
  "Exploring AI-integrated product experiences",
] as const;

export const aboutFocus = [
  {
    title: "Frontend Architecture",
    description: "Composable systems, clean boundaries, scalable UI.",
    icon: Layers,
  },
  {
    title: "Motion & Interaction",
    description: "Cinematic transitions with performance discipline.",
    icon: Sparkles,
  },
  {
    title: "Performance",
    description: "Fast renders, optimized assets, smooth scroll.",
    icon: Gauge,
  },
  {
    title: "Design Systems",
    description: "Tokens, patterns, and consistent product UI.",
    icon: Palette,
  },
  {
    title: "AI Product UI",
    description: "Discovery, dashboards, and intelligent workflows.",
    icon: Cpu,
  },
  {
    title: "Quality Engineering",
    description: "Playwright automation & accessible interfaces.",
    icon: TestTube2,
  },
] as const;

export const aboutHighlights = [
  { icon: Rocket, text: "Production-grade delivery" },
  { icon: Accessibility, text: "Accessibility-first" },
] as const;
