"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateOrderInput, DeliveryRate } from "@/lib/types/database";
import { DEFAULT_DELIVERY_RATES } from "@/lib/delivery-defaults";
import { saveLocalOrder } from "@/lib/orders-store";
import { revalidatePath } from "next/cache";

export async function createOrder(input: CreateOrderInput) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: input.customer_name,
        customer_phone: input.customer_phone,
        items: input.items,
        total: input.total,
        status: "pending",
      })
      .select()
      .single();

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    if (error) {
      const message = error.message || "Erreur lors de l'insertion de la commande.";
      console.error("Supabase insert error:", message);
      const localOrder = saveLocalOrder(input);
      return { success: false, error: message, order: localOrder };
    }

    return { success: true, order: data };
  } catch (err: unknown) {
    const localOrder = saveLocalOrder(input);
    const message = err instanceof Error ? err.message : "Erreur lors de la création de la commande.";
    console.error("createOrder error:", message);
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: false, error: message, order: localOrder };
  }
}

export async function getDeliveryRates(): Promise<DeliveryRate[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("delivery_rates")
      .select("*")
      .order("wilaya_code", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_DELIVERY_RATES;
    }
    return data;
  } catch (err: unknown) {
    console.error("getDeliveryRates error:", err);
    return DEFAULT_DELIVERY_RATES;
  }
}
