"use client";

import { ArrowUpDown } from "lucide-react";

type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "newest";

interface Props {
  value: SortKey;
  onChange: (key: SortKey) => void;
}

export function SortToolbar({ value, onChange }: Props) {
  const options: { key: SortKey; label: string }[] = [
    { key: "default", label: "Featured" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
    { key: "rating", label: "Top Rated" },
    { key: "newest", label: "Newest" },
  ];

  return (
    <div className="flex items-center gap-2 mb-6">
      <ArrowUpDown className="w-4 h-4 text-stone-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="text-sm border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 bg-white"
      >
        {options.map((o) => (
          <option key={o.key} value={o.key}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
