"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VLT_PRESETS = [
  { vlt: 5, label: "5% Limo", legal: false },
  { vlt: 15, label: "15%", legal: false },
  { vlt: 20, label: "20%", legal: false },
  { vlt: 35, label: "35%", legal: false },
  { vlt: 50, label: "50%", legal: false },
  { vlt: 70, label: "70%", legal: true },
];

function vltToOpacity(vlt: number): number {
  return 1 - vlt / 100;
}

export function TintVisualizer() {
  const [vlt, setVlt] = useState(20);
  const [vehicleType, setVehicleType] = useState<"sedan" | "suv">("sedan");

  const opacity = vltToOpacity(vlt);
  const isLegalFront = vlt >= 70;

  return (
    <div className="space-y-8">
      {/* Vehicle Type Toggle */}
      <div className="flex justify-center gap-2">
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

      {/* Car SVG */}
      <div className="relative mx-auto max-w-2xl">
        <svg
          viewBox="0 0 800 350"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car body */}
          {vehicleType === "sedan" ? (
            <>
              {/* Sedan body */}
              <path
                d="M120 250 L120 200 Q120 180 140 170 L250 130 Q280 120 320 115 L480 115 Q520 120 550 130 L660 170 Q680 180 680 200 L680 250"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              {/* Roof */}
              <path
                d="M250 130 Q260 90 310 75 L490 75 Q540 90 550 130"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              {/* Windshield */}
              <path
                d="M252 128 Q260 95 305 80 L340 78 L340 128 Z"
                fill={`rgba(180, 220, 255, ${1 - opacity * 0.3})`}
                stroke="var(--border-hover)"
                strokeWidth="1.5"
              />
              {/* Front side window */}
              <path
                d="M345 78 L345 128 L430 128 L430 78 Q425 78 345 78"
                fill={`rgba(0, 0, 0, ${opacity})`}
                stroke="var(--border-hover)"
                strokeWidth="1.5"
              />
              {/* Rear side window */}
              <path
                d="M435 78 L435 128 L540 128 Q535 95 495 80 L435 78"
                fill={`rgba(0, 0, 0, ${opacity})`}
                stroke="var(--border-hover)"
                strokeWidth="1.5"
              />
              {/* Rear window */}
              <path
                d="M545 128 L548 95 Q545 90 540 100 L555 128 Z"
                fill={`rgba(0, 0, 0, ${opacity})`}
                stroke="var(--border-hover)"
                strokeWidth="1"
              />
              {/* Wheels */}
              <circle cx="220" cy="255" r="35" fill="var(--background)" stroke="var(--border)" strokeWidth="2" />
              <circle cx="220" cy="255" r="22" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2" />
              <circle cx="580" cy="255" r="35" fill="var(--background)" stroke="var(--border)" strokeWidth="2" />
              <circle cx="580" cy="255" r="22" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2" />
              {/* Ground line */}
              <line x1="100" y1="290" x2="700" y2="290" stroke="var(--border)" strokeWidth="1" />
            </>
          ) : (
            <>
              {/* SUV body */}
              <path
                d="M120 260 L120 190 Q120 170 140 160 L240 125 Q270 115 310 110 L490 110 Q530 115 560 125 L660 160 Q680 170 680 190 L680 260"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              {/* SUV Roof (taller) */}
              <path
                d="M240 125 Q250 75 300 60 L500 60 Q550 75 560 125"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              {/* Windshield */}
              <path
                d="M242 123 Q250 82 295 65 L340 63 L340 123 Z"
                fill={`rgba(180, 220, 255, ${1 - opacity * 0.3})`}
                stroke="var(--border-hover)"
                strokeWidth="1.5"
              />
              {/* Front side window */}
              <path
                d="M345 63 L345 123 L430 123 L430 63 Z"
                fill={`rgba(0, 0, 0, ${opacity})`}
                stroke="var(--border-hover)"
                strokeWidth="1.5"
              />
              {/* Rear side window */}
              <path
                d="M435 63 L435 123 L550 123 Q545 80 505 65 L435 63"
                fill={`rgba(0, 0, 0, ${opacity})`}
                stroke="var(--border-hover)"
                strokeWidth="1.5"
              />
              {/* Wheels (bigger for SUV) */}
              <circle cx="220" cy="265" r="40" fill="var(--background)" stroke="var(--border)" strokeWidth="2" />
              <circle cx="220" cy="265" r="25" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2" />
              <circle cx="580" cy="265" r="40" fill="var(--background)" stroke="var(--border)" strokeWidth="2" />
              <circle cx="580" cy="265" r="25" fill="var(--surface)" stroke="var(--border-hover)" strokeWidth="2" />
              {/* Ground line */}
              <line x1="100" y1="305" x2="700" y2="305" stroke="var(--border)" strokeWidth="1" />
            </>
          )}

          {/* VLT Label */}
          <text x="400" y="330" textAnchor="middle" fill="var(--foreground-muted)" fontSize="14" fontFamily="system-ui">
            {vlt}% VLT — {vlt <= 5 ? "Limo Dark" : vlt <= 20 ? "Dark" : vlt <= 35 ? "Medium" : vlt <= 50 ? "Light" : "Very Light"}
          </text>
        </svg>
      </div>

      {/* VLT Slider */}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">VLT: {vlt}%</span>
          <span className="text-xs text-foreground-muted">
            {vlt}% of visible light passes through
          </span>
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
        <div className="flex justify-between mt-1 text-[10px] text-foreground-muted">
          <span>5% (Darkest)</span>
          <span>70% (Lightest)</span>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap justify-center gap-2">
        {VLT_PRESETS.map((preset) => (
          <button
            key={preset.vlt}
            onClick={() => setVlt(preset.vlt)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              vlt === preset.vlt
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-border-hover"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* CA Law Notice */}
      <div className={cn(
        "flex items-start gap-3 p-4 rounded-xl border text-sm",
        isLegalFront
          ? "border-success/30 bg-success/5 text-success"
          : "border-warning/30 bg-warning/5 text-warning"
      )}>
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold">California Tint Law</div>
          <p className="text-xs mt-1 opacity-80">
            {isLegalFront
              ? `${vlt}% VLT is legal for front side windows in California.`
              : `${vlt}% VLT is NOT legal for front side windows in California (min 70%). Legal for rear side and back windows.`}
          </p>
        </div>
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
