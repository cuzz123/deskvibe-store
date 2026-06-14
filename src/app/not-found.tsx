import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — DeskVibe",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-stone-100 border border-stone-200">
          <span className="text-5xl text-stone-400 font-bold">?</span>
        </div>
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Page Not Found</h1>
        <p className="text-stone-500 leading-relaxed mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. It may have moved, or the URL might have a typo.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-stone-800 transition"
        >
          Return to Home
        </Link>
        <div className="mt-12 pt-8 border-t border-stone-100">
          <p className="text-sm text-stone-400 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/products/walnut-monitor-riser" className="text-stone-500 hover:text-stone-900 transition underline underline-offset-2">
              Monitor Stands
            </Link>
            <Link href="/products/magnetic-cable-organizer" className="text-stone-500 hover:text-stone-900 transition underline underline-offset-2">
              Cable Management
            </Link>
            <Link href="/products/desk-makeover-kit" className="text-stone-500 hover:text-stone-900 transition underline underline-offset-2">
              Desk Makeover Kit
            </Link>
            <Link href="/faq" className="text-stone-500 hover:text-stone-900 transition underline underline-offset-2">
              FAQ
            </Link>
            <Link href="/contact" className="text-stone-500 hover:text-stone-900 transition underline underline-offset-2">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
