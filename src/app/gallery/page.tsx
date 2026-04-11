import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Gallery — Our Work",
  description:
    "See our window tinting portfolio. Automotive, residential, and commercial installations in Orange County. 716+ photos showcasing our craftsmanship.",
};

const GALLERY_ITEMS = [
  { id: 1, label: "Tesla Model Y — Llumar IRX Ceramic" },
  { id: 2, label: "BMW X5 — Llumar CTX" },
  { id: 3, label: "Ford F-150 — Rayno Phantom S5" },
  { id: 4, label: "Mercedes C-Class — Llumar IRX" },
  { id: 5, label: "Honda CR-V — Rayno MonoCarbon" },
  { id: 6, label: "Residential — Vista Low-E" },
  { id: 7, label: "Commercial Office — Llumar Solar Control" },
  { id: 8, label: "Tesla Model 3 — Glass Roof Tint" },
  { id: 9, label: "Porsche 911 — Llumar IRX" },
  { id: 10, label: "Toyota Camry — Rayno Phantom S5" },
  { id: 11, label: "Storefront — Decorative iLLusions" },
  { id: 12, label: "Llumar Valor PPF — Full Front" },
];

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Portfolio
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Our <span className="text-accent">Work</span>
            </h1>
            <p className="mt-6 text-foreground-secondary max-w-2xl">
              Browse our portfolio of automotive, residential, and commercial
              window tinting installations. Every job reflects our commitment to
              precision and quality.
            </p>
          </AnimatedSection>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.05}>
                <div className="group relative aspect-[4/3] rounded-xl border border-border bg-surface overflow-hidden cursor-pointer">
                  {/* Placeholder — replace with real photos */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-background">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-black text-accent">
                          {item.id}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-muted">
                        {item.label}
                      </p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <p className="mt-12 text-center text-sm text-foreground-muted">
              Gallery photos coming soon. In the meantime, check out our{" "}
              <a
                href="https://www.yelp.com/biz/tint-crew-buena-park"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                716+ photos on Yelp
              </a>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
