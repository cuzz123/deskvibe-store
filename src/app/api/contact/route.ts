import { NextRequest, NextResponse } from "next/server";
import { applyRateLimit } from "@/lib/server/rate-limit";

export async function POST(request: NextRequest) {
  const rateLimitResponse = applyRateLimit(request, { windowMs: 60_000, maxRequests: 3 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { name, email, message } = await request.json();

    // Validation
    const errors: string[] = [];
    if (!name || typeof name !== "string" || name.trim().length < 2) errors.push("Name must be at least 2 characters");
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required");
    if (!message || typeof message !== "string" || message.trim().length < 10) errors.push("Message must be at least 10 characters");
    if (name?.length > 100) errors.push("Name too long");
    if (message?.length > 5000) errors.push("Message too long");

    if (errors.length > 0) return NextResponse.json({ error: errors.join(". ") }, { status: 400 });

    // If Resend is configured, send notification email
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "DeskVibe Contact <onboarding@resend.dev>",
            to: "1709658792@qq.com",
            subject: `Contact: ${name} — ${email}`,
            html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
          }),
        });
      } catch {}
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
