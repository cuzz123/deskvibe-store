import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, items } = await request.json();
    if (!email || !items?.length) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const RESEND_KEY = process.env.RESEND_API_KEY;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://zenstone-store-weld.vercel.app";

    if (!RESEND_KEY) {
      console.warn("RESEND_API_KEY not set — skipping abandoned cart email");
      return NextResponse.json({ ok: true });
    }

    const itemsList = items.map((i: { name: string; price: number; qty: number }) =>
      `<tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4">${i.name} ×${i.qty}</td><td style="text-align:right;padding:8px 0;border-bottom:1px solid #e7e5e4">$${(i.price * i.qty).toFixed(2)}</td></tr>`
    ).join("");

    const total = items.reduce((s: number, i: { price: number; qty: number }) => s + i.price * i.qty, 0);

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "DeskVibe <onboarding@resend.dev>",
        to: email,
        subject: "Your cart is waiting — DeskVibe",
        html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
          <h2 style="color:#1c1917">Your cart is waiting</h2>
          <p style="color:#57534e">You left some items behind. They're still here — ready when you are.</p>
          <table style="width:100%;margin:20px 0;border-collapse:collapse">${itemsList}</table>
          <p style="font-weight:bold;text-align:right;font-size:18px">Total: $${total.toFixed(2)}</p>
          <a href="${APP_URL}/checkout" style="display:block;background:#1c1917;color:#fff;text-align:center;padding:16px;border-radius:30px;text-decoration:none;font-weight:bold;margin:24px 0">Complete Your Order →</a>
          <p style="color:#78716c;font-size:14px">Free shipping on orders over $75.</p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0">
          <p style="color:#a8a29e;font-size:12px">DeskVibe — Premium Desk Accessories</p>
        </div>`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
