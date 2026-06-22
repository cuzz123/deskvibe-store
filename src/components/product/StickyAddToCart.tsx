"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCartStore, useCartUIStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

interface StickyAddToCartProps {
  productId: number;
  productName: string;
  productSlug: string;
  image: string;
  price: number;
}

export function StickyAddToCart({
  productId,
  productName,
  productSlug,
  image,
  price,
}: StickyAddToCartProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartUIStore((s) => s.openCart);
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when hero image is no longer visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function handleAdd() {
    addItem(
      { id: productId, name: productName, slug: productSlug, image, price },
      1
    );
    toast.success(`${productName} added to cart!`);
    openCart();
  }

  return (
    <>
      {/* Sentinel element — placed at bottom of hero image area */}
      <div ref={sentinelRef} className="h-0 w-full pointer-events-none" aria-hidden="true" />

      {/* Sticky bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden transition-all duration-200 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2.5">
          {/* Thumbnail */}
          <div className="w-10 h-10 rounded-md overflow-hidden bg-stone-100 flex-shrink-0 relative">
            <Image
              src={image}
              alt={productName}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{productName}</p>
            <p className="text-sm font-bold text-stone-900">{formatPrice(price)}</p>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            className="flex-shrink-0 h-10 px-5 bg-stone-900 text-white rounded-full text-sm font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
