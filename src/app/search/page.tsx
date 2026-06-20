"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.length < 2) { setResults([]); setError(""); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const resp = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!resp.ok) throw new Error("Search failed");
        setResults(await resp.json());
      } catch {
        setError("Search is temporarily unavailable. Please try again.");
        setResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 75 products..."
          autoFocus
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 text-lg outline-none focus:border-indigo-500"
          aria-label="Search products"
        />
        {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-stone-500" aria-label="Searching" />}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 rounded-lg p-4 mb-4" role="alert">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div aria-live="polite" aria-atomic="true">
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((p: any) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="flex gap-3 p-3 rounded-xl border border-stone-200 hover:border-indigo-300 hover:shadow-sm transition-all">
                <Image src={p.imageUrl} alt={p.name} width={80} height={80} className="rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold truncate">{p.name}</h3>
                  <p className="text-xs text-stone-500">{p.category}</p>
                  <p className="text-sm font-bold mt-1">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.length >= 2 && !loading && !error && results.length === 0 && (
          <div className="text-center py-16 text-stone-500">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p>No products found for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}
