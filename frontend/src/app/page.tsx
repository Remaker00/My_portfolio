import dynamic from "next/dynamic";
import { Hero } from "@/sections/Hero";

const About = dynamic(
  () => import("@/sections/About").then((m) => ({ default: m.About })),
  { loading: () => <SectionPlaceholder height="min-h-[720px]" /> }
);

const Skills = dynamic(
  () => import("@/sections/Skills").then((m) => ({ default: m.Skills })),
  { loading: () => <SectionPlaceholder height="min-h-[480px]" /> }
);

const Projects = dynamic(
  () => import("@/sections/Projects").then((m) => ({ default: m.Projects })),
  { loading: () => <SectionPlaceholder height="min-h-[640px]" /> }
);

const Experience = dynamic(
  () =>
    import("@/sections/Experience").then((m) => ({ default: m.Experience })),
  { loading: () => <SectionPlaceholder height="min-h-[520px]" /> }
);

const Contact = dynamic(
  () => import("@/sections/Contact").then((m) => ({ default: m.Contact })),
  { loading: () => <SectionPlaceholder height="min-h-[400px]" /> }
);

function SectionPlaceholder({ height }: { height: string }) {
  return (
    <div
      className={`${height} w-full`}
      aria-hidden
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
