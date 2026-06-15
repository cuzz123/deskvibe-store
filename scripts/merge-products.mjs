import fs from "fs";

const existing = fs.readFileSync("src/lib/products.ts", "utf8");
const newProds = JSON.parse(fs.readFileSync("scripts/new-products.json", "utf8"));

const marker = 'imageUrl:"/images/product-40.jpg"}';
const idx = existing.lastIndexOf(marker) + marker.length;
const before = existing.slice(0, idx);
const after = existing.slice(idx);

const lines = newProds.map(p => {
  const b = p.badge ? `"${p.badge}"` : "null";
  return `,
  { id:${p.id}, name:"${p.name}", slug:"${p.slug}", category:"${p.category}",
    description:"${p.description}", price:${p.price}, compareAt:${p.compareAt}, rating:${p.rating}, reviews:${p.reviews}, badge:${b}, badgeClass:"${p.badgeClass}",
    imagePrompt:"${p.imagePrompt}", imageUrl:"${p.imageUrl}" }`;
});

const final = before + lines.join("") + after;
fs.writeFileSync("src/lib/products.ts", final);
console.log(`Merged ${newProds.length} products. Total: ${final.split("\n").length} lines`);
