import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { code, subtotal } = await request.json();
  if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

  const discount = await db.discount.findUnique({ where: { code: code.toUpperCase() } });
  if (!discount || !discount.isActive) return NextResponse.json({ error: "Invalid code" });
  if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) return NextResponse.json({ error: "Code expired" });
  if (discount.usageLeft === 0) return NextResponse.json({ error: "Code used up" });
  if (discount.minAmount && subtotal < discount.minAmount) return NextResponse.json({ error: `Minimum order $${discount.minAmount}` });

  const amount = discount.type === "PERCENTAGE" ? subtotal * (discount.value / 100) : discount.value;

  return NextResponse.json({ valid: true, type: discount.type, value: discount.value, amount: Math.round(amount * 100) / 100, code: discount.code });
}
