import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/constants/site";

export function ContactSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Visit <span className="text-accent">Our Shop</span>
            </h2>
            <p className="mt-4 text-foreground-secondary">
              Located in Buena Park, serving all of Orange County.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <AnimatedSection>
            <div className="rounded-xl border border-border overflow-hidden h-80 lg:h-full bg-surface flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <p className="text-foreground-secondary text-sm">
                  Google Maps embed will be added here
                </p>
                <p className="text-foreground-muted text-xs mt-2">
                  {SITE_CONFIG.address.full}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content: SITE_CONFIG.address.full,
                  href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: SITE_CONFIG.phone,
                  href: `tel:${SITE_CONFIG.phoneRaw}`,
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: SITE_CONFIG.email,
                  href: `mailto:${SITE_CONFIG.email}`,
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: `Mon–Sat: ${SITE_CONFIG.hours.weekdays}\nSun: ${SITE_CONFIG.hours.sunday}`,
                  href: undefined,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">
                      {item.title}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-foreground-secondary hover:text-accent transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground-secondary whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Service Area */}
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-sm font-semibold mb-2">Service Area</div>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {SITE_CONFIG.areaServed.join(" • ")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
