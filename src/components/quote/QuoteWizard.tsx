"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Step1Vehicle } from "./Step1Vehicle";
import { Step2Pricing } from "./Step2Pricing";
import { Step3Booking } from "./Step3Booking";

export interface VehicleSelection {
  yearRange: string;
  make: string;
  model: string;
}

export interface PackageSelection {
  id: string;
  name: string;
  price: number;
}

export interface QuoteState {
  vehicle: VehicleSelection | null;
  selectedPackage: PackageSelection | null;
  services: string[];
  addonIds: string[];
  totalPrice: number;
}

const STEPS = ["Vehicle", "Pricing", "Book"] as const;

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuoteState>({
    vehicle: null,
    selectedPackage: null,
    services: [],
    addonIds: [],
    totalPrice: 0,
  });

  function handleVehicleSelect(vehicle: VehicleSelection) {
    setState((prev) => ({ ...prev, vehicle }));
    setStep(2);
  }

  function handlePackageSelect(
    pkg: PackageSelection,
    services: string[],
    addonIds: string[],
    totalPrice: number
  ) {
    setState((prev) => ({
      ...prev,
      selectedPackage: pkg,
      services,
      addonIds,
      totalPrice,
    }));
    setStep(3);
  }

  function handleBack() {
    setStep((prev) => Math.max(1, prev - 1));
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;
          return (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => isCompleted && setStep(stepNum)}
                disabled={!isCompleted}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  isActive && "bg-accent text-accent-foreground",
                  isCompleted &&
                    "bg-accent/20 text-accent cursor-pointer hover:bg-accent/30",
                  !isActive &&
                    !isCompleted &&
                    "bg-surface text-foreground-muted"
                )}
              >
                {isCompleted ? "✓" : stepNum}
              </button>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline",
                  isActive ? "text-foreground" : "text-foreground-muted"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-6 sm:w-12 h-px mx-1",
                    isCompleted ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Steps */}
      {step === 1 && <Step1Vehicle onSelect={handleVehicleSelect} />}
      {step === 2 && state.vehicle && (
        <Step2Pricing
          vehicle={state.vehicle}
          onSelect={handlePackageSelect}
          onBack={handleBack}
        />
      )}
      {step === 3 && state.vehicle && state.selectedPackage && (
        <Step3Booking
          vehicle={state.vehicle}
          selectedPackage={state.selectedPackage}
          services={state.services}
          totalPrice={state.totalPrice}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
