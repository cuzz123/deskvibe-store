// Post-deploy: ping search engines with updated sitemap
// Called by Vercel deploy hook or manually: node scripts/ping-sitemap.mjs

const SITEMAP = "https://zenstone-store-weld.vercel.app/sitemap.xml";

async function ping() {
  const engines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`,
  ];

  for (const url of engines) {
    try {
      const resp = await fetch(url);
      console.log(`${url.slice(0, 30)}... → ${resp.status}`);
    } catch (e) {
      console.error(`${url}: ${e.message}`);
    }
  }
}

ping();
