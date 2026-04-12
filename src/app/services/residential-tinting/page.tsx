import type { Metadata } from "next";
import { Home } from "lucide-react";
import { ServicePageLayout } from "@/components/shared/ServicePageLayout";

export const metadata: Metadata = {
  title: "Residential Window Tinting Orange County, CA",
  description:
    "Vista & Llumar residential window films for your home. Reduce heat, glare, and UV damage. Lower energy costs. Enhance privacy. Up to lifetime warranty.",
};

export default function ResidentialTintingPage() {
  return (
    <ServicePageLayout
      title="Residential Window Tinting"
      accent="Residential"
      description="Transform your home with Vista and Llumar architectural window films. Reduce heat and glare, protect your furnishings from UV damage, lower energy costs, and enhance privacy — all without changing the look of your windows."
      icon={Home}
      heroTagline="Home Window Film"
      heroImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
      ctaText="Get a Free Consultation"
      ctaHref="/contact"
      products={[
        {
          id: "vista-harmony",
          name: "Vista Harmony",
          brand: "Vista by Llumar",
          tagline:
            "High-performance film with outstanding optical clarity for homes",
          features: [
            "Layered sun control technology",
            "Lets in natural light while blocking heat",
            "Outstanding optical clarity — no haze",
            "Reduces glare for comfortable living spaces",
          ],
          heatRejection: 70,
          irRejection: null,
          uvBlock: 99,
          warranty: "Lifetime",
        },
        {
          id: "vista-low-e",
          name: "Vista Low-E",
          brand: "Vista by Llumar",
          tagline:
            "Insulating + heat-reflective film for year-round energy savings",
          features: [
            "Advanced metallized insulating layer",
            "Reflects heat in summer, retains warmth in winter",
            "Significant energy cost reduction",
            "Ideal for sunbelt residential applications",
          ],
          heatRejection: 75,
          irRejection: null,
          uvBlock: 99,
          warranty: "Lifetime",
        },
        {
          id: "llumar-dual-reflective",
          name: "Dual-Reflective Film",
          brand: "Llumar",
          tagline:
            "Reflective exterior, clear interior — excellent day and night views",
          features: [
            "High exterior reflectivity blocks heat and glare",
            "Low interior reflectivity preserves your view",
            "Clear views day and night",
            "Popular for sunbelt homes in Southern California",
          ],
          heatRejection: 78,
          irRejection: null,
          uvBlock: 99,
          warranty: "Lifetime",
        },
        {
          id: "llumar-safety",
          name: "Safety & Security Film",
          brand: "Llumar",
          tagline:
            "Heavy-duty polyester that holds glass together on impact",
          features: [
            "Strengthens glass to delay forced entry",
            "Holds shattered glass in place",
            "Protects against storm debris and accidents",
            "Available in clear or tinted options",
          ],
          heatRejection: null,
          irRejection: null,
          uvBlock: 99,
          warranty: "10 Years",
        },
      ]}
      benefits={[
        {
          title: "Lower Energy Bills",
          description:
            "Window film can reduce cooling costs by up to 30% by blocking solar heat gain — a fraction of the cost of new windows.",
        },
        {
          title: "Protect Your Furnishings",
          description:
            "Block 99% of UV rays that cause fading and damage to furniture, flooring, artwork, and fabrics.",
        },
        {
          title: "Enhanced Privacy",
          description:
            "Enjoy natural light without sacrificing privacy. Multiple tint levels and reflective options available.",
        },
        {
          title: "Glare Reduction",
          description:
            "Reduce uncomfortable glare on screens and living spaces by up to 87% while maintaining your view.",
        },
        {
          title: "Safety & Security",
          description:
            "Safety film holds glass together on impact, protecting your family from broken glass and deterring break-ins.",
        },
        {
          title: "No Window Replacement",
          description:
            "Achieve the benefits of premium windows at a fraction of the cost. Film installs directly to your existing glass.",
        },
      ]}
    />
  );
}
