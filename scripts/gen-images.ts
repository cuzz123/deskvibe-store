// Generate consistent product images via Agnes AI
// Usage: npx tsx scripts/gen-images.ts [--category <name>] [--product <id>]
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const AGNES_KEY = process.env.AGNES_API_KEY || "";
const AGNES_BASE = "https://apihub.agnes-ai.com/v1";
const IMAGE_MODEL = "agnes-image-2.1-flash";

const BASE_PROMPT = "premium product photography, clean white studio background, soft natural lighting, minimal composition, high-end desk accessory, sharp focus, professional e-commerce style, neutral warm tones, no text overlay, no watermark";

// Brand-consistent prompt per product
const PRODUCTS: Array<{ id: number; name: string; slug: string; category: string; description: string }> = [
  // Monitor Stands
  { id:1, name:"Walnut Monitor Riser", slug:"walnut-monitor-riser", category:"Monitor Stand", description:"Solid FSC-certified American walnut wood monitor riser stand with hidden storage drawer, cable cutout, minimalist design" },
  { id:2, name:"Aluminum Laptop Stand", slug:"aluminum-laptop-stand", category:"Monitor Stand", description:"Aerospace-grade matte aluminum laptop stand, adjustable height and angle, anti-slip silicone pads, silver metallic finish" },
  { id:3, name:"Dual Monitor Arm", slug:"dual-monitor-arm", category:"Monitor Stand", description:"Black dual monitor arm with gas-spring mechanism, integrated cable channels, C-clamp and grommet mount, sleek modern design" },
  { id:4, name:"Single Monitor Arm — White", slug:"single-monitor-arm-white", category:"Monitor Stand", description:"White gas-spring monitor arm, 360° rotation, USB pass-through, clean white finish, minimalist" },
  { id:21, name:"Bamboo Monitor Riser", slug:"bamboo-monitor-riser", category:"Monitor Stand", description:"Sustainable bamboo wood monitor riser stand, 2-tier design with phone slot, natural light bamboo grain texture" },
  { id:22, name:"Oak Monitor Riser — Light", slug:"oak-monitor-riser", category:"Monitor Stand", description:"European white oak wood monitor riser stand, extra-wide 55cm, hidden drawer and cable cutout, light natural wood" },
  { id:41, name:"Floating Monitor Shelf — Walnut", slug:"floating-monitor-shelf-walnut", category:"Monitor Stand", description:"Wall-mounted solid walnut floating shelf, hidden bracket, cable pass-through, 60cm wide" },
  { id:42, name:"Dual Monitor Riser — Extra Wide", slug:"dual-monitor-riser-wide", category:"Monitor Stand", description:"Extra-wide 100cm walnut wood riser, 2 drawers and center cutout, supports 80 lbs" },
  { id:43, name:"Adjustable Monitor Arm — Silver", slug:"adjustable-monitor-arm-silver", category:"Monitor Stand", description:"Polished aluminum silver monitor arm, 360° rotation, USB 3.0 hub, gas spring, metallic finish" },
  { id:44, name:"Kids Monitor Stand — White Oak", slug:"kids-monitor-stand-oak", category:"Monitor Stand", description:"Child-height solid white oak monitor riser, rounded corners, cable management, light wood" },

  // Cable Management
  { id:5, name:"Magnetic Cable Organizer 8-Pack", slug:"magnetic-cable-organizer", category:"Cable Management", description:"Modular black magnetic cable clips for desk cable routing, 8-piece set, no tools needed, clean organized look" },
  { id:6, name:"Under-Desk Cable Tray — Steel", slug:"under-desk-cable-tray", category:"Cable Management", description:"Black powder-coated steel under-desk cable management tray, ventilated design, clamp or screw mount, 17 inch" },
  { id:7, name:"Velcro Cable Ties — 50-Pack", slug:"velcro-cable-ties", category:"Cable Management", description:"Reusable black velcro cable ties, 50-pack, 6 inch length, self-attaching, no adhesive, neat cable organization" },
  { id:23, name:"Braided Cable Sleeve — 4 Pack", slug:"braided-cable-sleeve", category:"Cable Management", description:"Expandable black PET braided cable sleeving, 4-pack, 1 meter each, zipper closure, neat cable bundling" },
  { id:24, name:"Desktop Cable Grommet — 2 Pack", slug:"desktop-cable-grommet", category:"Cable Management", description:"Aluminum finish desktop cable grommet, 60mm diameter, pop-in installation, brush seal blocks dust" },
  { id:45, name:"Cable Raceway Kit — 6 Pack", slug:"cable-raceway-kit-6pack", category:"Cable Management", description:"Adhesive white PVC cable raceway channels, 6-pack, 40cm each, paintable, includes connectors" },
  { id:46, name:"Power Strip Holder — Under Desk", slug:"power-strip-holder-under-desk", category:"Cable Management", description:"Black clamp-mount steel under-desk power strip holder bracket, no drilling needed" },
  { id:47, name:"USB Cable Organizer Box — Bamboo", slug:"usb-cable-organizer-box", category:"Cable Management", description:"Bamboo wood lid cable organizer box with white ABS body, hides power strip and cables, ventilated" },

  // Desk Mats
  { id:8, name:"Linen Desk Mat — Slate Blue", slug:"linen-desk-mat", category:"Desk Mat", description:"Premium slate blue linen fabric desk mat with natural rubber base, 90x40cm, water-resistant, textured surface" },
  { id:9, name:"Linen Desk Mat — Warm Taupe", slug:"linen-desk-mat-taupe", category:"Desk Mat", description:"Premium warm taupe linen fabric desk mat with natural rubber base, 90x40cm, water-resistant, earthy tone" },
  { id:25, name:"Felt Desk Mat — Charcoal", slug:"felt-desk-mat-charcoal", category:"Desk Mat", description:"3mm thick charcoal industrial wool felt desk mat, 90x43cm, naturally water-repellent, dark grey" },
  { id:48, name:"Leather Desk Mat — Brown", slug:"leather-desk-mat-brown", category:"Desk Mat", description:"Genuine brown top-grain leather desk mat, suede underside, 90x43cm, ages beautifully, rich leather texture" },
  { id:49, name:"Cork Desk Mat — Natural", slug:"cork-desk-mat-natural", category:"Desk Mat", description:"Sustainable natural Portuguese cork desk mat, 90x43cm, antimicrobial, lightweight, warm cork texture" },
  { id:50, name:"Extended Desk Mat — XXL Black", slug:"extended-desk-mat-xxl", category:"Desk Mat", description:"Extra-large 120x60cm black micro-woven fabric desk mat, waterproof, stitched edges, full desk coverage" },

  // Lighting
  { id:10, name:"LED Monitor Light Bar", slug:"led-monitor-light-bar", category:"Lighting", description:"Black LED monitor light bar with asymmetric optical design, zero screen glare, 3 color temperatures, USB-C, sleek" },
  { id:11, name:"Architectural Desk Lamp — Black", slug:"desk-lamp-black", category:"Lighting", description:"Adjustable black architectural desk lamp, warm LED 3000K, touch dimmer, USB-C charging port in base, articulated arm" },
  { id:26, name:"RGB Monitor Backlight Strip", slug:"rgb-monitor-backlight", category:"Lighting", description:"USB-powered RGB LED monitor backlight strip, 16.8M colors, app-controlled, reduces eye strain, ambient glow" },
  { id:27, name:"Wireless Charging Desk Lamp", slug:"wireless-charging-lamp", category:"Lighting", description:"Minimalist desk lamp with 15W fast wireless charger in base, 2700-6500K adjustable, touch control, eye-care diffuser" },
  { id:51, name:"Screen Bar Pro — Dual Light", slug:"screen-bar-pro-dual-light", category:"Lighting", description:"Professional dual-light screen bar, front and back lighting, auto-dimming sensor, wireless remote, premium black" },
  { id:52, name:"Desk Lamp — Walnut & Brass", slug:"desk-lamp-walnut-brass", category:"Lighting", description:"Mid-century modern desk lamp, walnut wood veneer and brass stem, dimmable warm LED, elegant design" },
  { id:53, name:"Under-Shelf LED Strip — 3 Pack", slug:"under-shelf-led-strip-3pack", category:"Lighting", description:"Motion sensor rechargeable under-shelf LED strip lights, 3-pack, magnetic mount, 30cm each, warm white" },
  { id:54, name:"Ring Light — Video Call Kit", slug:"ring-light-video-call-kit", category:"Lighting", description:"10-inch ring light for video calls, 3 color modes and 10 brightness levels, tripod and phone holder included" },

  // Desk Organization
  { id:12, name:"Walnut Desk Shelf / Pegboard", slug:"walnut-desk-shelf", category:"Desk Organization", description:"Solid walnut wood wall-mount desk shelf and pegboard, 3 shelves and peg holes, minimalist storage" },
  { id:13, name:"Ceramic Desk Planter — White", slug:"ceramic-desk-planter", category:"Desk Organization", description:"Matte white ceramic desk planter pot, 5 inch diameter, drainage hole and bamboo tray, minimalist" },
  { id:14, name:"Pen & Tool Holder — Walnut", slug:"pen-tool-holder-walnut", category:"Desk Organization", description:"Solid walnut wood pen and tool holder, 3 compartments, felt-lined bottom, desk organizer" },
  { id:28, name:"Drawer Organizer Set — 5 Piece", slug:"drawer-organizer-set", category:"Desk Organization", description:"Modular bamboo wood drawer organizer trays, 5-piece set, felt base, stackable, natural bamboo" },
  { id:29, name:"Magnetic Desktop Whiteboard", slug:"magnetic-whiteboard", category:"Desk Organization", description:"15x10 inch tempered glass magnetic desktop whiteboard, 3 dry-erase markers and 2 magnets included, modern" },
  { id:55, name:"Stackable Paper Tray — Walnut", slug:"stackable-paper-tray-walnut", category:"Desk Organization", description:"Solid walnut wood 3-tier modular stackable paper tray, felt-lined, fits A4 letter size" },
  { id:56, name:"Sticky Note Holder — Walnut", slug:"sticky-note-holder-walnut", category:"Desk Organization", description:"Solid walnut wood sticky note holder base, pen slot, weighted, holds 3x3 inch notes, minimalist" },
  { id:57, name:"Trash Can — Matte Black", slug:"trash-can-matte-black", category:"Desk Organization", description:"6L matte black powder-coated steel desk trash can, soft-close lid, removable bucket, minimalist" },
  { id:58, name:"Letter Sorter — Bamboo", slug:"letter-sorter-bamboo", category:"Desk Organization", description:"5-compartment vertical bamboo wood letter sorter, fits envelopes and mail, natural bamboo" },
  { id:59, name:"Rolling Desk Drawer — White", slug:"rolling-desk-drawer-white", category:"Desk Organization", description:"White metal and MDF rolling desk drawer unit, 3 lockable drawers on casters, fits under desks" },
];

