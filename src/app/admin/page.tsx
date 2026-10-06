import { adminGetProducts, adminGetOrders } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Package, ShoppingBag, TrendingUp, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const products = await adminGetProducts();
  const orders = await adminGetOrders();

  const totalProducts = products.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalRevenue = orders
    .filter((o) => o.status === "delivered" || o.status === "confirmed")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
          Tableau de Bord
        </span>
        <h1 className="text-3xl font-serif font-light text-charcoal mt-1">
          Vue d&apos;ensemble de la Boutique
        </h1>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur p-6 rounded-xl border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Total Produits</p>
            <p className="text-3xl font-serif font-semibold text-charcoal mt-1">{totalProducts}</p>
          </div>
          <div className="w-12 h-12 bg-teal-sarcelle/10 text-teal-sarcelle rounded-full flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur p-6 rounded-xl border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Commandes en attente</p>
            <p className="text-3xl font-serif font-semibold text-pink-accent mt-1">{pendingOrders}</p>
          </div>
          <div className="w-12 h-12 bg-pink-accent/20 text-charcoal rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur p-6 rounded-xl border border-charcoal/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Chiffre d&apos;Affaires Validé</p>
            <p className="text-2xl font-serif font-semibold text-teal-sarcelle mt-1">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="w-12 h-12 bg-teal-sarcelle/10 text-teal-sarcelle rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white/70 backdrop-blur p-6 rounded-xl border border-charcoal/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-charcoal">Commandes Récentes</h2>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-wider text-teal-sarcelle hover:underline font-semibold"
          >
            Voir tout →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-charcoal/60 py-6 text-center">Aucune commande pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wider text-charcoal/60">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Téléphone</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-charcoal/5">
                    <td className="py-4 font-serif font-medium">{order.customer_name}</td>
                    <td className="py-4 text-xs">
                      <a href={`tel:${order.customer_phone}`} className="text-teal-sarcelle hover:underline">
                        {order.customer_phone}
                      </a>
                    </td>
                    <td className="py-4 font-semibold">{formatPrice(order.total)}</td>
                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold ${
                          order.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : order.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-xs text-charcoal/60">
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
