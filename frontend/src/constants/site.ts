export const siteConfig = {
  name: "Nishant Sourav",
  title: "Frontend Developer",
  tagline:
    "Crafting scalable interfaces with precision, motion, and performance.",
  description:
    "Frontend developer in Bangalore shipping production React & Next.js interfaces — AI marketplaces, compliance SaaS, and Playwright-tested releases. Open to full-time roles.",
  ogImageAlt:
    "Nishant Sourav — Frontend Developer portfolio with projects, experience, and contact",
  url: "https://github.com/Remaker00/My_portfolio",
  email: "nishant.sharma8507966@gmail.com",
  resumeUrl: "/Nishant_CV.pdf",
  location: "Bangalore, India",
} as const;

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
