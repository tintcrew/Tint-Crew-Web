"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Sun, Thermometer, Shield, Eye, Home, Moon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILM_TYPES = [
  {
    id: "solar-control",
    name: "Solar Control",
    desc: "Block heat & glare while maintaining your view",
    tintColor: "rgba(40,40,60,0.45)",
    reflectColor: "rgba(180,200,220,0.1)",
    heat: 72,
    uv: 99,
    glare: 75,
    visible: 45,
  },
  {
    id: "low-e",
    name: "Vista Low-E",
    desc: "Insulating film — blocks heat in summer, retains warmth in winter",
    tintColor: "rgba(30,50,70,0.35)",
    reflectColor: "rgba(200,220,240,0.15)",
    heat: 75,
    uv: 99,
    glare: 60,
    visible: 55,
  },
  {
    id: "dual-reflective",
    name: "Dual-Reflective",
    desc: "Reflective outside, clear inside — great for sunbelt homes",
    tintColor: "rgba(50,50,70,0.40)",
    reflectColor: "rgba(220,230,255,0.25)",
    heat: 78,
    uv: 99,
    glare: 87,
    visible: 35,
  },
  {
    id: "decorative-frost",
    name: "Frosted / Privacy",
    desc: "Elegant privacy while diffusing natural light",
    tintColor: "rgba(255,255,255,0.70)",
    reflectColor: "rgba(255,255,255,0.0)",
    heat: 20,
    uv: 95,
    glare: 40,
    visible: 60,
  },
  {
    id: "safety",
    name: "Safety & Security",
    desc: "Holds glass together on impact — protects against break-ins",
    tintColor: "rgba(30,30,30,0.15)",
    reflectColor: "rgba(180,200,220,0.05)",
    heat: 35,
    uv: 99,
    glare: 25,
    visible: 70,
  },
];

