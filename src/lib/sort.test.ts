import { describe, it, expect } from "vitest";

// Test the sort logic from CollectionContent
type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "newest";

interface SortProduct {
  id: number; price: number; rating: number;
}

function sortProducts(products: SortProduct[], key: SortKey): SortProduct[] {
  const sorted = [...products];
  switch (key) {
    case "price-asc": return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "rating": return sorted.sort((a, b) => b.rating - a.rating);
    case "newest": return sorted.sort((a, b) => b.id - a.id);
    default: return sorted;
  }
}

const products: SortProduct[] = [
  { id: 1, price: 49.99, rating: 4.5 },
  { id: 2, price: 79.99, rating: 4.9 },
  { id: 3, price: 29.99, rating: 4.2 },
];

describe("Product Sorting", () => {
  it("keeps default order", () => {
    const result = sortProducts(products, "default");
    expect(result[0].id).toBe(1);
    expect(result[2].id).toBe(3);
  });

  it("sorts by price ascending", () => {
    const result = sortProducts(products, "price-asc");
    expect(result[0].price).toBe(29.99);
    expect(result[2].price).toBe(79.99);
  });

  it("sorts by price descending", () => {
    const result = sortProducts(products, "price-desc");
    expect(result[0].price).toBe(79.99);
    expect(result[2].price).toBe(29.99);
  });

  it("sorts by rating", () => {
    const result = sortProducts(products, "rating");
    expect(result[0].rating).toBe(4.9);
    expect(result[2].rating).toBe(4.2);
  });

  it("sorts by newest (highest ID first)", () => {
    const result = sortProducts(products, "newest");
    expect(result[0].id).toBe(3);
    expect(result[2].id).toBe(1);
  });

  it("does not mutate original array", () => {
    const original = [...products];
    sortProducts(products, "price-asc");
    expect(products).toEqual(original);
  });
});
