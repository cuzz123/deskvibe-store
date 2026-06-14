// Agnes AI API client — free image generation
const AGNES_KEY = process.env.AGNES_API_KEY || "";
const AGNES_BASE = "https://apihub.agnes-ai.com/v1";
const IMAGE_MODEL = "agnes-image-2.1-flash";

interface ImageResponse {
  data?: Array<{ url?: string; b64_json?: string }>;
  error?: { message: string };
}

export async function generateImage(prompt: string, width = 1024, height = 1024): Promise<string | null> {
  if (!AGNES_KEY) {
    console.warn("AGNES_API_KEY not set — skipping image generation");
    return null;
  }
  try {
    const resp = await fetch(`${AGNES_BASE}/images/generations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${AGNES_KEY}` },
      body: JSON.stringify({ model: IMAGE_MODEL, prompt, n: 1, size: `${width}x${height}` }),
    });
    const data: ImageResponse = await resp.json();
    if (data.error) {
      console.warn("Agnes error:", data.error.message);
      return null;
    }
    if (data.data?.[0]) {
      return data.data[0].url || (data.data[0].b64_json ? `data:image/png;base64,${data.data[0].b64_json}` : null);
    }
    return null;
  } catch (e) {
    console.warn("Agnes API error:", e);
    return null;
  }
}

// Pre-generate all product images and save to public/images/
export async function preGenerateImages(products: Array<{ id: number; imagePrompt: string; slug: string }>) {
  console.log(`Generating ${products.length} product images via Agnes AI...`);
  for (const p of products) {
    console.log(`  [${p.id}] ${p.slug}...`);
    const url = await generateImage(p.imagePrompt);
    if (url) {
      console.log(`    ✅ ${url.slice(0, 60)}...`);
    } else {
      console.log(`    ⚠️  Failed — will use gradient fallback`);
    }
    // Rate limit: 1 request per 2 seconds
    await new Promise((r) => setTimeout(r, 2000));
  }
}
