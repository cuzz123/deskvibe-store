// Upload all product images to Vercel Blob and update products.ts
// Usage: npx tsx scripts/upload-blob.ts
import { put } from "@vercel/blob";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { PRODUCTS } from "../src/lib/products";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
  console.error("Get it from: https://vercel.com → deskvibe-store → Storage → Blob");
  process.exit(1);
}

async function uploadAll() {
  let success = 0;
  let failed = 0;
  const updates: Record<number, string> = {};

  for (const product of PRODUCTS) {
    const localPath = resolve(`public/${product.imageUrl}`);
    if (!existsSync(localPath)) {
      console.log(`[${product.id}] ⏭️  No local image: ${localPath}`);
      continue;
    }

    console.log(`[${product.id}] Uploading ${product.name}...`);
    try {
      const file = readFileSync(localPath);
      const blob = await put(`products/${product.slug}.jpg`, file, {
        access: "public",
        contentType: "image/jpeg",
      });
      updates[product.id] = blob.url;
      console.log(`        ✅ ${blob.url.slice(0, 60)}...`);
      success++;
    } catch (e: any) {
      console.log(`        ❌ ${e.message}`);
      failed++;
    }
  }

  // Print the updates map for products.ts
  console.log(`\n=== Done: ${success} uploaded, ${failed} failed ===\n`);
  console.log("Copy these URLs into products.ts imageUrl fields:\n");
  for (const [id, url] of Object.entries(updates)) {
    console.log(`  ${id}: "${url}",`);
  }
}

uploadAll();
