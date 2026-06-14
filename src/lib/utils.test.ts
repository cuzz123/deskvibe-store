import { describe, it, expect } from "vitest";
import { formatPrice, slugify, cn } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats a number correctly", () => {
    expect(formatPrice(49.99)).toBe("$49.99");
  });

  it("formats an integer", () => {
    expect(formatPrice(50)).toBe("$50.00");
  });

  it("handles string input", () => {
    expect(formatPrice("29.99")).toBe("$29.99");
  });

  it("handles null", () => {
    expect(formatPrice(null)).toBe("$0.00");
  });

  it("handles undefined", () => {
    expect(formatPrice(undefined)).toBe("$0.00");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("formats large numbers with commas", () => {
    expect(formatPrice(1299.99)).toBe("$1,299.99");
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("Walnut Monitor Riser")).toBe("walnut-monitor-riser");
  });

  it("handles special characters", () => {
    expect(slugify("Hello! World?")).toBe("hello-world");
  });

  it("handles multiple spaces and dashes", () => {
    expect(slugify("  hello   world  ")).toBe("hello-world");
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});
