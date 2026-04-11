"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  createdAt: string;
  year: string;
  make: string;
  model: string;
  packageName: string;
  totalPrice: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  status: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  confirmed: "bg-accent/10 text-accent",
  completed: "bg-success/10 text-success",
  cancelled: "bg-foreground-muted/10 text-foreground-muted",
  "no-show": "bg-error/10 text-error",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const url = filter
      ? `/api/admin/bookings?status=${filter}`
      : "/api/admin/bookings";
    fetch(url)
      .then((res) => res.json())
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-foreground-secondary mt-1">
            {bookings.length} total bookings
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["", "pending", "confirmed", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              filter === s
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:border-border-hover"
            )}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 text-foreground-muted">
          No bookings found. They&apos;ll appear here when customers book through the quote wizard.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">
                      {booking.customerName}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                        STATUS_COLORS[booking.status] || STATUS_COLORS.pending
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-xs text-foreground-secondary space-x-3">
                    <span>
                      {booking.year} {booking.make} {booking.model}
                    </span>
                    <span>•</span>
                    <span>{booking.packageName}</span>
                    <span>•</span>
                    <span className="font-semibold text-accent">
                      {formatCurrency(booking.totalPrice)}
                    </span>
                  </div>
                  <div className="text-xs text-foreground-muted mt-1">
                    {booking.appointmentDate} at {booking.appointmentTime} ({booking.appointmentType.replace("_", " ")})
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  {booking.status === "pending" && (
                    <button
                      onClick={() => updateStatus(booking.id, "confirmed")}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent-hover transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(booking.id, "completed")}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"
                    >
                      Complete
                    </button>
                  )}
                  {booking.status !== "cancelled" && booking.status !== "completed" && (
                    <button
                      onClick={() => updateStatus(booking.id, "cancelled")}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-foreground-muted hover:text-error hover:border-error/30 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {booking.notes && (
                <div className="mt-2 text-xs text-foreground-muted bg-surface rounded-lg p-2">
                  Note: {booking.notes}
                </div>
              )}

              <div className="mt-2 text-[10px] text-foreground-muted">
                {booking.customerPhone} • {booking.customerEmail}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
