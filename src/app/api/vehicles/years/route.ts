import { NextResponse } from "next/server";
import { getYears } from "@/lib/pricing";

export async function GET() {
  return NextResponse.json(getYears());
}
