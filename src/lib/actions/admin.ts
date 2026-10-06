"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { Product, UpsertProductInput, OrderStatus, DeliveryRate } from "@/lib/types/database";
import { DEFAULT_DELIVERY_RATES } from "@/lib/delivery-defaults";
import { getLocalOrders, updateLocalOrderStatus } from "@/lib/orders-store";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";

export async function adminGetProducts(): Promise<Product[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    const dbProducts = error || !data ? [] : data;
    const map = new Map();
    [...dbProducts, ...MOCK_PRODUCTS].forEach((p) => map.set(p.id, p));
    return Array.from(map.values()) as Product[];
  } catch (err: unknown) {
    console.error("adminGetProducts error:", err);
    return MOCK_PRODUCTS;
  }
}

export async function adminGetOrders() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    const localOrders = getLocalOrders();
    if (error || !data) {
      return localOrders;
    }
    const map = new Map();
    [...data, ...localOrders].forEach((o) => map.set(o.id, o));
    return Array.from(map.values()).sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (err: unknown) {
    console.error("adminGetOrders error:", err);
    return getLocalOrders();
  }
}

export async function adminCreateProduct(input: UpsertProductInput) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").insert(input);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de la création du produit.";
    console.error("adminCreateProduct error:", message);
    return { success: false, error: message };
  }
}

export async function adminUpdateProduct(id: string, input: UpsertProductInput) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").update(input).eq("id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de la mise à jour du produit.";
    console.error("adminUpdateProduct error:", message);
    return { success: false, error: message };
  }
}

export async function adminDeleteProduct(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de la suppression du produit.";
    console.error("adminDeleteProduct error:", message);
    return { success: false, error: message };
  }
}

export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const supabase = createAdminClient();
    await supabase.from("orders").update({ status }).eq("id", orderId);

    updateLocalOrderStatus(orderId, status);

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de la mise à jour du statut.";
    console.error("adminUpdateOrderStatus error:", message);
    updateLocalOrderStatus(orderId, status);
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: false, error: message };
  }
}

export async function adminGetDeliveryRates(): Promise<DeliveryRate[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("delivery_rates")
      .select("*")
      .order("wilaya_code", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_DELIVERY_RATES;
    }
    return data;
  } catch (err: unknown) {
    console.error("adminGetDeliveryRates error:", err);
    return DEFAULT_DELIVERY_RATES;
  }
}

export async function adminSaveDeliveryRates(
  rates: Array<{ wilaya_code: string; wilaya_name: string; domicile: number; bureau: number }>
) {
  try {
    const supabase = createAdminClient();
    await supabase.from("delivery_rates").upsert(
      rates.map((r) => ({
        ...r,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: "wilaya_code" }
    );

    revalidatePath("/admin/delivery-rates");
    revalidatePath("/checkout");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de la sauvegarde des frais de livraison.";
    console.error("adminSaveDeliveryRates error:", message);
    return { success: false, error: message };
  }
}
