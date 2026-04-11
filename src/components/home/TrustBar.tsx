import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Award, Shield, Star, Clock } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Clock, label: "Since 1985", sublabel: "40+ Years" },
  { icon: Award, label: "Llumar Authorized", sublabel: "Dealer" },
  { icon: Shield, label: "Vista Dealer", sublabel: "Architectural" },
  { icon: Star, label: "Rayno Dealer", sublabel: "Carbon Ceramic" },
  { icon: Star, label: "5-Star Rated", sublabel: "1,095+ Reviews" },
];

export function TrustBar() {
  return (
    <section className="py-8 border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 text-foreground-secondary"
              >
                <item.icon className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {item.label}
                  </div>
                  <div className="text-xs text-foreground-muted">
                    {item.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
