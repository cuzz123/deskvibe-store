// Generate DeskVibe product images via Agnes AI
import fs from "fs";
import path from "path";

const AGNES_KEY = process.env.AGNES_API_KEY;
if (!AGNES_KEY) { console.error("AGNES_API_KEY not set"); process.exit(1); }

const OUT_DIR = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const IMAGES = [
  // Products (8)
  { id: "product-1", prompt: "professional product photography of a solid walnut wood monitor stand riser on a clean white desk, warm wood grain, hidden drawer slightly open revealing pens, minimal elegant, natural window light, 8k, e-commerce white background" },
  { id: "product-2", prompt: "professional product photography of magnetic cable management clips on a clean white desk, black minimalist clips holding USB-C cables neatly organized, under-desk view, modern workspace, 8k, e-commerce clean" },
  { id: "product-3", prompt: "professional product photography of a slate blue linen desk mat on a light wood desk, premium fabric texture visible, wireless keyboard and mouse placed on it, warm minimal aesthetic, natural light, 8k e-commerce" },
  { id: "product-4", prompt: "professional product photography of a sleek black LED monitor light bar mounted on top of a display screen, warm glow illuminating the desk below, asymmetric optical design, modern workspace, 8k, e-commerce clean background" },
  { id: "product-5", prompt: "professional product photography of a matte silver aluminum laptop stand on a clean desk, MacBook placed on it at ergonomic eye-level height, sleek modern minimal design, natural light, 8k, e-commerce clean" },
  { id: "product-6", prompt: "professional product photography flat lay of desk accessories bundle on light wood surface, walnut monitor stand, slate blue linen desk mat, black cable organizer clips, LED light bar, all arranged elegantly, warm minimal aesthetic, 8k e-commerce" },
  { id: "product-7", prompt: "professional product photography of a matte white ceramic desk planter pot with a small green trailing plant on a minimal desk, bamboo drainage tray, warm natural window light, calming clean workspace, 8k e-commerce" },
  { id: "product-8", prompt: "professional product photography of a matte black dual monitor arm holding two displays on a clean minimal desk, floating screen effect, integrated cable channels hidden, modern ergonomic workspace, 8k, e-commerce clean" },
  // Slides (3)
  { id: "slide-0", prompt: "beautiful warm minimal desk setup lifestyle photo, walnut wood monitor stand, slate blue linen desk mat, clean organized aesthetic, natural light from large window, cozy productive workspace, shallow depth of field, 8k" },
  { id: "slide-1", prompt: "before and after desk transformation lifestyle photo, messy cluttered desk becoming clean organized aesthetic workspace, invisible cable management, modern minimal design, dramatic improvement, 8k lifestyle photography" },
  { id: "slide-2", prompt: "complete desk makeover bundle unboxing lifestyle photo, all desk accessories beautifully arranged on wooden floor, walnut stand linen mat cable clips light bar, warm sunlight, excitement of new workspace, 8k" },
  // Collections (4)
  { id: "collection-protection", prompt: "professional product photography flat lay of wooden monitor stands and risers arranged on white marble, walnut and oak wood, minimal elegant composition, warm tones, e-commerce, 8k" },
  { id: "collection-love", prompt: "professional product photography flat lay of cable management accessories and organizers arranged on white marble, black clips and velcro ties, clean organized composition, e-commerce, 8k" },
  { id: "collection-anxiety", prompt: "professional product photography flat lay of linen desk mats in various colors arranged on white marble, slate blue taupe grey, premium fabric texture, e-commerce, 8k" },
  { id: "collection-wealth", prompt: "professional product photography flat lay of LED monitor light bars and desk lamps arranged on white marble, warm glow, modern lighting, e-commerce, 8k" },
  // Story (1)
  { id: "story", prompt: "Scandinavian design studio workspace interior, wooden desk with design sketches and material samples, warm natural light, minimal aesthetic, creative atmosphere, 8k lifestyle photography" },
];

async function gen(prompt) {
  const r = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${AGNES_KEY}` },
    body: JSON.stringify({ model: "agnes-image-2.1-flash", prompt, n: 1, size: "1024x1024" }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.data?.[0]?.url || null;
}

async function main() {
  console.log(`Generating ${IMAGES.length} DeskVibe product images...\n`);
  let ok = 0;

  for (let i = 0; i < IMAGES.length; i++) {
    const img = IMAGES[i];
    const fp = path.join(OUT_DIR, `${img.id}.jpg`);
    const bar = "█".repeat(Math.floor(((i + 1) / IMAGES.length) * 20)).padEnd(20, "░");
    process.stdout.write(`[${i + 1}/${IMAGES.length}] ${bar} ${img.id}.jpg ⏳ `);

    for (let t = 0; t < 3; t++) {
      try {
        const url = await gen(img.prompt);
        if (url) {
          const r2 = await fetch(url);
          fs.writeFileSync(fp, Buffer.from(await r2.arrayBuffer()));
          ok++; break;
        }
      } catch (e) {
        if (t < 2) { process.stdout.write("↻"); await new Promise(r => setTimeout(r, 3000)); }
        else process.stdout.write(`❌ ${e.message.slice(0, 50)}\n`);
      }
    }
    if (fs.existsSync(fp)) console.log(`✅ ${(fs.statSync(fp).size / 1024).toFixed(0)}KB`);
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log(`\n✅ ${ok}/${IMAGES.length} generated → public/images/`);
}

main();
