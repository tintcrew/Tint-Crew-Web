"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Sun, Thermometer, Shield, Eye } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VLT_OPTIONS = [
  { vlt: 5, label: "5%", desc: "Limo Dark", color: "rgba(0,0,0,0.95)" },
  { vlt: 15, label: "15%", desc: "Dark", color: "rgba(0,0,0,0.85)" },
  { vlt: 20, label: "20%", desc: "Medium Dark", color: "rgba(0,0,0,0.80)" },
  { vlt: 35, label: "35%", desc: "Medium", color: "rgba(0,0,0,0.65)" },
  { vlt: 50, label: "50%", desc: "Light", color: "rgba(0,0,0,0.50)" },
  { vlt: 70, label: "70%", desc: "Very Light", color: "rgba(0,0,0,0.30)" },
];

const FILM_DATA = [
  { id: "monocarbon", name: "Rayno MonoCarbon", heat: 40, ir: 35, uv: 99 },
  { id: "phantom", name: "Rayno Phantom S5", heat: 66, ir: 58, uv: 99 },
  { id: "ctx", name: "Llumar CTX", heat: 60, ir: 70, uv: 99 },
  { id: "irx", name: "Llumar IRX", heat: 62, ir: 97, uv: 99 },
];

const ZONES = [
  { id: "windshield", label: "Windshield" },
  { id: "front", label: "Front Doors" },
  { id: "rear", label: "Rear Doors" },
  { id: "back", label: "Back Glass" },
  { id: "sunroof", label: "Sunroof" },
];

