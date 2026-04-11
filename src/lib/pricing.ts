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

/** Return unique year ranges sorted descending (newest first). */
export function getYearRanges(): string[] {
  const set = new Set(vehicles.map((v) => v.yearRange));
  return Array.from(set).sort((a, b) => {
    // Sort by start year descending so newest ranges come first
    const startA = parseInt(a.split("~")[0], 10);
    const startB = parseInt(b.split("~")[0], 10);
    return startB - startA;
  });
}

/** Return unique makes that have entries for the given year range. */
export function getMakes(yearRange: string): string[] {
  const set = new Set(
    vehicles.filter((v) => v.yearRange === yearRange).map((v) => v.make)
  );
  return Array.from(set).sort();
}

/** Return models for a specific make + yearRange combo. */
export function getModels(yearRange: string, make: string): string[] {
  return vehicles
    .filter((v) => v.yearRange === yearRange && v.make === make)
    .map((v) => v.model)
    .sort();
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
 * Get package prices for a specific vehicle (yearRange + make + model).
 * The prices come directly from the CSV data for that exact vehicle,
 * with `serviceType` controlling whether we show all-sides or front-only pricing.
 */
export function getPackagePrices(
  yearRange: string,
  make: string,
  model: string,
  serviceType: "all_sides" | "fronts_only" = "all_sides"
): PackagePricing[] {
  const vehicle = vehicles.find(
    (v) => v.yearRange === yearRange && v.make === make && v.model === model
  );

  // Fallback to zero if vehicle not found
  const prices =
    serviceType === "fronts_only"
      ? vehicle?.frontOnly ?? {
          "rayno-monocarbon": 0,
          "rayno-phantom-s5": 0,
          "llumar-ctx": 0,
          "llumar-irx": 0,
        }
      : vehicle?.allSides ?? {
          "rayno-monocarbon": 0,
          "rayno-phantom-s5": 0,
          "llumar-ctx": 0,
          "llumar-irx": 0,
        };

  const packages: PackagePricing[] = [
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
      features: [
        "2-ply true carbon",
        "No dyes or metals",
        "<1% fading over 10 years",
        "Signal-safe",
      ],
    },
    {
      id: "rayno-phantom-s5",
      name: "Rayno Phantom S5",
      brand: "Rayno",
      tagline:
        "Carbon ceramic — outstanding heat rejection & color stability",
      price: prices["rayno-phantom-s5"],
      popular: false,
      heatRejection: 66,
      irRejection: 58,
      uvBlock: 99,
      warranty: "Lifetime Limited",
      features: [
        "Nano-encapsulated ceramic",
        "Up to 66% TSER",
        "35% better color stability",
        "Crystal clarity",
      ],
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
      features: [
        "Nano-ceramic technology",
        "No signal interference",
        "Scratch-resistant",
        "Color-stable charcoal",
      ],
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
      features: [
        "97% infrared rejection",
        "Advanced IR-targeting ceramics",
        "7 shade options",
        "Best for hot climates",
      ],
    },
  ];

  return packages;
}

/** Get the windshield price for a specific vehicle from the data. */
export function getWindshieldPrice(
  yearRange: string,
  make: string,
  model: string
): number {
  const vehicle = vehicles.find(
    (v) => v.yearRange === yearRange && v.make === make && v.model === model
  );
  return vehicle?.windshield ?? 250;
}

export function getAddons() {
  return pricingData.addons;
}

export function getServiceOptions() {
  return pricingData.serviceOptions;
}
