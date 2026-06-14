export interface Product {
  id: number; name: string; slug: string; category: string;
  description: string; price: number; compareAt: number | null;
  rating: number; reviews: number; badge: string | null; badgeClass: string;
  imagePrompt: string; imageUrl: string;
}

export const PRODUCTS: Product[] = [
  // ── Monitor Stands (4) ──
  { id:1, name:"Walnut Monitor Riser", slug:"walnut-monitor-riser", category:"Monitor Stand",
    description:"Solid FSC-certified walnut wood. Hidden storage drawer. Cable cutout for clean routing. Supports up to 50 lbs.", price:49.99, compareAt:69.99, rating:4.9, reviews:847, badge:"Bestseller", badgeClass:"bg-stone-900 text-white",
    imagePrompt:"professional product photography of a solid walnut wood monitor stand riser on a clean white desk, warm wood grain, hidden drawer slightly open, cable cutout, natural light, 8k e-commerce",
    imageUrl:"/images/product-1.jpg" },
  { id:2, name:"Aluminum Laptop Stand", slug:"aluminum-laptop-stand", category:"Monitor Stand",
    description:"Aerospace-grade matte aluminum. Adjustable height and angle. Anti-slip silicone pads. Fits 11–17\".", price:79.99, compareAt:99.99, rating:4.8, reviews:723, badge:"Popular", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photography of a matte aluminum laptop stand on a clean desk, MacBook on it at ergonomic height, sleek modern, 8k e-commerce",
    imageUrl:"/images/product-2.jpg" },
  { id:3, name:"Dual Monitor Arm — Matte Black", slug:"dual-monitor-arm", category:"Monitor Stand",
    description:"Gas-spring arms for 13–32\" screens. Integrated cable channels. C-clamp & grommet mount.", price:129.99, compareAt:169.99, rating:4.8, reviews:456, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a matte black dual monitor arm holding two displays, floating screen effect, clean desk, 8k e-commerce",
    imageUrl:"/images/product-3.jpg" },
  { id:4, name:"Single Monitor Arm — White", slug:"single-monitor-arm-white", category:"Monitor Stand",
    description:"Gas-spring arm for 13–32\" screens. 360° rotation. USB pass-through. Clean white finish.", price:79.99, compareAt:null, rating:4.7, reviews:312, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a single white monitor arm on a clean desk, one display floating, minimal, 8k e-commerce",
    imageUrl:"/images/product-4.jpg" },

  // ── Cable Management (3) ──
  { id:5, name:"Magnetic Cable Organizer (8-Pack)", slug:"magnetic-cable-organizer", category:"Cable Management",
    description:"Modular magnetic clips for under-desk and on-desk routing. No tools, no drilling. Holds up to 8 cables each.", price:29.99, compareAt:null, rating:4.8, reviews:623, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of magnetic cable clips holding USB-C cables neatly on a desk, organized, modern, 8k e-commerce",
    imageUrl:"/images/product-5.jpg" },
  { id:6, name:"Under-Desk Cable Tray — Steel", slug:"under-desk-cable-tray", category:"Cable Management",
    description:"Powder-coated steel. Clamp or screw mount. Ventilated. Holds power strips + bricks. 17\" wide.", price:34.99, compareAt:44.99, rating:4.7, reviews:289, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of an under desk metal cable tray mounted underneath a desk, power strip inside, clean hidden cables, 8k e-commerce",
    imageUrl:"/images/product-6.jpg" },
  { id:7, name:"Velcro Cable Ties — 50-Pack", slug:"velcro-cable-ties", category:"Cable Management",
    description:"Reusable, self-attaching. 6\" length. 50 ties per pack. No adhesive residue.", price:12.99, compareAt:null, rating:4.9, reviews:1102, badge:"Value", badgeClass:"bg-emerald-600 text-white",
    imagePrompt:"professional product photography of a pack of black velcro cable ties neatly bundled on a white surface, minimal, 8k e-commerce",
    imageUrl:"/images/product-7.jpg" },

  // ── Desk Mats (2) ──
  { id:8, name:"Linen Desk Mat — Slate Blue", slug:"linen-desk-mat", category:"Desk Mat",
    description:"Premium linen surface. Natural rubber base. 90×40cm. Water-resistant coating.", price:34.99, compareAt:null, rating:4.7, reviews:512, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a slate blue linen desk mat on a wooden desk, keyboard and mouse on it, warm minimal, 8k e-commerce",
    imageUrl:"/images/product-8.jpg" },
  { id:9, name:"Linen Desk Mat — Warm Taupe", slug:"linen-desk-mat-taupe", category:"Desk Mat",
    description:"Same premium linen, warmer tone. Pairs perfectly with walnut wood desks. 90×40cm.", price:34.99, compareAt:null, rating:4.7, reviews:398, badge:"New", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photography of a warm taupe linen desk mat on a light wood desk, warm natural tones, keyboard on it, 8k e-commerce",
    imageUrl:"/images/product-9.jpg" },

  // ── Lighting (2) ──
  { id:10, name:"LED Monitor Light Bar", slug:"led-monitor-light-bar", category:"Lighting",
    description:"Asymmetric optical design — zero screen glare. 3 color temps, stepless dimming. USB-C powered.", price:49.99, compareAt:64.99, rating:4.6, reviews:389, badge:"Sale", badgeClass:"bg-red-600 text-white",
    imagePrompt:"professional product photography of a sleek LED monitor light bar on a display, warm glow on desk, modern, 8k e-commerce",
    imageUrl:"/images/product-10.jpg" },
  { id:11, name:"Desk Lamp — Architectural Black", slug:"desk-lamp-black", category:"Lighting",
    description:"Adjustable arm and head. Warm LED 3000K. Touch dimmer. USB-C charging port in base.", price:69.99, compareAt:89.99, rating:4.8, reviews:267, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a black architectural desk lamp with adjustable arm on a clean minimal desk, warm light, 8k e-commerce",
    imageUrl:"/images/product-11.jpg" },

  // ── Desk Organization (3) ──
  { id:12, name:"Walnut Desk Shelf / Pegboard", slug:"walnut-desk-shelf", category:"Desk Organization",
    description:"Wall-mount or desk-lean. 3 shelves + peg holes. Fits plants, phones, notes. Solid walnut.", price:89.99, compareAt:119.99, rating:4.9, reviews:178, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a walnut wood desk shelf pegboard leaning on a wall above a desk, plants and small items on shelves, 8k",
    imageUrl:"/images/product-12.jpg" },
  { id:13, name:"Ceramic Desk Planter — Matte White", slug:"ceramic-desk-planter", category:"Desk Organization",
    description:"Matte white ceramic. Drainage hole + bamboo tray. 5\" diameter. Pairs with trailing pothos.", price:29.99, compareAt:null, rating:4.7, reviews:278, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a matte white ceramic desk planter with a small green plant on a minimal desk, bamboo tray, 8k e-commerce",
    imageUrl:"/images/product-13.jpg" },
  { id:14, name:"Pen & Tool Holder — Walnut", slug:"pen-tool-holder-walnut", category:"Desk Organization",
    description:"Solid walnut. 3 compartments. Felt-lined bottom. Fits pens, rulers, scissors, cables.", price:39.99, compareAt:null, rating:4.6, reviews:156, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a walnut wood pen holder with pens and tools on a clean desk, organized, warm wood, 8k e-commerce",
    imageUrl:"/images/product-14.jpg" },

  // ── Comfort & Ergonomics (3) ──
  { id:15, name:"Keyboard Wrist Rest — Walnut", slug:"keyboard-wrist-rest-walnut", category:"Comfort",
    description:"Solid American walnut. Ergonomic 7° slope. Felt base. Full-size and TKL versions.", price:44.99, compareAt:59.99, rating:4.8, reviews:534, badge:"Popular", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photography of a walnut wood keyboard wrist rest in front of a keyboard on a clean desk, ergonomic, warm wood, 8k e-commerce",
    imageUrl:"/images/product-15.jpg" },
  { id:16, name:"Memory Foam Footrest", slug:"memory-foam-footrest", category:"Comfort",
    description:"High-density memory foam. Washable velour cover. Non-slip base. 17×12×5\".", price:39.99, compareAt:null, rating:4.5, reviews:423, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a grey memory foam footrest under a desk, ergonomic office setup, clean, 8k e-commerce",
    imageUrl:"/images/product-16.jpg" },
  { id:17, name:"Headphone Stand — Walnut", slug:"headphone-stand-walnut", category:"Comfort",
    description:"Solid walnut base + aluminum pole. Padded top rest. Cable management built in.", price:54.99, compareAt:74.99, rating:4.9, reviews:389, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a walnut wood headphone stand with headphones hanging on a clean desk, elegant, 8k e-commerce",
    imageUrl:"/images/product-17.jpg" },

  // ── Tech Accessories (2) ──
  { id:18, name:"USB-C Hub — 7-in-1", slug:"usb-c-hub-7in1", category:"Tech",
    description:"HDMI 4K, 2×USB-A, USB-C PD 100W, SD/microSD, 3.5mm audio. Aluminum, space grey.", price:49.99, compareAt:69.99, rating:4.6, reviews:672, badge:null, badgeClass:"",
    imagePrompt:"professional product photography of a sleek aluminum USB-C hub on a white desk next to a laptop, minimal, 8k e-commerce",
    imageUrl:"/images/product-18.jpg" },
  { id:19, name:"Magnetic Webcam Cover — 3-Pack", slug:"magnetic-webcam-cover", category:"Tech",
    description:"Ultra-thin 0.7mm. Magnetic attachment. No adhesive. Fits all laptops and monitors.", price:9.99, compareAt:null, rating:4.8, reviews:891, badge:"Value", badgeClass:"bg-emerald-600 text-white",
    imagePrompt:"professional product photography of a tiny magnetic webcam cover on a laptop bezel, close up, privacy, 8k e-commerce",
    imageUrl:"/images/product-19.jpg" },

  // ── Bundle ──
  { id:20, name:"Complete Desk Makeover Kit", slug:"desk-makeover-kit", category:"Bundle",
    description:"Walnut Riser + Cable Organizer (8-pk) + Linen Desk Mat (Slate Blue) + LED Light Bar. Save 25%.", price:129.99, compareAt:164.96, rating:4.9, reviews:312, badge:"Best Value", badgeClass:"bg-stone-900 text-white",
    imagePrompt:"professional product photography flat lay of desk accessories bundle, walnut stand, linen mat, cable clips, light bar, elegant, 8k",
    imageUrl:"/images/product-20.jpg" },
];

