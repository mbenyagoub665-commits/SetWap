"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Search, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-charcoal text-parchment text-xs py-2 px-4 text-center font-sans tracking-widest flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-pink-accent" />
        <span>LIVRAISON OFFERTE SUR TOUTE L&apos;ALGÉRIE DÈS 8,000 DZD · دفع عند الاستلام</span>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 bg-parchment/90 backdrop-blur-md border-b border-charcoal/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-charcoal hover:text-teal-sarcelle transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Navigation links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-sans">
            <Link href="/" className="text-charcoal hover:text-teal-sarcelle transition-colors">
              Accueil
            </Link>
            <Link href="/products" className="text-charcoal hover:text-teal-sarcelle transition-colors">
              Collection
            </Link>
            <Link href="/products?category=Soins+du+Visage" className="text-charcoal hover:text-teal-sarcelle transition-colors">
              Visage
            </Link>
          </nav>

          {/* Brand Logo */}
          <div className="text-center absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="inline-block">
              <span className="text-2xl md:text-3xl font-serif font-light tracking-[0.25em] text-charcoal hover:opacity-80 transition-opacity">
                CHAHRA
              </span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-teal-sarcelle font-semibold -mt-1">
                Beauty · الجزائر
              </span>
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/products"
              className="p-2 text-charcoal hover:text-teal-sarcelle transition-colors hidden sm:block"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-charcoal hover:text-teal-sarcelle transition-colors flex items-center gap-2 group"
              aria-label="Panier"
            >
              <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-105" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-accent text-charcoal text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
              <span className="hidden lg:inline text-xs font-sans uppercase tracking-wider ml-1">
                Panier
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
