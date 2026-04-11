"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Car, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { VehicleSelection, PackageSelection } from "./QuoteWizard";

interface Step3BookingProps {
  vehicle: VehicleSelection;
  selectedPackage: PackageSelection;
  services: string[];
  totalPrice: number;
  onBack: () => void;
}

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM",
];

const APPOINTMENT_TYPES = [
  { id: "pick_a_time", label: "Pick a time", description: "Wait while we work (1 hour)", icon: Clock },
  { id: "drop_and_go", label: "Drop-and-Go", description: "Drop off your car and leave (1 hour)", icon: Car },
];

export function Step3Booking({
  vehicle,
  selectedPackage,
  services,
  totalPrice,
  onBack,
}: Step3BookingProps) {
  const [appointmentType, setAppointmentType] = useState("pick_a_time");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Generate next 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    // Skip Sundays
    if (d.getDay() === 0) return null;
    return d.toISOString().split("T")[0];
  }).filter(Boolean) as string[];

  function formatDateLabel(dateStr: string) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  async function handleSubmit() {
    if (!selectedDate || !selectedTime || !name || !phone || !email) return;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: vehicle.yearRange,
          make: vehicle.make,
          model: vehicle.model,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          services: services,
          addons: [],
          totalPrice,
          appointmentType,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          notes,
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
    } catch (err) {
      console.error("Booking error:", err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Appointment Booked!</h2>
        <p className="mt-3 text-foreground-secondary max-w-md mx-auto">
          We&apos;ve sent a confirmation to {email}. You&apos;ll receive a text
          reminder 24 hours before your appointment.
        </p>
        <div className="mt-6 p-4 rounded-xl border border-border bg-surface max-w-sm mx-auto text-left">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground-muted">Vehicle</span>
              <span className="font-medium">{vehicle.yearRange} {vehicle.make} {vehicle.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Film</span>
              <span className="font-medium">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Date</span>
              <span className="font-medium">{formatDateLabel(selectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Time</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-accent">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    );
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
        <h2 className="text-2xl font-bold">Book Your Appointment</h2>
        <div className="mt-2 p-3 rounded-lg bg-surface text-sm">
          <span className="text-foreground-muted">
            {vehicle.yearRange} {vehicle.make} {vehicle.model}
          </span>
          <span className="mx-2 text-border">|</span>
          <span className="font-semibold">{selectedPackage.name}</span>
          <span className="mx-2 text-border">|</span>
          <span className="font-bold text-accent">{formatCurrency(totalPrice)}</span>
        </div>
      </div>

      {/* Appointment Type */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-3">
          Appointment Type
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {APPOINTMENT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setAppointmentType(type.id)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                appointmentType === type.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-border-hover"
              )}
            >
              <type.icon className={cn("h-5 w-5 shrink-0", appointmentType === type.id ? "text-accent" : "text-foreground-muted")} />
              <div>
                <div className="text-sm font-semibold">{type.label}</div>
                <div className="text-xs text-foreground-muted">{type.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-3">
          <Calendar className="h-4 w-4 inline mr-1" /> Select a Date
        </h3>
        <div className="flex flex-wrap gap-2">
          {dates.slice(0, 14).map((date) => (
            <button
              key={date}
              onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                selectedDate === date
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-border-hover"
              )}
            >
              {formatDateLabel(date)}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-3">
            <Clock className="h-4 w-4 inline mr-1" /> Select a Time
          </h3>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-medium border transition-all",
                  selectedTime === time
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-border-hover"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Customer Info */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground-muted mb-3">
          Your Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="you@email.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">
              Additional Requests or Questions
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Any special requests..."
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-border pt-6">
        <button
          onClick={handleSubmit}
          disabled={!selectedDate || !selectedTime || !name || !phone || !email}
          className="w-full h-14 rounded-lg bg-accent text-accent-foreground font-bold text-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Appointment — {formatCurrency(totalPrice)}
        </button>
        <p className="mt-3 text-center text-xs text-foreground-muted">
          You&apos;ll receive a confirmation email and a text reminder 24 hours
          before your appointment.
        </p>
      </div>
    </div>
  );
}
