import { NextRequest, NextResponse } from "next/server";

// PayPal webhook handler — sends order confirmation emails via Resend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle PayPal CHECKOUT.ORDER.APPROVED event
    if (body.event_type === "CHECKOUT.ORDER.APPROVED" || body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = body.resource || {};
      const payer = resource.payer || body.resource?.purchase_units?.[0]?.payee;
      const email = payer?.email_address || resource.payer?.email_address;
      const orderId = resource.id || body.resource?.id || "unknown";
      const amount = resource.purchase_units?.[0]?.amount?.value || resource.amount?.value || "0";
      const items = resource.purchase_units?.[0]?.items?.length || 1;

      if (email) {
        await sendOrderConfirmation(email, { id: orderId, amount: parseFloat(amount), items: String(items) });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

async function sendOrderConfirmation(email: string, order: { id: string; amount: number; items: string }) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) { console.warn("RESEND_API_KEY not set"); return; }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "DeskVibe <onboarding@resend.dev>",
        to: email,
        subject: `Order Confirmed — DeskVibe`,
        html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
          <h2 style="color:#1c1917">Thank you for your order!</h2>
          <p>Your order has been confirmed. We're preparing your desk upgrade.</p>
          <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0"><strong>Order:</strong> #${order.id.slice(-8).toUpperCase()}</p>
            <p style="margin:4px 0 0"><strong>Total:</strong> $${order.amount.toFixed(2)}</p>
            <p style="margin:4px 0 0"><strong>Items:</strong> ${order.items}</p>
          </div>
          <p style="color:#78716c;font-size:14px">Shipping in 7-12 business days. Tracking info will follow.</p>
          <p style="color:#78716c;font-size:14px">Questions? Reply to this email.</p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0">
          <p style="color:#a8a29e;font-size:12px">DeskVibe — Premium Desk Accessories</p>
        </div>`,
      }),
    });
    console.log(`📧 Confirmation sent to ${email}:`, resp.status);
  } catch (e: any) {
    console.error("Resend error:", e.message);
  }
}
