"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types/database";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white/60 backdrop-blur border border-charcoal/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square bg-parchment overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-charcoal/40 text-xs">
            Aucune image
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="bg-parchment/90 backdrop-blur text-charcoal text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Quick action buttons on hover */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity px-4">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-parchment/90 backdrop-blur">
              <Eye className="w-4 h-4 mr-1" /> Détails
            </Button>
          </Link>
          <Button
            variant="teal"
            size="sm"
            onClick={() => addToCart(product)}
            className="flex-1"
          >
            <ShoppingBag className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-medium text-lg text-charcoal line-clamp-1 group-hover:text-teal-sarcelle transition-colors">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-xs text-charcoal/70 line-clamp-2 font-sans font-light">
            {product.description || "Soin de beauté exclusif."}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-charcoal/10 flex items-center justify-between">
          <span className="font-serif font-semibold text-lg text-teal-sarcelle">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="sm:hidden p-2 bg-teal-sarcelle text-white rounded-md"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
