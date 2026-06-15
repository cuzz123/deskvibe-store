import fs from "fs";
const existing = fs.readFileSync("src/lib/products.ts", "utf8");
const newProds = JSON.parse(fs.readFileSync("scripts/new-products.json", "utf8"));
const marker = 'imageUrl:"/images/product-40.jpg"}';
const idx = existing.lastIndexOf(marker);
if (idx < 0) { console.log("MARKER NOT FOUND"); process.exit(1); }
const end = idx + marker.length;
const before = existing.slice(0, end);
const after = existing.slice(end);
const entries = newProds.map(p => {
  const b = p.badge ? JSON.stringify(p.badge) : "null";
  return `,\n  { id:${p.id}, name:${JSON.stringify(p.name)}, slug:${JSON.stringify(p.slug)}, category:${JSON.stringify(p.category)},\n    description:${JSON.stringify(p.description)}, price:${p.price}, compareAt:${p.compareAt}, rating:${p.rating}, reviews:${p.reviews}, badge:${b}, badgeClass:${JSON.stringify(p.badgeClass)},\n    imagePrompt:${JSON.stringify(p.imagePrompt)}, imageUrl:${JSON.stringify(p.imageUrl)} }`;
}).join("");
fs.writeFileSync("src/lib/products.ts", before + entries + after);
console.log("Merged", newProds.length, "products");
