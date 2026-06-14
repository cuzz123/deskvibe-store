import fs from "fs";
import path from "path";

const KEY = process.env.AGNES_API_KEY;
if (!KEY) { console.error("AGNES_API_KEY not set"); process.exit(1); }
const OUT = path.join(process.cwd(), "public", "images");

const IMGS = [
  ["collection-comfort","professional product photography flat lay of ergonomic office accessories on white marble, keyboard wrist rest, lumbar cushion, footrest, memory foam, comfort workspace, 8k e-commerce"],
  ["collection-tech","professional product photography flat lay of tech accessories on white marble, USB-C hub, wireless charger, cables, webcam cover, sleek modern gadgets, 8k e-commerce"],
  ["collection-organization","professional product photography flat lay of desk organization items on white marble, pen holder, drawer organizer, planters, whiteboard, tidy workspace, 8k e-commerce"],
  ["collection-decor","professional product photography flat lay of desk decor items on white marble, felt notice board, geometric bookends, digital clock, coasters, warm aesthetic, 8k e-commerce"],
];

async function gen(p) {
  const r = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
    method:"POST", headers:{"Content-Type":"application/json", Authorization:`Bearer ${KEY}`},
    body:JSON.stringify({model:"agnes-image-2.1-flash",prompt:p,n:1,size:"1024x1024"}),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.data?.[0]?.url || null;
}

async function main() {
  console.log(`Generating ${IMGS.length} category images...\n`);
  for (let i = 0; i < IMGS.length; i++) {
    const [id, prompt] = IMGS[i];
    const fp = path.join(OUT, id + ".jpg");
    process.stdout.write(`[${i+1}/${IMGS.length}] ${id}.jpg ⏳ `);
    let ok = false;
    for (let t = 0; t < 3; t++) {
      try {
        const url = await gen(prompt);
        if (url) { const r2 = await fetch(url); fs.writeFileSync(fp, Buffer.from(await r2.arrayBuffer())); ok = true; break; }
      } catch(e) { if (t<2) { process.stdout.write("↻"); await new Promise(r=>setTimeout(r,3000)); } }
    }
    if (ok) console.log(`✅ ${(fs.statSync(fp).size/1024).toFixed(0)}KB`);
    else console.log("❌");
    await new Promise(r=>setTimeout(r,1500));
  }
  console.log(`\n✅ Done.`);
}
main();
