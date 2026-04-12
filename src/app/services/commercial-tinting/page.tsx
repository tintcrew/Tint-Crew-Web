import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { ServicePageLayout } from "@/components/shared/ServicePageLayout";
import { LlumarViewer } from "@/components/shared/LlumarViewer";

export const metadata: Metadata = {
  title: "Commercial Window Tinting Orange County, CA",
  description:
    "Vista & Llumar commercial window films for offices, storefronts, and buildings. Solar control, decorative iLLusions, safety & security films. 7-15 year warranty.",
};

export default function CommercialTintingPage() {
  return (
    <ServicePageLayout
      title="Commercial Window Tinting"
      accent="Commercial"
      description="Professional window film solutions for offices, storefronts, restaurants, and commercial buildings. From solar control and energy savings to decorative branding and security — we have the right film for your business."
      icon={Building2}
      heroTagline="Commercial Solutions"
      heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
      ctaText="Get a Free Consultation"
      ctaHref="/contact"
      products={[
        {
          id: "llumar-solar-commercial",
          name: "Solar Control Film",
          brand: "Llumar",
          tagline:
            "Reduce heat, glare, and energy costs for a more comfortable workspace",
          features: [
            "Corrects temperature imbalances between sunny and shady areas",
            "Deflects uncomfortable glare on screens and desks",
            "Reduces HVAC energy costs significantly",
            "Interior-applied retrofit — no window replacement needed",
          ],
          heatRejection: 80,
          irRejection: null,
          uvBlock: 99,
          warranty: "15 Years",
        },
        {
          id: "llumar-illusions",
          name: "Decorative iLLusions",
          brand: "Llumar",
          tagline:
            "50+ styles — frosted, patterned, gradient for branding and privacy",
          features: [
            "Elegant frosted films for conference rooms",
            "Custom graphic patterns for branding",
            "Modern gradient transitions from clear to opaque",
            "Over 50 individual styles available",
          ],
          heatRejection: null,
          irRejection: null,
          uvBlock: undefined,
          warranty: "7 Years",
        },
        {
          id: "vista-neutral",
          name: "Vista Neutral Film",
          brand: "Vista by Llumar",
          tagline:
            "Soft, neutral appearance with moderate heat rejection",
          features: [
            "Subtle appearance that doesn't change building aesthetics",
            "Moderate heat and glare rejection",
            "Sputtered technology for uniform light transmission",
            "Ideal where a soft, neutral look is desired",
          ],
          heatRejection: 55,
          irRejection: null,
          uvBlock: 99,
          warranty: "15 Years",
        },
        {
          id: "llumar-safety-commercial",
          name: "Safety & Security Film",
          brand: "Llumar",
          tagline:
            "Protect employees and assets with heavy-duty polyester film",
          features: [
            "Delays forced entry through glass doors and windows",
            "Holds shattered glass together — prevents injury",
            "Protects against vandalism and graffiti",
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
          title: "Energy Cost Reduction",
          description:
            "Commercial solar film can reduce cooling costs by 30-40%, with ROI typically achieved within 2-3 years.",
        },
        {
          title: "Employee Comfort",
          description:
            "Eliminate hot spots and glare on computer screens. A more comfortable workspace improves productivity.",
        },
        {
          title: "Brand Enhancement",
          description:
            "Decorative films transform plain glass into branded, professional spaces. Logo graphics, frosted privacy, and custom designs.",
        },
        {
          title: "Tenant Satisfaction",
          description:
            "For property managers: window film increases tenant comfort and satisfaction while reducing HVAC complaints.",
        },
        {
          title: "Security & Safety",
          description:
            "Security film holds glass in place during break-in attempts, natural disasters, and accidents — protecting people and assets.",
        },
        {
          title: "Minimal Disruption",
          description:
            "Installation is quick and clean. We work around your business hours to minimize disruption to your operations.",
        },
      ]}
    >
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight mb-4">
            Interactive <span className="text-accent">Film Viewer</span>
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-2xl">
            Explore solar control and decorative film options for your
            commercial space with Llumar&apos;s interactive viewer.
          </p>
          <LlumarViewer type="commercial-solar-decorative" />
        </div>
      </section>
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight mb-4">
            Energy Savings <span className="text-accent">Calculator</span>
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-2xl">
            Calculate potential energy cost savings for your building.
          </p>
          <LlumarViewer type="energy-calculator" />
        </div>
      </section>
    </ServicePageLayout>
  );
}
