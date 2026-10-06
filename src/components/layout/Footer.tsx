import Link from "next/link";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-parchment pt-16 pb-12 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-parchment/10">
        {/* Brand info */}
        <div className="space-y-4">
          <span className="text-2xl font-serif font-light tracking-[0.25em] text-parchment">
            CHAHRA
          </span>
          <span className="block text-[9px] uppercase tracking-[0.4em] text-teal-sarcelle font-semibold -mt-2">
            Beauty · الجزائر
          </span>
          <p className="text-sm text-parchment/70 font-light leading-relaxed">
            Votre destination de beauté de luxe en Algérie. Des rituels de soins raffinés et naturels inspirés par l&apos;élégance intemporelle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-sarcelle mb-4">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm text-parchment/80">
            <li>
              <Link href="/" className="hover:text-pink-accent transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-pink-accent transition-colors">
                Tous les Produits
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-pink-accent transition-colors">
                Mon Panier & Commande
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-pink-accent transition-colors">
                Espace Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-sarcelle mb-4">
            Catégories
          </h3>
          <ul className="space-y-3 text-sm text-parchment/80">
            <li>
              <Link href="/products?category=Soins+du+Visage" className="hover:text-pink-accent transition-colors">
                Soins du Visage
              </Link>
            </li>
            <li>
              <Link href="/products?category=Maquillage" className="hover:text-pink-accent transition-colors">
                Maquillage
              </Link>
            </li>
            <li>
              <Link href="/products?category=Soins+du+Corps" className="hover:text-pink-accent transition-colors">
                Soins du Corps
              </Link>
            </li>
            <li>
              <Link href="/products?category=Parfums" className="hover:text-pink-accent transition-colors">
                Parfums
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-teal-sarcelle mb-4">
            Contact & Service
          </h3>
          <div className="space-y-3 text-sm text-parchment/80">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-pink-accent shrink-0" />
              <span>+213 (0) 550 00 00 00</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-pink-accent shrink-0" />
              <span>contact@chahrabeauty.dz</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-pink-accent shrink-0" />
              <span>Alger, Algérie (Expédition 58 Wilayas)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment/50">
        <p>© 2026 CHAHRA BEAUTY. Tous droits réservés. · دفع عند الاستلام</p>
        <p className="mt-4 sm:mt-0 font-serif italic text-pink-accent">
          L&apos;élégance au naturel
        </p>
      </div>
    </footer>
  );
}
