import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { TintVisualizer } from "@/components/visualizer/TintVisualizer";

export const metadata: Metadata = {
  title: "Window Tint Visualizer — Preview Your Tint Shade",
  description:
    "Interactive car window tint simulator. Drag the slider to preview different VLT percentages and see how your vehicle will look. Try it before you buy!",
};

export default function AutoVisualizerPage() {
  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Interactive Tool
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Tint <span className="text-accent">Visualizer</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                Drag the slider to preview how different tint shades look on a
                vehicle. Find your perfect VLT percentage before your appointment.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <TintVisualizer />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
