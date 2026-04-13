import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { WorkCarousel } from "./WorkCarousel";
import { ArrowRight } from "lucide-react";

export function ShowcaseSection() {
  return (
    <section className="py-24 sm:py-32 bg-surface relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Our Portfolio
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Time To Get Your Vehicle
              <br />
              To Look Its <span className="text-accent">Best</span>
            </h2>
            <p className="mt-6 text-foreground-secondary max-w-2xl mx-auto text-lg">
              Every vehicle is treated with the same attention to detail — from
              economy cars to luxury exotics. See recent projects from our Buena Park shop.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <WorkCarousel />
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-12 text-center">
            <Link href="/gallery" className={buttonVariants({ size: "lg" })}>
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
