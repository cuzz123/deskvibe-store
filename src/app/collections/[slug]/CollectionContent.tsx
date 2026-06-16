"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { SortToolbar } from "@/components/collection/SortToolbar";

type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "newest";

function sortProducts(products: Product[], key: SortKey): Product[] {
  const sorted = [...products];
  switch (key) {
    case "price-asc": return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "rating": return sorted.sort((a, b) => b.rating - a.rating);
    case "newest": return sorted.sort((a, b) => b.id - a.id); // higher ID = newer
    default: return sorted;
  }
}

export function CollectionContent({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = sortProducts(products, sort);

  if (products.length === 0) {
    return <p className="text-stone-400 py-20 text-center">No products in this category yet. Check back soon.</p>;
  }

  return (
    <>
      <SortToolbar value={sort} onChange={setSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