const REMAINING: Array<{ id: number; name: string; slug: string; category: string; description: string }> = [
  // Comfort
  { id:15, name:"Keyboard Wrist Rest — Walnut", slug:"keyboard-wrist-rest-walnut", category:"Comfort", description:"Solid walnut wood ergonomic keyboard wrist rest, 7° slope, felt base, premium wood grain" },
  { id:16, name:"Memory Foam Footrest", slug:"memory-foam-footrest", category:"Comfort", description:"High-density memory foam footrest, washable velour cover, non-slip base, 17x12x5 inches, grey" },
  { id:17, name:"Headphone Stand — Walnut", slug:"headphone-stand-walnut", category:"Comfort", description:"Solid walnut wood headphone stand with aluminum pole, padded rest, built-in cable management" },
  { id:30, name:"Lumbar Support Cushion — Mesh", slug:"lumbar-support-cushion", category:"Comfort", description:"Breathable 3D mesh lumbar support cushion, dual-density foam, adjustable straps, fits all office chairs, grey" },
  { id:31, name:"Anti-Fatigue Standing Mat", slug:"anti-fatigue-mat", category:"Comfort", description:"High-density black PU foam anti-fatigue standing desk mat, beveled edges, 83x51cm" },
  { id:32, name:"Wool Felt Keyboard Mat", slug:"wool-felt-keyboard-mat", category:"Comfort", description:"5mm thick German wool felt keyboard mat, natural grey, dampens typing sound, 80x30cm" },
  { id:60, name:"Gel Wrist Rest — Black", slug:"gel-wrist-rest-black", category:"Comfort", description:"Cooling gel and memory foam black wrist rest, Lycra cover, non-slip base, full-size keyboard" },
  { id:61, name:"Seat Cushion — Memory Foam", slug:"seat-cushion-memory-foam", category:"Comfort", description:"High-density memory foam seat cushion, washable 3D mesh cover, 45x40x8cm, grey" },
  { id:62, name:"Monitor Riser — 3-Level Adjustable", slug:"monitor-riser-adjustable-3level", category:"Comfort", description:"3-level adjustable height monitor riser, steel and wood top, ergonomic eye level, 10/13/16cm" },
  { id:63, name:"Standing Desk Balance Board", slug:"standing-desk-balance-board", category:"Comfort", description:"Curved rocker standing desk balance board, anti-slip surface, core engagement, 66x33cm, dark wood" },

  // Tech
  { id:18, name:"USB-C Hub — 7-in-1", slug:"usb-c-hub-7in1", category:"Tech", description:"Space grey aluminum 7-in-1 USB-C hub, HDMI 4K, 2xUSB-A, USB-C PD 100W, SD/microSD, 3.5mm audio" },
  { id:19, name:"Magnetic Webcam Cover — 3 Pack", slug:"magnetic-webcam-cover", category:"Tech", description:"Ultra-thin 0.7mm magnetic webcam cover, 3-pack, no adhesive needed, fits all laptops and monitors, black" },
  { id:33, name:"Wireless Charging Pad — Walnut", slug:"wireless-charging-pad-walnut", category:"Tech", description:"15W Qi2 fast wireless charging pad with solid walnut wood top, USB-C, for iPhone and Android" },
  { id:34, name:"Laptop Sleeve — Grey Felt", slug:"laptop-sleeve-felt", category:"Tech", description:"5mm grey wool felt laptop sleeve, magnetic closure, water-resistant, fits 13-16 inch laptops" },
  { id:35, name:"USB-C to HDMI Cable — 2m", slug:"usb-c-hdmi-cable", category:"Tech", description:"2 meter braided nylon USB-C to HDMI cable, 4K 60Hz, aluminum connectors, dark grey" },
  { id:64, name:"USB-C Hub — 12-in-1 Pro", slug:"usb-c-hub-12in1-pro", category:"Tech", description:"Professional 12-in-1 USB-C hub, dual HDMI, 3xUSB-A, 2xUSB-C, SD, Ethernet, Audio, 100W PD, space grey" },
  { id:65, name:"Vertical Laptop Stand — Dual", slug:"vertical-laptop-stand-dual", category:"Tech", description:"Adjustable aluminum vertical laptop stand holding 2 laptops, non-slip base, silver metallic" },
  { id:66, name:"Screen Cleaning Kit", slug:"screen-cleaning-kit", category:"Tech", description:"Screen cleaning kit with microfiber cloth and plant-based spray, anti-static, safe for all screens" },
  { id:67, name:"Monitor Privacy Filter — 24\"", slug:"monitor-privacy-filter-24", category:"Tech", description:"24-inch anti-glare monitor privacy filter, magnetic attachment, 16:9, blocks side views" },
  { id:68, name:"Air Duster — Rechargeable", slug:"air-duster-rechargeable", category:"Tech", description:"Rechargeable electric air duster, brushless motor, 50000 RPM, USB-C, for keyboards and electronics, dark grey" },

  // Decor
  { id:36, name:"Mini Felt Notice Board — Grey", slug:"felt-notice-board", category:"Decor", description:"60x40cm grey German wool felt notice board, aluminum frame, pin photos and notes, minimalist" },
  { id:37, name:"Geometric Bookends — Steel", slug:"geometric-bookends", category:"Decor", description:"Black powder-coated steel geometric bookends, set of 2, anti-slip base, holds 15+ books, sculptural" },
  { id:38, name:"Minimal Desk Clock — Digital", slug:"desk-clock-digital", category:"Decor", description:"LED digital desk clock, 3 brightness levels, temperature and date display, USB-C powered, wood grain base" },
  { id:39, name:"Felt Coasters — 6 Pack", slug:"felt-coasters-6pack", category:"Decor", description:"6-pack of 5mm German wool felt coasters, 10cm diameter, heat-resistant, non-slip, assorted colors" },
  { id:69, name:"Mini Succulent Set — 3 Pack", slug:"mini-succulent-set-3pack", category:"Decor", description:"3 real live mini succulents in concrete pots, low maintenance, desk-friendly, varying green shades" },
  { id:70, name:"LED Neon Sign — Focus", slug:"led-neon-sign-focus", category:"Decor", description:"Warm white LED neon sign reading FOCUS, dimmable, USB powered, 40cm wide, modern desk decor" },
  { id:71, name:"Hourglass — 30 Minute", slug:"hourglass-30-minute", category:"Decor", description:"Hand-blown glass 30-minute hourglass with black sand, walnut wood base, desk timer and decor" },
  { id:72, name:"Magnetic Photo Frame — 3 Pack", slug:"magnetic-photo-frame-3pack", category:"Decor", description:"3-pack of acrylic magnetic photo frames, 10x15cm, wall-mount or desk-stand, modern clear design" },

  // Bundles
  { id:20, name:"Complete Desk Makeover Kit", slug:"desk-makeover-kit", category:"Bundle", description:"Desk accessory bundle: walnut riser, magnetic cable organizer 8-pack, linen desk mat, LED light bar" },
  { id:40, name:"Ultimate Home Office Bundle", slug:"ultimate-home-office-bundle", category:"Bundle", description:"Complete home office bundle: desk makeover kit, lumbar cushion, footrest, wireless charger, 7 pieces total" },
  { id:73, name:"Cable Management Kit", slug:"cable-management-kit", category:"Bundle", description:"Complete cable management kit: magnetic clips 8-pack, cable tray, braided sleeves 4-pack, velcro ties 50-pack" },
  { id:74, name:"Ergonomic Starter Kit", slug:"ergonomic-starter-kit", category:"Bundle", description:"Ergonomic accessories starter kit: wrist rest, lumbar cushion, footrest, seat cushion" },
  { id:75, name:"Desk Aesthetics Set", slug:"desk-aesthetics-set", category:"Bundle", description:"Desk aesthetics bundle: monitor riser, LED light bar, desk mat, digital clock, ceramic planter" },
];

