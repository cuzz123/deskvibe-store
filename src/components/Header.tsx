"use client";

import { useCartStore, useCartUIStore } from "@/lib/cart";
import { ShoppingCart, Menu, X, Search, Heart, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/collections/monitor-stands", label: "Monitor Stands" },
  { href: "/collections/cable-management", label: "Cable" },
  { href: "/collections/desk-mats", label: "Mats" },
  { href: "/collections/lighting", label: "Lighting" },
  { href: "/collections/comfort", label: "Comfort" },
  { href: "/collections/tech", label: "Tech" },
  { href: "/products/ultimate-home-office-bundle", label: "Bundle" },
];

const THEME_KEY = "deskvibe-theme";

export default function Header() {
  const itemCount = useCartStore((s) => s.itemCount);
  const openCart = useCartUIStore((s) => s.openCart);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current !== "dark";
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="bg-stone-900 text-stone-300 text-center text-xs tracking-wide py-2.5">
        Free Shipping Over $75 · 30-Day Trial ·{" "}
        <Link href="/products/desk-makeover-kit" className="text-stone-100 underline underline-offset-2">
          Shop the Complete Kit
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-[var(--text)]">
          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
            <rect x="3" y="3" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="2" />
            <rect x="8" y="8" width="12" height="4" rx="1" fill="#6366f1" />
            <rect x="8" y="16" width="8" height="4" rx="1" fill="#818cf8" />
          </svg>
          DeskVibe
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--text-secondary)]" aria-label="Main navigation">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[var(--text)] transition-colors">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" className="hidden md:flex p-2 text-[var(--text-secondary)] hover:text-[var(--text)]" aria-label="Search"><Search className="w-5 h-5" /></Link>
          <Link href="/wishlist" className="hidden md:flex p-2 text-[var(--text-secondary)] hover:text-[var(--text)]" aria-label="Wishlist"><Heart className="w-5 h-5" /></Link>
          <Link href="/auth/signin" className="hidden md:inline-flex text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] mr-1">Sign In</Link>
          <Link href="/auth/register" className="hidden md:inline-flex text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition">Register</Link>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 hidden dark:block" />
            <Moon className="w-5 h-5 block dark:hidden" />
          </button>

          <button onClick={openCart} className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text)]" aria-label={`Shopping cart, ${itemCount()} items`}>
            <ShoppingCart className="w-5 h-5" />
            {itemCount() > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-stone-900 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">{itemCount()}</span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[var(--text-secondary)]" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-6 py-2 flex flex-col">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] border-b border-[var(--border-light)] last:border-0">
              {l.label}
            </Link>
          ))}
          <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] border-b border-[var(--border-light)]">
            Sign In
          </Link>
          <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-white bg-stone-900 text-center rounded-lg mt-2 px-4">
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}
