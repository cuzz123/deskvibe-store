import { notFound } from "next/navigation";
import { PRODUCTS, CATEGORIES, categoryMap } from "@/lib/products";
import Link from "next/link";
import type { Metadata } from "next";
import { CollectionContent } from "./CollectionContent";

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

  const targetCategory = categoryMap[slug] || cat.name;
  const filtered = PRODUCTS.filter((p) => p.category === targetCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Link href="/" className="text-sm text-stone-400 hover:text-stone-700 mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold tracking-tight mb-2">{cat.name}</h1>
      <p className="text-stone-500 mb-8">Premium {cat.name.toLowerCase()} designed for the modern workspace.</p>
      <CollectionContent products={filtered} />
    </div>
  );
}