export function ResidentialVisualizer() {
  const [selectedFilm, setSelectedFilm] = useState(FILM_TYPES[0]);
  const [isNight, setIsNight] = useState(false);
  const [beforeAfter, setBeforeAfter] = useState(70); // percentage showing "after"
  const windowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    windowRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        backgroundColor: selectedFilm.tintColor,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }, [selectedFilm]);

  return (
    <div className="space-y-8">
      {/* Day/Night Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Preview Your Home</h3>
        <button
          onClick={() => setIsNight(!isNight)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all",
            isNight
              ? "border-accent bg-accent/10 text-accent"
              : "border-border hover:border-border-hover"
          )}
        >
          {isNight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {isNight ? "Night View" : "Day View"}
        </button>
      </div>

      {/* Room Visualization */}
      <div className="relative rounded-2xl border border-border overflow-hidden" style={{ height: 420 }}>
        {/* Room background */}
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-700",
            isNight ? "bg-[#0a0f1a]" : "bg-[#f5f0eb]"
          )}
        >
          {/* Floor */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[35%] transition-colors duration-700",
              isNight ? "bg-[#0d1220]" : "bg-[#d4c8b8]"
            )}
            style={{ backgroundImage: isNight ? "none" : "linear-gradient(to bottom, #d4c8b8, #c4b8a8)" }}
          />

          {/* Wall line */}
          <div className={cn("absolute left-0 right-0 h-px transition-colors duration-700", isNight ? "bg-[#1a2030]" : "bg-[#c0b4a4]")} style={{ top: "65%" }} />

          {/* Window frames */}
          <div className="absolute top-[12%] left-[8%] right-[8%] h-[53%] flex gap-[3%]">
            {/* Window 1 (large) */}
            <div className="relative flex-[2] rounded-sm border-[3px] border-[#8b7d6b] overflow-hidden">
              {/* Before side (no tint) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${beforeAfter}% 0 0)` }}
              >
                <div className={cn(
                  "w-full h-full transition-colors duration-700",
                  isNight ? "bg-[#0a1525]" : "bg-[#b8d4f0]"
                )}>
                  {/* Outside scenery hint */}
                  <div className={cn("absolute bottom-0 left-0 right-0 h-[30%] transition-colors duration-700", isNight ? "bg-[#080e18]" : "bg-[#6a9b5a]")} />
                  {isNight && <div className="absolute top-[20%] left-[30%] w-1 h-1 rounded-full bg-white/60" />}
                  {isNight && <div className="absolute top-[15%] left-[60%] w-0.5 h-0.5 rounded-full bg-white/40" />}
                </div>
                <div className="absolute top-2 left-2 bg-black/50 text-white text-[9px] px-2 py-0.5 rounded font-medium">
                  BEFORE
                </div>
              </div>

              {/* After side (with tint) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 0 0 ${100 - beforeAfter}%)` }}
              >
                <div className={cn(
                  "w-full h-full transition-colors duration-700",
                  isNight ? "bg-[#0a1525]" : "bg-[#b8d4f0]"
                )}>
                  <div className={cn("absolute bottom-0 left-0 right-0 h-[30%] transition-colors duration-700", isNight ? "bg-[#080e18]" : "bg-[#6a9b5a]")} />
                </div>
                <div
                  ref={(el) => { windowRefs.current[0] = el; }}
                  className="absolute inset-0 transition-all duration-500"
                  style={{ backgroundColor: selectedFilm.tintColor }}
                />
                {selectedFilm.reflectColor !== "rgba(255,255,255,0.0)" && !isNight && (
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${selectedFilm.reflectColor}, transparent 60%)` }} />
                )}
                <div className="absolute top-2 right-2 bg-accent/80 text-white text-[9px] px-2 py-0.5 rounded font-medium">
                  AFTER
                </div>
              </div>

              {/* Slider line */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-accent z-10" style={{ left: `${100 - beforeAfter}%` }}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent border-2 border-white flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">↔</span>
                </div>
              </div>

              {/* Cross bars */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#8b7d6b]/50" />
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#8b7d6b]/50" />
            </div>

            {/* Window 2 (medium) */}
            <div className="relative flex-[1.2] rounded-sm border-[3px] border-[#8b7d6b] overflow-hidden">
              <div className={cn("w-full h-full transition-colors duration-700", isNight ? "bg-[#0a1525]" : "bg-[#b8d4f0]")}>
                <div className={cn("absolute bottom-0 left-0 right-0 h-[30%] transition-colors duration-700", isNight ? "bg-[#080e18]" : "bg-[#6a9b5a]")} />
              </div>
              <div
                ref={(el) => { windowRefs.current[1] = el; }}
                className="absolute inset-0 transition-all duration-500"
                style={{ backgroundColor: selectedFilm.tintColor }}
              />
              {selectedFilm.reflectColor !== "rgba(255,255,255,0.0)" && !isNight && (
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${selectedFilm.reflectColor}, transparent 60%)` }} />
              )}
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#8b7d6b]/50" />
            </div>

            {/* Window 3 (small) */}
            <div className="relative flex-1 rounded-sm border-[3px] border-[#8b7d6b] overflow-hidden">
              <div className={cn("w-full h-full transition-colors duration-700", isNight ? "bg-[#0a1525]" : "bg-[#b8d4f0]")}>
                <div className={cn("absolute bottom-0 left-0 right-0 h-[30%] transition-colors duration-700", isNight ? "bg-[#080e18]" : "bg-[#6a9b5a]")} />
              </div>
              <div
                ref={(el) => { windowRefs.current[2] = el; }}
                className="absolute inset-0 transition-all duration-500"
                style={{ backgroundColor: selectedFilm.tintColor }}
              />
              {selectedFilm.reflectColor !== "rgba(255,255,255,0.0)" && !isNight && (
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${selectedFilm.reflectColor}, transparent 60%)` }} />
              )}
            </div>
          </div>

          {/* Furniture hints */}
          <div className={cn("absolute bottom-[38%] left-[12%] w-[25%] h-[8%] rounded transition-colors duration-700", isNight ? "bg-[#151c2d]" : "bg-[#a89880]")} />
          <div className={cn("absolute bottom-[35%] right-[15%] w-[12%] h-[18%] rounded transition-colors duration-700", isNight ? "bg-[#121828]" : "bg-[#b8a890]")} />

          {/* Sun/Moon */}
          {!isNight ? (
            <Sun className="absolute top-[5%] right-[5%] h-8 w-8 text-yellow-400/60" />
          ) : (
            <Moon className="absolute top-[5%] right-[5%] h-7 w-7 text-blue-300/40" />
          )}
        </div>
      </div>

      {/* Before/After Slider */}
      <div>
        <div className="flex justify-between text-xs text-foreground-muted mb-1">
          <span>Before (no film)</span>
          <span>After ({selectedFilm.name})</span>
        </div>
        <input
          type="range"
          min="10"
          max="90"
          value={beforeAfter}
          onChange={(e) => setBeforeAfter(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-accent"
          style={{
            background: `linear-gradient(to right, var(--border) ${beforeAfter}%, var(--accent) ${beforeAfter}%)`,
          }}
        />
      </div>

      {/* Film Type Selector */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-4">
          Select Film Type
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FILM_TYPES.map((film) => (
            <button
              key={film.id}
              onClick={() => setSelectedFilm(film)}
              className={cn(
                "text-left p-4 rounded-xl border transition-all",
                selectedFilm.id === film.id
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-border-hover"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-4 h-4 rounded border border-border"
                  style={{ backgroundColor: film.tintColor }}
                />
                <span className="text-sm font-bold">{film.name}</span>
              </div>
              <p className="text-[11px] text-foreground-muted">{film.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Shield, label: "UV Block", value: `${selectedFilm.uv}%` },
          { icon: Thermometer, label: "Heat Rejection", value: `${selectedFilm.heat}%` },
          { icon: Sun, label: "Glare Reduction", value: `${selectedFilm.glare}%` },
          { icon: Eye, label: "Visible Light", value: `${selectedFilm.visible}%` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <stat.icon className="h-5 w-5 mx-auto text-accent mb-2" />
            <div className="text-2xl font-black text-accent">{stat.value}</div>
            <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/contact" className={buttonVariants({ size: "lg" })}>
          Get a Free Consultation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