export function TintVisualizer() {
  const [selectedFilm, setSelectedFilm] = useState(FILM_DATA[3]); // IRX default
  const [vlt, setVlt] = useState(20);
  const [activeZones, setActiveZones] = useState<Set<string>>(
    new Set(["front", "rear", "back"])
  );
  const [vehicleType, setVehicleType] = useState<"sedan" | "suv">("sedan");
  const carRef = useRef<SVGSVGElement>(null);

  const tintOpacity = 1 - vlt / 100;
  const isLegalFront = vlt >= 70;

  function toggleZone(zone: string) {
    setActiveZones((prev) => {
      const next = new Set(prev);
      if (next.has(zone)) next.delete(zone);
      else next.add(zone);
      return next;
    });
  }

  function selectAllSides() {
    setActiveZones(new Set(["front", "rear", "back"]));
  }

  function selectFrontsOnly() {
    setActiveZones(new Set(["front"]));
  }

  // Animate tint change
  useEffect(() => {
    if (!carRef.current) return;
    const windows = carRef.current.querySelectorAll(".tint-window");
    windows.forEach((w) => {
      const zone = w.getAttribute("data-zone") || "";
      const targetOpacity = activeZones.has(zone) ? tintOpacity : 0;
      gsap.to(w, { opacity: targetOpacity, duration: 0.5, ease: "power2.out" });
    });
  }, [vlt, activeZones, tintOpacity]);

  return (
    <div className="space-y-8">
      {/* Vehicle Type + Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["sedan", "suv"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setVehicleType(type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-all capitalize",
                vehicleType === type
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-border-hover"
              )}
            >
              {type === "suv" ? "SUV / Truck" : "Sedan / Coupe"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={selectAllSides}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:border-accent/50 transition-all"
          >
            All Sides + Back
          </button>
          <button
            onClick={selectFrontsOnly}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:border-accent/50 transition-all"
          >
            Fronts Only
          </button>
        </div>
      </div>

      {/* Main Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car SVG */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-gradient-to-b from-surface to-background p-6 sm:p-10">
          <svg
            ref={carRef}
            viewBox="0 0 800 400"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {vehicleType === "sedan" ? (
              <>
                {/* Body */}
                <path d="M100 280 L100 220 Q100 195 125 185 L230 145 Q265 130 310 125 L490 125 Q535 130 570 145 L675 185 Q700 195 700 220 L700 280" fill="var(--surface)" stroke="var(--border)" strokeWidth="2.5"/>
                {/* Roof */}
                <path d="M230 145 Q245 95 300 78 L500 78 Q555 95 570 145" fill="var(--surface)" stroke="var(--border)" strokeWidth="2.5"/>
                {/* Windshield glass */}
                <path d="M235 142 Q248 100 298 82 L350 80 L350 142 Z" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1.5"/>
                {/* Windshield tint overlay */}
                <path className="tint-window" data-zone="windshield" d="M235 142 Q248 100 298 82 L350 80 L350 142 Z" fill="black" opacity="0"/>
                {/* Front door glass */}
                <path d="M355 80 L355 142 L445 142 L445 80 Z" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1.5"/>
                <path className="tint-window" data-zone="front" d="M355 80 L355 142 L445 142 L445 80 Z" fill="black" opacity="0"/>
                {/* Rear door glass */}
                <path d="M450 80 L450 142 L555 142 Q548 100 505 82 L450 80" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1.5"/>
                <path className="tint-window" data-zone="rear" d="M450 80 L450 142 L555 142 Q548 100 505 82 L450 80" fill="black" opacity="0"/>
                {/* Back glass */}
                <path d="M558 142 Q562 120 565 105 L570 142 Z" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1"/>
                <path className="tint-window" data-zone="back" d="M558 142 Q562 120 565 105 L570 142 Z" fill="black" opacity="0"/>
                {/* Details */}
                <line x1="350" y1="80" x2="350" y2="142" stroke="var(--border-hover)" strokeWidth="1"/>
                <line x1="445" y1="80" x2="445" y2="142" stroke="var(--border-hover)" strokeWidth="1"/>
                {/* Headlights */}
                <ellipse cx="125" cy="215" rx="20" ry="12" fill="var(--accent)" opacity="0.3"/>
                <ellipse cx="675" cy="215" rx="20" ry="12" fill="var(--accent)" opacity="0.15"/>
                {/* Wheels */}
                <circle cx="210" cy="285" r="38" fill="var(--background)" stroke="var(--border)" strokeWidth="2.5"/>
                <circle cx="210" cy="285" r="24" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2"/>
                <circle cx="210" cy="285" r="8" fill="var(--border-hover)"/>
                <circle cx="590" cy="285" r="38" fill="var(--background)" stroke="var(--border)" strokeWidth="2.5"/>
                <circle cx="590" cy="285" r="24" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2"/>
                <circle cx="590" cy="285" r="8" fill="var(--border-hover)"/>
                {/* Ground shadow */}
                <ellipse cx="400" cy="328" rx="280" ry="8" fill="var(--border)" opacity="0.3"/>
              </>
            ) : (
              <>
                {/* SUV Body */}
                <path d="M100 290 L100 210 Q100 185 125 175 L225 135 Q260 120 310 115 L490 115 Q540 120 575 135 L675 175 Q700 185 700 210 L700 290" fill="var(--surface)" stroke="var(--border)" strokeWidth="2.5"/>
                {/* Roof */}
                <path d="M225 135 Q238 75 295 58 L505 58 Q562 75 575 135" fill="var(--surface)" stroke="var(--border)" strokeWidth="2.5"/>
                {/* Windshield */}
                <path d="M230 132 Q242 82 292 62 L345 60 L345 132 Z" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1.5"/>
                <path className="tint-window" data-zone="windshield" d="M230 132 Q242 82 292 62 L345 60 L345 132 Z" fill="black" opacity="0"/>
                {/* Front */}
                <path d="M350 60 L350 132 L440 132 L440 60 Z" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1.5"/>
                <path className="tint-window" data-zone="front" d="M350 60 L350 132 L440 132 L440 60 Z" fill="black" opacity="0"/>
                {/* Rear */}
                <path d="M445 60 L445 132 L565 132 Q558 82 510 62 L445 60" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1.5"/>
                <path className="tint-window" data-zone="rear" d="M445 60 L445 132 L565 132 Q558 82 510 62 L445 60" fill="black" opacity="0"/>
                {/* Back */}
                <path d="M568 132 Q572 105 575 85 L580 132 Z" fill="rgba(150,200,255,0.15)" stroke="var(--border-hover)" strokeWidth="1"/>
                <path className="tint-window" data-zone="back" d="M568 132 Q572 105 575 85 L580 132 Z" fill="black" opacity="0"/>
                {/* Details */}
                <line x1="350" y1="60" x2="350" y2="132" stroke="var(--border-hover)" strokeWidth="1"/>
                <line x1="440" y1="60" x2="440" y2="132" stroke="var(--border-hover)" strokeWidth="1"/>
                <ellipse cx="125" cy="208" rx="22" ry="14" fill="var(--accent)" opacity="0.3"/>
                {/* Wheels */}
                <circle cx="210" cy="295" r="42" fill="var(--background)" stroke="var(--border)" strokeWidth="2.5"/>
                <circle cx="210" cy="295" r="28" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2"/>
                <circle cx="210" cy="295" r="9" fill="var(--border-hover)"/>
                <circle cx="590" cy="295" r="42" fill="var(--background)" stroke="var(--border)" strokeWidth="2.5"/>
                <circle cx="590" cy="295" r="28" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2"/>
                <circle cx="590" cy="295" r="9" fill="var(--border-hover)"/>
                <ellipse cx="400" cy="342" rx="280" ry="8" fill="var(--border)" opacity="0.3"/>
              </>
            )}
            {/* VLT label */}
            <text x="400" y="380" textAnchor="middle" fill="var(--foreground-muted)" fontSize="13" fontFamily="system-ui">
              {vlt}% VLT — {VLT_OPTIONS.find((v) => v.vlt === vlt)?.desc || "Custom"}
            </text>
          </svg>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* VLT Slider */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold">Tint Shade</span>
              <span className="text-2xl font-black text-accent">{vlt}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="70"
              step="1"
              value={vlt}
              onChange={(e) => setVlt(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-accent"
              style={{
                background: `linear-gradient(to right, var(--accent) ${((vlt - 5) / 65) * 100}%, var(--border) ${((vlt - 5) / 65) * 100}%)`,
              }}
            />
            <div className="flex flex-wrap gap-1.5 mt-3">
              {VLT_OPTIONS.map((opt) => (
                <button
                  key={opt.vlt}
                  onClick={() => setVlt(opt.vlt)}
                  className={cn(
                    "px-2.5 py-1 rounded text-[10px] font-medium border transition-all",
                    vlt === opt.vlt
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border hover:border-border-hover"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* CA Law */}
            <div className={cn(
              "mt-4 p-3 rounded-lg text-xs",
              isLegalFront ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
            )}>
              <strong>CA Law:</strong>{" "}
              {isLegalFront
                ? "Legal for front windows"
                : "Not legal for front windows (min 70%). Legal for rear."}
            </div>
          </div>

          {/* Zone Selection */}
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-sm font-bold block mb-3">Windows</span>
            <div className="space-y-2">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => toggleZone(zone.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm border transition-all",
                    activeZones.has(zone.id)
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-foreground-muted hover:border-border-hover"
                  )}
                >
                  <span>{zone.label}</span>
                  {activeZones.has(zone.id) && (
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Film Selector */}
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-sm font-bold block mb-3">Film Type</span>
            <div className="space-y-2">
              {FILM_DATA.map((film) => (
                <button
                  key={film.id}
                  onClick={() => setSelectedFilm(film)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg text-sm border transition-all",
                    selectedFilm.id === film.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-border-hover"
                  )}
                >
                  <div className="font-medium">{film.name}</div>
                  <div className="flex gap-3 mt-1 text-[10px] text-foreground-muted">
                    <span>{film.uv}% UV</span>
                    <span>{film.heat}% Heat</span>
                    <span>{film.ir}% IR</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Shield, label: "UV Protection", value: `${selectedFilm.uv}%`, color: "text-accent" },
          { icon: Thermometer, label: "Heat Rejection", value: `${selectedFilm.heat}%`, color: "text-accent" },
          { icon: Sun, label: "IR Rejection", value: `${selectedFilm.ir}%`, color: "text-accent" },
          { icon: Eye, label: "Visible Light", value: `${vlt}%`, color: "text-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <stat.icon className="h-5 w-5 mx-auto text-accent mb-2" />
            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/quote" className={buttonVariants({ size: "lg" })}>
          Get Your Exact Quote
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
