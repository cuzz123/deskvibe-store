import fs from "fs";
import path from "path";

// Read key from .env.local
const envContent = fs.readFileSync(".env.local", "utf8");
const keyMatch = envContent.match(/AGNES_API_KEY=(.+)/);
if (!keyMatch) { console.error("AGNES_API_KEY not found in .env.local"); process.exit(1); }
const KEY = keyMatch[1].trim();

const OUT = path.join("public", "images");
const NEW = JSON.parse(fs.readFileSync("scripts/new-products.json", "utf8"));

async function gen(prompt) {
  const r = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + KEY },
    body: JSON.stringify({ model: "agnes-image-2.1-flash", prompt, n: 1, size: "1024x1024" }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.data?.[0]?.url || null;
}

async function main() {
  const todo = NEW.filter(p => !fs.existsSync(path.join(OUT, "product-" + p.id + ".jpg")));
  console.log("Missing images:", todo.length, "of", NEW.length);

  if (todo.length === 0) { console.log("All images already generated!"); return; }

  let ok = 0;
  for (let i = 0; i < todo.length; i++) {
    const p = todo[i];
    const fp = path.join(OUT, "product-" + p.id + ".jpg");
    process.stdout.write("[" + (i+1) + "/" + todo.length + "] product-" + p.id + ".jpg ");

    let success = false;
    for (let t = 0; t < 3; t++) {
      try {
        const url = await gen(p.imagePrompt);
        if (url) {
          const r2 = await fetch(url);
          fs.writeFileSync(fp, Buffer.from(await r2.arrayBuffer()));
          success = true; ok++; break;
        }
      } catch (e) {
        if (t < 2) { process.stdout.write("."); await new Promise(r => setTimeout(r, 4000)); }
        else process.stdout.write("FAIL(" + e.message.slice(0, 30) + ")");
      }
    }
    if (success) console.log(" OK " + (fs.statSync(fp).size / 1024).toFixed(0) + "KB");
    else console.log("");
    // 4s gap = 15 RPM
    if (i < todo.length - 1) await new Promise(r => setTimeout(r, 4000));
  }
  console.log("\nDone:", ok, "/", todo.length);
}
main();
