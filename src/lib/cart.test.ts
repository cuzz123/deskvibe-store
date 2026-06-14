import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore, useCartUIStore } from "@/lib/cart";

// Reset stores before each test
beforeEach(() => {
  useCartStore.setState({ items: [] });
  useCartUIStore.setState({ isOpen: false });
});

describe("Cart Store", () => {
  const product = { id: 1, name: "Walnut Monitor Riser", slug: "walnut-monitor-riser", image: "/images/product-1.jpg", price: 49.99 };

  it("starts with empty cart", () => {
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().itemCount()).toBe(0);
    expect(useCartStore.getState().subtotal()).toBe(0);
  });

  it("adds an item to cart", () => {
    useCartStore.getState().addItem(product);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
    expect(useCartStore.getState().itemCount()).toBe(1);
  });

  it("increments quantity when adding same item", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    expect(useCartStore.getState().itemCount()).toBe(2);
  });

  it("adds different items separately", () => {
    const product2 = { ...product, id: 2, name: "Magnetic Cable Organizer" };
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem(product2);
    expect(useCartStore.getState().items).toHaveLength(2);
    expect(useCartStore.getState().itemCount()).toBe(2);
  });

  it("removes an item", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().removeItem(1);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updates quantity", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().updateQuantity(1, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("removes item when quantity becomes 0", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().updateQuantity(1, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates subtotal correctly", () => {
    useCartStore.getState().addItem(product, 3);
    expect(useCartStore.getState().subtotal()).toBeCloseTo(149.97, 2);
  });

  it("clears cart", () => {
    useCartStore.getState().addItem(product);
    useCartStore.getState().addItem({ ...product, id: 2 });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("adds item with custom quantity", () => {
    useCartStore.getState().addItem(product, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });
});

describe("Cart UI Store", () => {
  it("starts closed", () => {
    expect(useCartUIStore.getState().isOpen).toBe(false);
  });

  it("toggles open/close", () => {
    useCartUIStore.getState().openCart();
    expect(useCartUIStore.getState().isOpen).toBe(true);
    useCartUIStore.getState().closeCart();
    expect(useCartUIStore.getState().isOpen).toBe(false);
  });

  it("toggle switches state", () => {
    expect(useCartUIStore.getState().isOpen).toBe(false);
    useCartUIStore.getState().toggleCart();
    expect(useCartUIStore.getState().isOpen).toBe(true);
    useCartUIStore.getState().toggleCart();
    expect(useCartUIStore.getState().isOpen).toBe(false);
  });
});
