import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SERVICES } from "@/constants/services";

export function ServicesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Our <span className="text-accent">Services</span>
            </h2>
            <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
              From automotive to architectural, we provide comprehensive window
              film solutions for every need.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <Link href={service.href} className="group block h-full">
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">{service.shortTitle}</h3>
                  </div>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-foreground-muted"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
