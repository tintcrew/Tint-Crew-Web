import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LlumarTabs } from "@/components/shared/LlumarViewer";

export const metadata: Metadata = {
  title: "Commercial Film Visualizer — Preview Window Film for Your Business",
  description:
    "Preview solar control, decorative, and security window films for offices and commercial buildings with Llumar's interactive viewer.",
};

export default function CommercialVisualizerPage() {
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
                Commercial Film <span className="text-accent">Visualizer</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                Explore how solar control and decorative films can enhance your
                commercial space. Preview options for offices, storefronts, and more.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <LlumarTabs
              tabs={[
                { label: "Solar & Decorative", type: "commercial-solar-decorative" },
                { label: "Solar Control", type: "commercial-solar" },
                { label: "Decorative", type: "commercial-decorative" },
                { label: "Energy Calculator", type: "energy-calculator" },
              ]}
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
