import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StatsSection } from "@/components/sections/stats-section";
import { EventsSection } from "@/components/sections/events-section";
import { TeamSection } from "@/components/sections/team-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <EventsSection />
      <TeamSection />
      <CtaSection />
    </main>
  );
}
