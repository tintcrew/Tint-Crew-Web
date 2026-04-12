import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Tint Crew in Buena Park, CA. Call ${SITE_CONFIG.phone} or visit us at ${SITE_CONFIG.address.full}. Serving all of Orange County.`,
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="mt-6 text-foreground-secondary max-w-2xl">
              Visit our shop in Buena Park, give us a call, or send us a
              message. We&apos;re here to help with all your window tinting
              needs.
            </p>
          </AnimatedSection>

          {/* Storefront Image */}
          <AnimatedSection>
            <div className="relative mt-12 h-64 sm:h-80 w-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&q=80"
                alt="Tint Crew storefront in Buena Park, CA"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <p className="text-white font-bold text-lg">Our Buena Park Location</p>
                <p className="text-white/80 text-sm">{SITE_CONFIG.address.full}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Visit Our Shop",
                    lines: [SITE_CONFIG.address.full],
                    href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`,
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    lines: [SITE_CONFIG.phone],
                    href: `tel:${SITE_CONFIG.phoneRaw}`,
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    lines: [SITE_CONFIG.email],
                    href: `mailto:${SITE_CONFIG.email}`,
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    lines: [
                      `Monday–Saturday: ${SITE_CONFIG.hours.weekdays}`,
                      `Sunday: ${SITE_CONFIG.hours.sunday}`,
                    ],
                    href: undefined,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-6 rounded-xl border border-border bg-card"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      {item.lines.map((line) =>
                        item.href ? (
                          <a
                            key={line}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="block text-sm text-foreground-secondary hover:text-accent transition-colors mt-1"
                          >
                            {line}
                          </a>
                        ) : (
                          <p
                            key={line}
                            className="text-sm text-foreground-secondary mt-1"
                          >
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))}

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-bold mb-2">Service Area</h3>
                  <p className="text-sm text-foreground-secondary">
                    {SITE_CONFIG.areaServed.join(" • ")}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-8">
                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
