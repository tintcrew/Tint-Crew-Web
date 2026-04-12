"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/1644/1644-720.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating accent orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md px-5 py-2 text-xs font-medium text-white/90">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Trusted Since {SITE_CONFIG.since} &bull; Orange County&apos;s #1 Tint Shop
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white"
          >
            Premium Window
            <br />
            <span className="relative">
              <span className="text-accent">Tinting</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
            {" "}Experts
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Authorized <span className="text-white/90 font-semibold">Llumar</span>,{" "}
            <span className="text-white/90 font-semibold">Vista</span> &{" "}
            <span className="text-white/90 font-semibold">Rayno</span> dealer.
            Family-owned since 1985, serving Buena Park & all of Orange County.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/quote"
              className={buttonVariants({ size: "xl" }) + " shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow"}
            >
              Get Instant Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className={buttonVariants({ variant: "outline", size: "xl" }) + " border-white/20 text-white hover:bg-white/10"}
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-3xl mx-auto"
          >
            {[
              { value: "40+", label: "Years Experience" },
              { value: "1,095+", label: "5-Star Reviews" },
              { value: "99%", label: "UV Protection" },
              { value: "Lifetime", label: "Warranty" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-black text-accent">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] text-white/40 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
