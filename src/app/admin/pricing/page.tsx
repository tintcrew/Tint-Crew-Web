"use client";

import { useState, useMemo } from "react";
import pricingData from "@/data/pricing.json";
import { formatCurrency } from "@/lib/utils";

const PACKAGES = [
  { id: "rayno-monocarbon", label: "MonoCarbon" },
  { id: "rayno-phantom-s5", label: "Phantom S5" },
  { id: "llumar-ctx", label: "Llumar CTX" },
  { id: "llumar-irx", label: "Llumar IRX" },
];

type FilmId =
  | "rayno-monocarbon"
  | "rayno-phantom-s5"
  | "llumar-ctx"
  | "llumar-irx";

export default function AdminPricingPage() {
  const makes = useMemo(
    () =>
      Array.from(new Set(pricingData.vehicles.map((v) => v.make))).sort(),
    []
  );

  const [activeMake, setActiveMake] = useState<string>(makes[0] ?? "");

  const vehiclesForMake = useMemo(
    () =>
      pricingData.vehicles
        .filter((v) => v.make === activeMake)
        .sort((a, b) => {
          if (a.model !== b.model) return a.model.localeCompare(b.model);
          return a.yearRange.localeCompare(b.yearRange);
        }),
    [activeMake]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pricing Editor</h1>
        <p className="text-sm text-foreground-secondary mt-1">
          View and manage pricing by vehicle make. Edit coming soon — currently
          read-only from pricing.json.
        </p>
      </div>

      {/* Make Tabs */}
      <div className="flex flex-wrap gap-2">
        {makes.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMake(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeMake === m
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-border-hover"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Pricing Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="text-left text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                Model
              </th>
              <th className="text-left text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                Years
              </th>
              {PACKAGES.map((pkg) => (
                <th
                  key={pkg.id}
                  className="text-right text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3"
                >
                  {pkg.label}
                </th>
              ))}
              <th className="text-right text-xs font-bold uppercase tracking-wider text-foreground-muted px-4 py-3">
                Windshield
              </th>
            </tr>
          </thead>
          <tbody>
            {vehiclesForMake.map((v) => (
              <tr
                key={`${v.model}-${v.yearRange}`}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 text-sm font-medium">{v.model}</td>
                <td className="px-4 py-3 text-sm text-foreground-secondary">
                  {v.yearRange}
                </td>
                {PACKAGES.map((pkg) => (
                  <td
                    key={pkg.id}
                    className="px-4 py-3 text-sm font-bold text-accent text-right"
                  >
                    {formatCurrency(v.allSides[pkg.id as FilmId])}
                  </td>
                ))}
                <td className="px-4 py-3 text-sm font-bold text-accent text-right">
                  {formatCurrency(v.windshield)}
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
                <tr
                  key={addon.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 text-sm font-medium">
                    {addon.name}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-accent text-right">
                    {"price" in addon
                      ? formatCurrency(addon.price as number)
                      : "From vehicle data"}
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
          {pricingData.vehicles.length}
        </span>{" "}
        entries across{" "}
        <span className="font-bold text-foreground">
          {new Set(pricingData.vehicles.map((v) => v.make)).size}
        </span>{" "}
        makes
      </div>
    </div>
  );
}
