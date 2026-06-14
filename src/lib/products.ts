export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  compareAt: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  badgeClass: string;
  imagePrompt: string;
  imageUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Walnut Monitor Riser",
    slug: "walnut-monitor-riser",
    category: "Monitor Stand",
    description: "Solid FSC-certified walnut wood. Hidden storage drawer for dongles, pens, and cables. Cable cutout for clean routing.",
    price: 49.99,
    compareAt: 69.99,
    rating: 4.9,
    reviews: 847,
    badge: "Bestseller",
    badgeClass: "bg-stone-900 text-white",
    imagePrompt: "professional product photography of a solid walnut wood monitor stand riser on a clean minimal desk, warm wood grain texture, hidden drawer slightly open showing pens, cable cutout, natural light from window, 8k, e-commerce white background",
    imageUrl: "/images/product-1.jpg",
  },
  {
    id: 2,
    name: "Magnetic Cable Organizer",
    slug: "magnetic-cable-organizer",
    category: "Cable Management",
    description: "Modular magnetic clips for under-desk and on-desk cable routing. 8-piece set. No tools, no drilling, reposition in seconds.",
    price: 29.99,
    compareAt: null,
    rating: 4.8,
    reviews: 623,
    badge: null,
    badgeClass: "",
    imagePrompt: "professional product photography of magnetic cable management clips on a clean white desk, black minimalist clips holding USB cables neatly, organized, under-desk view, 8k, e-commerce clean",
    imageUrl: "/images/product-2.jpg",
  },
  {
    id: 3,
    name: "Linen Desk Mat — Slate Blue",
    slug: "linen-desk-mat",
    category: "Desk Mat",
    description: "Premium linen surface with natural rubber base. 90×40cm. Water-resistant coating. Available in Slate Blue and Warm Taupe.",
    price: 34.99,
    compareAt: null,
    rating: 4.7,
    reviews: 512,
    badge: null,
    badgeClass: "",
    imagePrompt: "professional product photography of a slate blue linen desk mat on a wooden desk, premium texture, keyboard and mouse placed on it, warm minimal aesthetic, natural lighting, 8k, e-commerce clean",
    imageUrl: "/images/product-3.jpg",
  },
  {
    id: 4,
    name: "LED Monitor Light Bar",
    slug: "led-monitor-light-bar",
    category: "Lighting",
    description: "Asymmetric optical design — zero screen glare. 3 color temperatures, stepless dimming. USB-C powered. Fits any monitor.",
    price: 49.99,
    compareAt: 64.99,
    rating: 4.6,
    reviews: 389,
    badge: "Sale",
    badgeClass: "bg-red-600 text-white",
    imagePrompt: "professional product photography of a sleek LED monitor light bar mounted on top of a display, warm glow illuminating the desk below, asymmetric light design, modern workspace, 8k, e-commerce clean",
    imageUrl: "/images/product-4.jpg",
  },
  {
    id: 5,
    name: "Aluminum Laptop Stand",
    slug: "aluminum-laptop-stand",
    category: "Monitor Stand",
    description: "Aerospace-grade matte aluminum. Adjustable height and angle. Anti-slip silicone pads. Fits all laptops 11–17 inch.",
    price: 79.99,
    compareAt: 99.99,
    rating: 4.8,
    reviews: 723,
    badge: "Popular",
    badgeClass: "bg-emerald-600 text-white",
    imagePrompt: "professional product photography of a matte aluminum laptop stand on a clean desk, MacBook placed on it at ergonomic height, sleek modern design, natural light, 8k, e-commerce clean",
    imageUrl: "/images/product-5.jpg",
  },
  {
    id: 6,
    name: "Complete Desk Makeover Kit",
    slug: "desk-makeover-kit",
    category: "Bundle",
    description: "All 4 essentials in one box: Walnut Riser, Cable Organizer, Linen Desk Mat, and LED Light Bar. Save 25% vs buying individually.",
    price: 129.99,
    compareAt: 164.96,
    rating: 4.9,
    reviews: 312,
    badge: "Best Value",
    badgeClass: "bg-stone-900 text-white",
    imagePrompt: "professional product photography flat lay of desk accessories bundle on a wooden surface, walnut monitor stand, linen desk mat, cable organizer clips, LED light bar, all arranged elegantly, warm minimal, 8k, e-commerce",
    imageUrl: "/images/product-6.jpg",
  },
  {
    id: 7,
    name: "Ceramic Desk Planter",
    slug: "ceramic-desk-planter",
    category: "Decor",
    description: "Matte white ceramic with drainage hole and bamboo tray. Brings life to any desk setup. Pairs perfectly with a trailing pothos.",
    price: 29.99,
    compareAt: null,
    rating: 4.7,
    reviews: 278,
    badge: null,
    badgeClass: "",
    imagePrompt: "professional product photography of a matte white ceramic desk planter with a small green plant on a minimal desk, bamboo tray underneath, warm natural light, calming workspace, 8k, e-commerce clean",
    imageUrl: "/images/product-7.jpg",
  },
  {
    id: 8,
    name: "Dual Monitor Arm — Matte Black",
    slug: "dual-monitor-arm",
    category: "Monitor Stand",
    description: "Gas-spring arms for 13–32 inch screens. Integrated cable channels. Frees up 40% more desk space. C-clamp and grommet mount included.",
    price: 129.99,
    compareAt: 169.99,
    rating: 4.8,
    reviews: 456,
    badge: null,
    badgeClass: "",
    imagePrompt: "professional product photography of a matte black dual monitor arm holding two displays on a clean minimal desk, floating screen effect, cable channels hidden, modern workspace, 8k, e-commerce clean",
    imageUrl: "/images/product-8.jpg",
  },
];

export const SLIDES = [
  {
    tag: "New Collection",
    title: "Your Desk Deserves Better",
    description: "Premium desk accessories designed for the modern workspace. Warm minimalism meets functional beauty.",
    cta: "Shop Monitor Stands",
    href: "/products/walnut-monitor-riser",
    imagePrompt: "beautiful warm minimal desk setup with walnut monitor stand, linen desk mat, clean aesthetic, natural window light, cozy workspace, lifestyle photography, 8k",
  },
  {
    tag: "Most Popular",
    title: "Zero Clutter. Full Focus.",
    description: "Magnetic cable management that takes 60 seconds to install. No tools, no drilling, no visible wires.",
    cta: "Shop Cable Management",
    href: "/products/magnetic-cable-organizer",
    imagePrompt: "clean desk setup with invisible cable management, no visible wires, minimal aesthetic, modern workspace, before and after transformation, lifestyle photography, 8k",
  },
  {
    tag: "Bundle & Save",
    title: "The Complete Transformation",
    description: "Get the Desk Makeover Kit — all 4 essentials in one box. Save 25% and transform your workspace this weekend.",
    cta: "Shop the Bundle",
    href: "/products/desk-makeover-kit",
    imagePrompt: "complete desk transformation before and after, messy desk becoming clean organized aesthetic workspace, all desk accessories visible, warm lighting, lifestyle photography, 8k",
  },
];

export const CATEGORIES = [
  { name: "Monitor Stands", slug: "monitor-stands", color: "from-stone-800 to-stone-600", imageKey: "collection-protection" },
  { name: "Cable Management", slug: "cable-management", color: "from-slate-600 to-slate-400", imageKey: "collection-love" },
  { name: "Desk Mats", slug: "desk-mats", color: "from-blue-400 to-slate-400", imageKey: "collection-anxiety" },
  { name: "Lighting", slug: "lighting", color: "from-amber-400 to-amber-200", imageKey: "collection-wealth" },
];
