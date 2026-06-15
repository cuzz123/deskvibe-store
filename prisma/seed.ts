// Seed database with 75 DeskVibe products + admin user
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { PRODUCTS } from "../src/lib/products";

const db = new PrismaClient();

async function main() {
  // Create admin user (admin@deskvibe.com / admin123)
  const adminPassword = await hash("admin123", 12);
  await db.user.upsert({
    where: { email: "admin@deskvibe.com" },
    update: {},
    create: { email: "admin@deskvibe.com", password: adminPassword, name: "Admin", role: "ADMIN" },
  });
  console.log("Admin user created: admin@deskvibe.com / admin123");

  // Seed products
  for (const p of PRODUCTS) {
    await db.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id, name: p.name, slug: p.slug, category: p.category,
        description: p.description, price: p.price, compareAt: p.compareAt,
        rating: p.rating, reviews: p.reviews, badge: p.badge, badgeClass: p.badgeClass,
        imagePrompt: (p as any).imagePrompt || "", imageUrl: p.imageUrl, isActive: true,
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products`);
}

main().then(() => db.$disconnect()).catch((e) => { console.error(e); db.$disconnect(); process.exit(1); });
