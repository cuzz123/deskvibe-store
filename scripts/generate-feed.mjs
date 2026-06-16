// Generate Google Merchant Center product feed (TSV format)
// Usage: node scripts/generate-feed.mjs > public/google-feed.tsv
import { PRODUCTS } from "../src/lib/products.js";

const BASE = "https://zenstone-store-weld.vercel.app";

// Google Shopping required fields (TSV)
const header = [
  "id", "title", "description", "link", "image_link", "price",
  "availability", "condition", "brand", "google_product_category",
  "shipping", "identifier_exists",
].join("\t");

const rows = PRODUCTS.map((p) => {
  const fields = [
    `DV-${String(p.id).padStart(3, "0")}`,
    p.name + " — DeskVibe",
    p.description.slice(0, 500),
    `${BASE}/products/${p.slug}`,
    `${BASE}${p.imageUrl}`,
    `${p.price} USD`,
    "in_stock",
    "new",
    "DeskVibe",
    "Home & Garden > Furniture > Office Furniture > Desk Accessories",
    `US:::${p.price >= 75 ? "0.00 USD" : "9.99 USD"}`,
    "no",
  ];
  return fields.join("\t");
});

console.log(header);
rows.forEach((r) => console.log(r));
console.error(`\nGenerated ${rows.length} product entries for Google Merchant Center`);
