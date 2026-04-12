import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SITE_CONFIG } from "@/constants/site";
import type { LucideIcon } from "lucide-react";

interface ProductSpec {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  features: string[];
  heatRejection?: number | null;
  irRejection?: number | null;
  uvBlock?: number;
  warranty: string;
}

interface ServicePageLayoutProps {
  title: string;
  accent: string;
  description: string;
  icon: LucideIcon;
  heroTagline: string;
  heroImage?: string;
  products: ProductSpec[];
  benefits: { title: string; description: string }[];
  ctaText?: string;
  ctaHref?: string;
  children?: React.ReactNode;
}

export function ServicePageLayout({
  title,
  accent,
  description,
  icon: Icon,
  heroTagline,
  heroImage,
  products,
  benefits,
  ctaText = "Get Your Free Quote",
  ctaHref = "/quote",
  children,
}: ServicePageLayoutProps) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-surface to-background overflow-hidden">
        {heroImage && (
          <>
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/65" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                  {heroTagline}
                </span>
              </div>
              <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] ${heroImage ? "text-white" : ""}`}>
                {title.split(accent).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="text-accent">{accent}</span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </h1>
              <p className={`mt-6 text-lg leading-relaxed ${heroImage ? "text-white/80" : "text-foreground-secondary"}`}>
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={ctaHref} className={buttonVariants({ size: "lg" })}>
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  <Phone className="h-4 w-4" />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-3xl font-black tracking-tight mb-4">
                Our <span className="text-accent">Products</span>
              </h2>
              <p className="text-foreground-secondary mb-12 max-w-2xl">
                We carry only the best window films, backed by manufacturer
                warranties and installed by certified professionals.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, i) => (
                <AnimatedSection key={product.id} delay={i * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-6 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs font-medium text-accent uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h3 className="text-xl font-bold mt-1">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-foreground-secondary mb-4">
                      {product.tagline}
                    </p>

                    {/* Specs */}
                    <div className="flex gap-4 mb-4">
                      {product.uvBlock && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent">
                            {product.uvBlock}%
                          </div>
                          <div className="text-[10px] text-foreground-muted uppercase">
                            UV Block
                          </div>
                        </div>
                      )}
                      {product.heatRejection && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent">
                            {product.heatRejection}%
                          </div>
                          <div className="text-[10px] text-foreground-muted uppercase">
                            Heat Rej.
                          </div>
                        </div>
                      )}
                      {product.irRejection && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent">
                            {product.irRejection}%
                          </div>
                          <div className="text-[10px] text-foreground-muted uppercase">
                            IR Rej.
                          </div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">
                          {product.warranty}
                        </div>
                        <div className="text-[10px] text-foreground-muted uppercase">
                          Warranty
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2">
                      {product.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-foreground-secondary"
                        >
                          <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-black tracking-tight mb-12">
              Key <span className="text-accent">Benefits</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <AnimatedSection key={benefit.title} delay={i * 0.08}>
                <div>
                  <h3 className="text-base font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Extra content slot */}
      {children}

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-background to-background p-12 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
                Get a personalized quote for your vehicle or property in seconds.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={ctaHref} className={buttonVariants({ size: "xl" })}>
                  {ctaText}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
