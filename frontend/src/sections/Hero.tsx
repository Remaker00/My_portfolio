import { HeroShell } from "@/components/hero/HeroShell";
import { HeroStaticContent } from "@/components/hero/HeroStaticContent";
import { HeroCommandMenu } from "@/components/hero/HeroCommandMenu";
import { HeroRotatingRole } from "@/components/hero/HeroRotatingRole";

export function Hero() {
  return (
    <HeroShell>
      <HeroStaticContent
        commandMenu={<HeroCommandMenu />}
        roleLine={<HeroRotatingRole />}
      />
    </HeroShell>
  );
}
