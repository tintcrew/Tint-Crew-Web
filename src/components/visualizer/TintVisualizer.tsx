"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Thermometer, Sun, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VLT_OPTIONS = [
  { vlt: 5, label: "5%", desc: "Limo Black", opacity: 0.92 },
  { vlt: 15, label: "15%", desc: "Dark", opacity: 0.82 },
  { vlt: 30, label: "30%", desc: "Medium", opacity: 0.65 },
  { vlt: 50, label: "50%", desc: "Light", opacity: 0.45 },
];

const FILM_DATA = [
  { id: "monocarbon", name: "Rayno MonoCarbon", heat: 40, ir: 35, uv: 99 },
  { id: "phantom", name: "Rayno Phantom S5", heat: 66, ir: 58, uv: 99 },
  { id: "ctx", name: "Llumar CTX", heat: 60, ir: 70, uv: 99 },
  { id: "irx", name: "Llumar IRX", heat: 62, ir: 97, uv: 99 },
];

/*
 * Each vehicle has a photo and SVG window mask polygons defined as
 * percentage coordinates (so they scale with any image size).
 * The mask creates "holes" that reveal a dark overlay = tinted windows.
 */
const VEHICLES = [
  {
    id: "sedan",
    label: "Sedan",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80",
    // Polygons as percentage points: "x1,y1 x2,y2 ..."
    windows: [
      "28,28 34,20 42,19 42,42 28,42",       // windshield
      "43,19 43,42 56,42 56,19",              // front door
      "57,19 57,42 70,42 70,22 65,19",        // rear door
      "71,22 71,42 76,42 76,28",              // back glass
    ],
  },
  {
    id: "suv",
    label: "SUV / Truck",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=80",
    windows: [
      "26,30 33,18 42,16 42,44 26,44",
      "43,16 43,44 57,44 57,16",
      "58,16 58,44 72,44 72,20 66,16",
      "73,20 73,44 78,44 78,30",
    ],
  },
  {
    id: "tesla",
    label: "Tesla",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80",
    windows: [
      "30,30 36,20 44,18 44,44 30,44",
      "45,18 45,44 58,44 58,18",
      "59,18 59,44 72,44 72,22 67,18",
      "73,22 73,44 78,44 78,30",
      "36,14 44,12 67,12 72,14 67,17 44,17", // glass roof
    ],
  },
];

export function TintVisualizer() {
  const [vltIdx, setVltIdx] = useState(0);
  const [filmIdx, setFilmIdx] = useState(3); // IRX default
  const [vehicleIdx, setVehicleIdx] = useState(0);
  const [showTint, setShowTint] = useState(true);

  const vehicle = VEHICLES[vehicleIdx];
  const vltOption = VLT_OPTIONS[vltIdx];
  const film = FILM_DATA[filmIdx];

  // Build SVG mask: white background (opaque) with black polygon cutouts (transparent)
  // Then a dark rect with this mask = dark shows only on windows
  const maskId = `window-mask-${vehicle.id}`;

  return (
    <div className="space-y-8">
      {/* Vehicle Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {VEHICLES.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setVehicleIdx(i)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all",
              vehicleIdx === i
                ? "border-accent bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                : "border-border hover:border-border-hover bg-card"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Main Visualizer */}
      <div className="relative rounded-2xl border border-border overflow-hidden bg-black shadow-2xl">
        {/* Car Photo */}
        <div className="relative aspect-[16/9] sm:aspect-[2/1]">
          <Image
            src={vehicle.image}
            alt={`${vehicle.label} tint preview`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* Tint overlay — only visible through window mask */}
          {showTint && (
            <svg
              className="absolute inset-0 w-full h-full transition-opacity duration-500"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id={maskId}>
                  {/* Everything black (hidden) by default */}
                  <rect width="100" height="100" fill="black" />
                  {/* Window areas in white (visible) */}
                  {vehicle.windows.map((points, i) => (
                    <polygon key={i} points={points} fill="white" />
                  ))}
                </mask>
              </defs>
              {/* Dark rectangle, only shows through window mask */}
              <rect
                width="100"
                height="100"
                fill="black"
                opacity={vltOption.opacity}
                mask={`url(#${maskId})`}
                className="transition-all duration-500"
              />
            </svg>
          )}

          {/* Top info bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2.5">
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Shade</div>
              <div className="text-3xl font-black text-white">{vltOption.label} <span className="text-sm font-normal text-white/50">VLT</span></div>
              <div className="text-xs text-accent font-medium">{vltOption.desc}</div>
            </div>
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2.5 text-right">
              <div className="text-[10px] text-white/50 uppercase tracking-widest">Film</div>
              <div className="text-sm font-bold text-white">{film.name}</div>
            </div>
          </div>

          {/* Before/After toggle */}
          <button
            onClick={() => setShowTint(!showTint)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-full px-5 py-2 text-xs font-medium text-white hover:bg-black/80 transition-all cursor-pointer"
          >
            {showTint ? "Show Original (Before)" : "Show Tinted (After)"}
          </button>
        </div>
      </div>

      {/* VLT Selector — Large cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground-muted mb-4 text-center">
          Choose Your Shade
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {VLT_OPTIONS.map((opt, i) => (
            <button
              key={opt.vlt}
              onClick={() => setVltIdx(i)}
              className={cn(
                "relative rounded-xl border p-4 text-center transition-all",
                vltIdx === i
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/10 scale-[1.02]"
                  : "border-border hover:border-border-hover bg-card"
              )}
            >
              {/* Tint preview swatch */}
              <div
                className="mx-auto w-12 h-12 rounded-lg border border-border mb-2"
                style={{ backgroundColor: `rgba(0,0,0,${opt.opacity})` }}
              />
              <div className="text-lg font-black">{opt.label}</div>
              <div className="text-[10px] text-foreground-muted">{opt.desc}</div>
              {vltIdx === i && (
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent border-2 border-background" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Film Selector */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground-muted mb-4 text-center">
          Choose Your Film
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FILM_DATA.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setFilmIdx(i)}
              className={cn(
                "rounded-xl border p-4 text-center transition-all",
                filmIdx === i
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-border-hover bg-card"
              )}
            >
              <div className="text-sm font-bold">{f.name}</div>
              <div className="flex justify-center gap-2 mt-2 text-[10px] text-foreground-muted">
                <span>{f.uv}% UV</span>
                <span>{f.heat}% Heat</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CA Law Notice */}
      <div className={cn(
        "p-4 rounded-xl text-sm text-center",
        vltOption.vlt >= 70 ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
      )}>
        <strong>California Law:</strong>{" "}
        {vltOption.vlt >= 70
          ? `${vltOption.label} VLT is legal for all windows.`
          : `${vltOption.label} VLT is legal for rear windows only. Front side windows require 70%+ VLT in California.`}
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Shield, label: "UV Protection", value: `${film.uv}%` },
          { icon: Thermometer, label: "Heat Rejection", value: `${film.heat}%` },
          { icon: Sun, label: "IR Rejection", value: `${film.ir}%` },
          { icon: Eye, label: "Visible Light", value: vltOption.label },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <stat.icon className="h-5 w-5 mx-auto text-accent mb-2" />
            <div className="text-2xl font-black text-accent">{stat.value}</div>
            <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/quote" className={buttonVariants({ size: "lg" })}>
          Get Your Exact Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
