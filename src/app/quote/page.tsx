import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Get an instant window tinting quote for your vehicle. Select your year, make, and model to see pricing for Llumar and Rayno films. Book your appointment online.",
};

export default function QuotePage() {
  return (
    <div className="pt-20">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Instant Pricing
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Get Your Free{" "}
                <span className="text-accent">Quote</span>
              </h1>
              <p className="mt-6 text-foreground-secondary max-w-2xl mx-auto">
                Select your vehicle to see personalized pricing for all four
                film options. Then choose your services and book your
                appointment — all in one place.
              </p>
            </div>
          </AnimatedSection>

          {/* Quote Wizard Placeholder */}
          <AnimatedSection>
            <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-12">
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-4 mb-12">
                {["Vehicle", "Pricing", "Book"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        i === 0
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface text-foreground-muted"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        i === 0 ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {step}
                    </span>
                    {i < 2 && (
                      <div className="w-8 h-px bg-border mx-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Vehicle Selection */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-center">
                  Select Your Vehicle
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Year *
                    </label>
                    <select className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select Year</option>
                      <option>2020~2026</option>
                      <option>2015~2019</option>
                      <option>2010~2014</option>
                      <option>2005~2009</option>
                      <option>2000~2004</option>
                      <option>1995~1999</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Make *
                    </label>
                    <select className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select Make</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Model *
                    </label>
                    <select className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select Model</option>
                    </select>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button className="h-12 px-8 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent-hover transition-colors">
                    Get My Quote
                  </button>
                </div>

                <p className="text-center text-xs text-foreground-muted">
                  Quote wizard will be fully interactive once pricing data is
                  loaded. Upload your Excel file to activate.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
