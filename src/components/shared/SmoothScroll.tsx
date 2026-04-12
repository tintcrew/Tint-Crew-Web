"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  const animate = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    rafRef.current = requestAnimationFrame(animate);

    // Resize observer to recalculate scroll height when content changes
    const observer = new ResizeObserver(() => {
      lenis.resize();
    });
    observer.observe(document.body);

    // Also resize on route changes / image loads
    const handleResize = () => lenis.resize();
    window.addEventListener("resize", handleResize);

    // Recalculate after images load
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleResize, { once: true });
      }
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, [animate]);

  return <>{children}</>;
}
