"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.querySelectorAll(".particle");

    particles.forEach((particle, i) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.3 + 0.1,
      });

      gsap.to(particle, {
        y: `-=${100 + Math.random() * 200}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        opacity: 0,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        delay: i * 0.3,
        ease: "none",
        onRepeat() {
          gsap.set(particle, {
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
            opacity: Math.random() * 0.3 + 0.1,
          });
        },
      });
    });

    return () => {
      particles.forEach((particle) => gsap.killTweensOf(particle));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full bg-accent/30"
        />
      ))}
    </div>
  );
}
