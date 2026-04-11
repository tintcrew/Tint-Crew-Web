import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight">
                TINT<span className="text-accent">CREW</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-foreground-secondary leading-relaxed">
              Family-owned since {SITE_CONFIG.since}. Orange County&apos;s
              trusted window tinting experts. Authorized{" "}
              {SITE_CONFIG.brands.join(", ")} dealer.
            </p>
            <div className="mt-6 flex gap-4">
              {SITE_CONFIG.social.yelp && (
                <a
                  href={SITE_CONFIG.social.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent transition-colors text-sm font-medium"
                >
                  Yelp
                </a>
              )}
              {SITE_CONFIG.social.facebook && (
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-accent transition-colors text-sm font-medium"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Automotive Tinting", href: "/services/automotive-tinting" },
                { label: "Paint Protection Film", href: "/services/paint-protection" },
                { label: "Residential Tinting", href: "/services/residential-tinting" },
                { label: "Commercial Tinting", href: "/services/commercial-tinting" },
                { label: "Tesla Tinting", href: "/services/tesla-tinting" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Get a Quote", href: "/quote" },
                { label: "Gallery", href: "/gallery" },
                { label: "About Us", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-foreground-secondary">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>{SITE_CONFIG.address.full}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex gap-3 text-sm text-foreground-secondary hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex gap-3 text-sm text-foreground-secondary hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex gap-3 text-sm text-foreground-secondary">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <div>
                  <p>Mon–Sat: {SITE_CONFIG.hours.weekdays}</p>
                  <p>Sun: {SITE_CONFIG.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground-muted">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-foreground-muted">
            Serving {SITE_CONFIG.areaServed.slice(0, 5).join(", ")} &amp; all
            of Orange County
          </p>
        </div>
      </div>

      <LocalBusinessSchema />
    </footer>
  );
}
