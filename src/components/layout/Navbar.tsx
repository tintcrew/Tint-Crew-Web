"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG, NAV_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with slanted accent box (Chicago Auto Pros style) */}
          <Link href="/" className="relative flex items-center">
            <div
              className="absolute -left-4 -top-3 -bottom-3 w-[calc(100%+48px)] bg-accent -z-10"
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)" }}
            />
            <span className="text-2xl font-black tracking-tight text-white px-3 py-2">
              TINT<span className="text-white/80">CREW</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  "children" in link
                    ? setActiveDropdown(link.label)
                    : undefined
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "text-foreground-secondary hover:text-foreground hover:bg-surface"
                  )}
                >
                  {link.label}
                  {"children" in link && (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </Link>

                {/* Dropdown */}
                {"children" in link && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-56">
                    <div className="rounded-xl border border-border bg-card shadow-xl p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground hover:bg-surface transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              {SITE_CONFIG.phone}
            </a>
            <Link href="/quote" className={buttonVariants({ size: "default" })}>
              Get Instant Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-border mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-foreground-secondary hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                  {"children" in link && (
                    <div className="ml-4 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 px-4">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 h-11 rounded-lg border border-border text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.phone}
              </a>
              <Link href="/quote" className={buttonVariants({ size: "lg" }) + " w-full"}>
                Get Instant Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
