export type CareerEntry = {
  id: string;
  period: string;
  role: string;
  organization: string;
  note: string;
  impact?: { value: string; label: string }[];
  latest?: boolean;
};

export const career: CareerEntry[] = [
  {
    id: "bytequest",
    period: "Jul 2024 — Sep 2026 · Noida",
    role: "Frontend Developer",
    organization: "ByteQuest Softwares (011BQ)",
    note: "Architected and maintained high-performance React and Next.js applications serving thousands of users — PoweredByAI, Zaprep and EnviroByte — with a focus on responsiveness, SEO and production reliability.",
    impact: [
      { value: "62 → 91", label: "Lighthouse performance" },
      { value: "−35%", label: "page load time" },
      { value: "40+", label: "reusable components" },
      { value: "20+", label: "production features" },
      { value: "50+", label: "production issues resolved" },
      { value: "−25%", label: "recurring defects" },
    ],
    latest: true,
  },
  {
    id: "sharpener",
    period: "Jun 2023 — May 2024",
    role: "Full-Stack Course",
    organization: "Sharpener Tech",
    note: "Intensive project-based training across React, Node.js, Express, databases and deployment.",
  },
  {
    id: "mvit",
    period: "Aug 2019 — May 2023",
    role: "B.E. Electrical & Electronics",
    organization: "Sir M. Visvesvaraya Institute of Technology",
    note: "Engineering foundation, then a deliberate switch into software.",
  },
];
