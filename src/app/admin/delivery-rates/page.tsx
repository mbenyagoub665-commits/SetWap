"use client";

import { useState, useEffect, useTransition } from "react";
import { adminGetDeliveryRates, adminSaveDeliveryRates } from "@/lib/actions/admin";
import { DeliveryRate } from "@/lib/types/database";
import { Button } from "@/components/ui/Button";
import { Search, Save, CheckCircle2, Truck } from "lucide-react";

export default function AdminDeliveryRatesPage() {
  const [rates, setRates] = useState<DeliveryRate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      const data = await adminGetDeliveryRates();
      setRates(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleRateChange = (wilaya_code: string, field: "domicile" | "bureau", value: string) => {
    const num = value === "" ? 0 : Math.max(0, parseInt(value) || 0);
    setRates((prev) =>
      prev.map((r) => (r.wilaya_code === wilaya_code ? { ...r, [field]: num } : r))
    );
  };

  const handleSave = () => {
    setSuccessMessage("");
    setErrorMessage("");

    startTransition(async () => {
      const res = await adminSaveDeliveryRates(rates);
      if (res.success) {
        setSuccessMessage("Tarifs de livraison enregistrés avec succès !");
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        setErrorMessage("Erreur lors de l'enregistrement.");
      }
    });
  };

  const filteredRates = rates.filter((r) =>
    r.wilaya_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.wilaya_code.includes(searchQuery)
  );

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
            Logistique & Livraison
          </span>
          <h1 className="text-3xl font-serif font-light text-charcoal mt-1">
            Tarifs de Livraison (58 Wilayas)
          </h1>
          <p className="mt-1 text-xs text-charcoal/65">
            Définissez les prix de livraison à domicile et en bureau pour chaque wilaya d&apos;Algérie (0 = Indisponible).
          </p>
        </div>

        <Button
          onClick={handleSave}
          variant="teal"
          size="lg"
          className="flex items-center gap-2 self-start sm:self-auto"
          disabled={isPending}
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? "Enregistrement..." : "Enregistrer"}</span>
        </Button>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-charcoal/10 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-charcoal/40" />
        <input
          type="text"
          placeholder="Rechercher par wilaya ou numéro (ex: Alger, 16)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-charcoal focus:outline-none placeholder:text-charcoal/40"
        />
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur rounded-xl border border-charcoal/10 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal/60">Chargement des tarifs...</div>
        ) : filteredRates.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal/60">Aucune wilaya trouvée.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10 bg-charcoal/5 text-xs uppercase tracking-wider text-charcoal/65">
                  <th className="py-3 px-6">Wilaya</th>
                  <th className="py-3 px-6">Domicile (DZD)</th>
                  <th className="py-3 px-6">Bureau (DZD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {filteredRates.map((rate) => (
                  <tr key={rate.wilaya_code} className="hover:bg-charcoal/5">
                    <td className="py-4 px-6 font-serif font-medium text-charcoal">
                      {rate.wilaya_name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-teal-sarcelle/70" />
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={rate.domicile}
                          onChange={(e) => handleRateChange(rate.wilaya_code, "domicile", e.target.value)}
                          className="w-32 px-3 py-2 bg-parchment border border-charcoal/20 rounded text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                        />
                        <span className="text-xs text-charcoal/50">DZD</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-teal-sarcelle/70" />
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={rate.bureau}
                          onChange={(e) => handleRateChange(rate.wilaya_code, "bureau", e.target.value)}
                          className="w-32 px-3 py-2 bg-parchment border border-charcoal/20 rounded text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
                        />
                        <span className="text-xs text-charcoal/50">DZD</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          variant="teal"
          size="lg"
          className="flex items-center gap-2"
          disabled={isPending}
        >
          <Save className="w-4 h-4" />
          <span>{isPending ? "Enregistrement..." : "Enregistrer tous les tarifs"}</span>
        </Button>
      </div>
    </div>
  );
}
