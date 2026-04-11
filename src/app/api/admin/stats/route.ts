import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalBookings, todayBookings, monthBookings, pendingBookings, contactCount] =
      await Promise.all([
        prisma.booking.count(),
        prisma.booking.count({
          where: { createdAt: { gte: startOfDay } },
        }),
        prisma.booking.findMany({
          where: { createdAt: { gte: startOfMonth } },
          select: { totalPrice: true, status: true },
        }),
        prisma.booking.count({ where: { status: "pending" } }),
        prisma.contactSubmission.count(),
      ]);

    const monthRevenue = monthBookings
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const avgTicket =
      monthBookings.length > 0
        ? monthBookings.reduce((sum, b) => sum + b.totalPrice, 0) / monthBookings.length
        : 0;

    return NextResponse.json({
      totalBookings,
      todayBookings,
      monthBookingsCount: monthBookings.length,
      monthRevenue,
      avgTicket: Math.round(avgTicket),
      pendingBookings,
      contactSubmissions: contactCount,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
