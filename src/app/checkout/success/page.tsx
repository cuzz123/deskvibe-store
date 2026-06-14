"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-stone-500 mb-8">
        Thank you for your purchase. A confirmation email is on its way. Your desk is about to get a serious upgrade.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-stone-800 transition"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
