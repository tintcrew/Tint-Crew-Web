import type { Metadata } from "next";
import { Award, Users, Shield, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Tint Crew has been serving Orange County since ${SITE_CONFIG.since}. Family-owned window tinting shop in Buena Park, CA. Authorized Llumar, Vista & Rayno dealer.`,
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
                Family-Owned Since{" "}
                <span className="text-accent">{SITE_CONFIG.since}</span>
              </h1>
              <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
                For over 40 years, Tint Crew has been Orange County&apos;s
                trusted name in window tinting. What started as a small
                family operation in Buena Park has grown into one of the
                most respected tint shops in Southern California — while
                staying true to our roots of honest service, quality
                craftsmanship, and fair pricing.
              </p>
              <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
                As authorized dealers for Llumar, Vista, and Rayno, we carry
                only the best window films in the industry. Every installation
                is performed by our certified, factory-trained technicians
                who take pride in delivering flawless results.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, value: "40+", label: "Years of Service" },
              { icon: Users, value: "1,095+", label: "Yelp Reviews" },
              { icon: Award, value: "3", label: "Premium Brands" },
              { icon: Shield, value: "Lifetime", label: "Warranty" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl border border-border bg-card">
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-black text-accent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground-muted mt-1">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-20 max-w-3xl">
              <h2 className="text-3xl font-black tracking-tight mb-6">
                Our <span className="text-accent">Brands</span>
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-lg font-bold">Llumar</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    The world&apos;s leading window film brand by Eastman. We
                    carry their CTX and IRX nano-ceramic automotive films, Valor
                    paint protection film, and the complete architectural line
                    for residential and commercial applications.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-lg font-bold">Vista by Llumar</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    Premium architectural films available exclusively through
                    SelectPro dealers like us. Vista offers Harmony, Neutral,
                    Deluxe, and Low-E films for the most demanding residential
                    and commercial projects.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-lg font-bold">Rayno</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    Innovative window film manufacturer known for their true
                    carbon MonoCarbon series and the carbon-ceramic Phantom S5.
                    Excellent options that deliver outstanding performance at
                    competitive prices.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
