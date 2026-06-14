"use client";

import { useCartStore, useCartUIStore } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const itemCount = useCartStore((s) => s.itemCount);
  const openCart = useCartUIStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="bg-stone-900 text-stone-300 text-center text-xs tracking-wide py-2.5">
        Free Shipping Over $75 · 30-Day Trial ·{" "}
        <Link href="/products/desk-makeover-kit" className="text-stone-100 underline underline-offset-2">
          Shop the Complete Kit
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-stone-900">
          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
            <rect x="3" y="3" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="2" />
            <rect x="8" y="8" width="12" height="4" rx="1" fill="#6366f1" />
            <rect x="8" y="16" width="8" height="4" rx="1" fill="#818cf8" />
          </svg>
          DeskVibe
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-500" aria-label="Main navigation">
          <Link href="/collections/monitor-stands" className="hover:text-stone-900 transition-colors">Monitor Stands</Link>
          <Link href="/collections/cable-management" className="hover:text-stone-900 transition-colors">Cable Management</Link>
          <Link href="/collections/desk-mats" className="hover:text-stone-900 transition-colors">Desk Mats</Link>
          <Link href="/collections/lighting" className="hover:text-stone-900 transition-colors">Lighting</Link>
          <Link href="/products/desk-makeover-kit" className="hover:text-stone-900 transition-colors">Bundle</Link>
        </nav>

        <button onClick={openCart} className="relative p-2 text-stone-700 hover:text-stone-900" aria-label={`Shopping cart, ${itemCount()} items`}>
          <ShoppingCart className="w-5 h-5" />
          {itemCount() > 0 && (
            <span className="absolute -top-0.5 -right-1 bg-stone-900 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
              {itemCount()}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
