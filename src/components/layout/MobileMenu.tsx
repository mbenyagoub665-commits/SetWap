"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-parchment h-full shadow-2xl flex flex-col z-10 p-6">
        <div className="flex items-center justify-between pb-6 border-b border-charcoal/10">
          <div>
            <span className="text-xl font-serif font-light tracking-[0.2em] text-charcoal">
              CHAHRA
            </span>
            <span className="block text-[8px] uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
              Beauty · الجزائر
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal hover:text-teal-sarcelle transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 py-8 space-y-6 font-sans">
          <Link
            href="/"
            onClick={onClose}
            className="block text-lg font-medium text-charcoal hover:text-teal-sarcelle transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/products"
            onClick={onClose}
            className="block text-lg font-medium text-charcoal hover:text-teal-sarcelle transition-colors"
          >
            Catalogue Complet
          </Link>

          <div className="pt-4 border-t border-charcoal/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-sarcelle mb-4">
              Catégories
            </p>
            <div className="space-y-3 pl-2">
              {MOCK_CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={onClose}
                  className="block text-sm text-charcoal/80 hover:text-teal-sarcelle transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal/10">
            <Link
              href="/admin"
              onClick={onClose}
              className="block text-xs uppercase tracking-widest text-charcoal/60 hover:text-teal-sarcelle transition-colors"
            >
              Administration (Admin)
            </Link>
          </div>
        </nav>

        <div className="pt-6 border-t border-charcoal/10 text-xs text-charcoal/60 text-center font-sans">
          <p>© 2026 Chahra Beauty. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}
