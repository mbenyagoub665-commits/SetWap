import { getProducts } from "@/lib/actions/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";

export const revalidate = 60;

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const selectedCategory = searchParams.category;
  const products = await getProducts(selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
          Catalogue
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-charcoal mt-2">
          {selectedCategory ? selectedCategory : "Tous nos Produits"}
        </h1>
        <p className="mt-3 text-sm text-charcoal/70 font-sans">
          Expédition rapide sur les 58 wilayas d&apos;Algérie · Paiement à la livraison
        </p>
      </div>

      <CategoryFilter />

      <ProductGrid products={products} />
    </div>
  );
}
