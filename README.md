# DeskVibe — Premium Desk Accessories Store

E-commerce store for premium desk accessories. 75 SKUs, 8 categories, fully functional cart, user accounts, and admin panel.

**Live**: https://zenstone-store-weld.vercel.app

## Quick Start

```bash
npm install
cp .env.example .env.local
npx prisma db push && npx prisma generate
npx tsx prisma/seed.ts
npm run dev
```

## Tech

Next.js 16 · Tailwind 4 · TypeScript · Prisma · NeonDB · NextAuth · PayPal · Resend · 17TRACK · GA4 · Agnes AI

## Tests

```bash
npx vitest run        # 32 unit tests
npx playwright test   # 44 E2E tests
```
