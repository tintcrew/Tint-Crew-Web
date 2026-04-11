import { NextResponse } from "next/server";
import { getYearRanges } from "@/lib/pricing";

export async function GET() {
  return NextResponse.json(getYearRanges());
}
