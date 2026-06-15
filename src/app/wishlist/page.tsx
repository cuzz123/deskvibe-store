"use client";

import { useWishlistStore } from "@/lib/wishlist";
import { useCartStore, useCartUIStore } from "@/lib/cart";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartUIStore((s) => s.openCart);

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <Heart className="w-12 h-12 mx-auto text-stone-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-stone-500 mb-6">Save items you love for later.</p>
        <Link href="/" className="text-indigo-600 font-semibold hover:underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Wishlist ({items.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-stone-200">
            <Link href={`/products/${item.slug}`} className="flex-shrink-0">
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg object-cover" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/products/${item.slug}`}><h3 className="text-sm font-semibold truncate hover:text-indigo-600">{item.name}</h3></Link>
              <p className="text-sm font-bold mt-1">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => {
                  addItem({ id: Number(item.id), name: item.name, slug: item.slug, image: item.image, price: item.price });
                  toast.success("Added to cart");
                  openCart();
                }} className="px-3 py-1.5 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />Add
                </button>
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-stone-400 hover:text-red-500 transition"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
