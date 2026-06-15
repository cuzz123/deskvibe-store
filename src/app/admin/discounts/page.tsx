"use client";

import { useState, useEffect } from "react";
import { Tag, Loader2 } from "lucide-react";

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [value, setValue] = useState(10);
  const [minAmount, setMinAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const resp = await fetch("/api/admin/discounts");
    setDiscounts(await resp.json());
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.toUpperCase(), type, value: Number(value), minAmount: minAmount ? Number(minAmount) : null }),
    });
    setCode(""); setValue(10); setMinAmount(""); setLoading(false);
    load();
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Discount Codes</h2>

      <form onSubmit={create} className="flex gap-2 mb-6 flex-wrap">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="CODE" required className="px-3 py-2 rounded-lg border border-stone-200 text-sm w-24 uppercase" />
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="px-3 py-2 rounded-lg border border-stone-200 text-sm">
          <option value="PERCENTAGE">%</option>
          <option value="FIXED">$</option>
        </select>
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="px-3 py-2 rounded-lg border border-stone-200 text-sm w-20" />
        <input value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="Min $" className="px-3 py-2 rounded-lg border border-stone-200 text-sm w-20" />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition flex items-center gap-1.5">
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Tag className="w-3.5 h-3.5" />} Create
        </button>
      </form>

      <div className="space-y-2">
        {discounts.map((d: any) => (
          <div key={d.id} className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-lg text-sm">
            <div className="flex items-center gap-3">
              <span className="font-bold font-mono">{d.code}</span>
              <span className="text-stone-500">{d.type === "PERCENTAGE" ? `${d.value}%` : `$${d.value}`}{d.minAmount ? ` (min $${d.minAmount})` : ""}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${d.isActive ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>{d.isActive ? "Active" : "Inactive"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
