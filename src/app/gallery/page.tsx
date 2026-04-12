import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Gallery — Our Work",
  description:
    "See our window tinting portfolio. Automotive, residential, and commercial installations in Orange County. 716+ photos showcasing our craftsmanship.",
};

const GALLERY_ITEMS = [
  { id: 1, label: "Tesla Model Y — Llumar IRX Ceramic", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80" },
  { id: 2, label: "BMW X5 — Llumar CTX", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80" },
  { id: 3, label: "Ford F-150 — Rayno Phantom S5", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80" },
  { id: 4, label: "Mercedes C-Class — Llumar IRX", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80" },
  { id: 5, label: "Honda CR-V — Rayno MonoCarbon", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80" },
  { id: 6, label: "Residential — Vista Low-E", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80" },
  { id: 7, label: "Commercial Office — Llumar Solar Control", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80" },
  { id: 8, label: "Tesla Model 3 — Glass Roof Tint", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80" },
  { id: 9, label: "Porsche 911 — Llumar IRX", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { id: 10, label: "Toyota Camry — Rayno Phantom S5", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { id: 11, label: "Storefront — Decorative iLLusions", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80" },
  { id: 12, label: "Llumar Valor PPF — Full Front", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80" },
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
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay with label */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                    <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium text-white">
                        {item.label}
                      </p>
                    </div>
                  </div>
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
