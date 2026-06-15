import { db } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: { items: { include: { product: true } }, user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Orders ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center text-stone-400">No orders yet.</div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-sm">#{order.id.slice(-8).toUpperCase()}</span>
                  <span className="text-stone-400 text-sm ml-3">{order.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${order.status === "PAID" ? "bg-emerald-100 text-emerald-700" : order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : "bg-stone-100 text-stone-600"}`}>{order.status}</span>
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-xs text-stone-400">
                {order.items.map((i) => `${i.product.name} ×${i.quantity}`).join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
