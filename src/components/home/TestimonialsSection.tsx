"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const TESTIMONIALS = [
  {
    name: "Michael T.",
    vehicle: "2024 Tesla Model Y",
    rating: 5,
    text: "Best tint shop in OC! The Llumar IRX ceramic tint on my Tesla is incredible. No interference with Autopilot sensors and the heat rejection is unreal. Been going here for years.",
  },
  {
    name: "Sarah K.",
    vehicle: "2023 BMW X5",
    rating: 5,
    text: "Family-owned and it shows in the quality. They took the time to explain each film option and helped me choose the perfect shade. Professional install with zero imperfections.",
  },
  {
    name: "David L.",
    vehicle: "2024 Ford F-150",
    rating: 5,
    text: "Third time coming back to Tint Crew. Got the Phantom S5 this time and the clarity is amazing. Fair prices, honest service — wouldn't go anywhere else in Orange County.",
  },
  {
    name: "Jennifer M.",
    vehicle: "Residential — Home Windows",
    rating: 5,
    text: "Had Vista film installed on our home windows. The difference in heat and glare is night and day. Our energy bill dropped noticeably the very first month!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              What Our <span className="text-accent">Customers</span> Say
            </h2>
            <p className="mt-4 text-foreground-secondary">
              1,095+ five-star reviews on Yelp. Here&apos;s why Orange County trusts us.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <AnimatedSection key={testimonial.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="relative rounded-2xl border border-border bg-card p-8 h-full"
              >
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-accent/20 mb-4" />

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground-secondary leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{testimonial.name}</div>
                    <div className="text-xs text-foreground-muted">
                      {testimonial.vehicle}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] text-foreground-muted bg-surface px-2 py-1 rounded-full">
                      Yelp Review
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Yelp CTA */}
        <AnimatedSection>
          <div className="mt-12 text-center">
            <a
              href="https://www.yelp.com/biz/tint-crew-buena-park"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              See all 1,095+ reviews on Yelp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
