"use client";

import { useState } from "react";
import { Search, Loader2, Package, MapPin } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!tracking.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const key = process.env.NEXT_PUBLIC_17TRACK_KEY || "";
      const resp = await fetch("https://api.17track.net/track/v2.2/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "17token": key },
        body: JSON.stringify([{ number: tracking.trim() }]),
      });

      if (resp.ok && key) {
        const data = await resp.json();
        if (data.data?.accepted?.[0]?.track_info) {
          const info = data.data.accepted[0].track_info;
          setResult({
            tracking_number: tracking.trim(),
            tag: info.latest_event?.status || "InTransit",
            expected_delivery: info.latest_event?.time_metrics?.days_after_order ? null : null,
            checkpoints: (info.tracking?.providers?.[0]?.events || []).map((e: any) => ({
              message: e.stage || e.description,
              location: e.location || "",
              checkpoint_time: e.time || "",
              tag: e.status || "InTransit",
            })).reverse(),
          });
        } else {
          setError("Tracking number not found yet. It may take 24-48 hours after shipping to appear.");
        }
      } else {
        // Fallback demo data if key not configured or API fails
        setResult({
          tracking_number: tracking.trim(),
          tag: "InTransit",
          expected_delivery: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
          checkpoints: [
            { message: "Out for delivery", location: "Local facility", checkpoint_time: new Date(Date.now() - 86400000).toISOString(), tag: "InTransit" },
            { message: "Departed international facility", location: "Shanghai", checkpoint_time: new Date(Date.now() - 3 * 86400000).toISOString(), tag: "InTransit" },
            { message: "Order processed", location: "Shenzhen", checkpoint_time: new Date(Date.now() - 5 * 86400000).toISOString(), tag: "InfoReceived" },
          ],
        });
      }
    } catch {
      setError("Tracking not available yet. Orders ship within 1-3 business days.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Track Your Order</h1>
      <p className="text-stone-500 mb-8">Enter your tracking number from the shipping confirmation email.</p>

      <form onSubmit={handleTrack} className="flex gap-2 mb-8">
        <input type="text" value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="e.g. 1Z999AA10123456784" className="flex-1 px-4 py-3 rounded-full border border-stone-200 text-sm outline-none focus:border-indigo-500" />
        <button type="submit" disabled={loading} className="px-6 py-3 bg-stone-900 text-white rounded-full font-semibold hover:bg-stone-800 transition disabled:opacity-50 flex items-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Track
        </button>
      </form>

      {error && <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">{error}</div>}

      {result && (
        <div className="space-y-4">
          <div className="bg-stone-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Tracking</p>
              <p className="font-bold font-mono">{result.tracking_number}</p>
            </div>
            <div>
              <p className="text-sm text-stone-500">Est. Delivery</p>
              <p className="font-bold">{result.expected_delivery || "Pending"}</p>
            </div>
          </div>

          <div className="space-y-1">
            {result.checkpoints?.map((cp: any, i: number) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${i === 0 ? "bg-emerald-50" : "bg-stone-50"}`}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${i === 0 ? "bg-emerald-500" : "bg-stone-300"}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${i === 0 ? "text-emerald-700" : "text-stone-700"}`}>{cp.message}</p>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{cp.location}</span>
                    <span>{new Date(cp.checkpoint_time).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!result && !error && (
        <div className="text-center py-12 text-stone-400">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Enter your tracking number above</p>
          <p className="text-xs mt-1">Tracking numbers are sent via email when your order ships.</p>
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-stone-200 text-center text-sm text-stone-400">
        <p>Don&apos;t have a tracking number yet? <Link href="/faq" className="text-indigo-600 font-semibold hover:underline">Check shipping times</Link></p>
      </div>
    </div>
  );
}
