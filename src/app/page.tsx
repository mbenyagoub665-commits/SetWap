import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryCards } from "@/components/home/CategoryCards";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/actions/products";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <CategoryCards />

      {/* Featured Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
              Sélection
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-charcoal mt-2">
              Nos Incontournables
            </h2>
          </div>
          <Link href="/products" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              Voir Tout le Catalogue →
            </Button>
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {/* Brand Editorial Banner */}
      <section className="my-20 bg-charcoal text-parchment py-24 text-center px-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.4em] text-pink-accent font-semibold">
            L&apos;Art du Soin
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wide leading-tight">
            Une Beauté Authentique & Raffinée
          </h2>
          <p className="text-parchment/80 font-sans font-light leading-relaxed max-w-xl mx-auto">
            Chaque formule est pensée pour célébrer la grâce naturelle. Des ingrédients d&apos;exception soigneusement sélectionnés pour votre bien-être au quotidien.
          </p>
          <div className="pt-4">
            <Link href="/products">
              <Button variant="pink" size="lg">
                Explorer nos Rituels
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
