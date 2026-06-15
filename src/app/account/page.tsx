import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, Package, User } from "lucide-react";
import { db } from "@/lib/db";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const orders = await db.order.findMany({
    where: { userId: (session.user as any).id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center"><User className="w-6 h-6 text-indigo-600" /></div>
          <div>
            <h1 className="text-xl font-bold">{session.user.name}</h1>
            <p className="text-sm text-stone-500">{session.user.email}</p>
          </div>
        </div>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
          <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-full text-sm font-medium hover:bg-stone-50 transition"><LogOut className="w-4 h-4" />Sign Out</button>
        </form>
      </div>

      <h2 className="text-lg font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="bg-stone-50 rounded-xl p-8 text-center text-stone-400">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p>No orders yet.</p>
          <Link href="/" className="text-indigo-600 text-sm font-semibold hover:underline">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">#{order.id.slice(-8).toUpperCase()}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${order.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-600"}`}>{order.status}</span>
              </div>
              <div className="text-xs text-stone-400 mb-1">{order.items.map((i) => `${i.product.name} ×${i.quantity}`).join(", ")}</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
