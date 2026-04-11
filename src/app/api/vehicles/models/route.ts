import { NextRequest, NextResponse } from "next/server";
import { getModels } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const yearRange = request.nextUrl.searchParams.get("year");
  const make = request.nextUrl.searchParams.get("make");
  if (!yearRange || !make) {
    return NextResponse.json({ error: "year and make parameters required" }, { status: 400 });
  }
  return NextResponse.json(getModels(yearRange, make));
}
