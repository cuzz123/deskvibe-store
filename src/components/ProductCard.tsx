"use client";

import Image from "next/image";
import { Product } from "@/lib/products";
import { useCartStore, useCartUIStore } from "@/lib/cart";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartUIStore((s) => s.openCart);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.imageUrl,
      price: product.price,
    });
    toast.success(`${product.name} added to cart`);
    openCart();
  }

  return (
    <div className="group bg-white border border-stone-100 rounded-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block aspect-square relative overflow-hidden bg-stone-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded ${product.badgeClass}`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); handleAdd(); }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 focus-visible:opacity-100 focus-visible:translate-x-0 transition-all hover:bg-stone-900 hover:text-white text-lg"
          aria-label={`Add ${product.name} to cart`}
        >
          +
        </button>
      </Link>

      <div className="p-4">
        <span className="text-[10px] uppercase tracking-[1px] text-indigo-600 font-bold">{product.category}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold mt-1 mb-1 text-stone-900 hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-stone-400 mb-3 leading-relaxed line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-stone-900">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-xs text-stone-400 line-through ml-1.5">{formatPrice(product.compareAt)}</span>
            )}
          </div>
          <StarRating rating={product.rating} size="sm" />
        </div>
      </div>
    </div>
  );
}
