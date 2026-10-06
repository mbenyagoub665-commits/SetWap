import { adminGetProducts, adminUpdateProduct } from "@/lib/actions/admin";
import { Product, ProductCategory } from "@/lib/types/database";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CATEGORIES: ProductCategory[] = [
  "Soins du Visage",
  "Maquillage",
  "Soins du Corps",
  "Parfums",
  "Cheveux",
];

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const products = await adminGetProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as ProductCategory;
    const image_url = formData.get("image_url") as string;

    await adminUpdateProduct(params.id, {
      name,
      description,
      price,
      stock,
      category,
      image_url: image_url || null,
    });

    redirect("/admin/products");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      <Link
        href="/admin/products"
        className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal/70 hover:text-teal-sarcelle transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux Produits
      </Link>

      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
          Modification
        </span>
        <h1 className="text-3xl font-serif font-light text-charcoal mt-1">
          Modifier : {product.name}
        </h1>
      </div>

      <form action={handleUpdate} className="bg-white/70 backdrop-blur p-8 rounded-xl border border-charcoal/10 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Nom du Produit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={product.name}
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Prix (DZD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                defaultValue={product.price}
                className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                required
                defaultValue={product.stock}
                className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              defaultValue={product.category}
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={product.description || ""}
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              URL de l&apos;Image
            </label>
            <input
              type="text"
              name="image_url"
              defaultValue={product.image_url || ""}
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            />
          </div>
        </div>

        <Button type="submit" variant="teal" size="lg" className="w-full">
          Mettre à Jour
        </Button>
      </form>
    </div>
  );
}
