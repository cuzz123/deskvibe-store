import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { items, total } = await request.json();
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_KEY) return NextResponse.json({ ok: true }); // Silent skip if not configured

    const itemList = items?.map((i: any) => `${i.name} ×${i.qty || 1}`).join(", ") || "Unknown items";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "DeskVibe Orders <onboarding@resend.dev>",
        to: "1709658792@qq.com",
        subject: `New Order — $${(total || 0).toFixed(2)} — DeskVibe`,
        html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
          <h2 style="color:#1c1917">New Order Received</h2>
          <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin:16px 0">
            <p><strong>Items:</strong> ${itemList}</p>
            <p style="font-size:18px;margin:8px 0 0"><strong>Total:</strong> $${(total || 0).toFixed(2)}</p>
          </div>
          <p style="color:#78716c;font-size:14px">Buyer has confirmed payment. Please verify in your PayPal account and ship the order.</p>
        </div>`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
