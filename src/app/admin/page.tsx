"use client";

import { useEffect, useState } from "react";
import { CalendarDays, DollarSign, TrendingUp, Clock, Users, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Stats {
  totalBookings: number;
  todayBookings: number;
  monthBookingsCount: number;
  monthRevenue: number;
  avgTicket: number;
  pendingBookings: number;
  contactSubmissions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Today's Bookings",
      value: String(stats?.todayBookings ?? 0),
      icon: CalendarDays,
      color: "text-accent",
    },
    {
      label: "Pending",
      value: String(stats?.pendingBookings ?? 0),
      icon: Clock,
      color: "text-warning",
    },
    {
      label: "This Month",
      value: String(stats?.monthBookingsCount ?? 0),
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Month Revenue",
      value: formatCurrency(stats?.monthRevenue ?? 0),
      icon: DollarSign,
      color: "text-success",
    },
    {
      label: "Avg Ticket",
      value: formatCurrency(stats?.avgTicket ?? 0),
      icon: DollarSign,
      color: "text-accent",
    },
    {
      label: "Total Bookings",
      value: String(stats?.totalBookings ?? 0),
      icon: Users,
      color: "text-foreground",
    },
    {
      label: "Contact Messages",
      value: String(stats?.contactSubmissions ?? 0),
      icon: MessageSquare,
      color: "text-foreground-secondary",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-foreground-secondary mt-1">
          Overview of your Tint Crew business
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
                {card.label}
              </span>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div className={`text-2xl font-black ${card.color}`}>
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
