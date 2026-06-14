import fs from "fs"; import path from "path";
const KEY = process.env.AGNES_API_KEY;
if (!KEY) { console.error("AGNES_API_KEY not set"); process.exit(1); }
const OUT = path.join(process.cwd(), "public", "images");

const IMGS = [
  ["product-21","professional product photo of bamboo wood monitor stand riser on white desk, natural bamboo grain, phone slot, minimalist, 8k e-commerce"],
  ["product-22","professional product photo of light oak wood monitor stand riser on white desk, pale Scandinavian wood, clean, 8k e-commerce"],
  ["product-23","professional product photo of black expandable braided cable sleeve covering multiple cables neatly on desk, organized, 8k e-commerce"],
  ["product-24","professional product photo of aluminum round desk cable grommet installed in wooden desk surface, cables passing through, 8k"],
  ["product-25","professional product photo of charcoal grey wool felt desk mat on wooden desk, premium thick texture, keyboard on it, 8k e-commerce"],
  ["product-26","professional product photo of RGB LED strip behind monitor on desk, colorful ambient backlight glow, gaming setup, 8k"],
  ["product-27","professional product photo of modern desk lamp with built in wireless charging base, phone charging, minimalist workspace, 8k e-commerce"],
  ["product-28","professional product photo of bamboo drawer organizer set with pens and stationery neatly arranged inside clean desk drawer, 8k e-commerce"],
  ["product-29","professional product photo of small glass magnetic whiteboard on desk with markers and handwritten notes, modern workspace, 8k e-commerce"],
  ["product-30","professional product photo of grey mesh lumbar support cushion on black office chair, ergonomic, clean, 8k e-commerce"],
  ["product-31","professional product photo of black anti fatigue standing desk mat on floor in modern office, ergonomic, 8k e-commerce"],
  ["product-32","professional product photo of grey wool felt keyboard mat under mechanical keyboard on wooden desk, sound dampening texture, 8k e-commerce"],
  ["product-33","professional product photo of walnut wood wireless charging pad on desk with iPhone charging on it, warm wood, clean, 8k e-commerce"],
  ["product-34","professional product photo of grey wool felt laptop sleeve on desk next to MacBook, premium texture, minimal, 8k e-commerce"],
  ["product-35","professional product photo of braided nylon USB-C to HDMI cable neatly coiled on white desk, aluminum connectors, 8k e-commerce"],
  ["product-36","professional product photo of grey felt notice board on wall above desk, photos and notes pinned, clean workspace, 8k"],
  ["product-37","professional product photo of modern geometric metal bookends holding design books on wooden desk shelf, sculptural, 8k e-commerce"],
  ["product-38","professional product photo of minimal wood digital alarm clock on desk showing time, warm LED digits, clean workspace, 8k e-commerce"],
  ["product-39","professional product photo of six colorful wool felt coasters stacked on wooden desk, clean warm aesthetic, 8k e-commerce"],
  ["product-40","professional product photo flat lay of complete home office accessories bundle, monitor riser desk mat lamp lumbar cushion footrest charger, 8k e-commerce"],
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
  console.log(`Generating ${IMGS.length} images...\n`);
  let ok = 0;
  for (let i = 0; i < IMGS.length; i++) {
    const [id, prompt] = IMGS[i];
    const fp = path.join(OUT, id + ".jpg");
    if (fs.existsSync(fp)) { console.log(`[${i+1}/${IMGS.length}] ${id}.jpg ✅ cached`); ok++; continue; }
    process.stdout.write(`[${i+1}/${IMGS.length}] ${id}.jpg ⏳ `);
    for (let t = 0; t < 3; t++) {
      try {
        const url = await gen(prompt);
        if (url) { const r2 = await fetch(url); fs.writeFileSync(fp, Buffer.from(await r2.arrayBuffer())); ok++; break; }
      } catch(e) { if (t<2) { process.stdout.write("↻"); await new Promise(r=>setTimeout(r,3000)); } }
    }
    if (fs.existsSync(fp)) console.log(`✅ ${(fs.statSync(fp).size/1024).toFixed(0)}KB`);
    else console.log("❌");
    await new Promise(r=>setTimeout(r,1500));
  }
  console.log(`\n✅ ${ok}/${IMGS.length} generated`);
}
main();
