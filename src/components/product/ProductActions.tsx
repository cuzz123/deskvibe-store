"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useCartStore, useCartUIStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface ProductActionsProps {
  productId: number;
  productName: string;
  productSlug: string;
  images: string[];
  price: number;
  comparePrice?: number | null;
}

export function ProductActions({
  productId, productName, productSlug, images, price, comparePrice,
}: ProductActionsProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartUIStore((s) => s.openCart);
  const [quantity, setQuantity] = useState(1);
  const hasSale = comparePrice && comparePrice > price;
  const savings = hasSale ? comparePrice - price : 0;

  function handleAdd() {
    addItem({ id: productId, name: productName, slug: productSlug, image: images[0] || "", price }, quantity);
    toast.success(`${productName} added to cart!`);
    openCart();
  }

  return (
    <div>
      {/* Price */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold text-stone-900">{formatPrice(price)}</span>
        {hasSale && (
          <>
            <span className="text-xl text-stone-400 line-through">{formatPrice(comparePrice!)}</span>
            <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Save {formatPrice(savings)}
            </span>
          </>
        )}
      </div>

      {/* Quantity */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Quantity</p>
        <div className="flex items-center border border-stone-200 rounded-full w-fit">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 rounded-l-full" aria-label="Decrease quantity">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <button onClick={() => setQuantity(Math.min(99, quantity + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-stone-100 rounded-r-full" aria-label="Increase quantity">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <Button variant="primary" size="lg" className="w-full" onClick={handleAdd}>
          <ShoppingBag className="w-5 h-5 mr-2" />Add to Cart
        </Button>
      </div>
    </div>
  );
}
