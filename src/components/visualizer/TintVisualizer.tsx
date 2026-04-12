"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Sun, Thermometer, Shield, Eye } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VLT_OPTIONS = [
  { vlt: 5, label: "5%", desc: "Limo Dark" },
  { vlt: 15, label: "15%", desc: "Dark" },
  { vlt: 20, label: "20%", desc: "Medium Dark" },
  { vlt: 35, label: "35%", desc: "Medium" },
  { vlt: 50, label: "50%", desc: "Light" },
  { vlt: 70, label: "70%", desc: "Very Light" },
];

const FILM_DATA = [
  { id: "monocarbon", name: "Rayno MonoCarbon", heat: 40, ir: 35, uv: 99 },
  { id: "phantom", name: "Rayno Phantom S5", heat: 66, ir: 58, uv: 99 },
  { id: "ctx", name: "Llumar CTX", heat: 60, ir: 70, uv: 99 },
  { id: "irx", name: "Llumar IRX", heat: 62, ir: 97, uv: 99 },
];

const VEHICLES = [
  {
    id: "sedan",
    label: "Sedan",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=80",
    // Window zones defined as percentage-based CSS positions over the photo
    windows: [
      { id: "windshield", label: "Windshield", top: "18%", left: "52%", width: "18%", height: "28%", borderRadius: "4px 30% 4px 4px" },
      { id: "front", label: "Front Door", top: "20%", left: "32%", width: "18%", height: "24%", borderRadius: "4px" },
      { id: "rear", label: "Rear Door", top: "20%", left: "14%", width: "16%", height: "22%", borderRadius: "4px" },
      { id: "back", label: "Back Glass", top: "22%", left: "2%", width: "11%", height: "18%", borderRadius: "4px 4px 4px 20%" },
    ],
  },
  {
    id: "suv",
    label: "SUV / Truck",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&q=80",
    windows: [
      { id: "windshield", label: "Windshield", top: "15%", left: "55%", width: "17%", height: "30%", borderRadius: "4px 25% 4px 4px" },
      { id: "front", label: "Front Door", top: "18%", left: "36%", width: "17%", height: "26%", borderRadius: "4px" },
      { id: "rear", label: "Rear Door", top: "18%", left: "18%", width: "16%", height: "24%", borderRadius: "4px" },
      { id: "back", label: "Back Glass", top: "18%", left: "4%", width: "12%", height: "22%", borderRadius: "4px 4px 4px 15%" },
    ],
  },
  {
    id: "tesla",
    label: "Tesla",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&q=80",
    windows: [
      { id: "windshield", label: "Windshield", top: "22%", left: "53%", width: "17%", height: "26%", borderRadius: "4px 30% 4px 4px" },
      { id: "front", label: "Front Door", top: "24%", left: "34%", width: "17%", height: "22%", borderRadius: "4px" },
      { id: "rear", label: "Rear Door", top: "24%", left: "16%", width: "16%", height: "20%", borderRadius: "4px" },
      { id: "back", label: "Back Glass", top: "24%", left: "4%", width: "11%", height: "18%", borderRadius: "4px 4px 4px 20%" },
      { id: "sunroof", label: "Glass Roof", top: "12%", left: "20%", width: "35%", height: "10%", borderRadius: "40%" },
    ],
  },
];

export function TintVisualizer() {
  const [selectedFilm, setSelectedFilm] = useState(FILM_DATA[3]);
  const [vlt, setVlt] = useState(20);
  const [vehicleIdx, setVehicleIdx] = useState(0);
  const [activeZones, setActiveZones] = useState<Set<string>>(
    new Set(["front", "rear", "back"])
  );
  const overlayRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const vehicle = VEHICLES[vehicleIdx];
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

  // Animate tint overlays
  useEffect(() => {
    overlayRefs.current.forEach((el, zone) => {
      const targetOpacity = activeZones.has(zone) ? tintOpacity : 0;
      gsap.to(el, { opacity: targetOpacity, duration: 0.5, ease: "power2.out" });
    });
  }, [vlt, activeZones, tintOpacity]);

  return (
    <div className="space-y-8">
      {/* Vehicle Type Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {VEHICLES.map((v, i) => (
            <button
              key={v.id}
              onClick={() => { setVehicleIdx(i); setActiveZones(new Set(["front", "rear", "back"])); }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                vehicleIdx === i
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-border-hover"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveZones(new Set(["front", "rear", "back"]))}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:border-accent/50 transition-all"
          >
            All Sides + Back
          </button>
          <button
            onClick={() => setActiveZones(new Set(["front"]))}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:border-accent/50 transition-all"
          >
            Fronts Only
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Car Photo + Tint Overlays */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl border border-border overflow-hidden bg-black aspect-[16/10]">
            {/* Car Photo */}
            <Image
              src={vehicle.image}
              alt={`${vehicle.label} tint preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Tint overlays on each window zone */}
            {vehicle.windows.map((win) => (
              <div
                key={win.id}
                ref={(el) => { if (el) overlayRefs.current.set(win.id, el); }}
                className="absolute cursor-pointer transition-all hover:ring-2 hover:ring-accent/50"
                style={{
                  top: win.top,
                  left: win.left,
                  width: win.width,
                  height: win.height,
                  borderRadius: win.borderRadius,
                  backgroundColor: "black",
                  opacity: activeZones.has(win.id) ? tintOpacity : 0,
                }}
                onClick={() => toggleZone(win.id)}
                title={`Click to toggle ${win.label}`}
              />
            ))}

            {/* VLT Badge */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md rounded-lg px-3 py-2">
              <div className="text-xs text-white/60">Current Shade</div>
              <div className="text-2xl font-black text-accent">{vlt}% VLT</div>
            </div>

            {/* Film Badge */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md rounded-lg px-3 py-2">
              <div className="text-xs text-white/60">Selected Film</div>
              <div className="text-sm font-bold text-white">{selectedFilm.name}</div>
            </div>

            {/* Click hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 text-[10px] text-white/70">
              Click on windows to toggle tint
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-5">
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
            <div className={cn(
              "mt-4 p-3 rounded-lg text-xs",
              isLegalFront ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
            )}>
              <strong>CA Law:</strong>{" "}
              {isLegalFront ? "Legal for front windows" : "Not legal for front (min 70%). OK for rear."}
            </div>
          </div>

          {/* Zone Toggle */}
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-sm font-bold block mb-3">Windows</span>
            <div className="space-y-1.5">
              {vehicle.windows.map((win) => (
                <button
                  key={win.id}
                  onClick={() => toggleZone(win.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all",
                    activeZones.has(win.id)
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-foreground-muted hover:border-border-hover"
                  )}
                >
                  <span>{win.label}</span>
                  {activeZones.has(win.id) && <div className="h-2 w-2 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
          </div>

          {/* Film Type */}
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-sm font-bold block mb-3">Film Type</span>
            <div className="space-y-1.5">
              {FILM_DATA.map((film) => (
                <button
                  key={film.id}
                  onClick={() => setSelectedFilm(film)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm border transition-all",
                    selectedFilm.id === film.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-border-hover"
                  )}
                >
                  <div className="font-medium">{film.name}</div>
                  <div className="flex gap-3 mt-0.5 text-[10px] text-foreground-muted">
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
          { icon: Shield, label: "UV Protection", value: `${selectedFilm.uv}%` },
          { icon: Thermometer, label: "Heat Rejection", value: `${selectedFilm.heat}%` },
          { icon: Sun, label: "IR Rejection", value: `${selectedFilm.ir}%` },
          { icon: Eye, label: "Visible Light", value: `${vlt}%` },
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