export const SLIDES = [
  { tag:"New Collection", title:"Your Desk Deserves Better", description:"Premium desk accessories for the modern workspace. Warm minimalism meets functional beauty.", cta:"Shop Monitor Stands", href:"/products/walnut-monitor-riser",
    imagePrompt:"beautiful warm minimal desk setup with walnut monitor stand, linen mat, clean aesthetic, natural window light, 8k lifestyle" },
  { tag:"Most Popular", title:"Zero Clutter. Full Focus.", description:"Magnetic cable management in 60 seconds. No tools, no drilling, no visible wires.", cta:"Shop Cable Management", href:"/products/magnetic-cable-organizer",
    imagePrompt:"clean desk with invisible cable management, no visible wires, minimal, modern workspace, before after, 8k lifestyle" },
  { tag:"Bundle & Save", title:"The Complete Transformation", description:"All 4 essentials in one box. Save 25% and transform your workspace this weekend.", cta:"Shop the Bundle", href:"/products/desk-makeover-kit",
    imagePrompt:"complete desk transformation before and after, messy desk becoming clean organized aesthetic workspace, warm lighting, 8k" },
];

export const CATEGORIES = [
  { name:"Monitor Stands", slug:"monitor-stands", color:"from-stone-800 to-stone-600", imageKey:"collection-protection" },
  { name:"Cable Management", slug:"cable-management", color:"from-slate-600 to-slate-400", imageKey:"collection-love" },
  { name:"Desk Mats", slug:"desk-mats", color:"from-blue-400 to-slate-400", imageKey:"collection-anxiety" },
  { name:"Lighting", slug:"lighting", color:"from-amber-400 to-amber-200", imageKey:"collection-wealth" },
  { name:"Comfort", slug:"comfort", color:"from-emerald-700 to-emerald-500", imageKey:"collection-protection" },
  { name:"Tech", slug:"tech", color:"from-indigo-700 to-indigo-500", imageKey:"collection-love" },
];

export const categoryMap: Record<string, string> = {
  "monitor-stands":"Monitor Stand", "cable-management":"Cable Management",
  "desk-mats":"Desk Mat", "lighting":"Lighting",
  "comfort":"Comfort", "tech":"Tech",
};
