import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const discounts = await db.discount.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(discounts);
}

export async function POST(request: NextRequest) {
  const { code, type, value, minAmount } = await request.json();
  const discount = await db.discount.create({ data: { code, type, value, minAmount: minAmount || null } });
  return NextResponse.json(discount);
}
