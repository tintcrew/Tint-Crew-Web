import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Get an instant window tinting quote for your vehicle. Select your year, make, and model to see pricing for Llumar and Rayno films. Book your appointment online.",
};

export default function QuotePage() {
  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Instant Pricing
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Get Your Free{" "}
                <span className="text-accent">Quote</span>
              </h1>
              <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
                Select your vehicle, compare film options with real pricing, and
                book your appointment — all in one place.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <QuoteWizard />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
