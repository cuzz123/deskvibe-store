"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const resp = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await resp.json();
      if (data.error) { setError(data.error); setStatus("idle"); }
      else setStatus("done");
    } catch { setError("Network error. Please try again."); setStatus("idle"); }
  }

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-stone-900 rounded-2xl py-14 px-6 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Get 10% Off Your First Order</h2>
          <p className="text-stone-300 mb-6">Desk inspiration, product drops, and exclusive deals — no spam, ever.</p>

          {status === "done" ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle className="w-5 h-5" /> Subscribed! Check your inbox for 10% off.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-stone-700 text-white placeholder:text-stone-400 outline-none focus:border-indigo-500" />
              <button type="submit" disabled={status === "loading"} className="px-8 py-3.5 rounded-full bg-white text-stone-900 font-bold hover:bg-indigo-600 hover:text-white transition whitespace-nowrap disabled:opacity-50">
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin inline" /> : "Subscribe & Save"}
              </button>
            </form>
          )}
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      </div>
    </section>
  );
}
