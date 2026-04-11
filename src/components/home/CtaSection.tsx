import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/constants/site";

export function CtaSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-background to-background p-12 sm:p-16 text-center">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Ready for the Best Tint
                <br />
                in <span className="text-accent">Orange County</span>?
              </h2>
              <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
                Get a personalized quote in seconds. Select your vehicle, choose
                your film, and book your appointment — all online.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/quote" className={buttonVariants({ size: "xl" })}>
                  Get Your Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href={`tel:${SITE_CONFIG.phoneRaw}`} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
