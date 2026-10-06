"use client";

import { useState } from "react";
import { Product } from "@/lib/types/database";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal/70 hover:text-teal-sarcelle transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour au Catalogue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Product Image */}
        <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-charcoal/10 shadow-sm">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-charcoal/40">
              Aucune image disponible
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-parchment/90 backdrop-blur text-charcoal text-xs font-sans uppercase tracking-widest px-3 py-1.5 rounded shadow-sm font-semibold">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
              Chahra Beauty
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-light text-charcoal mt-2">
              {product.name}
            </h1>
            <p className="mt-4 font-serif font-semibold text-2xl text-teal-sarcelle">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="border-t border-b border-charcoal/10 py-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal/80">
              Description
            </h3>
            <p className="text-sm font-sans text-charcoal/80 leading-relaxed font-light">
              {product.description || "Un soin d'exception élaboré selon les plus hauts standards de la cosmétique de luxe."}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/80">
                Quantité
              </span>
              <div className="flex items-center border border-charcoal/20 rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-charcoal hover:bg-charcoal/5 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold text-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-charcoal hover:bg-charcoal/5 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              variant="teal"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Ajouter au Panier · {formatPrice(product.price * quantity)}</span>
            </Button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-charcoal/10 text-xs text-charcoal/70">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-teal-sarcelle shrink-0" />
              <span>Livraison 58 Wilayas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-sarcelle shrink-0" />
              <span>Paiement à la livraison</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-teal-sarcelle shrink-0" />
              <span>Garantie authenticité</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
