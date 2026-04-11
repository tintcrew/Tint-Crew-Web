import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { ServicePageLayout } from "@/components/shared/ServicePageLayout";

export const metadata: Metadata = {
  title: "Paint Protection Film (PPF) Orange County, CA",
  description:
    "Llumar Valor PPF with self-healing Tetrashield™ technology. Invisible paint protection against rock chips, scratches, and road debris. 12-year warranty.",
};

export default function PaintProtectionPage() {
  return (
    <ServicePageLayout
      title="Paint Protection Film"
      accent="Protection"
      description="Shield your vehicle's paint from rock chips, scratches, road debris, and environmental damage with Llumar Valor PPF. Featuring self-healing Tetrashield™ technology and an invisible finish that preserves your car's original appearance."
      icon={Shield}
      heroTagline="PPF Services"
      ctaText="Get a PPF Quote"
      products={[
        {
          id: "llumar-valor",
          name: "Llumar Valor PPF",
          brand: "Llumar",
          tagline:
            "Self-healing paint protection with Tetrashield™ ceramic coating technology",
          features: [
            "Self-healing top coat reverses scratches with heat",
            "Tetrashield™ super-hydrophobic ceramic finish",
            "Invisible to the naked eye — preserves factory paint",
            "Protects against rock chips, road debris, and bug damage",
            "OEM-trusted urethane construction",
            "Easy-wash surface — less dirt build-up",
          ],
          heatRejection: null,
          irRejection: null,
          uvBlock: 99,
          warranty: "12 Years",
        },
      ]}
      benefits={[
        {
          title: "Self-Healing Technology",
          description:
            "Surface scratches disappear on their own when exposed to heat — from sunlight or warm water.",
        },
        {
          title: "Invisible Protection",
          description:
            "Ultra-clear film with a glossy finish that's virtually invisible. Your car looks factory-fresh, not wrapped.",
        },
        {
          title: "Tetrashield™ Coating",
          description:
            "Built-in ceramic coating makes the surface super hydrophobic — water beads right off, making washing effortless.",
        },
        {
          title: "12-Year Warranty",
          description:
            "Backed by Llumar's manufacturer limited warranty — one of the longest in the industry.",
        },
        {
          title: "Preserve Resale Value",
          description:
            "PPF keeps your paint chip-free and swirl-free, maintaining your vehicle's appearance and resale value for years.",
        },
        {
          title: "Custom Coverage",
          description:
            "Full front, partial front, high-impact areas, or full body — we customize coverage to your needs and budget.",
        },
      ]}
    />
  );
}
