"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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

/*
 * Each vehicle has an SVG viewBox-based illustration with precise window polygons.
 * Using clean side-profile vector art ensures windows always align perfectly
 * regardless of screen size.
 */
const VEHICLES = [
  {
    id: "sedan",
    label: "Sedan",
    windows: {
      windshield: "M245,128 L290,82 L330,80 L330,128",
      front: "M334,80 L334,128 L420,128 L420,80",
      rear: "M424,80 L424,128 L525,128 L520,85 L480,80",
      back: "M528,128 L524,88 L535,98 L538,128",
    },
  },
  {
    id: "suv",
    label: "SUV / Truck",
    windows: {
      windshield: "M240,118 L288,68 L335,65 L335,118",
      front: "M339,65 L339,118 L428,118 L428,65",
      rear: "M432,65 L432,118 L538,118 L532,72 L485,65",
      back: "M541,118 L536,75 L548,88 L550,118",
      sunroof: "M340,58 L340,52 L480,52 L480,58",
    },
  },
  {
    id: "tesla",
    label: "Tesla",
    windows: {
      windshield: "M248,125 L295,78 L338,76 L338,125",
      front: "M342,76 L342,125 L428,125 L428,76",
      rear: "M432,76 L432,125 L530,125 L525,82 L486,76",
      back: "M533,125 L528,85 L540,96 L542,125",
      sunroof: "M300,72 L310,58 L490,58 L500,72",
    },
  },
];

const WINDOW_LABELS: Record<string, string> = {
  windshield: "Windshield",
  front: "Front Doors",
  rear: "Rear Doors",
  back: "Back Glass",
  sunroof: "Sunroof / Roof",
};

