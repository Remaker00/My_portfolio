export type ReleaseStatus = "live";

export type Release = {
  id: string;
  product: string;
  category: string;
  status: ReleaseStatus;
  period: string;
  url: string;
  summary: string;
  metrics: { value: string; label: string }[];
  /** What I owned and built. */
  scope: string[];
  /** How the work was verified before it shipped. */
  quality?: string[];
  stack: string[];
};

export const releases: Release[] = [
  {
    id: "poweredbyai",
    product: "PoweredByAI",
    category: "AI tools platform",
    status: "live",
    period: "Oct 2025 — Jul 2026",
    url: "https://poweredbyai.app/",
    summary:
      "An AI-powered discovery platform that scaled past 10,000 tool listings. I optimized its frontend architecture and rendering pipeline and shipped its AI-powered features.",
    metrics: [
      { value: "35%", label: "faster app performance" },
      { value: "10+", label: "AI features shipped" },
      { value: "10,000+", label: "tool listings" },
    ],
    scope: [
      "Reworked the frontend architecture and rendering pipeline — caching, code splitting, lazy loading and asset optimization — for a 35% performance gain.",
      "Built and shipped 10+ AI-powered features and API-driven workflows.",
      "Implemented authentication, search and analytics across the platform.",
    ],
    quality: [
      "Introduced Playwright end-to-end tests covering the critical user journeys.",
      "Catches regressions early and strengthens release confidence.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Caching", "Playwright", "SEO"],
  },
  {
    id: "zaprep",
    product: "Zaprep",
    category: "Instagram automation & engagement platform",
    status: "live",
    period: "Jul 2026 — Sep 2026",
    url: "https://www.zaprep.com/",
    summary:
      "An Instagram DM automation platform for creators and businesses, built on the official Meta API. I engineered its billing system.",
    metrics: [
      { value: "3", label: "payment providers unified" },
    ],
    scope: [
      "Engineered a centralized billing module integrating Razorpay, Dodo Payments and Stripe behind one interface.",
      "Implemented reusable payment, subscription, checkout, refund, cancellation and webhook workflows.",
      "Standardized billing operations across all three providers, reducing integration complexity.",
    ],
    stack: ["Next.js", "TypeScript", "Stripe", "Razorpay", "Dodo Payments", "Webhooks"],
  },
  {
    id: "envirobyte",
    product: "EnviroByte",
    category: "Sustainability & emissions reporting",
    status: "live",
    period: "Jul 2025 — Oct 2025",
    url: "https://www.envirobyte.com/",
    summary:
      "A sustainability and emissions reporting platform for regulated facilities. I built its interactive reporting dashboards.",
    metrics: [{ value: "30%", label: "more efficient reporting" }],
    scope: [
      "Developed interactive sustainability and emissions dashboards in React and Next.js.",
      "Built reusable UI components and scalable data-visualization interfaces.",
      "Improved maintainability and the day-to-day reporting experience.",
    ],
    stack: ["Next.js", "React", "Data visualization"],
  },
];
