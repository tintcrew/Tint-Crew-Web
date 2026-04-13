import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/constants/site";

export function ExperienceSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Visit Us
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Experience Vehicle
              <br />
              <span className="text-accent">Perfection</span> in Buena Park
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Shop Image Card */}
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full min-h-[500px] group">
              <Image
                src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&q=85"
                alt="Tint Crew workshop"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">
                  Our Shop
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
                  Family-Owned
                  <br />
                  Since 1985
                </h3>
                <p className="text-white/70 text-sm max-w-md">
                  Over 40 years of window tinting excellence. Authorized Llumar,
                  Vista & Rayno dealer in Orange County.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Info Cards */}
          <div className="space-y-4">
            <AnimatedSection delay={0.1}>
              <div className="flex gap-4 p-6 rounded-2xl border border-border bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1">Location</div>
                  <p className="text-sm text-foreground-secondary">
                    {SITE_CONFIG.address.full}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      SITE_CONFIG.address.full
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-semibold text-accent hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex gap-4 p-6 rounded-2xl border border-border bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1">Hours</div>
                  <div className="text-sm text-foreground-secondary space-y-0.5">
                    <div className="flex justify-between">
                      <span>Monday – Saturday</span>
                      <span className="font-semibold text-foreground">
                        {SITE_CONFIG.hours.weekdays}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-foreground-muted">
                        {SITE_CONFIG.hours.sunday}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex gap-4 p-6 rounded-2xl border border-border bg-card">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold mb-1">Call Us</div>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="text-xl font-black text-accent hover:underline"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    Or email {SITE_CONFIG.email}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="p-6 rounded-2xl bg-accent text-accent-foreground">
                <h3 className="text-xl font-black mb-2">
                  Ready to protect your vehicle?
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Get an instant quote online — select your vehicle, see real
                  prices, and book your appointment.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-white text-accent font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
                >
                  Get Your Instant Quote →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Service Areas */}
        <AnimatedSection>
          <div className="mt-16 text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-foreground-muted mb-3">
              Proudly Serving
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-foreground-secondary">
              {SITE_CONFIG.areaServed.map((city, i) => (
                <span key={city} className="flex items-center gap-6">
                  <span className="hover:text-accent transition-colors">{city}</span>
                  {i < SITE_CONFIG.areaServed.length - 1 && (
                    <span className="text-border">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
