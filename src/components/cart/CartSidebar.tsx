"use client";

import { useCart } from "./CartProvider";
import { CartItem } from "./CartItem";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function CartSidebar() {
  const { items, isOpen, setIsOpen, subtotal, totalItems } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-parchment shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-charcoal/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-sarcelle" />
              <h3 className="font-serif text-lg text-charcoal font-medium">
                Mon Panier ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-charcoal/60 space-y-4">
                <ShoppingBag className="w-12 h-12 stroke-1 text-charcoal/30" />
                <p className="font-serif text-lg">Votre panier est vide</p>
                <p className="text-xs max-w-xs">
                  Explorez notre collection de beauté et ajoutez vos produits favoris.
                </p>
                <Button variant="teal" size="sm" onClick={() => setIsOpen(false)}>
                  Explorer la Collection
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-charcoal/10">
                {items.map((item) => (
                  <CartItem key={item.product_id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-charcoal/10 bg-white/40 backdrop-blur space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-charcoal/80">
                  <span>Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal/80">
                  <span>Livraison (58 Wilayas)</span>
                  <span className="text-teal-sarcelle font-medium">Calculée à l&apos;étape suivante</span>
                </div>
                <div className="pt-2 border-t border-charcoal/10 flex justify-between text-base font-serif font-semibold text-charcoal">
                  <span>Total</span>
                  <span className="text-teal-sarcelle text-lg">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Button
                variant="teal"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleCheckout}
              >
                <span>Commander (Paiement à la livraison)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <p className="text-[11px] text-center text-charcoal/60">
                🔒 Paiement en espèces à la réception de votre commande.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
