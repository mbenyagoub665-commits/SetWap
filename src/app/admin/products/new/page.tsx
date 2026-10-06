"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { adminCreateProduct } from "@/lib/actions/admin";
import { ProductCategory } from "@/lib/types/database";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

const CATEGORIES: ProductCategory[] = [
  "Soins du Visage",
  "Maquillage",
  "Soins du Corps",
  "Parfums",
  "Cheveux",
];

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [category, setCategory] = useState<ProductCategory>("Soins du Visage");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (err: any) {
      alert("Erreur lors de l'upload de l'image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await adminCreateProduct({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        image_url: imageUrl || null,
      });

      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Erreur: " + result.error);
      }
    } catch (err: any) {
      alert("Erreur: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      <Link
        href="/admin/products"
        className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal/70 hover:text-teal-sarcelle transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux Produits
      </Link>

      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
          Nouveau Produit
        </span>
        <h1 className="text-3xl font-serif font-light text-charcoal mt-1">
          Ajouter un Article au Catalogue
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur p-8 rounded-xl border border-charcoal/10 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Nom du Produit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Sérum Éclat Botanique"
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Prix (DZD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 4800"
                className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Ex: 25"
                className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description détaillée du produit..."
              className="w-full px-4 py-3 bg-parchment border border-charcoal/20 rounded-md text-sm text-charcoal focus:outline-none focus:border-teal-sarcelle"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Image du Produit
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-xs text-charcoal/70 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-teal-sarcelle file:text-white hover:file:bg-teal-dark cursor-pointer"
              />
              {uploading && <span className="text-xs text-teal-sarcelle">Upload en cours...</span>}
            </div>
            {imageUrl && (
              <div className="mt-4">
                <p className="text-xs text-charcoal/60 mb-2">Aperçu de l&apos;image :</p>
                <img src={imageUrl} alt="Aperçu" className="w-24 h-24 object-cover rounded border border-charcoal/10" />
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="teal"
          size="lg"
          className="w-full"
          disabled={submitting || uploading}
        >
          {submitting ? "Enregistrement..." : "Créer le Produit"}
        </Button>
      </form>
    </div>
  );
}
