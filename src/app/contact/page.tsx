"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Mail, Loader2, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    };
    try {
      const resp = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await resp.json();
      if (result.error) { setError(result.error); } else { setSent(true); }
    } catch { setError("Network error. Please email support@deskvibe.com directly."); }
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <CheckCircle className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Message Sent!</h1>
        <p className="text-stone-500">We typically respond within 4 hours during business hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Contact Us</h1>
      <p className="text-stone-500 mb-8">Questions about a product, your order, or anything else? We&apos;re here.</p>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Name</label>
          <input type="text" required className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Email</label>
          <input type="email" required className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm" placeholder="you@email.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Message</label>
          <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm resize-none" placeholder="How can we help?" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-stone-900 text-white py-3.5 rounded-full font-bold hover:bg-stone-800 transition disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : <><Mail className="w-4 h-4" />Send Message</>}
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-stone-200 text-sm text-stone-500 space-y-1">
        <p>Or email us directly: <a href="mailto:support@deskvibe.com" className="text-indigo-600 font-semibold">support@deskvibe.com</a></p>
        <p>Response time: within 4 hours during business hours (CET).</p>
      </div>
    </div>
  );
}
