import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!STRIPE_SECRET || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(STRIPE_SECRET, { apiVersion: "2025-06-16" as any });
    const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;

      // Send order confirmation email via Resend
      if (customerEmail) {
        await sendOrderConfirmation(customerEmail, {
          id: session.id,
          amount: (session.amount_total || 0) / 100,
          items: session.metadata?.item_count || "0",
        });
      }

      console.log(`✅ Order completed: ${session.id} | ${customerEmail} | $${(session.amount_total || 0) / 100}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

async function sendOrderConfirmation(email: string, order: { id: string; amount: number; items: string }) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email");
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_KEY);
    await resend.emails.send({
      from: "DeskVibe <orders@deskvibe.com>",
      to: email,
      subject: `Order Confirmed — #${order.id.slice(-8).toUpperCase()}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
          <h2 style="color:#1c1917">Thank you for your order! 🎉</h2>
          <p>Your order <strong>#${order.id.slice(-8).toUpperCase()}</strong> has been confirmed.</p>
          <div style="background:#f5f5f4;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0"><strong>Total:</strong> $${order.amount.toFixed(2)}</p>
            <p style="margin:4px 0 0"><strong>Items:</strong> ${order.items} item(s)</p>
          </div>
          <p style="color:#78716c;font-size:14px">We'll send you tracking info once your order ships (7-12 business days).</p>
          <p style="color:#78716c;font-size:14px">Questions? Reply to this email or contact support@deskvibe.com</p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0">
          <p style="color:#a8a29e;font-size:12px">DeskVibe — Premium Desk Accessories</p>
        </div>
      `,
    });
    console.log(`📧 Confirmation email sent to ${email}`);
  } catch (e: any) {
    console.error("Resend error:", e.message);
  }
}
