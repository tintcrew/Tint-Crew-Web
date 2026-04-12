"use client";

import { motion } from "framer-motion";
import { Users, Award, ShieldCheck, Wrench, Star, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const REASONS = [
  {
    icon: Clock,
    title: "40+ Years",
    subtitle: "Family-Owned Since 1985",
    description: "Three generations dedicated to the craft of window tinting.",
  },
  {
    icon: Award,
    title: "3 Premium Brands",
    subtitle: "Authorized Dealer",
    description: "Official Llumar, Vista & Rayno dealer — the best films on the market.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    subtitle: "Manufacturer-Backed",
    description: "Every installation backed by lifetime limited warranties.",
  },
  {
    icon: Wrench,
    title: "Certified Installers",
    subtitle: "Factory-Trained",
    description: "Precision installation with zero bubbles, gaps, or imperfections.",
  },
  {
    icon: Star,
    title: "1,095+ Reviews",
    subtitle: "5-Star Rated",
    description: "Orange County's highest-rated tint shop on Yelp.",
  },
  {
    icon: Users,
    title: "Same-Day Service",
    subtitle: "Fast Turnaround",
    description: "Most automotive jobs completed in 1-2 hours.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24 sm:py-32 bg-surface relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading */}
          <AnimatedSection>
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                Why Choose Us
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Why Orange County
                <br />
                Trusts <span className="text-accent">Tint Crew</span>
              </h2>
              <p className="mt-6 text-foreground-secondary text-lg leading-relaxed">
                Four decades of experience, thousands of satisfied customers,
                and the best window films in the industry. We don&apos;t just
                tint windows — we perfect them.
              </p>

              {/* Big stat */}
              <div className="mt-10 flex items-baseline gap-3">
                <motion.span
                  className="text-7xl font-black text-accent"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  40+
                </motion.span>
                <div>
                  <div className="text-lg font-bold">Years of</div>
                  <div className="text-lg font-bold text-accent">Excellence</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REASONS.map((reason, i) => (
              <AnimatedSection key={reason.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="p-5 rounded-xl border border-border bg-card hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all"
                >
                  <reason.icon className="h-5 w-5 text-accent mb-3" />
                  <div className="text-base font-bold">{reason.title}</div>
                  <div className="text-[11px] text-accent font-medium uppercase tracking-wider">
                    {reason.subtitle}
                  </div>
                  <p className="mt-2 text-xs text-foreground-secondary leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
