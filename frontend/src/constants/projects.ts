import type { Project } from "@/types";

export const professionalProjects: Project[] = [
  {
    slug: "poweredbyai",
    title: "PoweredByAI",
    client: "PoweredByAI · AI Tools Marketplace",
    period: "8+ months · Ongoing",
    description:
      "Engineered a high-velocity AI tools discovery platform scaling past 10,000 listings with substantial monthly traffic. Architected performant discovery flows, tool submission pipelines, and monetization surfaces — and implemented Playwright end-to-end testing to validate critical user journeys, catch regressions early, and strengthen release confidence at scale.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Playwright",
      "E2E Testing",
      "SEO",
    ],
    liveUrl: "https://poweredbyai.app/",
    category: "professional",
    badge: "In Production",
    highlight: true,
    gradient: "from-violet-600/25 via-fuchsia-600/15 to-transparent",
  },
  {
    slug: "envirobyte",
    title: "EnviroByte",
    client: "EnviroByte · Regulatory SaaS",
    period: "Client Delivery",
    description:
      "Contributed to an enterprise-grade environmental compliance platform streamlining GHG inventory reporting for regulated facilities. Built verification-driven workflows, transparent calculation pipelines, and regulator-aligned UX — enabling efficient, reproducible, and audit-ready emissions reporting at institutional scale.",
    tags: ["Next.js", "React", "Enterprise SaaS", "Compliance"],
    liveUrl: "https://www.envirobyte.com/",
    category: "professional",
    badge: "Client Platform",
    highlight: true,
    gradient: "from-emerald-600/25 via-teal-600/15 to-transparent",
  },
  {
    slug: "lift-local",
    title: "Lift Local",
    client: "Lift Local · Operational Platform",
    period: "Client Delivery",
    description:
      "Delivered production features for a client-facing operational web application powering day-to-day business workflows. Implemented resilient UI architecture, API-integrated modules, and performance-conscious interfaces — translating complex requirements into dependable, maintainable software in a live commercial environment.",
    tags: ["React", "TypeScript", "Frontend", "Production"],
    liveUrl: "https://app.lift-local.com/",
    category: "professional",
    badge: "Client Platform",
    highlight: true,
    gradient: "from-blue-600/25 via-indigo-600/15 to-transparent",
  },
];

export const learningProjects: Project[] = [
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description:
      "Foundational full-stack exercise — personal finance tracking with client-side state, form validation, and deployment discipline on Vercel.",
    tags: ["React", "JavaScript", "Vercel"],
    liveUrl: "https://expense-tracker-91.vercel.app/",
    repoUrl: "https://github.com/Remaker00/Expense-tracker-app",
    category: "learning",
    gradient: "from-violet-600/20 to-fuchsia-600/20",
  },
  {
    slug: "mail-box",
    title: "Mail-Box Client",
    description:
      "Early-stage UI engineering — email client interface exploring component composition, responsive layouts, and interaction patterns.",
    tags: ["React", "CSS", "Vercel"],
    liveUrl: "https://my-mail9.vercel.app/",
    repoUrl: "https://github.com/Remaker00/MaiL-BoX",
    category: "learning",
    gradient: "from-blue-600/20 to-cyan-600/20",
  },
  {
    slug: "e-commerce",
    title: "E-Commerce Web",
    description:
      "Applied learning build — storefront flows, product presentation, and end-to-end deployment demonstrating growing fluency in React ecosystems.",
    tags: ["React", "JavaScript", "Netlify"],
    liveUrl: "https://e-commerce-zuwava.netlify.app/",
    repoUrl: "https://github.com/Remaker00/E-commerce_Web",
    category: "learning",
    gradient: "from-emerald-600/20 to-teal-600/20",
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio (Initial Build)",
    description:
      "First-generation portfolio — established baseline competence in React, routing, and CSS before advancing into TypeScript and modern architecture.",
    tags: ["Next.js", "JavaScript", "CSS"],
    repoUrl: "https://github.com/Remaker00/My_portfolio",
    liveUrl: "https://github.com/Remaker00/My_portfolio",
    category: "learning",
    gradient: "from-orange-600/20 to-amber-600/20",
  },
];
