import pricingData from "@/data/pricing.json";

export type FilmId =
  | "rayno-monocarbon"
  | "rayno-phantom-s5"
  | "llumar-ctx"
  | "llumar-irx";

interface Vehicle {
  make: string;
  model: string;
  yearRange: string;
  allSides: Record<FilmId, number>;
  frontOnly: Record<FilmId, number>;
  windshield: number;
}

const vehicles = pricingData.vehicles as Vehicle[];

/** Parse "2020~2026" into { start: 2020, end: 2026 } */
function parseRange(yearRange: string): { start: number; end: number } {
  const [s, e] = yearRange.split("~").map(Number);
  return { start: s, end: e };
}

/** Check if a single year falls within a vehicle's year range */
function yearInRange(year: number, yearRange: string): boolean {
  const { start, end } = parseRange(yearRange);
  return year >= start && year <= end;
}

/** Find the vehicle entry that matches a specific year + make + model */
function findVehicle(year: number, make: string, model: string): Vehicle | undefined {
  return vehicles.find(
    (v) => v.make === make && v.model === model && yearInRange(year, v.yearRange)
  );
}

/** Return individual years from newest to oldest (e.g., 2026, 2025, ..., 2000) */
export function getYears(): number[] {
  let minYear = 9999;
  let maxYear = 0;
  for (const v of vehicles) {
    const { start, end } = parseRange(v.yearRange);
    if (start < minYear) minYear = start;
    if (end > maxYear) maxYear = end;
  }
  const years: number[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }
  return years;
}

/** Return unique makes that have vehicles covering the given year. */
export function getMakes(year: number): string[] {
  const set = new Set(
    vehicles.filter((v) => yearInRange(year, v.yearRange)).map((v) => v.make)
  );
  return Array.from(set).sort();
}

/** Return models for a specific make that cover the given year. */
export function getModels(year: number, make: string): string[] {
  const set = new Set(
    vehicles
      .filter((v) => v.make === make && yearInRange(year, v.yearRange))
      .map((v) => v.model)
  );
  return Array.from(set).sort();
}

export interface PackagePricing {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  price: number;
  popular: boolean;
  heatRejection: number;
  irRejection: number | null;
  uvBlock: number;
  warranty: string;
  features: string[];
}

/**
 * Get package prices for a specific vehicle (year + make + model).
 * serviceType controls whether we show all-sides or front-only pricing.
 */
export function getPackagePrices(
  year: number,
  make: string,
  model: string,
  serviceType: "all_sides" | "fronts_only" = "all_sides"
): PackagePricing[] {
  const vehicle = findVehicle(year, make, model);

  const zeroPrices = {
    "rayno-monocarbon": 0,
    "rayno-phantom-s5": 0,
    "llumar-ctx": 0,
    "llumar-irx": 0,
  };

  const prices =
    serviceType === "fronts_only"
      ? vehicle?.frontOnly ?? zeroPrices
      : vehicle?.allSides ?? zeroPrices;

  return [
    {
      id: "rayno-monocarbon",
      name: "Rayno MonoCarbon",
      brand: "Rayno",
      tagline: "True carbon film — zero fading, zero interference",
      price: prices["rayno-monocarbon"],
      popular: false,
      heatRejection: 40,
      irRejection: null,
      uvBlock: 99,
      warranty: "Lifetime Limited",
      features: ["2-ply true carbon", "No dyes or metals", "<1% fading over 10 years", "Signal-safe"],
    },
    {
      id: "rayno-phantom-s5",
      name: "Rayno Phantom S5",
      brand: "Rayno",
      tagline: "Carbon ceramic — outstanding heat rejection & color stability",
      price: prices["rayno-phantom-s5"],
      popular: false,
      heatRejection: 66,
      irRejection: 58,
      uvBlock: 99,
      warranty: "Lifetime Limited",
      features: ["Nano-encapsulated ceramic", "Up to 66% TSER", "35% better color stability", "Crystal clarity"],
    },
    {
      id: "llumar-ctx",
      name: "Llumar CTX",
      brand: "Llumar",
      tagline: "Nano-ceramic — style meets performance",
      price: prices["llumar-ctx"],
      popular: false,
      heatRejection: 60,
      irRejection: 70,
      uvBlock: 99,
      warranty: "Lifetime Limited",
      features: ["Nano-ceramic technology", "No signal interference", "Scratch-resistant", "Color-stable charcoal"],
    },
    {
      id: "llumar-irx",
      name: "Llumar IRX",
      brand: "Llumar",
      tagline: "Premium ceramic — maximum heat rejection for SoCal",
      price: prices["llumar-irx"],
      popular: true,
      heatRejection: 62,
      irRejection: 97,
      uvBlock: 99,
      warranty: "Lifetime Limited",
      features: ["97% infrared rejection", "Advanced IR-targeting ceramics", "7 shade options", "Best for hot climates"],
    },
  ];
}

/** Get the windshield price for a specific vehicle. */
export function getWindshieldPrice(year: number, make: string, model: string): number {
  const vehicle = findVehicle(year, make, model);
  return vehicle?.windshield ?? 250;
}

export function getAddons() {
  return pricingData.addons;
}

export function getServiceOptions() {
  return pricingData.serviceOptions;
}
