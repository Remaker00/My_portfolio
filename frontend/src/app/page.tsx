import { StatusBar } from "@/features/status-bar/StatusBar";
import { Intro } from "@/features/intro/Intro";
import { ReleaseLog } from "@/features/releases/ReleaseLog";
import { PageAudit } from "@/features/audit/PageAudit";
import { CareerLog } from "@/features/career/CareerLog";
import { SkillPit } from "@/features/skills/SkillPit";
import { ContactForm } from "@/features/contact/ContactForm";
import { Footer } from "@/features/footer/Footer";

export default function HomePage() {
  return (
    <>
      <StatusBar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <main>
          <Intro />
          <ReleaseLog />
          <PageAudit />
          <CareerLog />
          <SkillPit />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
