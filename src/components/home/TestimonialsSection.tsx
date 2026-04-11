import { Star } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const TESTIMONIALS = [
  {
    name: "Michael T.",
    vehicle: "Tesla Model Y",
    rating: 5,
    text: "Best tint shop in OC! The Llumar IRX ceramic tint on my Tesla is incredible. No interference with sensors and the heat rejection is unreal. Been going here for years.",
  },
  {
    name: "Sarah K.",
    vehicle: "BMW X5",
    rating: 5,
    text: "Family-owned and it shows. They took the time to explain each film option and helped me choose the perfect shade. Professional install with zero imperfections.",
  },
  {
    name: "David L.",
    vehicle: "Ford F-150",
    rating: 5,
    text: "Third time coming back to Tint Crew. Got the Phantom S5 this time and the clarity is amazing. Fair prices and honest service. Wouldn't go anywhere else.",
  },
  {
    name: "Jennifer M.",
    vehicle: "Home Windows",
    rating: 5,
    text: "Had Vista film installed on our home windows. The difference in heat and glare is night and day. Our energy bill dropped noticeably. Highly recommend!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              What Our <span className="text-accent">Customers</span> Say
            </h2>
            <p className="mt-4 text-foreground-secondary">
              1,095+ reviews on Yelp. Here&apos;s why Orange County trusts Tint Crew.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <AnimatedSection key={testimonial.name} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {testimonial.vehicle}
                    </div>
                  </div>
                  <div className="text-xs text-foreground-muted">
                    via Yelp
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
