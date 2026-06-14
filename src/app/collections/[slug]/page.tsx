import { notFound } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "Not Found" };
  return { title: `${cat.name} — DeskVibe`, description: `Premium ${cat.name.toLowerCase()} for the modern workspace.` };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const categoryMap: Record<string, string> = {
    "monitor-stands": "Monitor Stand",
    "cable-management": "Cable Management",
    "desk-mats": "Desk Mat",
    lighting: "Lighting",
  };
  const targetCategory = categoryMap[slug] || cat.name;
  const filtered = PRODUCTS.filter((p) => p.category === targetCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Link href="/" className="text-sm text-stone-400 hover:text-stone-700 mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{cat.name}</h1>
      <p className="text-stone-500 mb-8">Premium {cat.name.toLowerCase()} designed for the modern workspace.</p>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="text-stone-400 py-20 text-center">No products in this category yet. Check back soon.</p>
      )}
    </div>
  );
}
