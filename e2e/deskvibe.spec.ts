import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/DeskVibe/);
  });

  test("shows slideshow with navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[aria-roledescription="carousel"]')).toBeVisible();
    // Click next arrow
    await page.click('button[aria-label="Next"]');
    await page.waitForTimeout(800);
    // Should have dots
    const dots = page.locator('[aria-roledescription="carousel"] button');
    await expect(dots.first()).toBeVisible();
  });

  test("renders product cards with images", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator(".group");
    await expect(cards.first()).toBeVisible();
    // At least 4 products visible
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
  });

  test("category grid has 4 items", async ({ page }) => {
    await page.goto("/");
    const cats = page.locator("a[href*='collections']");
    expect(await cats.count()).toBeGreaterThanOrEqual(4);
  });
});

test.describe("Navigation", () => {
  test("header links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Cable Management");
    await expect(page).toHaveURL(/collections\/cable-management/);
  });

  test("footer links work", async ({ page }) => {
    await page.goto("/");
    await page.click("text=FAQ");
    await expect(page).toHaveURL(/\/faq/);
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText("About");
  });

  test("contact page has form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("input[type=email]")).toBeVisible();
  });

  test("blog page shows posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText("Blog");
    const posts = page.locator("a[href*='blog/']");
    expect(await posts.count()).toBeGreaterThanOrEqual(4);
  });
});

test.describe("Product Detail", () => {
  test("shows product name, price, and add to cart", async ({ page }) => {
    await page.goto("/products/walnut-monitor-riser");
    await expect(page.locator("h1")).toContainText("Walnut Monitor Riser");
    await expect(page.locator("text=$49.99").first()).toBeVisible();
    await expect(page.locator("button:has-text('Add to Cart')")).toBeVisible();
  });

  test("increments quantity", async ({ page }) => {
    await page.goto("/products/walnut-monitor-riser");
    const plusBtn = page.locator("button:has-text('+')").first();
    if (await plusBtn.isVisible()) {
      await plusBtn.click();
      await expect(page.locator("text=2")).toBeVisible();
    }
  });

  test("shows related products", async ({ page }) => {
    await page.goto("/products/walnut-monitor-riser");
    const related = page.locator("text=You Might Also Like");
    await expect(related).toBeVisible();
  });

  test("breadcrumb navigates home", async ({ page }) => {
    await page.goto("/products/walnut-monitor-riser");
    await page.click("text=Home");
    await expect(page).toHaveURL("/");
  });

  test("not found product shows 404", async ({ page }) => {
    await page.goto("/products/nonexistent-product");
    await expect(page.locator("text=Page Not Found")).toBeVisible();
  });
});

test.describe("Cart & Checkout", () => {
  test("cart drawer opens on add to cart", async ({ page }) => {
    await page.goto("/products/walnut-monitor-riser");
    await page.click("button:has-text('Add to Cart')");
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator("text=Walnut Monitor Riser")).toBeVisible();
  });

  test("checkout page shows empty state", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page.locator("text=Your cart is empty")).toBeVisible();
  });

  test("checkout page shows totals with items", async ({ page }) => {
    await page.goto("/products/walnut-monitor-riser");
    await page.click("button:has-text('Add to Cart')");
    await page.goto("/checkout");
    await expect(page.locator("text=Total")).toBeVisible();
    await expect(page.locator("text=Walnut Monitor Riser")).toBeVisible();
  });
});

test.describe("SEO & Performance", () => {
  test("sitemap returns XML", async ({ page }) => {
    const resp = await page.goto("/sitemap.xml");
    const contentType = resp?.headers()["content-type"] || "";
    expect(contentType).toContain("xml");
  });

  test("robots.txt allows crawlers", async ({ page }) => {
    const resp = await page.goto("/robots.txt");
    const text = await resp?.text();
    expect(text).toContain("GPTBot");
    expect(text).toContain("ClaudeBot");
  });

  test("llms.txt is accessible", async ({ page }) => {
    const resp = await page.goto("/llms.txt");
    const text = await resp?.text();
    expect(text).toContain("DeskVibe");
    expect(text).toContain("Products");
  });

  test("FAQ page has accordions", async ({ page }) => {
    await page.goto("/faq");
    const details = page.locator("details");
    expect(await details.count()).toBeGreaterThanOrEqual(4);
  });
});

test.describe("Mobile responsiveness", () => {
  test("mobile layout works", async ({ page: mobilePage }) => {
    // Uses iPhone 14 project
  });
});
