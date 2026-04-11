"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Star } from "lucide-react";
import {
  getPackagePrices,
  getAddons,
  getServiceOptions,
  getWindshieldPrice,
} from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { VehicleSelection, PackageSelection } from "./QuoteWizard";

interface Step2PricingProps {
  vehicle: VehicleSelection;
  onSelect: (
    pkg: PackageSelection,
    services: string[],
    addonIds: string[],
    totalPrice: number
  ) => void;
  onBack: () => void;
}

export function Step2Pricing({ vehicle, onSelect, onBack }: Step2PricingProps) {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "all_sides",
  ]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Determine the service type for pricing based on selected services
  const serviceType: "all_sides" | "fronts_only" = selectedServices.includes(
    "all_sides"
  )
    ? "all_sides"
    : selectedServices.includes("fronts_only")
      ? "fronts_only"
      : "all_sides";

  const packages = getPackagePrices(
    vehicle.year,
    vehicle.make,
    vehicle.model,
    serviceType
  );
  const addons = getAddons();
  const serviceOptions = getServiceOptions();

  // Get vehicle-specific windshield price
  const windshieldPrice = getWindshieldPrice(
    vehicle.year,
    vehicle.make,
    vehicle.model
  );

  const pkg = packages.find((p) => p.id === selectedPkg);

  // Calculate total
  const basePrice = pkg?.price ?? 0;
  const addonTotal = selectedAddons.reduce((sum, aid) => {
    const addon = addons.find((a) => a.id === aid);
    if (addon?.id === "windshield") {
      return sum + windshieldPrice;
    }
    return sum + (addon && "price" in addon ? (addon.price as number) : 0);
  }, 0);
  const totalPrice = basePrice + addonTotal;

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleContinue() {
    if (!pkg) return;
    onSelect(
      { id: pkg.id, name: pkg.name, price: pkg.price },
      selectedServices,
      selectedAddons,
      totalPrice
    );
  }

  function getAddonPrice(addon: (typeof addons)[number]): number {
    if (addon.id === "windshield") return windshieldPrice;
    return "price" in addon ? (addon.price as number) : 0;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h2 className="text-2xl font-bold">Personalized Estimate</h2>
        <p className="text-sm text-foreground-secondary mt-1">
          Vehicle: {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
      </div>

      {/* Package Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-4">
          Select Your Film
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {packages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPkg(p.id)}
              className={cn(
                "relative text-left rounded-xl border p-5 transition-all",
                selectedPkg === p.id
                  ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                  : "border-border bg-background hover:border-border-hover"
              )}
            >
              {p.popular && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                  <Star className="h-3 w-3" /> MOST POPULAR
                </span>
              )}
              <span className="text-[10px] font-medium text-accent uppercase tracking-wider">
                {p.brand}
              </span>
              <div className="text-base font-bold mt-0.5">{p.name}</div>
              <div className="text-2xl font-black text-accent mt-2">
                {formatCurrency(p.price)}
              </div>
              <p className="text-xs text-foreground-muted mt-1">{p.tagline}</p>
              <div className="flex gap-3 mt-3 text-xs">
                <span>
                  <strong className="text-foreground">{p.uvBlock}%</strong>{" "}
                  <span className="text-foreground-muted">UV</span>
                </span>
                <span>
                  <strong className="text-foreground">{p.heatRejection}%</strong>{" "}
                  <span className="text-foreground-muted">Heat</span>
                </span>
                {p.irRejection && (
                  <span>
                    <strong className="text-foreground">{p.irRejection}%</strong>{" "}
                    <span className="text-foreground-muted">IR</span>
                  </span>
                )}
              </div>
              <ul className="mt-3 space-y-1">
                {p.features.slice(0, 3).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-1.5 text-xs text-foreground-secondary"
                  >
                    <CheckCircle className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      {/* Service Options */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-4">
          Which Service Do You Need?
        </h3>
        <div className="space-y-2">
          {serviceOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-hover cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(opt.id)}
                onChange={() => toggleService(opt.id)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-4">
          Add-ons
        </h3>
        <div className="space-y-2">
          {addons.map((addon) => (
            <label
              key={addon.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-border-hover cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                <span className="text-sm">{addon.name}</span>
              </div>
              <span className="text-sm font-semibold text-accent">
                +{formatCurrency(getAddonPrice(addon))}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Total + CTA */}
      <div className="sticky bottom-0 bg-card pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-foreground-muted">Estimated Total</div>
            <div className="text-3xl font-black text-accent">
              {selectedPkg ? formatCurrency(totalPrice) : "\u2014"}
            </div>
          </div>
          <button
            onClick={handleContinue}
            disabled={!selectedPkg}
            className="h-12 px-8 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
