import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <ShowcaseSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ExperienceSection />
      <CtaSection />
    </>
  );
}
