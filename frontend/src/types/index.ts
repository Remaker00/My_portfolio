export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export type ProjectCategory = "professional" | "learning";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  gradient: string;
  category: ProjectCategory;
  /** Client or product name shown on professional cards */
  client?: string;
  period?: string;
  badge?: string;
  highlight?: boolean;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  logo?: string;
};
