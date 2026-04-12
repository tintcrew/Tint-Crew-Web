"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const SERVICES = [
  {
    title: "Automotive Tinting",
    description: "Premium ceramic films from Llumar & Rayno. 99% UV block, up to 97% infrared rejection.",
    href: "/services/automotive-tinting",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80",
  },
  {
    title: "Paint Protection",
    description: "Llumar Valor PPF with self-healing Tetrashield™ technology. Invisible armor for your paint.",
    href: "/services/paint-protection",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=80",
  },
  {
    title: "Tesla Tinting",
    description: "Specialized tinting for all Tesla models. Sensor-safe ceramic films, glass roof expertise.",
    href: "/services/tesla-tinting",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
  },
  {
    title: "Residential",
    description: "Vista & Llumar architectural films. Reduce heat, glare, and energy costs for your home.",
    href: "/services/residential-tinting",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
  {
    title: "Commercial",
    description: "Solar control, decorative, and security films for offices, storefronts, and buildings.",
    href: "/services/commercial-tinting",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Our <span className="text-accent">Services</span>
            </h2>
            <p className="mt-4 text-foreground-secondary max-w-2xl mx-auto">
              From automotive to architectural, we provide comprehensive window
              film solutions backed by 40+ years of expertise.
            </p>
          </div>
        </AnimatedSection>

        {/* Featured: first 3 in large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {SERVICES.slice(0, 3).map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <Link href={service.href} className="group block h-full">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative h-full min-h-[320px] rounded-2xl overflow-hidden border border-border"
                >
                  {/* Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom 2 in wider cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.slice(3).map((service, i) => (
            <AnimatedSection key={service.title} delay={0.3 + i * 0.1}>
              <Link href={service.href} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative h-60 rounded-2xl overflow-hidden border border-border"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
