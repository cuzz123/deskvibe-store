"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCartStore, useCartUIStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, X, ShoppingBag, Mail } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartUIStore((s) => s.isOpen);
  const closeCart = useCartUIStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);
  const itemCount = useCartStore((s) => s.itemCount);
  const [showSave, setShowSave] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");
  const [saved, setSaved] = useState(false);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function handleClose() {
    if (items.length > 0 && !saved) {
      setShowSave(true);
    } else {
      closeCart();
      setShowSave(false);
    }
  }

  async function handleSave() {
    if (!saveEmail) return;
    try {
      await fetch("/api/save-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: saveEmail,
          items: items.map((i) => ({ name: i.product.name, price: i.product.price, qty: i.quantity, slug: i.product.slug })),
        }),
      });
    } catch { /* silent — best effort save */ }
    setSaved(true);
    setShowSave(false);
    setTimeout(() => { closeCart(); setSaved(false); }, 1200);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/35 z-50 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-[92vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        inert={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <h3 className="font-bold text-lg">Cart ({itemCount()})</h3>
          <button onClick={handleClose} className="text-stone-500 hover:text-stone-900 transition-colors" aria-label="Close cart"><X className="w-5 h-5" /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-500 gap-2">
              <ShoppingBag className="w-10 h-10 opacity-30" aria-hidden="true" />
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
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 rounded-full" aria-label="Decrease quantity"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-semibold min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 rounded-full" aria-label="Increase quantity"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-xs text-stone-500 hover:text-red-600 transition-colors" aria-label={`Remove ${item.product.name} from cart`}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Save Cart Prompt */}
          {showSave && !saved && (
            <div className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl mt-3">
              <p className="text-sm font-semibold text-stone-900 mb-1">Save your cart?</p>
              <p className="text-xs text-stone-500 mb-3">We&apos;ll email you a link to pick up where you left off.</p>
              <div className="flex gap-2">
                <input type="email" value={saveEmail} onChange={(e) => setSaveEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-sm outline-none focus:border-indigo-500" />
                <button onClick={handleSave} className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Send</button>
              </div>
              <button onClick={() => { closeCart(); setShowSave(false); }} className="text-xs text-stone-500 mt-2 hover:underline">No thanks</button>
            </div>
          )}
          {saved && (
            <div className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl mt-3 text-center text-sm text-stone-700 font-semibold">Check your inbox!</div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-stone-200">
            <div className="flex justify-between font-bold text-lg mb-1">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal())}</span>
            </div>

            {/* ── Free Shipping Progress Bar ── */}
            {(() => {
              const THRESHOLD = 75;
              const current = subtotal();
              const progress = Math.min(current / THRESHOLD * 100, 100);
              const remaining = THRESHOLD - current;
              const unlocked = current >= THRESHOLD;

              return (
                <div className="mb-4">
                  {/* Bar track */}
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        unlocked
                          ? "bg-emerald-500"
                          : progress >= 65
                          ? "bg-indigo-500"
                          : "bg-stone-400"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {/* Label */}
                  <p className={`text-xs font-medium transition-colors duration-300 ${unlocked ? "text-emerald-600" : "text-stone-500"}`}>
                    {unlocked
                      ? "Free shipping unlocked!"
                      : `${formatPrice(remaining)} away from free shipping`}
                  </p>
                </div>
              );
            })()}

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
