import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, LogOut, Store, Truck } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    "use server";
    cookies().set("chahra_admin_auth", "", { maxAge: 0 });
    redirect("/admin/login");
  };

  return (
    <div className="min-h-screen bg-parchment flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-parchment flex flex-col justify-between hidden md:flex shrink-0">
        <div className="p-6 space-y-8">
          <div>
            <span className="text-xl font-serif font-light tracking-[0.2em] text-parchment">
              CHAHRA
            </span>
            <span className="block text-[8px] uppercase tracking-[0.4em] text-pink-accent font-semibold">
              Admin Dashboard
            </span>
          </div>

          <nav className="space-y-2 text-sm uppercase tracking-wider font-sans">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-parchment/10 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-pink-accent" />
              <span>Vue d&apos;ensemble</span>
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-parchment/10 transition-colors"
            >
              <Package className="w-4 h-4 text-pink-accent" />
              <span>Produits</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-parchment/10 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-pink-accent" />
              <span>Commandes</span>
            </Link>
            <Link
              href="/admin/delivery-rates"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-parchment/10 transition-colors"
            >
              <Truck className="w-4 h-4 text-pink-accent" />
              <span>Tarifs Livraison</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-parchment/10 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-wider text-parchment/70 hover:text-parchment transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Voir la Boutique</span>
          </Link>
          <form action={handleLogout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2 text-xs uppercase tracking-wider text-pink-accent hover:opacity-80 transition-opacity text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-charcoal text-parchment p-4 flex items-center justify-between md:hidden">
          <div>
            <span className="text-lg font-serif font-light">CHAHRA Admin</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] uppercase">
            <Link href="/admin" className="hover:text-pink-accent">Accueil</Link>
            <Link href="/admin/products" className="hover:text-pink-accent">Produits</Link>
            <Link href="/admin/orders" className="hover:text-pink-accent">Commandes</Link>
            <Link href="/admin/delivery-rates" className="hover:text-pink-accent">Tarifs</Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
