import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ResidentialVisualizer } from "@/components/visualizer/ResidentialVisualizer";

export const metadata: Metadata = {
  title: "Commercial Film Visualizer — Preview Window Film for Your Business",
  description:
    "Interactive commercial window film simulator. Preview solar control, decorative, and security films for offices, storefronts, and commercial buildings.",
};

export default function CommercialVisualizerPage() {
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
                Commercial Film <span className="text-accent">Visualizer</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                See how solar control, decorative, and safety films can transform
                your commercial space. Compare films and explore performance specs.
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
