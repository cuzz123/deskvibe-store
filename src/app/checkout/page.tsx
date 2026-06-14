"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

function CheckoutContent() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);

  const shipping = subtotal() >= 75 ? 0 : 9.99;
  const total = subtotal() + shipping;

  if (items.length === 0 && !paid) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-stone-500 mb-6">Add some desk accessories to get started.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  if (paid) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-stone-500 mb-6">Thank you for your order. A confirmation email is on its way.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-stone-800 transition">Continue Shopping</Link>
      </div>
    );
  }

  async function createOrder() {
    const cartItems = items.map((i) => ({ name: i.product.name, price: i.product.price, quantity: i.quantity }));
    const resp = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cartItems }) });
    const data = await resp.json();
    if (data.error) { setError(data.error); return ""; }
    return data.orderID;
  }

  async function onApprove(data: { orderID: string }) {
    clearCart();
    setPaid(true);
    router.push("/checkout/success");
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

      <div className="border-t border-stone-200 pt-6 space-y-2 mb-6">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
        <div className="flex justify-between text-sm text-stone-500"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-stone-200"><span>Total</span><span>{formatPrice(total)}</span></div>
      </div>

      {error && <p className="text-sm text-red-600 text-center mb-4 bg-red-50 py-2 px-4 rounded-lg">{error}</p>}

      <PayPalButtons
        style={{ layout: "vertical", shape: "pill", color: "black" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => setError("Payment failed. Please try again.")}
      />
      <p className="text-xs text-stone-400 text-center mt-4">Secure payment via PayPal. Your card details are never shared with us.</p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
      <CheckoutContent />
    </PayPalScriptProvider>
  );
}
