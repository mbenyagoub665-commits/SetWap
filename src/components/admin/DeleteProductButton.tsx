"use client";

import { Trash2 } from "lucide-react";

interface DeleteProductButtonProps {
  id: string;
  onDelete: (formData: FormData) => void;
}

export function DeleteProductButton({ id, onDelete }: DeleteProductButtonProps) {
  return (
    <form
      action={(formData) => {
        if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
          onDelete(formData);
        }
      }}
      className="inline-block"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Supprimer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
