"use client";

import Image from "next/image";
import { useCartStore, useCartUIStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartUIStore((s) => s.isOpen);
  const closeCart = useCartUIStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/35 z-50 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-[92vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        inert={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <h3 className="font-bold text-lg">Cart ({itemCount()})</h3>
          <button onClick={closeCart} className="text-stone-400 hover:text-stone-900" aria-label="Close cart"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
              <ShoppingBag className="w-10 h-10 opacity-30" />
              <p className="font-medium text-stone-600">Your cart is empty</p>
              <button onClick={closeCart} className="text-sm underline">Continue shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 py-3 border-b border-stone-100">
                <div className="w-16 h-16 rounded-md flex-shrink-0 bg-stone-100 overflow-hidden relative">
                  <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{item.product.name}</h4>
                  <p className="text-sm font-bold mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 border border-stone-200 rounded-full">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 rounded-full"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-semibold min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 rounded-full"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-stone-200">
            <div className="flex justify-between font-bold text-lg mb-1">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>
            <p className="text-xs text-indigo-600 mb-3">
              {subtotal() >= 75 ? "Free Shipping!" : `Add ${formatPrice(75 - subtotal())} for free shipping`}
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-stone-900 text-white text-center py-3.5 rounded-full font-bold hover:bg-stone-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
