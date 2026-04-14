"use client";

import HeroSection from "../components/HeroSection";
import BentoGrid from "../components/BentoGrid";
import ExperienceSection from "../components/ExperienceSection";
import ActivitiesSection from "../components/ActivitiesSection";
import JourneySection from "../components/JourneySection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BentoGrid />
      <ExperienceSection />
      <ProjectsSection />
      <JourneySection />
      {/* <ActivitiesSection /> */}
      <ContactSection />
    </main>
  );
}
