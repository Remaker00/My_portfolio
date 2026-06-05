import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceItems } from "@/constants/experience";

export function Experience() {
  return (
    <SectionShell id="experience" className="bg-card/20">
      <FadeIn>
        <SectionHeading
          label="Experience"
          title="The journey so far."
          description="From engineering fundamentals through full-time frontend delivery on commercial platforms."
        />
      </FadeIn>

      <ExperienceTimeline items={experienceItems} />
    </SectionShell>
  );
}
