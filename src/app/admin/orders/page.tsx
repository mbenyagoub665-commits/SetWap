import { adminGetOrders, adminUpdateOrderStatus } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/database";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await adminGetOrders();

  async function handleStatusChange(formData: FormData) {
    "use server";
    const orderId = formData.get("orderId") as string;
    const status = formData.get("status") as OrderStatus;
    if (orderId && status) {
      await adminUpdateOrderStatus(orderId, status);
    }
  }

  return (
    <div className="space-y-8 font-sans">
      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
          Suivi
        </span>
        <h1 className="text-3xl font-serif font-light text-charcoal mt-1">
          Gestion des Commandes ({orders.length})
        </h1>
      </div>

      <div className="bg-white/70 backdrop-blur rounded-xl border border-charcoal/10 shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">Aucune commande enregistrée pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wider text-charcoal/60 bg-parchment/50">
                  <th className="p-4">Client & Coordonnées</th>
                  <th className="p-4">Articles Commandés</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Statut actuel</th>
                  <th className="p-4 text-right">Mettre à jour</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {orders.map((order) => {
                  const itemsList = Array.isArray(order.items) ? order.items : [];
                  return (
                    <tr key={order.id} className="hover:bg-charcoal/5 align-top">
                      <td className="p-4 space-y-1">
                        <p className="font-serif font-semibold text-charcoal text-base">{order.customer_name}</p>
                        <p className="text-xs">
                          <a href={`tel:${order.customer_phone}`} className="text-teal-sarcelle font-semibold hover:underline">
                            📞 {order.customer_phone}
                          </a>
                        </p>
                        <p className="text-[11px] text-charcoal/50">
                          {new Date(order.created_at).toLocaleString("fr-FR")}
                        </p>
                      </td>
                      <td className="p-4">
                        <ul className="space-y-1 text-xs text-charcoal/80 max-w-xs">
                          {itemsList.map((item: any, idx: number) => (
                            <li key={idx} className="flex justify-between gap-2">
                              <span className="truncate">▪ {item.name}</span>
                              <span className="shrink-0 font-semibold">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4 font-semibold text-teal-sarcelle">{formatPrice(order.total)}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded text-[10px] uppercase tracking-wider font-semibold ${
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
                      <td className="p-4 text-right">
                        <form action={handleStatusChange} className="flex items-center justify-end gap-2">
                          <input type="hidden" name="orderId" value={order.id} />
                          <select
                            name="status"
                            defaultValue={order.status}
                            className="px-3 py-1.5 bg-parchment border border-charcoal/20 rounded text-xs font-semibold text-charcoal focus:outline-none"
                          >
                            <option value="pending">En attente (Pending)</option>
                            <option value="confirmed">Confirmée (Confirmed)</option>
                            <option value="delivered">Livrée (Delivered)</option>
                          </select>
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-teal-sarcelle text-white rounded text-xs hover:bg-teal-dark transition-colors"
                          >
                            OK
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
