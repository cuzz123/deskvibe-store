"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const [paid, setPaid] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const shipping = subtotal() >= 75 ? 0 : 9.99;
  const total = subtotal() + shipping;
  const paypalEmail = process.env.NEXT_PUBLIC_PAYPAL_EMAIL || "support@deskvibe.com";

  async function handleConfirmPayment() {
    setConfirming(true);
    try {
      await fetch("/api/order-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(i => ({ name: i.product.name, qty: i.quantity })), total }),
      });
      clearCart();
      setPaid(true);
      setShowConfirm(false);
    } catch {
      // Still mark as paid — user followed instructions
      clearCart();
      setPaid(true);
      setShowConfirm(false);
    }
    setConfirming(false);
  }

  if (items.length === 0 && !paid) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-stone-600 mb-6">Add some desk accessories to get started.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"><ArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
      </div>
    );
  }

  if (paid) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-stone-700" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Confirmed!</h1>
        <p className="text-stone-600 mb-6">We will send an order confirmation to your email within 24 hours.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-stone-800 transition">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
            <div className="w-16 h-16 rounded-md bg-stone-100 overflow-hidden flex-shrink-0 relative">
              <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.product.name}</h4>
              <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
            </div>
            <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-200 pt-6 space-y-2 mb-8">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
        <div className="flex justify-between text-sm text-stone-500"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-stone-200"><span>Total</span><span>{formatPrice(total)}</span></div>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-4">
        <h2 className="font-bold text-lg text-stone-900 mb-2">Pay with PayPal</h2>
        <ol className="text-sm text-stone-600 space-y-2 mb-4">
          <li>1. Open your PayPal app or paypal.com</li>
          <li>2. Send <strong>${total.toFixed(2)} USD</strong> to:</li>
        </ol>
        <div className="bg-white rounded-xl p-4 text-center mb-4 border border-stone-200">
          <p className="text-xs text-stone-500 mb-1">PayPal Email</p>
          <p className="text-xl font-bold text-stone-900 select-all">{paypalEmail}</p>
        </div>
        <ol className="text-sm text-stone-600 space-y-2" start={3}>
          <li>3. In the payment note, list your order items</li>
          <li>4. After sending payment, click the button below</li>
        </ol>
      </div>

      {!showConfirm ? (
        <button onClick={() => setShowConfirm(true)} className="w-full bg-stone-900 text-white py-4 rounded-full font-bold text-lg hover:bg-stone-800 transition">
          I have Completed the Payment
        </button>
      ) : (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-center">
          <p className="font-semibold mb-4 text-stone-900">Confirm your payment of {formatPrice(total)}?</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setShowConfirm(false)} className="px-6 py-2.5 rounded-full border border-stone-300 text-stone-600 font-semibold hover:bg-stone-100 transition">Cancel</button>
            <button onClick={handleConfirmPayment} disabled={confirming} className="px-6 py-2.5 rounded-full bg-stone-900 text-white font-semibold hover:bg-stone-800 transition disabled:opacity-50 flex items-center gap-2">
              {confirming && <Loader2 className="w-4 h-4 animate-spin" />}
              Yes, I Paid
            </button>
          </div>
        </div>
      )}
      <p className="text-xs text-stone-500 text-center mt-3">You will receive an order confirmation email within 24 hours.</p>
    </div>
  );
}
