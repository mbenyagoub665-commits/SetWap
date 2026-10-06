"use client";

import Image from "next/image";
import { OrderItem } from "@/lib/types/database";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
  item: OrderItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-charcoal/10 font-sans">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 bg-parchment rounded-md overflow-hidden shrink-0 border border-charcoal/10">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-charcoal/40">
            Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-serif font-medium text-sm text-charcoal line-clamp-1 pr-2">
              {item.name}
            </h4>
            <button
              onClick={() => removeFromCart(item.product_id)}
              className="text-charcoal/40 hover:text-red-500 transition-colors"
              aria-label="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-teal-sarcelle font-semibold mt-0.5">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-charcoal/20 rounded bg-white">
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
              className="p-1 text-charcoal hover:bg-charcoal/5 transition-colors"
              aria-label="Diminuer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-semibold text-charcoal">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
              className="p-1 text-charcoal hover:bg-charcoal/5 transition-colors"
              aria-label="Augmenter"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs font-semibold text-charcoal">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
