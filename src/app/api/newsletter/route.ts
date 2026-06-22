import { NextRequest, NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/server/rate-limit";

export async function POST(request: NextRequest) {
  const rateLimitResponse = await applyRateLimit(request, { windowMs: 60_000, maxRequests: 5 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // If Resend configured, send welcome email
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "DeskVibe <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to DeskVibe — here's 10% off",
            html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px"><h2>Welcome to DeskVibe</h2><p>Thanks for subscribing. Here's 10% off your first order: <strong>WELCOME10</strong></p><a href="https://zenstone-store-weld.vercel.app" style="display:block;background:#1c1917;color:#fff;text-align:center;padding:16px;border-radius:30px;text-decoration:none;font-weight:bold;margin:24px 0">Shop Now</a></div>`,
          }),
        });
      } catch {}
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
