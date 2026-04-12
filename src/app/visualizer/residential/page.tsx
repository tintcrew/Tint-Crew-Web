import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LlumarTabs } from "@/components/shared/LlumarViewer";

export const metadata: Metadata = {
  title: "Residential Film Visualizer — Preview Window Film for Your Home",
  description:
    "Preview solar control, decorative, and Low-E window films for your home with Llumar's interactive viewer. See the difference before you buy.",
};

export default function ResidentialVisualizerPage() {
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
                Home Film <span className="text-accent">Visualizer</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                See how different window films can transform your home. Preview
                solar control and decorative options in a real room setting.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <LlumarTabs
              tabs={[
                { label: "Solar & Decorative", type: "residential-solar-decorative" },
                { label: "Solar Control", type: "residential-solar" },
                { label: "Decorative", type: "residential-decorative" },
                { label: "Energy Calculator", type: "energy-calculator" },
              ]}
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
