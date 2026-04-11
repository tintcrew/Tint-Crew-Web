import Link from "next/link";
import { LayoutDashboard, CalendarDays, Users, DollarSign } from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-28">
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground-muted mb-4">
                Admin Panel
              </h2>
              <nav className="space-y-1">
                {ADMIN_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-surface transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-border">
                <Link
                  href="/"
                  className="text-xs text-foreground-muted hover:text-accent transition-colors"
                >
                  ← Back to website
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
