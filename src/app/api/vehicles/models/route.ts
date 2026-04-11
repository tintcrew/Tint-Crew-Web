import { NextRequest, NextResponse } from "next/server";
import { getModels } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  const make = request.nextUrl.searchParams.get("make");
  if (!year || !make) {
    return NextResponse.json({ error: "year and make parameters required" }, { status: 400 });
  }
  return NextResponse.json(getModels(Number(year), make));
}
