import type { Metadata } from "next";
import { Car } from "lucide-react";
import { ServicePageLayout } from "@/components/shared/ServicePageLayout";
import { LlumarViewer } from "@/components/shared/LlumarViewer";
import { AUTOMOTIVE_PACKAGES } from "@/constants/services";

export const metadata: Metadata = {
  title: "Automotive Window Tinting Orange County, CA",
  description:
    "Premium car window tinting in Buena Park & Orange County. Llumar CTX, IRX ceramic and Rayno MonoCarbon, Phantom S5 films. 99% UV protection. Lifetime warranty.",
};

export default function AutomotiveTintingPage() {
  return (
    <ServicePageLayout
      title="Automotive Window Tinting"
      accent="Window Tinting"
      description="Protect your vehicle's interior, reduce heat and glare, and enhance your car's appearance with premium window films from Llumar and Rayno. All films block 99% of harmful UV rays and come with a lifetime limited warranty."
      icon={Car}
      heroTagline="Automotive Services"
      heroImage="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&q=80"
      products={AUTOMOTIVE_PACKAGES.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        brand: pkg.brand,
        tagline: pkg.tagline,
        features: [...pkg.features],
        heatRejection: pkg.heatRejection,
        irRejection: pkg.irRejection,
        uvBlock: pkg.uvBlock,
        warranty: pkg.warranty,
      }))}
      benefits={[
        {
          title: "99% UV Protection",
          description:
            "All our automotive films block 99% of harmful UV rays, protecting your skin and preventing interior fading and cracking.",
        },
        {
          title: "Up to 97% IR Rejection",
          description:
            "Llumar IRX ceramic film rejects up to 97% of infrared heat rays — keeping your car cool even in SoCal summers.",
        },
        {
          title: "No Signal Interference",
          description:
            "All films are metal-free and won't interfere with cell phones, GPS, Bluetooth, satellite radio, or toll transponders.",
        },
        {
          title: "Lifetime Warranty",
          description:
            "Every installation is backed by the manufacturer's lifetime limited warranty against cracking, peeling, and adhesive failure.",
        },
        {
          title: "Legal Compliance",
          description:
            "We help you choose shades that comply with California window tint laws. Front windshield AS-1 line, sides and rear per regulations.",
        },
        {
          title: "Same-Day Service",
          description:
            "Most automotive tint jobs are completed in 1-2 hours. Drop off in the morning, pick up the same day.",
        },
      ]}
    >
      {/* Llumar Interactive Tint & PPF Viewer */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight mb-4">
            Interactive <span className="text-accent">Film Viewer</span>
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-2xl">
            Explore different window tint shades and paint protection options
            on various vehicle types with Llumar&apos;s interactive viewer.
          </p>
          <LlumarViewer type="auto-tint-ppf" />
        </div>
      </section>
    </ServicePageLayout>
  );
}
