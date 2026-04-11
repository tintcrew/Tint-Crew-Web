import { NextRequest, NextResponse } from "next/server";
import { getPackagePrices, getAddons, getWindshieldPrice } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const yearRange = request.nextUrl.searchParams.get("yearRange");
  const make = request.nextUrl.searchParams.get("make");
  const model = request.nextUrl.searchParams.get("model");
  const serviceType = request.nextUrl.searchParams.get("serviceType") as "all_sides" | "fronts_only" | null;

  if (!yearRange || !make || !model) {
    return NextResponse.json(
      { error: "yearRange, make, and model parameters required" },
      { status: 400 }
    );
  }

  const packages = getPackagePrices(yearRange, make, model, serviceType || "all_sides");
  const windshieldPrice = getWindshieldPrice(yearRange, make, model);
  const addons = getAddons();

  return NextResponse.json({ packages, windshieldPrice, addons });
}
