"use client";

import { useState } from "react";
import { Car } from "lucide-react";
import { getYearRanges, getMakes, getModels } from "@/lib/pricing";
import type { VehicleSelection } from "./QuoteWizard";

interface Step1VehicleProps {
  onSelect: (vehicle: VehicleSelection) => void;
}

export function Step1Vehicle({ onSelect }: Step1VehicleProps) {
  const [yearRange, setYearRange] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const yearRanges = getYearRanges();
  const makes = yearRange ? getMakes(yearRange) : [];
  const models = yearRange && make ? getModels(yearRange, make) : [];

  function handleYearChange(value: string) {
    setYearRange(value);
    setMake("");
    setModel("");
  }

  function handleMakeChange(value: string) {
    setMake(value);
    setModel("");
  }

  function handleSubmit() {
    if (yearRange && make && model) {
      onSelect({ yearRange, make, model });
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-4">
          <Car className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold">Select Your Vehicle</h2>
        <p className="mt-2 text-sm text-foreground-secondary">
          Choose your vehicle to see personalized pricing
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {/* Year */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Year *</label>
          <select
            value={yearRange}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
          >
            <option value="">Select Year</option>
            {yearRanges.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Make *</label>
          <select
            value={make}
            onChange={(e) => handleMakeChange(e.target.value)}
            disabled={!yearRange}
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 appearance-none"
          >
            <option value="">Select Make</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Model *</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!make}
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 appearance-none"
          >
            <option value="">Select Model</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!yearRange || !make || !model}
          className="h-12 px-8 rounded-lg bg-accent text-accent-foreground font-semibold text-base hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get My Quote
        </button>
      </div>
    </div>
  );
}
