import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json([]);

  const products = await db.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: q, mode: "insensitive" as any } },
        { description: { contains: q, mode: "insensitive" as any } },
        { category: { contains: q, mode: "insensitive" as any } },
      ],
    },
    take: 20,
  });

  return NextResponse.json(products);
}
