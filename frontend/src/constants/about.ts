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
  title: "Frontend Engineer focused on building scalable web products.",
  subtitle:
    "3+ years of experience developing high-performance, user-centric applications with React, Next.js, and TypeScript.",
} as const;

export const aboutIntro = [
  "I build responsive, performant, and accessible web experiences that balance user needs with business goals.",
  "Experienced in developing AI-powered platforms, SaaS products, and production-grade applications using modern frontend technologies.",
  "Focused on clean architecture, reusable components, performance optimization, and delivering polished user experiences.",
] as const;

export const aboutMetrics = [
  { value: "3+", label: "Years of experience", detail: "Frontend Development" },
  { value: "8+", label: "Production applications", detail: "Delivered & maintained" },
  { value: "10+", label: "Tools & Technologies", detail: "Scalable UI systems" },
] as const;

export const aboutClients = [
  "PoweredByAI",
  "EnviroByte",
  "Lift Local",
] as const;

export const aboutNow = [
  "Building AI-powered web applications",
  "Developing scalable React and Next.js solutions",
  "Improving performance, SEO, and Core Web Vitals",
  "Expanding automated testing with Playwright",
] as const;

export const aboutFocus = [
  {
    title: "Frontend Architecture",
    description: "Scalable applications built with React, Next.js, and TypeScript.",
    icon: Layers,
  },
  {
    title: "User Experience",
    description: "Intuitive interfaces designed for usability and engagement.",
    icon: Sparkles,
  },
  {
    title: "Performance",
    description: "Optimized rendering, Core Web Vitals, and fast-loading experiences.",
    icon: Gauge,
  },
  {
    title: "Design Systems",
    description: "Reusable components and consistent UI patterns at scale.",
    icon: Palette,
  },
  {
    title: "AI & SaaS Products",
    description: "Building modern interfaces for AI-powered and SaaS platforms.",
    icon: Cpu,
  },
  {
    title: "Quality Engineering",
    description: "Automated testing, reliability, and production-ready code.",
    icon: TestTube2,
  },
] as const;

export const aboutHighlights = [
  { icon: Rocket, text: "Production-ready solutions" },
  { icon: Accessibility, text: "Accessible & responsive UI" },
] as const;