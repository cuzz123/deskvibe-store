import { db } from "@/lib/db";
import { Package, ShoppingBag, Users } from "lucide-react";

export default async function AdminDashboard() {
  const [productCount, orderCount, userCount] = await Promise.all([
    db.product.count(),
    db.order.count(),
    db.user.count(),
  ]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <Package className="w-6 h-6 text-indigo-600 mb-2" />
        <div className="text-3xl font-bold">{productCount}</div>
        <div className="text-sm text-stone-500">Products</div>
      </div>
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <ShoppingBag className="w-6 h-6 text-emerald-600 mb-2" />
        <div className="text-3xl font-bold">{orderCount}</div>
        <div className="text-sm text-stone-500">Orders</div>
      </div>
      <div className="bg-white border border-stone-200 rounded-xl p-6">
        <Users className="w-6 h-6 text-amber-600 mb-2" />
        <div className="text-3xl font-bold">{userCount}</div>
        <div className="text-sm text-stone-500">Users</div>
      </div>
    </div>
  );
}
