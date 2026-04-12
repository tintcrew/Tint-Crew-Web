import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { TintVisualizer } from "@/components/visualizer/TintVisualizer";

export const metadata: Metadata = {
  title: "Window Tint Simulator — Preview Your Tint Shade",
  description:
    "Interactive car window tint simulator. Choose 5%, 15%, 30%, or 50% VLT and see how it looks on your vehicle. Try before you buy at Tint Crew.",
};

export default function AutoVisualizerPage() {
  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                Try Before You Buy
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Tint <span className="text-accent">Simulator</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                Choose your vehicle, select a shade, and see how it looks
                instantly. We carry 5%, 15%, 30%, and 50% VLT in all four
                premium film lines.
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
