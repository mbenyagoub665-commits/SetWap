"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { Product, UpsertProductInput, OrderStatus } from "@/lib/types/database";
import { revalidatePath } from "next/cache";

export async function adminGetProducts(): Promise<Product[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error("Admin get products error:", err.message);
    return [];
  }
}

export async function adminGetOrders() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error("Admin get orders error:", err.message);
    return [];
  }
}

export async function adminCreateProduct(input: UpsertProductInput) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").insert(input);

    if (error) throw error;

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Admin create product error:", err.message);
    return { success: false, error: err.message };
  }
}

export async function adminUpdateProduct(id: string, input: UpsertProductInput) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("products")
      .update(input)
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Admin update product error:", err.message);
    return { success: false, error: err.message };
  }
}

export async function adminDeleteProduct(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Admin delete product error:", err.message);
    return { success: false, error: err.message };
  }
}

export async function adminUpdateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) throw error;

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    console.error("Admin update order status error:", err.message);
    return { success: false, error: err.message };
  }
}
