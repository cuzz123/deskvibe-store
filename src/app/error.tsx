"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Page error:", error); }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-stone-500 mb-6">An unexpected error occurred. Please try again.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-stone-900 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-stone-800 transition">Try Again</button>
          <Link href="/" className="border border-stone-200 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-stone-50 transition">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
