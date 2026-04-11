import { NextRequest, NextResponse } from "next/server";
import { getPackagePrices, getAddons, classifyVehicle } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const model = request.nextUrl.searchParams.get("model");
  if (!model) {
    return NextResponse.json({ error: "model parameter required" }, { status: 400 });
  }

  const category = classifyVehicle(model);
  const packages = getPackagePrices(model);
  const addons = getAddons();

  return NextResponse.json({ category, packages, addons });
}