export function TintVisualizer() {
  const [selectedFilm, setSelectedFilm] = useState(FILM_DATA[3]);
  const [vlt, setVlt] = useState(20);
  const [vehicleIdx, setVehicleIdx] = useState(0);
  const [activeZones, setActiveZones] = useState<Set<string>>(
    new Set(["front", "rear", "back"])
  );
  const svgRef = useRef<SVGSVGElement>(null);

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

  // Animate tint
  useEffect(() => {
    if (!svgRef.current) return;
    const tintPaths = svgRef.current.querySelectorAll(".tint-zone");
    tintPaths.forEach((path) => {
      const zone = path.getAttribute("data-zone") || "";
      const target = activeZones.has(zone) ? tintOpacity : 0;
      gsap.to(path, { opacity: target, duration: 0.5, ease: "power2.out" });
    });
  }, [vlt, activeZones, tintOpacity]);

  return (
    <div className="space-y-8">
      {/* Vehicle Selector + Presets */}
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
        {/* Car SVG */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-gradient-to-b from-[#1a1a2e] to-[#0a0a14] p-4 sm:p-8">
            <svg
              ref={svgRef}
              viewBox="0 0 780 340"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground reflection */}
              <defs>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#88bbee" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6699cc" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              {/* Ground shadow */}
              <ellipse cx="390" cy="288" rx="260" ry="12" fill="white" opacity="0.04" />
              <ellipse cx="390" cy="290" rx="200" ry="6" fill="white" opacity="0.02" />

              {vehicle.id === "sedan" && (
                <g>
                  {/* Body shell */}
                  <path
                    d="M110,260 L110,210 Q110,188 135,178 L225,142 Q260,130 300,126 L480,126 Q520,130 555,142 L645,178 Q670,188 670,210 L670,260 Q670,272 658,272 L122,272 Q110,272 110,260"
                    fill="#2a2a35"
                    stroke="#444"
                    strokeWidth="1.5"
                  />
                  {/* Roof */}
                  <path
                    d="M240,130 Q255,88 300,76 L490,76 Q535,88 545,130"
                    fill="#2a2a35"
                    stroke="#444"
                    strokeWidth="1.5"
                  />
                  {/* Roof highlight */}
                  <path
                    d="M280,80 Q300,72 400,70 Q500,72 520,80"
                    fill="none"
                    stroke="#555"
                    strokeWidth="0.5"
                  />

                  {/* Window glass (base) */}
                  <polygon points="245,128 290,82 330,80 330,128" fill="url(#glassGrad)" />
                  <polygon points="334,80 334,128 420,128 420,80" fill="url(#glassGrad)" />
                  <polygon points="424,80 424,128 525,128 520,85 480,80" fill="url(#glassGrad)" />
                  <polygon points="528,128 524,88 535,98 538,128" fill="url(#glassGrad)" />

                  {/* Tint overlays — these follow exact window shapes */}
                  {Object.entries(vehicle.windows).map(([zone, points]) => (
                    <polygon
                      key={zone}
                      className="tint-zone cursor-pointer"
                      data-zone={zone}
                      points={points.replace(/[ML]/g, "").replace(/,/g, " ").replace(/\s+/g, " ").trim().split(" ").reduce((acc: string[], val: string, i: number, arr: string[]) => {
                        if (i % 2 === 0 && i + 1 < arr.length) acc.push(`${val},${arr[i + 1]}`);
                        return acc;
                      }, []).join(" ")}
                      fill="black"
                      opacity={0}
                      onClick={() => toggleZone(zone)}
                    >
                      <title>Click to toggle {WINDOW_LABELS[zone]}</title>
                    </polygon>
                  ))}

                  {/* Window dividers */}
                  <line x1="332" y1="80" x2="332" y2="128" stroke="#555" strokeWidth="1.5" />
                  <line x1="422" y1="80" x2="422" y2="128" stroke="#555" strokeWidth="1.5" />

                  {/* Door handle */}
                  <rect x="370" y="165" width="20" height="3" rx="1.5" fill="#555" />
                  <rect x="470" y="165" width="20" height="3" rx="1.5" fill="#555" />

                  {/* Headlights */}
                  <path d="M118,205 Q125,195 145,192 L145,215 Q125,215 118,210 Z" fill="#ddd" opacity="0.6" />
                  <path d="M655,192 Q668,198 668,210 L655,215 Z" fill="#c44" opacity="0.5" />

                  {/* Bumpers */}
                  <path d="M108,240 L108,260 Q108,270 118,272 L150,272 L150,240 Z" fill="#222" stroke="#333" strokeWidth="1" />
                  <path d="M630,240 L630,272 L662,272 Q672,270 672,260 L672,240 Z" fill="#222" stroke="#333" strokeWidth="1" />

                  {/* Wheels */}
                  <circle cx="210" cy="268" r="40" fill="#111" stroke="#333" strokeWidth="2" />
                  <circle cx="210" cy="268" r="30" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
                  <circle cx="210" cy="268" r="18" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="210" cy="268" r="6" fill="#444" />
                  {/* Spokes */}
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <line key={angle} x1="210" y1="268" x2={210 + 17 * Math.cos((angle * Math.PI) / 180)} y2={268 + 17 * Math.sin((angle * Math.PI) / 180)} stroke="#555" strokeWidth="2" />
                  ))}

                  <circle cx="570" cy="268" r="40" fill="#111" stroke="#333" strokeWidth="2" />
                  <circle cx="570" cy="268" r="30" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
                  <circle cx="570" cy="268" r="18" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="570" cy="268" r="6" fill="#444" />
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <line key={angle} x1="570" y1="268" x2={570 + 17 * Math.cos((angle * Math.PI) / 180)} y2={268 + 17 * Math.sin((angle * Math.PI) / 180)} stroke="#555" strokeWidth="2" />
                  ))}
                </g>
              )}

              {vehicle.id === "suv" && (
                <g>
                  <path
                    d="M100,268 L100,200 Q100,178 125,168 L225,130 Q260,118 300,114 L480,114 Q520,118 555,130 L645,168 Q670,178 670,200 L670,268 Q670,278 658,278 L112,278 Q100,278 100,268"
                    fill="#2a2a35" stroke="#444" strokeWidth="1.5"
                  />
                  <path d="M235,120 Q250,62 300,48 L490,48 Q540,62 550,120" fill="#2a2a35" stroke="#444" strokeWidth="1.5" />
                  <path d="M285,52 Q330,44 400,42 Q470,44 515,52" fill="none" stroke="#555" strokeWidth="0.5" />

                  {/* Glass */}
                  <polygon points="240,118 288,68 335,65 335,118" fill="url(#glassGrad)" />
                  <polygon points="339,65 339,118 428,118 428,65" fill="url(#glassGrad)" />
                  <polygon points="432,65 432,118 538,118 532,72 485,65" fill="url(#glassGrad)" />
                  <polygon points="541,118 536,75 548,88 550,118" fill="url(#glassGrad)" />
                  <rect x="340" y="52" width="140" height="6" rx="2" fill="url(#glassGrad)" />

                  {/* Tint overlays */}
                  <polygon className="tint-zone cursor-pointer" data-zone="windshield" points="240,118 288,68 335,65 335,118" fill="black" opacity={0} onClick={() => toggleZone("windshield")}><title>Toggle Windshield</title></polygon>
                  <polygon className="tint-zone cursor-pointer" data-zone="front" points="339,65 339,118 428,118 428,65" fill="black" opacity={0} onClick={() => toggleZone("front")}><title>Toggle Front Doors</title></polygon>
                  <polygon className="tint-zone cursor-pointer" data-zone="rear" points="432,65 432,118 538,118 532,72 485,65" fill="black" opacity={0} onClick={() => toggleZone("rear")}><title>Toggle Rear Doors</title></polygon>
                  <polygon className="tint-zone cursor-pointer" data-zone="back" points="541,118 536,75 548,88 550,118" fill="black" opacity={0} onClick={() => toggleZone("back")}><title>Toggle Back Glass</title></polygon>
                  <rect className="tint-zone cursor-pointer" data-zone="sunroof" x="340" y="52" width="140" height="6" rx="2" fill="black" opacity={0} onClick={() => toggleZone("sunroof")}><title>Toggle Sunroof</title></rect>

                  <line x1="337" y1="65" x2="337" y2="118" stroke="#555" strokeWidth="1.5" />
                  <line x1="430" y1="65" x2="430" y2="118" stroke="#555" strokeWidth="1.5" />
                  <rect x="375" y="160" width="20" height="3" rx="1.5" fill="#555" />
                  <rect x="478" y="160" width="20" height="3" rx="1.5" fill="#555" />
                  <path d="M108,200 Q115,190 140,186 L140,210 Q115,210 108,206 Z" fill="#ddd" opacity="0.6" />
                  <circle cx="205" cy="275" r="45" fill="#111" stroke="#333" strokeWidth="2" />
                  <circle cx="205" cy="275" r="34" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
                  <circle cx="205" cy="275" r="20" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="205" cy="275" r="7" fill="#444" />
                  <circle cx="575" cy="275" r="45" fill="#111" stroke="#333" strokeWidth="2" />
                  <circle cx="575" cy="275" r="34" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
                  <circle cx="575" cy="275" r="20" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="575" cy="275" r="7" fill="#444" />
                </g>
              )}

              {vehicle.id === "tesla" && (
                <g>
                  <path
                    d="M108,262 L108,208 Q108,186 133,176 L228,140 Q262,128 305,124 L480,124 Q522,128 555,140 L648,176 Q672,186 672,208 L672,262 Q672,274 660,274 L120,274 Q108,274 108,262"
                    fill="#2a2a35" stroke="#444" strokeWidth="1.5"
                  />
                  <path d="M243,128 Q258,82 305,72 L490,72 Q535,82 545,128" fill="#2a2a35" stroke="#444" strokeWidth="1.5" />
                  {/* Tesla glass roof */}
                  <path d="M300,72 L310,58 L490,58 L500,72" fill="url(#glassGrad)" stroke="#444" strokeWidth="1" />

                  <polygon points="248,125 295,78 338,76 338,125" fill="url(#glassGrad)" />
                  <polygon points="342,76 342,125 428,125 428,76" fill="url(#glassGrad)" />
                  <polygon points="432,76 432,125 530,125 525,82 486,76" fill="url(#glassGrad)" />
                  <polygon points="533,125 528,85 540,96 542,125" fill="url(#glassGrad)" />

                  <polygon className="tint-zone cursor-pointer" data-zone="windshield" points="248,125 295,78 338,76 338,125" fill="black" opacity={0} onClick={() => toggleZone("windshield")}><title>Toggle Windshield</title></polygon>
                  <polygon className="tint-zone cursor-pointer" data-zone="front" points="342,76 342,125 428,125 428,76" fill="black" opacity={0} onClick={() => toggleZone("front")}><title>Toggle Front</title></polygon>
                  <polygon className="tint-zone cursor-pointer" data-zone="rear" points="432,76 432,125 530,125 525,82 486,76" fill="black" opacity={0} onClick={() => toggleZone("rear")}><title>Toggle Rear</title></polygon>
                  <polygon className="tint-zone cursor-pointer" data-zone="back" points="533,125 528,85 540,96 542,125" fill="black" opacity={0} onClick={() => toggleZone("back")}><title>Toggle Back</title></polygon>
                  <path className="tint-zone cursor-pointer" data-zone="sunroof" d="M300,72 L310,58 L490,58 L500,72" fill="black" opacity={0} onClick={() => toggleZone("sunroof")}><title>Toggle Glass Roof</title></path>

                  <line x1="340" y1="76" x2="340" y2="125" stroke="#555" strokeWidth="1.5" />
                  <line x1="430" y1="76" x2="430" y2="125" stroke="#555" strokeWidth="1.5" />
                  {/* Tesla headlight strip */}
                  <path d="M115,205 Q125,195 148,192 L148,208 Q125,208 115,205 Z" fill="#aaddf8" opacity="0.5" />
                  <path d="M650,192 Q662,198 662,205 L650,208 Z" fill="#c44" opacity="0.5" />
                  <circle cx="210" cy="270" r="40" fill="#111" stroke="#333" strokeWidth="2" />
                  <circle cx="210" cy="270" r="30" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
                  <circle cx="210" cy="270" r="18" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="210" cy="270" r="6" fill="#444" />
                  <circle cx="570" cy="270" r="40" fill="#111" stroke="#333" strokeWidth="2" />
                  <circle cx="570" cy="270" r="30" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
                  <circle cx="570" cy="270" r="18" fill="#222" stroke="#555" strokeWidth="1" />
                  <circle cx="570" cy="270" r="6" fill="#444" />
                </g>
              )}

              {/* VLT display */}
              <text x="390" y="325" textAnchor="middle" fill="white" opacity="0.3" fontSize="12" fontFamily="system-ui">
                {vlt}% VLT — {VLT_OPTIONS.find((v) => v.vlt === vlt)?.desc || "Custom"} — {selectedFilm.name}
              </text>
            </svg>
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
              type="range" min="5" max="70" step="1" value={vlt}
              onChange={(e) => setVlt(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-accent"
              style={{ background: `linear-gradient(to right, var(--accent) ${((vlt - 5) / 65) * 100}%, var(--border) ${((vlt - 5) / 65) * 100}%)` }}
            />
            <div className="flex flex-wrap gap-1.5 mt-3">
              {VLT_OPTIONS.map((opt) => (
                <button key={opt.vlt} onClick={() => setVlt(opt.vlt)}
                  className={cn("px-2.5 py-1 rounded text-[10px] font-medium border transition-all",
                    vlt === opt.vlt ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-border-hover"
                  )}>
                  {opt.label}
                </button>
              ))}
            </div>
            <div className={cn("mt-4 p-3 rounded-lg text-xs", isLegalFront ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400")}>
              <strong>CA Law:</strong>{" "}
              {isLegalFront ? "Legal for front windows" : "Not legal for front (min 70%). OK for rear."}
            </div>
          </div>

          {/* Zone Toggle */}
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-sm font-bold block mb-3">Windows</span>
            <div className="space-y-1.5">
              {Object.keys(vehicle.windows).map((zone) => (
                <button key={zone} onClick={() => toggleZone(zone)}
                  className={cn("w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all",
                    activeZones.has(zone) ? "border-accent bg-accent/10 text-foreground" : "border-border text-foreground-muted hover:border-border-hover"
                  )}>
                  <span>{WINDOW_LABELS[zone] || zone}</span>
                  {activeZones.has(zone) && <div className="h-2 w-2 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
          </div>

          {/* Film Type */}
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="text-sm font-bold block mb-3">Film Type</span>
            <div className="space-y-1.5">
              {FILM_DATA.map((film) => (
                <button key={film.id} onClick={() => setSelectedFilm(film)}
                  className={cn("w-full text-left px-3 py-2 rounded-lg text-sm border transition-all",
                    selectedFilm.id === film.id ? "border-accent bg-accent/10" : "border-border hover:border-border-hover"
                  )}>
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

      <div className="text-center">
        <Link href="/quote" className={buttonVariants({ size: "lg" })}>
          Get Your Exact Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
