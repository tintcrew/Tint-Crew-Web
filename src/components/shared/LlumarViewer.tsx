"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface LlumarViewerProps {
  type:
    | "auto-tint"
    | "auto-ppf"
    | "auto-tint-ppf"
    | "commercial-solar-decorative"
    | "commercial-solar"
    | "commercial-decorative"
    | "residential-solar-decorative"
    | "residential-solar"
    | "residential-decorative"
    | "energy-calculator";
  height?: string;
}

const VIEWER_URLS: Record<string, string> = {
  "auto-tint": "https://llumar.com/na/en/automotive/window-film-ppf-viewer/dealer-auto-tint-viewer/",
  "auto-ppf": "https://llumar.com/na/en/automotive/window-film-ppf-viewer/dealer-auto-ppf-viewer/",
  "auto-tint-ppf": "https://llumar.com/na/en/automotive/window-film-ppf-viewer/dealer-auto-tint-ppf-viewer/",
  "commercial-solar-decorative": "https://llumar.com/na/en/architectural/interactive-window-film-tools/solar-decorative-film-viewer/dealer-commercial-solar-and-decorative/",
  "commercial-solar": "https://llumar.com/na/en/architectural/interactive-window-film-tools/solar-decorative-film-viewer/dealer-commercial-solar/",
  "commercial-decorative": "https://llumar.com/na/en/architectural/interactive-window-film-tools/solar-decorative-film-viewer/dealer-commercial-decorative/",
  "residential-solar-decorative": "https://llumar.com/na/en/architectural/interactive-window-film-tools/viewer-for-home/dealer-home-solar-and-decorative/",
  "residential-solar": "https://llumar.com/na/en/architectural/interactive-window-film-tools/viewer-for-home/dealer-home-solar/",
  "residential-decorative": "https://llumar.com/na/en/architectural/interactive-window-film-tools/viewer-for-home/dealer-home-decorative/",
  "energy-calculator": "https://llumar.com/na/en/architectural/interactive-window-film-tools/energy-savings-calculator/dealer-energy-saving-calculator/",
};

const VIEWER_TITLES: Record<string, string> = {
  "auto-tint": "Window Tint Viewer",
  "auto-ppf": "Paint Protection Film Viewer",
  "auto-tint-ppf": "Window Tint & PPF Viewer",
  "commercial-solar-decorative": "Commercial Film Viewer",
  "commercial-solar": "Commercial Solar Control Viewer",
  "commercial-decorative": "Commercial Decorative Film Viewer",
  "residential-solar-decorative": "Residential Film Viewer",
  "residential-solar": "Residential Solar Control Viewer",
  "residential-decorative": "Residential Decorative Film Viewer",
  "energy-calculator": "Energy Savings Calculator",
};

export function LlumarViewer({ type, height = "900px" }: LlumarViewerProps) {
  const url = VIEWER_URLS[type];
  const title = VIEWER_TITLES[type];
  const [loaded, setLoaded] = useState(false);

  if (!url) return null;

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-white shadow-lg shadow-black/10">
      {/* Header bar */}
      <div className="px-5 py-3 bg-card border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-accent/60" />
            <div className="h-3 w-3 rounded-full bg-foreground-muted/20" />
            <div className="h-3 w-3 rounded-full bg-foreground-muted/20" />
          </div>
          <span className="text-xs font-medium text-foreground-secondary">
            {title}
          </span>
        </div>
        <span className="text-[10px] text-foreground-muted">
          Powered by Llumar®
        </span>
      </div>

      {/* Llumar tool — using <object> tag as specified in official docs */}
      <object
        data={url}
        width="100%"
        height={height}
        style={{ border: "none", minHeight: height, display: "block" }}
        title={title}
      >
        <p className="p-8 text-center text-foreground-muted">
          Unable to load viewer.{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Open directly on Llumar.com
          </a>
        </p>
      </object>
    </div>
  );
}

/*
 * Multi-tab viewer: shows multiple Llumar tools with tab navigation
 */
interface Tab {
  label: string;
  type: LlumarViewerProps["type"];
}

export function LlumarTabs({ tabs }: { tabs: Tab[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.type}
            onClick={() => setActiveIdx(i)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
              activeIdx === i
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-border-hover text-foreground-secondary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active viewer */}
      <LlumarViewer type={tabs[activeIdx].type} />
    </div>
  );
}
