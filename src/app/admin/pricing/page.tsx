"use client";

import { useState } from "react";
import pricingData from "@/data/pricing.json";
import { formatCurrency } from "@/lib/utils";

type CategoryKey = keyof typeof pricingData.pricing;

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "2_dr", label: "2-Door (Coupe)" },
  { key: "4_dr", label: "4-Door (Sedan)" },
  { key: "4_dr_suv", label: "4-Door SUV" },
  { key: "4_dr_truck", label: "4-Door Truck" },
  { key: "minivan", label: "Minivan" },
  { key: "cybertruck", label: "Cybertruck" },
];

const PACKAGES = [
  { id: "rayno-monocarbon", label: "MonoCarbon" },
  { id: "rayno-phantom-s5", label: "Phantom S5" },
  { id: "llumar-ctx", label: "Llumar CTX" },
  { id: "llumar-irx", label: "Llumar IRX" },
];

export default function AdminPricingPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("4_dr");

  const pricing = pricingData.pricing[activeCategory] as Record<string, number>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pricing Editor</h1>
        <p className="text-sm text-foreground-secondary mt-1">
          View and manage pricing by vehicle category. Edit coming soon — currently read-only from pricing.json.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeCategory === cat.key
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-border-hover"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Pricing Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="text-left text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                Film Package
              </th>
              <th className="text-right text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {PACKAGES.map((pkg) => (
              <tr key={pkg.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-sm font-medium">{pkg.label}</td>
                <td className="px-4 py-3 text-sm font-bold text-accent text-right">
                  {formatCurrency(pricing[pkg.id])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add-ons */}
      <div>
        <h2 className="text-lg font-bold mb-3">Add-ons</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                  Add-on
                </th>
                <th className="text-right text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingData.addons.map((addon) => (
                <tr key={addon.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-sm font-medium">{addon.name}</td>
                  <td className="px-4 py-3 text-sm font-bold text-accent text-right">
                    {formatCurrency(addon.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicle Count */}
      <div className="p-4 rounded-xl border border-border bg-surface text-sm text-foreground-secondary">
        Total vehicles in database:{" "}
        <span className="font-bold text-foreground">
          {pricingData.vehicles.reduce(
            (sum, v) =>
              sum +
              Object.values(v.makes).reduce(
                (s, models) => s + (models as string[]).length,
                0
              ),
            0
          )}
        </span>{" "}
        models across{" "}
        <span className="font-bold text-foreground">
          {pricingData.vehicles.length}
        </span>{" "}
        year ranges
      </div>
    </div>
  );
}
