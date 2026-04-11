import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        year: data.year,
        make: data.make,
        model: data.model,
        packageId: data.packageId,
        packageName: data.packageName,
        price: data.price,
        services: JSON.stringify(data.services),
        addons: JSON.stringify(data.addons),
        totalPrice: data.totalPrice,
        appointmentType: data.appointmentType,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        notes: data.notes || "",
        status: "pending",
      },
    });

    // TODO: Send confirmation email via Resend
    // TODO: Send confirmation SMS via Twilio
    // TODO: Create Google Calendar event

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    console.error("Booking creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
