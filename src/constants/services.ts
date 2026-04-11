import {
  Car,
  Shield,
  Home,
  Building2,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  icon: LucideIcon;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "automotive",
    title: "Automotive Window Tinting",
    shortTitle: "Auto Tinting",
    description:
      "Premium window tinting for your vehicle with Llumar CTX, IRX and Rayno films. Block heat, UV rays, and glare while enhancing your car's appearance.",
    href: "/services/automotive-tinting",
    icon: Car,
    features: [
      "Llumar CTX & IRX Ceramic Films",
      "Rayno MonoCarbon & Phantom S5",
      "99% UV Protection",
      "Up to 97% IR Rejection",
      "Lifetime Warranty",
    ],
  },
  {
    id: "ppf",
    title: "Paint Protection Film",
    shortTitle: "PPF",
    description:
      "Llumar Valor PPF with self-healing Tetrashield™ technology. Invisible protection against rock chips, scratches, and road debris.",
    href: "/services/paint-protection",
    icon: Shield,
    features: [
      "Llumar Valor PPF",
      "Self-Healing Technology",
      "Tetrashield™ Hydrophobic",
      "Invisible Finish",
      "12-Year Warranty",
    ],
  },
  {
    id: "residential",
    title: "Residential Window Tinting",
    shortTitle: "Residential",
    description:
      "Vista & Llumar architectural films for your home. Reduce heat, glare, and UV damage while lowering energy costs and enhancing privacy.",
    href: "/services/residential-tinting",
    icon: Home,
    features: [
      "Vista & Llumar Films",
      "Solar Control & Low-E",
      "99% UV Protection",
      "Energy Savings",
      "Up to Lifetime Warranty",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Window Tinting",
    shortTitle: "Commercial",
    description:
      "Professional window film solutions for offices, storefronts, and commercial buildings. Solar control, decorative, and safety & security films.",
    href: "/services/commercial-tinting",
    icon: Building2,
    features: [
      "Solar Control Film",
      "Decorative iLLusions",
      "Safety & Security Film",
      "Dual-Reflective Options",
      "7-15 Year Warranty",
    ],
  },
  {
    id: "tesla",
    title: "Tesla Window Tinting",
    shortTitle: "Tesla",
    description:
      "Specialized tinting for Tesla Model 3, Y, S, X, and Cybertruck. Ceramic films that won't interfere with Tesla's electronics, sensors, or Autopilot.",
    href: "/services/tesla-tinting",
    icon: Zap,
    features: [
      "All Tesla Models",
      "Sensor-Safe Films",
      "Ceramic IR Technology",
      "Glass Roof Tinting",
      "Lifetime Warranty",
    ],
  },
];

export const AUTOMOTIVE_PACKAGES = [
  {
    id: "rayno-monocarbon",
    name: "Rayno MonoCarbon",
    brand: "Rayno",
    tagline: "True carbon film — zero fading, zero interference",
    popular: false,
    tier: "good",
    heatRejection: 40,
    irRejection: null,
    uvBlock: 99,
    warranty: "Lifetime Limited",
    features: [
      "2-ply true carbon",
      "No dyes or metals",
      "Less than 1% fading over 10 years",
      "Signal-safe technology",
    ],
  },
  {
    id: "rayno-phantom-s5",
    name: "Rayno Phantom S5",
    brand: "Rayno",
    tagline: "Carbon ceramic — outstanding heat rejection & color stability",
    popular: false,
    tier: "better",
    heatRejection: 66,
    irRejection: 58,
    uvBlock: 99,
    warranty: "Lifetime Limited",
    features: [
      "Nano-encapsulated ceramic particles",
      "Up to 66% total solar energy rejection",
      "35% better color stability",
      "Crystal-clear clarity",
    ],
  },
  {
    id: "llumar-ctx",
    name: "Llumar CTX",
    brand: "Llumar",
    tagline: "Nano-ceramic — style meets performance",
    popular: false,
    tier: "premium",
    heatRejection: 60,
    irRejection: 70,
    uvBlock: 99,
    warranty: "Lifetime Limited",
    features: [
      "Nano-ceramic technology",
      "No signal interference",
      "Scratch-resistant coating",
      "Color-stable charcoal shades",
    ],
  },
  {
    id: "llumar-irx",
    name: "Llumar IRX",
    brand: "Llumar",
    tagline: "Premium ceramic — maximum heat rejection for SoCal",
    popular: true,
    tier: "elite",
    heatRejection: 62,
    irRejection: 97,
    uvBlock: 99,
    warranty: "Lifetime Limited",
    features: [
      "Advanced IR-targeting nano-ceramics",
      "97% infrared rejection",
      "7 shade options available",
      "Best choice for hot climates",
    ],
  },
] as const;
