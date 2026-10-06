"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateOrderInput } from "@/lib/types/database";

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

    if (error) {
      console.error("Error creating order:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, order: data };
  } catch (err: any) {
    console.error("Failed to create order:", err);
    return { success: false, error: err.message || "Une erreur est survenue." };
  }
}
