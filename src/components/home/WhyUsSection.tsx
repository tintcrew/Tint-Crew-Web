import { Users, Award, ShieldCheck, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const REASONS = [
  {
    icon: Users,
    title: "Family-Owned Since 1985",
    description:
      "Over 40 years of trusted service. Three generations dedicated to perfecting the craft of window tinting.",
  },
  {
    icon: Award,
    title: "Authorized Dealer",
    description:
      "Official Llumar, Vista & Rayno dealer. Access to the best window films on the market with manufacturer-backed warranties.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description:
      "Our installations are backed by lifetime limited warranties. We stand behind every job we do.",
  },
  {
    icon: Wrench,
    title: "Certified Installers",
    description:
      "Factory-trained and certified professionals. Precision installation with no bubbles, gaps, or imperfections.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Why <span className="text-accent">Tint Crew</span>?
            </h2>
            <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
              Orange County&apos;s most trusted window tinting experts for over
              four decades.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, i) => (
            <AnimatedSection key={reason.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-4">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2">{reason.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
