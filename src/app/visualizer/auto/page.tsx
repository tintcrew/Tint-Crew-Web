import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LlumarTabs } from "@/components/shared/LlumarViewer";

export const metadata: Metadata = {
  title: "Window Tint & PPF Visualizer",
  description:
    "Preview window tint shades and paint protection film on different vehicles with Llumar's interactive tool. Explore options before your appointment.",
};

export default function AutoVisualizerPage() {
  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                Interactive Tool
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Automotive <span className="text-accent">Visualizer</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                Preview how different window tint shades and paint protection
                film look on various vehicles. Explore your options before
                visiting our shop.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <LlumarTabs
              tabs={[
                { label: "Window Tint & PPF", type: "auto-tint-ppf" },
                { label: "Window Tint Only", type: "auto-tint" },
                { label: "PPF Only", type: "auto-ppf" },
              ]}
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
