"use client";

import { useState, useEffect } from "react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-[999] bg-white border border-stone-200 rounded-xl shadow-xl p-4 text-sm">
      <p className="text-stone-600 mb-3">We use cookies to improve your experience. By continuing, you agree to our privacy policy.</p>
      <div className="flex gap-2">
        <button onClick={() => { localStorage.setItem("cookie-consent", "true"); setShow(false); }} className="px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition">Accept All</button>
        <button onClick={() => { localStorage.setItem("cookie-consent", "essential"); setShow(false); }} className="px-4 py-2 border border-stone-200 rounded-full text-xs font-semibold hover:bg-stone-50 transition">Essential Only</button>
      </div>
    </div>
  );
}
