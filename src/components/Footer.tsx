import Link from "next/link";
import { Shield, Truck, Leaf, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--border-light)] border-t border-[var(--border)] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none">
              <rect x="3" y="3" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="2"/>
              <rect x="8" y="8" width="12" height="4" rx="1" fill="#6366f1"/>
              <rect x="8" y="16" width="8" height="4" rx="1" fill="#818cf8"/>
            </svg>
            DeskVibe
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
            Premium desk accessories for people who care about their workspace. Designed in Stockholm, shipped worldwide.
          </p>
          {/* Trust badges inline */}
          <div className="flex flex-wrap gap-3 mt-4 text-xs text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-indigo-600" /> Secure Checkout</span>
            <span className="inline-flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-indigo-600" /> Free Shipping $75+</span>
            <span className="inline-flex items-center gap-1"><Leaf className="w-3.5 h-3.5 text-indigo-600" /> FSC-Certified</span>
            <span className="inline-flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-indigo-600" /> 30-Day Trial</span>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[1.2px] text-[var(--text-secondary)] font-bold mb-3">Shop</h4>
          <Link href="/collections/monitor-stands" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Monitor Stands</Link>
          <Link href="/collections/cable-management" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Cable Management</Link>
          <Link href="/collections/desk-mats" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Desk Mats</Link>
          <Link href="/collections/lighting" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Lighting</Link>
          <Link href="/collections/comfort" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Comfort</Link>
          <Link href="/collections/tech" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Tech</Link>
          <Link href="/products/ultimate-home-office-bundle" className="block text-sm text-indigo-600 font-medium hover:text-indigo-700 py-1">Ultimate Bundle</Link>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[1.2px] text-[var(--text-secondary)] font-bold mb-3">Support</h4>
          <Link href="/contact" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Contact Us</Link>
          <Link href="/faq" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">FAQ</Link>
          <Link href="/shipping" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Shipping Policy</Link>
          <Link href="/refund" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Returns & Refunds</Link>
          <Link href="/track-order" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Track Order</Link>
          <Link href="/terms" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Terms of Service</Link>
          <Link href="/privacy" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Privacy Policy</Link>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[1.2px] text-[var(--text-secondary)] font-bold mb-3">About</h4>
          <Link href="/about" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Our Story</Link>
          <Link href="/blog" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Blog</Link>
          <Link href="/about" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Sustainability</Link>
          <Link href="/contact" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text)] py-1">Affiliate Program</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-5 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-secondary)]">
        <span>&copy; 2026 DeskVibe. All rights reserved.</span>
        <div className="flex items-center gap-4 text-[var(--text-muted)]">
          <span>Visa</span><span>Mastercard</span><span>PayPal</span><span>Amex</span>
        </div>
      </div>
    </footer>
  );
}
