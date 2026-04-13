"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600&q=85",
    title: "Tesla Model Y",
    subtitle: "Llumar IRX Ceramic — 20% VLT",
  },
  {
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=85",
    title: "BMW M4",
    subtitle: "Llumar CTX — 15% VLT",
  },
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85",
    title: "Porsche 911",
    subtitle: "Llumar Valor PPF Full Front",
  },
  {
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=85",
    title: "Mercedes C-Class",
    subtitle: "Rayno Phantom S5 — 30% VLT",
  },
  {
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&q=85",
    title: "Tesla Model 3",
    subtitle: "Glass Roof + All Windows IRX",
  },
  {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=85",
    title: "Ford F-150",
    subtitle: "Rayno MonoCarbon — 5% VLT",
  },
];

export function WorkCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  function next() {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }

  function prev() {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }

  return (
    <div
      className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Slide info */}
          <div className="absolute bottom-8 left-8 right-8 sm:bottom-12 sm:left-12">
            <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">
              Recent Work
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-1">
              {slide.title}
            </h3>
            <p className="text-sm sm:text-base text-white/70">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 sm:right-12 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all cursor-pointer",
              i === current ? "w-8 bg-accent" : "w-1.5 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
