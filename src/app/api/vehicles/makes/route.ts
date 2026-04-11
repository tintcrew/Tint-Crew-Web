import { NextRequest, NextResponse } from "next/server";
import { getMakes } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");
  if (!year) {
    return NextResponse.json({ error: "year parameter required" }, { status: 400 });
  }
  return NextResponse.json(getMakes(Number(year)));
}
