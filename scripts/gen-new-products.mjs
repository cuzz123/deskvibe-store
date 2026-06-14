import fs from "fs";
import path from "path";

const KEY = process.env.AGNES_API_KEY;
if (!KEY) { console.error("AGNES_API_KEY not set"); process.exit(1); }

const OUT = path.join(process.cwd(), "public", "images");

const NEW = [
  { id:"product-9", prompt:"professional product photography of a warm taupe linen desk mat on a light wood desk, warm natural tones, wireless keyboard on it, 8k e-commerce clean" },
  { id:"product-10", prompt:"professional product photography of a sleek black LED monitor light bar mounted on top of a display screen, warm glow illuminating the desk below, modern workspace, 8k e-commerce clean" },
  { id:"product-11", prompt:"professional product photography of a matte black architectural desk lamp with adjustable arm on a clean minimal desk, warm light pool, modern design, 8k e-commerce clean" },
  { id:"product-12", prompt:"professional product photography of a solid walnut wood desk shelf pegboard leaning on a wall above a desk, small plants and stationery on shelves, warm aesthetic, 8k" },
  { id:"product-13", prompt:"professional product photography of a matte white ceramic desk planter pot with a small green trailing plant on a minimal desk, bamboo drainage tray, natural light, 8k e-commerce" },
  { id:"product-14", prompt:"professional product photography of a solid walnut wood pen and tool holder with pens scissors on a clean desk, organized, warm wood grain, 8k e-commerce clean" },
  { id:"product-15", prompt:"professional product photography of a solid walnut wood ergonomic keyboard wrist rest in front of a keyboard on a clean desk, warm wood, 8k e-commerce clean" },
  { id:"product-16", prompt:"professional product photography of a grey fabric memory foam footrest under a desk, ergonomic office, clean floor, 8k e-commerce" },
  { id:"product-17", prompt:"professional product photography of a solid walnut wood headphone stand with black headphones hanging, elegant, on a clean desk, 8k e-commerce" },
  { id:"product-18", prompt:"professional product photography of a sleek space grey aluminum USB-C hub with ports on a white desk next to a MacBook, minimal, 8k e-commerce clean" },
  { id:"product-19", prompt:"professional product photography of a tiny ultra thin magnetic webcam privacy cover on a laptop screen bezel, close up detail shot, 8k e-commerce" },
  { id:"product-20", prompt:"professional product photography flat lay of desk accessories bundle on light wood, walnut monitor stand, linen desk mat, cable clips, LED light bar, elegant, 8k e-commerce" },
];

async function gen(p) {
  const r = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
    method:"POST", headers:{"Content-Type":"application/json", Authorization:`Bearer ${KEY}`},
    body:JSON.stringify({model:"agnes-image-2.1-flash", prompt:p, n:1, size:"1024x1024"}),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.data?.[0]?.url || null;
}

async function main() {
  console.log(`Generating ${NEW.length} new product images...\n`);
  for (let i = 0; i < NEW.length; i++) {
    const img = NEW[i];
    const fp = path.join(OUT, img.id + ".jpg");
    if (fs.existsSync(fp)) { console.log(`[${i+1}/${NEW.length}] ${img.id}.jpg ✅ cached`); continue; }
    process.stdout.write(`[${i+1}/${NEW.length}] ${img.id}.jpg ⏳ `);
    let ok = false;
    for (let t = 0; t < 3; t++) {
      try {
        const url = await gen(img.prompt);
        if (url) { const r2 = await fetch(url); fs.writeFileSync(fp, Buffer.from(await r2.arrayBuffer())); ok = true; break; }
      } catch(e) { if (t<2) { process.stdout.write("↻"); await new Promise(r=>setTimeout(r,3000)); } }
    }
    if (ok) console.log(`✅ ${(fs.statSync(fp).size/1024).toFixed(0)}KB`);
    else console.log("❌");
    await new Promise(r=>setTimeout(r,1500));
  }
  console.log(`\n✅ Done. ${NEW.length} images → public/images/`);
}
main();
