import { adminGetProducts } from "@/lib/actions/admin";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Plus, Edit } from "lucide-react";
import { adminDeleteProduct } from "@/lib/actions/admin";
import { revalidatePath } from "next/cache";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { seedProducts } from "@/seed/seed-products";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await adminGetProducts();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await adminDeleteProduct(id);
    }
  }

  async function handleSeed() {
    "use server";
    await seedProducts();
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath("/");
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
            Catalogue
          </span>
          <h1 className="text-3xl font-serif font-light text-charcoal mt-1">
            Gestion des Produits ({products.length})
          </h1>
        </div>
        <Link href="/admin/products/new">
          <Button variant="teal" size="md" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Ajouter un Produit</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white/70 backdrop-blur rounded-xl border border-charcoal/10 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <p className="text-sm text-charcoal/60">Aucun produit enregistré pour le moment.</p>
            <form action={handleSeed}>
              <Button type="submit" variant="teal" size="md">
                🌱 Insérer les produits de démonstration (avec images)
              </Button>
            </form>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wider text-charcoal/60 bg-parchment/50">
                  <th className="p-4">Produit</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Prix</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-charcoal/5">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-parchment rounded overflow-hidden shrink-0 border border-charcoal/10">
                        {product.image_url ? (
                          <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-charcoal/40">Img</div>
                        )}
                      </div>
                      <span className="font-serif font-medium text-charcoal line-clamp-1">{product.name}</span>
                    </td>
                    <td className="p-4 text-xs">
                      <span className="px-2.5 py-1 bg-parchment rounded text-charcoal">{product.category}</span>
                    </td>
                    <td className="p-4 font-semibold text-teal-sarcelle">{formatPrice(product.price)}</td>
                    <td className="p-4 text-xs font-semibold">{product.stock} unités</td>
                    <td className="p-4 text-right space-x-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <button className="p-2 text-teal-sarcelle hover:bg-teal-sarcelle/10 rounded transition-colors" title="Modifier">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <DeleteProductButton id={product.id} onDelete={handleDelete} />
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
