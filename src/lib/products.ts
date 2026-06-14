export interface Product {
  id: number; name: string; slug: string; category: string;
  description: string; price: number; compareAt: number | null;
  rating: number; reviews: number; badge: string | null; badgeClass: string;
  imagePrompt: string; imageUrl: string;
}

export const PRODUCTS: Product[] = [
  // ═══ Monitor Stands (6) ═══
  { id:1, name:"Walnut Monitor Riser", slug:"walnut-monitor-riser", category:"Monitor Stand",
    description:"Solid FSC-certified American walnut. Hidden storage drawer. Cable cutout. Supports 50 lbs.", price:49.99, compareAt:69.99, rating:4.9, reviews:847, badge:"Bestseller", badgeClass:"bg-stone-900 text-white",
    imagePrompt:"professional product photo of solid walnut wood monitor stand riser on white desk, warm wood grain, hidden drawer, cable cutout, 8k e-commerce", imageUrl:"/images/product-1.jpg" },
  { id:2, name:"Aluminum Laptop Stand", slug:"aluminum-laptop-stand", category:"Monitor Stand",
    description:"Aerospace-grade matte aluminum. Adjustable height & angle. Anti-slip pads. 11-17\".", price:79.99, compareAt:99.99, rating:4.8, reviews:723, badge:"Popular", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photo of matte aluminum laptop stand on clean desk, MacBook at ergonomic height, sleek modern, 8k e-commerce", imageUrl:"/images/product-2.jpg" },
  { id:3, name:"Dual Monitor Arm — Black", slug:"dual-monitor-arm", category:"Monitor Stand",
    description:"Gas-spring for 13-32\" screens. Integrated cable channels. C-clamp & grommet mount.", price:129.99, compareAt:169.99, rating:4.8, reviews:456, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of matte black dual monitor arm holding two displays, floating effect, clean desk, 8k e-commerce", imageUrl:"/images/product-3.jpg" },
  { id:4, name:"Single Monitor Arm — White", slug:"single-monitor-arm-white", category:"Monitor Stand",
    description:"Gas-spring for 13-32\" screens. 360° rotation. USB pass-through. Clean white finish.", price:79.99, compareAt:null, rating:4.7, reviews:312, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of single white monitor arm on clean desk, one display floating, minimal, 8k e-commerce", imageUrl:"/images/product-4.jpg" },
  { id:21, name:"Bamboo Monitor Riser", slug:"bamboo-monitor-riser", category:"Monitor Stand",
    description:"Sustainable bamboo. 2-tier design with phone slot. Natural antibacterial surface. Lighter than walnut.", price:39.99, compareAt:null, rating:4.6, reviews:234, badge:"Eco", badgeClass:"bg-emerald-600 text-white",
    imagePrompt:"professional product photo of bamboo wood monitor stand riser on white desk, natural light bamboo grain, phone slot, 8k e-commerce", imageUrl:"/images/product-21.jpg" },
  { id:22, name:"Oak Monitor Riser — Light", slug:"oak-monitor-riser", category:"Monitor Stand",
    description:"European white oak. Extra-wide 55cm. Hidden drawer + cable cutout. Matches light wood desks.", price:54.99, compareAt:74.99, rating:4.8, reviews:189, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of light oak wood monitor stand riser on white desk, pale wood grain, minimalist Scandinavian, 8k e-commerce", imageUrl:"/images/product-22.jpg" },

  // ═══ Cable Management (5) ═══
  { id:5, name:"Magnetic Cable Organizer 8-Pack", slug:"magnetic-cable-organizer", category:"Cable Management",
    description:"Modular magnetic clips for desk & under-desk routing. No tools. Holds 8 cables each.", price:29.99, compareAt:null, rating:4.8, reviews:623, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of magnetic cable clips holding USB-C cables neatly on desk, organized, modern, 8k e-commerce", imageUrl:"/images/product-5.jpg" },
  { id:6, name:"Under-Desk Cable Tray — Steel", slug:"under-desk-cable-tray", category:"Cable Management",
    description:"Powder-coated steel. Clamp or screw mount. Ventilated. Fits power strips + bricks. 17\".", price:34.99, compareAt:44.99, rating:4.7, reviews:289, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of under desk metal cable tray mounted underneath desk, power strip inside, hidden cables, 8k e-commerce", imageUrl:"/images/product-6.jpg" },
  { id:7, name:"Velcro Cable Ties — 50-Pack", slug:"velcro-cable-ties", category:"Cable Management",
    description:"Reusable self-attaching. 6\" length. 50 ties. No adhesive residue. Black.", price:12.99, compareAt:null, rating:4.9, reviews:1102, badge:"Value", badgeClass:"bg-emerald-600 text-white",
    imagePrompt:"professional product photo of black velcro cable ties neatly bundled on white surface, minimal, 8k e-commerce", imageUrl:"/images/product-7.jpg" },
  { id:23, name:"Braided Cable Sleeve — 4 Pack", slug:"braided-cable-sleeve", category:"Cable Management",
    description:"Expandable PET braided sleeving. 1m each. Zipper closure. Fits 3-8 cables per sleeve.", price:16.99, compareAt:22.99, rating:4.5, reviews:178, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of black braided cable management sleeve covering multiple cables neatly on desk, organized, 8k e-commerce", imageUrl:"/images/product-23.jpg" },
  { id:24, name:"Desktop Cable Grommet — 2 Pack", slug:"desktop-cable-grommet", category:"Cable Management",
    description:"Aluminum finish. 60mm diameter. Pop-in installation. Brushes block dust. Fits standard desk holes.", price:12.99, compareAt:null, rating:4.6, reviews:312, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of aluminum round desk cable grommet installed in desk surface, cables passing through neatly, 8k e-commerce", imageUrl:"/images/product-24.jpg" },

  // ═══ Desk Mats (3) ═══
  { id:8, name:"Linen Desk Mat — Slate Blue", slug:"linen-desk-mat", category:"Desk Mat",
    description:"Premium linen + natural rubber. 90×40cm. Water-resistant. Slate blue.", price:34.99, compareAt:null, rating:4.7, reviews:512, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of slate blue linen desk mat on wooden desk, keyboard mouse on it, warm minimal, 8k e-commerce", imageUrl:"/images/product-8.jpg" },
  { id:9, name:"Linen Desk Mat — Warm Taupe", slug:"linen-desk-mat-taupe", category:"Desk Mat",
    description:"Same premium linen in warm taupe. Pairs with walnut desks. 90×40cm.", price:34.99, compareAt:null, rating:4.7, reviews:398, badge:"New", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photo of warm taupe linen desk mat on light wood desk, warm tones, keyboard on it, 8k e-commerce", imageUrl:"/images/product-9.jpg" },
  { id:25, name:"Felt Desk Mat — Charcoal", slug:"felt-desk-mat-charcoal", category:"Desk Mat",
    description:"3mm thick industrial wool felt. 90×43cm. Naturally water-repellent. Zero rubber smell.", price:39.99, compareAt:49.99, rating:4.8, reviews:267, badge:"Premium", badgeClass:"bg-stone-900 text-white",
    imagePrompt:"professional product photo of charcoal grey wool felt desk mat on wooden desk, premium texture, keyboard and notebook on it, 8k e-commerce", imageUrl:"/images/product-25.jpg" },

  // ═══ Lighting (4) ═══
  { id:10, name:"LED Monitor Light Bar", slug:"led-monitor-light-bar", category:"Lighting",
    description:"Asymmetric optical design. Zero screen glare. 3 color temps. Stepless dimming. USB-C.", price:49.99, compareAt:64.99, rating:4.6, reviews:389, badge:"Sale", badgeClass:"bg-red-600 text-white",
    imagePrompt:"professional product photo of sleek LED monitor light bar on display, warm glow on desk below, modern workspace, 8k e-commerce", imageUrl:"/images/product-10.jpg" },
  { id:11, name:"Architectural Desk Lamp — Black", slug:"desk-lamp-black", category:"Lighting",
    description:"Adjustable arm & head. Warm LED 3000K. Touch dimmer. USB-C charging port in base.", price:69.99, compareAt:89.99, rating:4.8, reviews:267, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of black architectural desk lamp with adjustable arm on minimal desk, warm light pool, 8k e-commerce", imageUrl:"/images/product-11.jpg" },
  { id:26, name:"RGB Monitor Backlight Strip", slug:"rgb-monitor-backlight", category:"Lighting",
    description:"USB-powered. 16.8M colors. App-controlled. Reduces eye strain. Fits 21-32\" monitors.", price:24.99, compareAt:null, rating:4.5, reviews:445, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of RGB LED strip behind a monitor on desk, colorful ambient backlight glow, gaming setup, 8k", imageUrl:"/images/product-26.jpg" },
  { id:27, name:"Wireless Charging Desk Lamp", slug:"wireless-charging-lamp", category:"Lighting",
    description:"15W fast wireless charger in base. 2700-6500K. Touch control. Eye-care diffuser.", price:89.99, compareAt:119.99, rating:4.7, reviews:198, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of modern desk lamp with built in wireless charging base, phone charging on it, minimal workspace, 8k e-commerce", imageUrl:"/images/product-27.jpg" },

  // ═══ Desk Organization (5) ═══
  { id:12, name:"Walnut Desk Shelf / Pegboard", slug:"walnut-desk-shelf", category:"Desk Organization",
    description:"Wall-mount or desk-lean. 3 shelves + peg holes. Solid walnut.", price:89.99, compareAt:119.99, rating:4.9, reviews:178, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of walnut wood desk shelf pegboard leaning on wall above desk, plants and stationery on shelves, 8k", imageUrl:"/images/product-12.jpg" },
  { id:13, name:"Ceramic Desk Planter — White", slug:"ceramic-desk-planter", category:"Desk Organization",
    description:"Matte white ceramic. Drainage hole + bamboo tray. 5\" diameter.", price:29.99, compareAt:null, rating:4.7, reviews:278, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of matte white ceramic desk planter with small green plant on minimal desk, bamboo tray, natural light, 8k e-commerce", imageUrl:"/images/product-13.jpg" },
  { id:14, name:"Pen & Tool Holder — Walnut", slug:"pen-tool-holder-walnut", category:"Desk Organization",
    description:"Solid walnut. 3 compartments. Felt-lined bottom. Fits pens, rulers, scissors.", price:39.99, compareAt:null, rating:4.6, reviews:156, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of walnut wood pen holder with pens and tools on clean desk, organized, warm wood, 8k e-commerce", imageUrl:"/images/product-14.jpg" },
  { id:28, name:"Drawer Organizer Set — 5 Piece", slug:"drawer-organizer-set", category:"Desk Organization",
    description:"Modular bamboo trays. 5 sizes. Felt base. Stackable. Fits IKEA and standard drawers.", price:24.99, compareAt:34.99, rating:4.6, reviews:234, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of bamboo drawer organizer set with stationery inside clean desk drawer, tidy, 8k e-commerce", imageUrl:"/images/product-28.jpg" },
  { id:29, name:"Magnetic Desktop Whiteboard", slug:"magnetic-whiteboard", category:"Desk Organization",
    description:"15×10\" tempered glass. 3 dry-erase markers + 2 magnets included. Wall or stand mount.", price:29.99, compareAt:null, rating:4.4, reviews:156, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of small glass magnetic whiteboard on desk with markers, notes written, modern workspace, 8k e-commerce", imageUrl:"/images/product-29.jpg" },

  // ═══ Comfort & Ergonomics (6) ═══
  { id:15, name:"Keyboard Wrist Rest — Walnut", slug:"keyboard-wrist-rest-walnut", category:"Comfort",
    description:"Solid walnut. Ergonomic 7° slope. Felt base. Full-size & TKL.", price:44.99, compareAt:59.99, rating:4.8, reviews:534, badge:"Popular", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photo of walnut wood keyboard wrist rest in front of keyboard on clean desk, ergonomic, warm wood, 8k e-commerce", imageUrl:"/images/product-15.jpg" },
  { id:16, name:"Memory Foam Footrest", slug:"memory-foam-footrest", category:"Comfort",
    description:"High-density memory foam. Washable velour cover. Non-slip base. 17×12×5\".", price:39.99, compareAt:null, rating:4.5, reviews:423, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of grey memory foam footrest under desk, ergonomic office setup, clean, 8k e-commerce", imageUrl:"/images/product-16.jpg" },
  { id:17, name:"Headphone Stand — Walnut", slug:"headphone-stand-walnut", category:"Comfort",
    description:"Solid walnut base + aluminum pole. Padded rest. Built-in cable management.", price:54.99, compareAt:74.99, rating:4.9, reviews:389, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of walnut wood headphone stand with black headphones hanging, elegant, on clean desk, 8k e-commerce", imageUrl:"/images/product-17.jpg" },
  { id:30, name:"Lumbar Support Cushion — Mesh", slug:"lumbar-support-cushion", category:"Comfort",
    description:"Breathable 3D mesh. Dual-density foam. Adjustable straps. Fits all office chairs.", price:49.99, compareAt:69.99, rating:4.6, reviews:567, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of grey mesh lumbar support cushion on black office chair, ergonomic, clean, 8k e-commerce", imageUrl:"/images/product-30.jpg" },
  { id:31, name:"Anti-Fatigue Standing Mat", slug:"anti-fatigue-mat", category:"Comfort",
    description:"High-density PU foam. Beveled edges. 83×51cm. For standing desk use.", price:79.99, compareAt:99.99, rating:4.7, reviews:312, badge:"Sale", badgeClass:"bg-red-600 text-white",
    imagePrompt:"professional product photo of black anti fatigue standing desk mat on floor in front of standing desk, ergonomic office, 8k e-commerce", imageUrl:"/images/product-31.jpg" },
  { id:32, name:"Wool Felt Keyboard Mat", slug:"wool-felt-keyboard-mat", category:"Comfort",
    description:"5mm thick German wool felt. Dampens typing sound. 80×30cm. Natural grey.", price:29.99, compareAt:null, rating:4.5, reviews:189, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of grey wool felt keyboard mat under keyboard on wooden desk, sound dampening texture, 8k e-commerce", imageUrl:"/images/product-32.jpg" },

  // ═══ Tech Accessories (5) ═══
  { id:18, name:"USB-C Hub — 7-in-1", slug:"usb-c-hub-7in1", category:"Tech",
    description:"HDMI 4K, 2×USB-A, USB-C PD 100W, SD/microSD, 3.5mm. Aluminum space grey.", price:49.99, compareAt:69.99, rating:4.6, reviews:672, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of sleek aluminum USB-C hub on white desk next to MacBook, minimal, 8k e-commerce", imageUrl:"/images/product-18.jpg" },
  { id:19, name:"Magnetic Webcam Cover — 3 Pack", slug:"magnetic-webcam-cover", category:"Tech",
    description:"Ultra-thin 0.7mm. Magnetic attachment. No adhesive. Fits all laptops & monitors.", price:9.99, compareAt:null, rating:4.8, reviews:891, badge:"Value", badgeClass:"bg-emerald-600 text-white",
    imagePrompt:"professional product photo of tiny magnetic webcam privacy cover on laptop screen bezel, close up detail, privacy, 8k e-commerce", imageUrl:"/images/product-19.jpg" },
  { id:33, name:"Wireless Charging Pad — Walnut", slug:"wireless-charging-pad-walnut", category:"Tech",
    description:"15W Qi2 fast charge. Solid walnut top. USB-C. For iPhone, AirPods, Android.", price:34.99, compareAt:null, rating:4.7, reviews:378, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of walnut wood wireless charging pad on desk with iPhone charging, warm wood, clean, 8k e-commerce", imageUrl:"/images/product-33.jpg" },
  { id:34, name:"Laptop Sleeve — Grey Felt", slug:"laptop-sleeve-felt", category:"Tech",
    description:"5mm wool felt. Magnetic closure. Fits 13-14\" and 15-16\" laptops. Water-resistant.", price:39.99, compareAt:null, rating:4.6, reviews:234, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of grey felt laptop sleeve on desk next to MacBook, premium wool texture, minimal, 8k e-commerce", imageUrl:"/images/product-34.jpg" },
  { id:35, name:"USB-C to HDMI Cable — 2m", slug:"usb-c-hdmi-cable", category:"Tech",
    description:"4K@60Hz. Braided nylon. Aluminum connectors. 2 meter length. Plug and play.", price:19.99, compareAt:29.99, rating:4.7, reviews:567, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of braided USB-C to HDMI cable neatly coiled on white desk, aluminum connectors, 8k e-commerce", imageUrl:"/images/product-35.jpg" },

  // ═══ Decor (4) ═══
  { id:36, name:"Mini Felt Notice Board — Grey", slug:"felt-notice-board", category:"Decor",
    description:"60×40cm German wool felt. Aluminum frame. Pin photos, notes, cards without damage.", price:24.99, compareAt:null, rating:4.5, reviews:189, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of grey felt notice board on wall above desk, photos and notes pinned, clean minimal, 8k", imageUrl:"/images/product-36.jpg" },
  { id:37, name:"Geometric Bookends — Steel", slug:"geometric-bookends", category:"Decor",
    description:"Powder-coated steel. Anti-slip base. Set of 2. Holds 15+ books. Modern sculptural look.", price:44.99, compareAt:59.99, rating:4.7, reviews:145, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of geometric metal bookends holding books on wooden desk shelf, modern sculptural, 8k e-commerce", imageUrl:"/images/product-37.jpg" },
  { id:38, name:"Minimal Desk Clock — Digital", slug:"desk-clock-digital", category:"Decor",
    description:"LED display. 3 brightness levels. Temperature + date. USB-C powered. Wood grain base.", price:34.99, compareAt:null, rating:4.6, reviews:267, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of minimal wood digital alarm clock on desk showing time, warm LED digits, clean workspace, 8k e-commerce", imageUrl:"/images/product-38.jpg" },
  { id:39, name:"Felt Coasters — 6 Pack", slug:"felt-coasters-6pack", category:"Decor",
    description:"5mm German wool felt. Heat-resistant. Non-slip. 6 colors. 10cm diameter.", price:19.99, compareAt:null, rating:4.8, reviews:312, badge:null, badgeClass:"",
    imagePrompt:"professional product photo of six colorful wool felt coasters stacked on wooden desk, clean warm aesthetic, 8k e-commerce", imageUrl:"/images/product-39.jpg" },

  // ═══ Bundles (2) ═══
  { id:20, name:"Complete Desk Makeover Kit", slug:"desk-makeover-kit", category:"Bundle",
    description:"Riser + Cable Organizer 8pk + Linen Mat + LED Light Bar. Save 25% vs individual.", price:129.99, compareAt:164.96, rating:4.9, reviews:312, badge:"Best Value", badgeClass:"bg-stone-900 text-white",
    imagePrompt:"professional product photo flat lay of desk accessories bundle, walnut stand, linen mat, cable clips, light bar, elegant, 8k e-commerce", imageUrl:"/images/product-20.jpg" },
  { id:40, name:"Ultimate Home Office Bundle", slug:"ultimate-home-office-bundle", category:"Bundle",
    description:"Makeover Kit + Lumbar Cushion + Footrest + Wireless Charger. Save 30%. 7 pieces total.", price:249.99, compareAt:359.93, rating:4.9, reviews:98, badge:"Ultimate", badgeClass:"bg-indigo-600 text-white",
    imagePrompt:"professional product photo flat lay of complete home office desk accessories bundle, riser mat lamp lumbar footrest charger, premium, 8k e-commerce", imageUrl:"/images/product-40.jpg" },
];

export const SLIDES = [
  { tag:"40+ Products", title:"Everything Your Desk Needs", description:"From monitor stands to cable management, lighting to comfort — one store, complete workspace.", cta:"Shop All Products", href:"/collections/monitor-stands",
    imagePrompt:"beautiful warm minimal desk setup with every desk accessory, monitor stand, mat, lamp, plants, organized, natural light, 8k lifestyle" },
  { tag:"Most Popular", title:"Zero Clutter. Full Focus.", description:"Magnetic cable management in 60 seconds. No tools, no drilling.", cta:"Shop Cable Management", href:"/products/magnetic-cable-organizer",
    imagePrompt:"clean desk with invisible cable management, no visible wires, minimal modern workspace, before after, 8k lifestyle" },
  { tag:"Bundle & Save", title:"Save 30% on the Ultimate Bundle", description:"7 pieces: riser, mat, light, cable kit, lumbar support, footrest, charger.", cta:"Shop Ultimate Bundle", href:"/products/ultimate-home-office-bundle",
    imagePrompt:"complete home office desk setup with all accessories, ergonomic chair, monitor arm, plants, warm lighting, perfect workspace, 8k" },
];

export const CATEGORIES = [
  { name:"Monitor Stands", slug:"monitor-stands", imageKey:"collection-protection" },
  { name:"Cable Management", slug:"cable-management", imageKey:"collection-love" },
  { name:"Desk Mats", slug:"desk-mats", imageKey:"collection-anxiety" },
  { name:"Lighting", slug:"lighting", imageKey:"collection-wealth" },
  { name:"Comfort", slug:"comfort", imageKey:"collection-comfort" },
  { name:"Tech", slug:"tech", imageKey:"collection-tech" },
  { name:"Desk Organization", slug:"desk-organization", imageKey:"collection-organization" },
  { name:"Decor", slug:"decor", imageKey:"collection-decor" },
];

export const categoryMap: Record<string, string> = {
  "monitor-stands":"Monitor Stand", "cable-management":"Cable Management",
  "desk-mats":"Desk Mat", "lighting":"Lighting", "comfort":"Comfort",
  "tech":"Tech", "desk-organization":"Desk Organization", "decor":"Decor",
};
