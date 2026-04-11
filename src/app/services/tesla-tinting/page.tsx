import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { ServicePageLayout } from "@/components/shared/ServicePageLayout";

export const metadata: Metadata = {
  title: "Tesla Window Tinting Orange County, CA",
  description:
    "Specialized Tesla window tinting for Model 3, Y, S, X & Cybertruck. Ceramic films that won't interfere with Autopilot, sensors, or electronics. Buena Park, CA.",
};

export default function TeslaTintingPage() {
  return (
    <ServicePageLayout
      title="Tesla Window Tinting"
      accent="Tesla"
      description="Your Tesla deserves specialized care. Our ceramic window films are specifically chosen to work flawlessly with Tesla's advanced electronics, Autopilot cameras, sensors, and glass roof — without any signal interference or performance issues."
      icon={Zap}
      heroTagline="Tesla Specialists"
      products={[
        {
          id: "tesla-llumar-irx",
          name: "Llumar IRX for Tesla",
          brand: "Llumar",
          tagline:
            "Our top recommendation for Tesla — maximum heat rejection, zero interference",
          features: [
            "97% infrared rejection — critical for Tesla's all-glass roof",
            "100% metal-free nano-ceramic — no sensor or camera interference",
            "Won't affect Autopilot, Sentry Mode, or key card",
            "7 shade options to match your preference",
            "Lifetime limited warranty",
          ],
          heatRejection: 62,
          irRejection: 97,
          uvBlock: 99,
          warranty: "Lifetime",
        },
        {
          id: "tesla-llumar-ctx",
          name: "Llumar CTX for Tesla",
          brand: "Llumar",
          tagline:
            "Nano-ceramic technology at a more accessible price point",
          features: [
            "70% IR rejection with nano-ceramic technology",
            "Metal-free — safe for all Tesla electronics",
            "Scratch-resistant coating for longevity",
            "Color-stable charcoal shades",
            "Lifetime limited warranty",
          ],
          heatRejection: 60,
          irRejection: 70,
          uvBlock: 99,
          warranty: "Lifetime",
        },
        {
          id: "tesla-phantom-s5",
          name: "Rayno Phantom S5 for Tesla",
          brand: "Rayno",
          tagline:
            "Carbon ceramic with outstanding clarity for Tesla's panoramic roof",
          features: [
            "Nano-encapsulated ceramic particles",
            "Crystal-clear clarity below 1 on clarity scale",
            "Up to 66% total solar energy rejection",
            "35% better color stability than competitors",
            "Lifetime limited warranty",
          ],
          heatRejection: 66,
          irRejection: 58,
          uvBlock: 99,
          warranty: "Lifetime",
        },
      ]}
      benefits={[
        {
          title: "Glass Roof Expertise",
          description:
            "Tesla's panoramic glass roof lets in massive heat and UV. Our ceramic films reject up to 97% of infrared rays, keeping your cabin comfortable.",
        },
        {
          title: "Autopilot Safe",
          description:
            "All our films are 100% metal-free ceramic. No interference with cameras, radar, ultrasonics, or any Tesla Autopilot features.",
        },
        {
          title: "Sentry Mode Compatible",
          description:
            "Our tints are applied with precision around all cameras, ensuring Sentry Mode and dashcam recording remain crystal clear.",
        },
        {
          title: "All Models Covered",
          description:
            "Model 3, Model Y, Model S, Model X, and Cybertruck. We know the exact dimensions and curves of every Tesla.",
        },
        {
          title: "Key Card & Phone Key",
          description:
            "Metal-free films won't interfere with Tesla's NFC key card reader or Bluetooth phone key functionality.",
        },
        {
          title: "Range Preservation",
          description:
            "By reducing cabin heat, your Tesla's AC works less — which can help preserve battery range, especially in SoCal summers.",
        },
      ]}
    />
  );
}
