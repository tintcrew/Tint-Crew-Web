import pricingData from "@/data/pricing.json";

export type VehicleCategory = keyof typeof pricingData.pricing;
export type PackageId = keyof (typeof pricingData.pricing)["4_dr"];

export function getYearRanges(): string[] {
  return pricingData.vehicles.map((v) => v.yearRange);
}

export function getMakes(yearRange: string): string[] {
  const entry = pricingData.vehicles.find((v) => v.yearRange === yearRange);
  if (!entry) return [];
  return Object.keys(entry.makes).sort();
}

export function getModels(yearRange: string, make: string): string[] {
  const entry = pricingData.vehicles.find((v) => v.yearRange === yearRange);
  if (!entry) return [];
  const makes = entry.makes as Record<string, string[]>;
  return makes[make] || [];
}

export function classifyVehicle(model: string): VehicleCategory {
  const m = model.toUpperCase();
  if (m.includes("CYBERTRUCK")) return "cybertruck";
  if (m.includes("MINIVAN")) return "minivan";
  if (m.includes("2 DR")) return "2_dr";
  if (m.includes("TRUCK")) return "4_dr_truck";
  if (m.includes("SUV")) return "4_dr_suv";
  return "4_dr";
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

export function getPackagePrices(model: string): PackagePricing[] {
  const category = classifyVehicle(model);
  const categoryPricing = pricingData.pricing[category] as Record<string, number>;

  const packages: PackagePricing[] = [
    {
      id: "rayno-monocarbon",
      name: "Rayno MonoCarbon",
      brand: "Rayno",
      tagline: "True carbon film — zero fading, zero interference",
      price: categoryPricing["rayno-monocarbon"],
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
      price: categoryPricing["rayno-phantom-s5"],
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
      price: categoryPricing["llumar-ctx"],
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
      price: categoryPricing["llumar-irx"],
      popular: true,
      heatRejection: 62,
      irRejection: 97,
      uvBlock: 99,
      warranty: "Lifetime Limited",
      features: ["97% infrared rejection", "Advanced IR-targeting ceramics", "7 shade options", "Best for hot climates"],
    },
  ];

  return packages;
}

export function getAddons() {
  return pricingData.addons;
}

export function getServiceOptions() {
  return pricingData.serviceOptions;
}
