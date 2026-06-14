"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#1c1917", color: "#fff", borderRadius: "12px", fontSize: "14px" },
        }}
      />
    </>
  );
}
