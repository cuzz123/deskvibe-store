import { db } from "@/lib/db";
import { Package, ShoppingBag, Users } from "lucide-react";

export const metadata = { title: "Admin — DeskVibe" };

export default async function AdminDashboard() {
  const [productCount, orderCount, userCount] = await Promise.all([
    db.product.count(),
    db.order.count(),
    db.user.count(),
  ]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white border border-stone-100 rounded-xl p-6">
        <Package className="w-6 h-6 text-stone-500 mb-2" aria-hidden="true" />
        <div className="text-3xl font-bold text-stone-900">{productCount}</div>
        <div className="text-sm text-stone-500">Products</div>
      </div>
      <div className="bg-white border border-stone-100 rounded-xl p-6">
        <ShoppingBag className="w-6 h-6 text-stone-500 mb-2" aria-hidden="true" />
        <div className="text-3xl font-bold text-stone-900">{orderCount}</div>
        <div className="text-sm text-stone-500">Orders</div>
      </div>
      <div className="bg-white border border-stone-100 rounded-xl p-6">
        <Users className="w-6 h-6 text-stone-500 mb-2" aria-hidden="true" />
        <div className="text-3xl font-bold text-stone-900">{userCount}</div>
        <div className="text-sm text-stone-500">Users</div>
      </div>
    </div>
  );
}
