import { NextRequest, NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/server/rate-limit";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_BASE = process.env.PAYPAL_BASE || "https://api-m.paypal.com"; // or https://api-m.sandbox.paypal.com for sandbox

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
  const resp = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const data = await resp.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = applyRateLimit(request, { windowMs: 60_000, maxRequests: 10 });
  if (rateLimitResponse) return rateLimitResponse;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    return NextResponse.json({ error: "PayPal not configured" }, { status: 500 });
  }

  try {
    const { items } = await request.json();
    if (!items?.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    const subtotal = items.reduce((s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= 75 ? 0 : 9.99;
    const total = (subtotal + shipping).toFixed(2);

    const token = await getAccessToken();

    const orderResp = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: "USD", value: total, breakdown: { item_total: { currency_code: "USD", value: subtotal.toFixed(2) }, shipping: { currency_code: "USD", value: shipping.toFixed(2) } } },
          items: items.map((i: { name: string; price: number; quantity: number }) => ({ name: i.name, unit_amount: { currency_code: "USD", value: i.price.toFixed(2) }, quantity: String(i.quantity) })),
        }],
      }),
    });

    const order = await orderResp.json();
    if (order.id) {
      return NextResponse.json({ orderID: order.id });
    }
    return NextResponse.json({ error: order.message || "PayPal order creation failed" }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
