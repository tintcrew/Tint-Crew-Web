"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface Customer {
  name: string;
  email: string;
  phone: string;
  bookingCount: number;
  totalSpent: number;
  lastVisit: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings?limit=200")
      .then((res) => res.json())
      .then((bookings: Array<{ customerName: string; customerEmail: string; customerPhone: string; totalPrice: number; createdAt: string }>) => {
        const map = new Map<string, Customer>();
        for (const b of bookings) {
          const key = b.customerEmail.toLowerCase();
          const existing = map.get(key);
          if (existing) {
            existing.bookingCount++;
            existing.totalSpent += b.totalPrice;
            if (b.createdAt > existing.lastVisit) existing.lastVisit = b.createdAt;
          } else {
            map.set(key, {
              name: b.customerName,
              email: b.customerEmail,
              phone: b.customerPhone,
              bookingCount: 1,
              totalSpent: b.totalPrice,
              lastVisit: b.createdAt,
            });
          }
        }
        setCustomers(Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-sm text-foreground-secondary mt-1">
          {customers.length} unique customers
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-16 text-foreground-muted">
          No customers yet. They&apos;ll appear here after the first booking.
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((customer) => (
            <div key={customer.email} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">{customer.name}</div>
                  <div className="text-xs text-foreground-secondary mt-0.5">
                    {customer.email} • {customer.phone}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">
                    {formatCurrency(customer.totalSpent)}
                  </div>
                  <div className="text-[10px] text-foreground-muted">
                    {customer.bookingCount} booking{customer.bookingCount > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
