// Add products 41-75 and generate their images
import fs from "fs";
import path from "path";

const KEY = process.env.AGNES_API_KEY;
if (!KEY) { console.error("AGNES_API_KEY not set"); process.exit(1); }
const OUT = path.join(process.cwd(), "public", "images");

const NEW = [
  // Monitor Stand (4)
  [41,"Floating Monitor Shelf — Walnut","monitor-stand","Wall-mounted solid walnut shelf. Hidden bracket. Cable pass-through. Supports 30 lbs. 60cm wide.",59.99,79.99,"floating walnut wood monitor wall shelf above desk, minimal hidden bracket, clean, 8k e-commerce"],
  [42,"Dual Monitor Riser — Extra Wide","monitor-stand","100cm wide walnut riser for dual screens. 2 drawers + center cable cutout. Supports 80 lbs.",79.99,99.99,"extra wide walnut dual monitor stand riser on long desk, two drawers, spacious, 8k e-commerce"],
  [43,"Adjustable Monitor Arm — Silver","monitor-stand","Polished aluminum. 360° rotation. 13-32\". Integrated USB 3.0 hub. Gas spring.",99.99,null,"silver aluminum adjustable monitor arm on clean desk, polished metal, modern, 8k e-commerce"],
  [44,"Kids Monitor Stand — White Oak","monitor-stand","Child-height solid oak riser. Rounded corners. Cable management. For study desks.",44.99,59.99,"small white oak wood monitor stand for kids desk, rounded corners, Scandinavian, 8k e-commerce"],

  // Cable Management (3)
  [45,"Cable Raceway Kit — 6 Pack","cable-management","Adhesive-backed PVC channels. Paintable white. 40cm each. Includes connectors.",19.99,null,"white adhesive cable raceway channels neatly installed on wall above desk, organized cables, 8k e-commerce"],
  [46,"Power Strip Holder — Under Desk","cable-management","Clamp-mount steel bracket. Fits all standard power strips. No drilling needed.",14.99,null,"black metal under desk power strip holder bracket, power strip securely mounted, clean, 8k e-commerce"],
  [47,"USB Cable Organizer Box","cable-management","Bamboo lid, ABS body. Hides power strip + excess cables. 33×14×13cm. Ventilated.",24.99,34.99,"bamboo wood cable management box on desk, hiding power strip and cables inside, neat, 8k e-commerce"],

  // Desk Mats (3)
  [48,"Leather Desk Mat — Brown","desk-mat","Genuine top-grain leather. Suede underside. 90×43cm. Ages beautifully. Brown.",59.99,79.99,"brown genuine leather desk mat on wooden desk, premium texture, keyboard and mouse, luxury, 8k e-commerce"],
  [49,"Cork Desk Mat — Natural","desk-mat","Sustainable Portuguese cork. 90×43cm. Naturally antimicrobial. Lightweight.",29.99,null,"natural cork desk mat on white desk, sustainable material texture, minimal eco, 8k e-commerce"],
  [50,"Extended Desk Mat — XXL Black","desk-mat","120×60cm. Micro-woven fabric. Waterproof. Stitched edges. Covers full desk.",49.99,64.99,"extra large black extended desk mat covering entire desk surface, keyboard mouse monitor all on mat, 8k e-commerce"],

  // Lighting (4)
  [51,"Screen Bar Pro — Dual Light","lighting","Front + back dual lighting. Auto-dimming sensor. Wireless remote. USB-C.",69.99,89.99,"premium dual light monitor screen bar with front and back glow, auto dimming, modern desk, 8k e-commerce"],
  [52,"Desk Lamp — Wood Accent","lighting","Walnut veneer base + brass stem. Dimmable LED. Mid-century modern design.",79.99,null,"mid century modern desk lamp with walnut wood base and brass stem, warm glow, elegant, 8k e-commerce"],
  [53,"Under-Shelf LED Strip — 3 Pack","lighting","Motion sensor. Rechargeable battery. Magnetic mount. 30cm each. Warm white.",34.99,null,"motion sensor LED strip light mounted under shelf above desk, warm glow, hands free, 8k e-commerce"],
  [54,"Ring Light — Video Call Kit","lighting","10\" diameter. 3 color modes + 10 brightness levels. Tripod + phone holder included.",39.99,54.99,"desk ring light with tripod for video calls, soft even lighting, webcam setup, 8k e-commerce"],

  // Desk Organization (5)
  [55,"Stackable Paper Tray — Walnut","desk-organization","Solid walnut. 3-tier modular tray. Felt-lined. Fits A4/Letter. Stackable.",49.99,null,"walnut wood three tier stackable paper tray on desk with papers, organized, warm, 8k e-commerce"],
  [56,"Sticky Note Holder — Walnut","desk-organization","Solid walnut base. Holds 3×3\" notes. Pen slot. Weighted. Non-slip bottom.",19.99,null,"walnut wood sticky note holder with pen on desk, minimalist, warm, 8k e-commerce"],
  [57,"Trash Can — Matte Black","desk-organization","6L capacity. Powder-coated steel. Soft-close lid. Removable inner bucket.",34.99,null,"matte black metal small desk trash can with lid, minimalist, modern office, 8k e-commerce"],
  [58,"Letter Sorter — Bamboo","desk-organization","5 compartments. Vertical design saves desk space. Fits envelopes and mail.",29.99,39.99,"bamboo wood vertical letter sorter organizer on desk with mail, compact, 8k e-commerce"],
  [59,"Rolling Desk Drawer — White","desk-organization","3 drawers on casters. Fits under standard desks. Metal + MDF. Lockable.",69.99,89.99,"white rolling three drawer desk storage unit under desk, organized, modern office, 8k e-commerce"],

  // Comfort (4)
  [60,"Gel Wrist Rest — Black","comfort","Cooling gel + memory foam. Lycra cover. Non-slip. Full-size keyboard width.",24.99,null,"black gel ergonomic keyboard wrist rest on desk, cooling gel texture, modern, 8k e-commerce"],
  [61,"Seat Cushion — Memory Foam","comfort","High-density foam. Washable 3D mesh cover. Non-slip bottom. 45×40×8cm.",44.99,59.99,"grey memory foam seat cushion on black office chair, ergonomic support, 8k e-commerce"],
  [62,"Monitor Stand Riser — Adjustable Height","comfort","3 height levels (10/13/16cm). Steel frame + wood top. Ergonomic eye level.",44.99,null,"adjustable height steel and wood monitor stand riser, three levels, ergonomic desk, 8k e-commerce"],
  [63,"Standing Desk Balance Board","comfort","Curved rocker design. Anti-slip surface. Core engagement while standing. 66×33cm.",49.99,null,"wooden standing desk balance board on floor, ergonomic active standing, modern office, 8k e-commerce"],

  // Tech (5)
  [64,"USB-C Hub — 12-in-1 Pro","tech","Dual HDMI, 3×USB-A, 2×USB-C, SD, Ethernet, Audio. 100W PD. Aluminum.",79.99,99.99,"premium aluminum 12 in 1 USB-C hub on desk, multiple ports, professional, 8k e-commerce"],
  [65,"Vertical Laptop Stand — Dual","tech","Holds 2 laptops side by side. Adjustable width. Aluminum. Non-slip base.",39.99,null,"aluminum vertical dual laptop stand holder on desk, two MacBooks stored vertically, space saving, 8k e-commerce"],
  [66,"Screen Cleaning Kit","tech","Microfiber cloth + plant-based spray. Anti-static. Safe for all screens. 100ml.",14.99,null,"screen cleaning kit with microfiber cloth and spray bottle on desk, clean, 8k e-commerce"],
  [67,"Monitor Privacy Filter — 24\"","tech","Anti-glare + privacy. Magnetic attachment. 16:9. Blocks side viewing angles.",39.99,54.99,"monitor privacy filter screen on display, anti glare, security, office, 8k e-commerce"],
  [68,"Air Duster — Rechargeable","tech","Brushless motor. 50000 RPM. USB-C recharge. For keyboards and electronics.",29.99,null,"rechargeable electric air duster for keyboard cleaning on desk, powerful, black, 8k e-commerce"],

  // Decor (4)
  [69,"Mini Succulent Set — 3 Pack","decor","Real live succulents in concrete pots. Low maintenance. Desk-friendly size.",24.99,null,"three small real succulent plants in concrete mini pots on desk, natural light, 8k e-commerce"],
  [70,"LED Neon Sign — Focus","decor","\"FOCUS\" word in warm white LED. Dimmable. USB powered. 40cm wide.",34.99,44.99,"warm white LED neon sign saying FOCUS on wall above desk, motivational, modern workspace, 8k"],
  [71,"Hourglass — 30 Minute","decor","Hand-blown glass. Black sand. Solid walnut base. Desk timer / decor piece.",44.99,null,"elegant black sand hourglass with walnut wood base on desk, 30 minute timer, decorative, 8k e-commerce"],
  [72,"Magnetic Photo Frame — 3 Pack","decor","Acrylic magnetic frames. 10×15cm. Wall-mount or desk-stand. Easy swap photos.",19.99,null,"acrylic magnetic photo frames on desk with photos, modern clear design, 8k e-commerce"],

  // Bundle (3)
  [73,"Cable Management Kit","bundle","Magnetic Clips 8pk + Cable Tray + Sleeves 4pk + Velcro 50pk. Save 20%.",59.99,74.96,"flat lay of cable management kit bundle, magnetic clips tray sleeves velcro ties, organized, 8k e-commerce"],
  [74,"Ergonomic Starter Kit","bundle","Wrist Rest + Lumbar Cushion + Footrest + Seat Cushion. Save 25%.",119.99,159.96,"flat lay of ergonomic office accessories bundle, wrist rest lumbar footrest seat cushion, 8k e-commerce"],
  [75,"Desk Aesthetics Set","bundle","Walnut Riser + LED Bar + Linen Mat + Desk Clock + Planter. Save 20%.",149.99,188.95,"flat lay of desk aesthetics bundle, walnut stand light bar linen mat clock planter, premium, 8k e-commerce"],
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
  console.log(`Generating ${NEW.length} new product images...\n`);
  for (let i = 0; i < NEW.length; i++) {
    const [id,,,,,prompt] = NEW[i];
    const fp = path.join(OUT, `product-${id}.jpg`);
    if (fs.existsSync(fp)) { console.log(`[${i+1}/${NEW.length}] product-${id}.jpg ✅ cached`); continue; }
    process.stdout.write(`[${i+1}/${NEW.length}] product-${id}.jpg ⏳ `);
    let ok = false;
    for (let t = 0; t < 3; t++) {
      try {
        const url = await gen(prompt);
        if (url) { const r2 = await fetch(url); fs.writeFileSync(fp, Buffer.from(await r2.arrayBuffer())); ok = true; break; }
      } catch(e) { if (t<2) { process.stdout.write("↻"); await new Promise(r=>setTimeout(r,3000)); } }
    }
    if (ok) console.log(`✅ ${(fs.statSync(fp).size/1024).toFixed(0)}KB`);
    else console.log("❌");
    await new Promise(r=>setTimeout(r,3500));
  }
  // Output product data JSON for merging
  const products = NEW.map(([id,name,cat,desc,price,cmp,pr]) => ({
    id,name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),category:cat.split("-").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ").replace("Monitor Stand","Monitor Stand").replace("Cable Management","Cable Management").replace("Desk Mat","Desk Mat").replace("Desk Organization","Desk Organization"),description:desc,price,compareAt:cmp,rating:4.5+Math.random()*0.4,reviews:Math.floor(100+Math.random()*500),badge:null,badgeClass:"",imagePrompt:pr,imageUrl:`/images/product-${id}.jpg`
  }));
  fs.writeFileSync(path.join(process.cwd(),"scripts","new-products.json"),JSON.stringify(products,null,2));
  console.log(`\n✅ ${NEW.length} images + product data JSON saved`);
}
main();