const ALL = PRODUCTS.concat(REMAINING);

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.log(`       Download HTTP ${resp.status}`);
      return false;
    }
    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dir = resolve(filepath, "..");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(filepath, buffer);
    return true;
  } catch (e: any) {
    console.log(`       Download error: ${e.message}`);
    return false;
  }
}

function saveBase64(b64: string, filepath: string): boolean {
  try {
    const buffer = Buffer.from(b64, "base64");
    const dir = resolve(filepath, "..");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(filepath, buffer);
    return true;
  } catch { return false; }
}

async function main() {
  const args = process.argv.slice(2);
  const categoryFilter = args.includes("--category") ? args[args.indexOf("--category") + 1] : null;
  const productFilter = args.includes("--product") ? parseInt(args[args.indexOf("--product") + 1]) : null;

  let toGenerate = ALL;
  if (categoryFilter) toGenerate = ALL.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
  if (productFilter) toGenerate = ALL.filter(p => p.id === productFilter);

  if (!AGNES_KEY) {
    console.error("AGNES_API_KEY not set in .env.local");
    process.exit(1);
  }

  console.log(`Generating ${toGenerate.length} product images via Agnes AI...\n`);

  let success = 0;
  let failed = 0;

  for (const p of toGenerate) {
    const prompt = `${BASE_PROMPT}, ${p.description}`;
    console.log(`[${p.id}/75] ${p.name}`);
    console.log(`       ${p.category}`);

    try {
      const resp = await fetch(`${AGNES_BASE}/images/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AGNES_KEY}`,
        },
        body: JSON.stringify({
          model: IMAGE_MODEL,
          prompt,
          n: 1,
          size: "1024x1024",
        }),
      });

      const data = await resp.json();
      if (data.error) {
        console.log(`       ❌ API: ${data.error.message}`);
        failed++;
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      const url = data.data?.[0]?.url;
      const b64 = data.data?.[0]?.b64_json;
      const filepath = `public/images/product-${p.id}.jpg`;

      if (url) {
        const ok = await downloadImage(url, filepath);
        if (ok) {
          console.log(`       ✅ Saved (url)`);
          success++;
        } else {
          console.log(`       ❌ URL download failed`);
          failed++;
        }
      } else if (b64) {
        const ok = saveBase64(b64, filepath);
        if (ok) {
          console.log(`       ✅ Saved (base64)`);
          success++;
        } else {
          console.log(`       ❌ base64 save failed`);
          failed++;
        }
      } else {
        console.log(`       ❌ No image data in response`);
        failed++;
      }
    } catch (e: any) {
      console.log(`       ❌ ${e.message}`);
      failed++;
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 2500));
  }

  console.log(`\nDone: ${success} generated, ${failed} failed`);
}

main();
