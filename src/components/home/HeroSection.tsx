"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-secondary" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Red accent glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Trusted Since {SITE_CONFIG.since} &bull; 40+ Years of Excellence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]"
          >
            Professional Window Tinting in{" "}
            <span className="text-accent">Orange County</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Authorized Llumar, Vista &amp; Rayno dealer serving Buena Park and
            all of Orange County. Premium automotive, residential, and
            commercial window film solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/quote" className={buttonVariants({ size: "xl" })}>
              Get Instant Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={`tel:${SITE_CONFIG.phoneRaw}`} className={buttonVariants({ variant: "outline", size: "xl" })}>
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "40+", label: "Years Experience" },
              { value: "1,095+", label: "Yelp Reviews" },
              { value: "99%", label: "UV Protection" },
              { value: "Lifetime", label: "Warranty" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-accent">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-foreground-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
