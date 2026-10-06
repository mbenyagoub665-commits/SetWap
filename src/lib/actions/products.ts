import { createClient } from "@/lib/supabase/server";
import { Product, ProductCategory } from "@/lib/types/database";

export async function getProducts(category?: ProductCategory | string): Promise<Product[]> {
  try {
    const supabase = createClient();
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
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

    if (error) {
      console.error(`Error fetching product ${id}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Failed to fetch product ${id}:`, err);
    return null;
  }
}
