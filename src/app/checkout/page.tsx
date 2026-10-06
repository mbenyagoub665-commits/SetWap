"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { createOrder } from "@/lib/actions/orders";

const ALGERIAN_WILAYAS = [
  "01. Adrar", "02. Chlef", "03. Laghouat", "04. Oum El Bouaghi", "05. Batna",
  "06. Béjaïa", "07. Biskra", "08. Béchar", "09. Blida", "10. Bouira",
  "11. Tamanrasset", "12. Tébessa", "13. Tlemcen", "14. Tiaret", "15. Tizi Ouzou",
  "16. Alger", "17. Djelfa", "18. Jijel", "19. Sétif", "20. Saïda",
  "21. Skikda", "22. Sidi Bel Abbès", "23. Annaba", "24. Guelma", "25. Constantine",
  "26. Médéa", "27. Mostaganem", "28. M'Sila", "29. Mascara", "30. Ouargla",
  "31. Oran", "32. El Bayadh", "33. Illizi", "34. Bordj Bou Arréridj", "35. Boumerdès",
  "36. El Tarf", "37. Tindouf", "38. Tissemsilt", "39. El Oued", "40. Khenchela",
  "41. Souk Ahras", "42. Tipaza", "43. Mila", "44. Aïn Defla", "45. Naâma",
  "46. Aïn Témouchent", "47. Ghardaïa", "48. Relizane", "49. Timimoun", "50. Bordj Badji Mokhtar",
  "51. Ouled Djellal", "52. Béni Abbès", "53. In Salah", "54. In Guezzam", "55. Touggourt",
  "56. Djanet", "57. El M'Ghair", "58. El Meniaa"
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("16. Alger");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Veuillez remplir votre nom et votre numéro de téléphone.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await createOrder({
        customer_name: `${name} (${wilaya}${address ? " - " + address : ""})`,
        customer_phone: phone,
        items: items,
        total: subtotal,
      });

      if (result.success && result.order) {
        setOrderRef(result.order.id.slice(0, 8).toUpperCase());
        setOrderSuccess(true);
        clearCart();
      } else {
        setErrorMessage(result.error || "Une erreur est survenue lors de l'enregistrement de la commande.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex-1 w-full flex flex-col items-center justify-center font-sans">
        <div className="w-20 h-20 bg-teal-sarcelle/10 text-teal-sarcelle rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
          Commande Validée avec Succès
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-light text-charcoal mt-2">
          Mabrouk ! Merci pour votre confiance
        </h1>
        <p className="mt-4 text-sm text-charcoal/80 max-w-lg mx-auto font-light leading-relaxed">
          Votre commande <strong className="text-teal-sarcelle font-semibold">#{orderRef}</strong> a bien été enregistrée dans notre système. Notre équipe vous contactera très prochainement par téléphone.
        </p>
        <div className="mt-8 p-6 bg-white/60 backdrop-blur border border-charcoal/10 rounded-lg max-w-md w-full text-left space-y-2 text-xs">
          <p><strong>Destinataire :</strong> {name}</p>
          <p><strong>Téléphone :</strong> {phone}</p>
          <p><strong>Wilaya :</strong> {wilaya}</p>
          <p><strong>Mode de paiement :</strong> Paiement en espèces à la livraison (COD)</p>
        </div>
        <div className="mt-10">
          <Link href="/products">
            <Button variant="teal" size="lg">
              Continuer mon Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center flex-1 w-full flex flex-col items-center justify-center font-sans">
        <ShoppingBag className="w-16 h-16 stroke-1 text-charcoal/30 mb-4" />
        <h1 className="text-2xl font-serif font-light text-charcoal">Votre panier est vide</h1>
        <p className="mt-2 text-xs text-charcoal/60">Ajoutez des produits avant de passer commande.</p>
        <div className="mt-6">
          <Link href="/products">
            <Button variant="teal" size="md">
              Voir le Catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full font-sans">
      <Link
        href="/products"
        className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal/70 hover:text-teal-sarcelle transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour au Catalogue
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
              Finalisation
            </span>
            <h1 className="text-3xl font-serif font-light text-charcoal mt-2">
              Validation de la Commande
            </h1>
            <p className="mt-1 text-xs text-charcoal/60">
              Aucun paiement en ligne requis. Payez en espèces à la réception.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/60 backdrop-blur p-8 rounded-xl border border-charcoal/10 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Nom Complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Fatima Zahra"
                  className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Numéro de Téléphone (Mobile Algérien) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: 0550 00 00 00"
                  className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Wilaya de Livraison <span className="text-red-500">*</span>
                </label>
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                >
                  {ALGERIAN_WILAYAS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Adresse de Livraison (Quartier / Rue)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Cité 100 logts, Bât A"
                  className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Notes pour la livraison (Optionnel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Ex: Appeler avant d'arriver..."
                  className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="teal"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validation en cours..." : "Confirmer ma Commande"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white/60 backdrop-blur p-8 rounded-xl border border-charcoal/10 shadow-sm sticky top-28 space-y-6">
            <h2 className="font-serif text-xl font-medium text-charcoal pb-4 border-b border-charcoal/10">
              Résumé de la Commande
            </h2>

            <div className="divide-y divide-charcoal/15 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product_id} className="py-3 flex justify-between items-center text-sm">
                  <div>
                    <p className="font-serif font-medium text-charcoal">{item.name}</p>
                    <p className="text-xs text-charcoal/60">Qté : {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-teal-sarcelle">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-charcoal/10 space-y-2">
              <div className="flex justify-between text-sm text-charcoal/80">
                <span>Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal/80">
                <span>Expédition (58 Wilayas)</span>
                <span className="text-teal-sarcelle font-medium">Gratuite dès 8,000 DZD</span>
              </div>
              <div className="pt-3 border-t border-charcoal/10 flex justify-between text-lg font-serif font-semibold text-charcoal">
                <span>Total à Payer</span>
                <span className="text-teal-sarcelle">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="p-4 bg-teal-sarcelle/10 rounded-lg space-y-2 text-xs text-charcoal/80">
              <div className="flex items-center gap-2 font-semibold text-teal-sarcelle">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantie Chahra Beauty</span>
              </div>
              <p>Paiement sécurisé en espèces à la livraison après inspection de votre colis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
