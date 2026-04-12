import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ResidentialVisualizer } from "@/components/visualizer/ResidentialVisualizer";

export const metadata: Metadata = {
  title: "Residential Film Visualizer — Preview Window Film for Your Home",
  description:
    "Interactive home window film simulator. Preview solar control, Low-E, decorative, and safety films with before/after comparison and day/night toggle.",
};

export default function ResidentialVisualizerPage() {
  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                Interactive Tool
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Home Film <span className="text-accent">Visualizer</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                Preview how different window films transform your home. Compare
                before and after, toggle day and night views, and explore film types.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <ResidentialVisualizer />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
