import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-16">
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
          <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
            Premium desk accessories for people who care about their workspace. Designed in Stockholm, shipped worldwide.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[1.2px] text-stone-400 font-bold mb-3">Shop</h4>
          <Link href="/collections/monitor-stands" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Monitor Stands</Link>
          <Link href="/collections/cable-management" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Cable Management</Link>
          <Link href="/collections/desk-mats" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Desk Mats</Link>
          <Link href="/collections/lighting" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Lighting</Link>
          <Link href="/products/desk-makeover-kit" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Bundle</Link>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[1.2px] text-stone-400 font-bold mb-3">Support</h4>
          <Link href="/contact" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Contact Us</Link>
          <Link href="/faq" className="block text-sm text-stone-500 hover:text-stone-900 py-1">FAQ</Link>
          <Link href="/faq" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Shipping Policy</Link>
          <Link href="/faq" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Returns & Refunds</Link>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[1.2px] text-stone-400 font-bold mb-3">About</h4>
          <Link href="/about" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Our Story</Link>
          <Link href="/blog" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Blog</Link>
          <Link href="/about" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Sustainability</Link>
          <Link href="/contact" className="block text-sm text-stone-500 hover:text-stone-900 py-1">Affiliate Program</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-5 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400">
        <span>&copy; 2026 DeskVibe. All rights reserved.</span>
        <div className="flex gap-3 text-lg">💳 🏦 📱</div>
      </div>
    </footer>
  );
}
