import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingBag, Tag, LayoutDashboard } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/auth/signin");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <div className="flex gap-6">
        <nav className="w-48 flex-shrink-0 space-y-1">
          <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100"><LayoutDashboard className="w-4 h-4" />Dashboard</Link>
          <Link href="/admin/products" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100"><Package className="w-4 h-4" />Products</Link>
          <Link href="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100"><ShoppingBag className="w-4 h-4" />Orders</Link>
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
