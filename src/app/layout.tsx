import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { OrganizationJsonLd } from "@/components/ui/JsonLd";
import { Analytics } from "@/components/layout/Analytics";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "DeskVibe — Premium Desk Accessories for Your Workspace",
  description:
    "Warm minimalism meets functional beauty. Premium monitor stands, cable management, desk mats, and lighting designed for the modern workspace.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002"),
  openGraph: {
    title: "DeskVibe — Premium Desk Accessories",
    description: "Warm minimalism meets functional beauty.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-stone-900">
        <Providers>
          <OrganizationJsonLd />
          <Analytics />
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
