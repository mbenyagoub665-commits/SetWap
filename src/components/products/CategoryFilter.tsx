"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleSelect = (categoryName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryName) {
      params.set("category", categoryName);
    } else {
      params.delete("category");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-sans">
      <button
        onClick={() => handleSelect(null)}
        className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
          !currentCategory
            ? "bg-teal-sarcelle text-white shadow-sm"
            : "bg-white/60 text-charcoal hover:bg-charcoal/10"
        }`}
      >
        Tous
      </button>
      {MOCK_CATEGORIES.map((cat) => {
        const isSelected = currentCategory === cat.name;
        return (
          <button
            key={cat.name}
            onClick={() => handleSelect(cat.name)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
              isSelected
                ? "bg-teal-sarcelle text-white shadow-sm"
                : "bg-white/60 text-charcoal hover:bg-charcoal/10"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
