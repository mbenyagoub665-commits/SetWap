"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Mot de passe incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white/80 backdrop-blur p-8 rounded-xl border border-charcoal/10 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-teal-sarcelle/10 text-teal-sarcelle rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
            Administration
          </span>
          <h1 className="text-2xl font-serif font-light text-charcoal">
            Chahra Beauty Admin
          </h1>
          <p className="text-xs text-charcoal/60">
            Veuillez entrer le mot de passe administrateur.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            />
          </div>

          <Button
            type="submit"
            variant="teal"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se Connecter"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-charcoal/60 hover:text-teal-sarcelle transition-colors">
            ← Retour à la boutique
          </a>
        </div>
      </div>
    </div>
  );
}
