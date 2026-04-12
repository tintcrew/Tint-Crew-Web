"use client";

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
  "auto-tint":
    "https://llumar.com/na/en/automotive/window-filmppf-viewer/dealer-auto-tint-viewer/",
  "auto-ppf":
    "https://llumar.com/na/en/automotive/window-filmppf-viewer/dealer-auto-ppf-viewer/",
  "auto-tint-ppf":
    "https://llumar.com/na/en/automotive/window-filmppf-viewer/dealer-auto-tint-ppf-viewer/",
  "commercial-solar-decorative":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/solar-decorative-film-viewer/dealer-commercial-solar-and-decorative/",
  "commercial-solar":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/solar-decorative-film-viewer/dealer-commercial-solar/",
  "commercial-decorative":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/solar-decorative-film-viewer/dealer-commercial-decorative/",
  "residential-solar-decorative":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/viewer-for-home/dealer-home-solar-and-decorative/",
  "residential-solar":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/viewer-for-home/dealer-home-solar/",
  "residential-decorative":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/viewer-for-home/dealer-home-decorative/",
  "energy-calculator":
    "https://llumar.com/na/en/architectural/interactive-window-film-tools/energy-savings-calculator/dealer-energy-saving-calculator/",
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

export function LlumarViewer({ type, height = "1000px" }: LlumarViewerProps) {
  const url = VIEWER_URLS[type];
  const title = VIEWER_TITLES[type];

  if (!url) return null;

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-white">
      <div className="px-4 py-3 bg-surface border-b border-border flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent" />
        <span className="text-xs font-medium text-foreground-secondary">
          {title} — Powered by Llumar
        </span>
      </div>
      <iframe
        src={url}
        width="100%"
        height={height}
        style={{ border: "none", minHeight: height }}
        title={title}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
