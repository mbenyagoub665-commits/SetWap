import { createClient } from "@/lib/supabase/server";
import { Product, ProductCategory } from "@/lib/types/database";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export async function getProducts(category?: ProductCategory | string): Promise<Product[]> {
  try {
    const supabase = createClient();
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    const dbProducts = error || !data ? [] : data;
    const map = new Map();
    [...dbProducts, ...MOCK_PRODUCTS].forEach((p) => map.set(p.id, p));
    let allProducts = Array.from(map.values()) as Product[];

    if (category && category !== "all") {
      allProducts = allProducts.filter((p) => p.category === category);
    }

    return allProducts;
  } catch (err) {
    let allProducts = MOCK_PRODUCTS;
    if (category && category !== "all") {
      allProducts = allProducts.filter((p) => p.category === category);
    }
    return allProducts;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return MOCK_PRODUCTS.find((p) => p.id === id) || null;
    }

    return data;
  } catch (err) {
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}
