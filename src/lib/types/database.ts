export type ProductCategory = 
  | "Soins du Visage"
  | "Maquillage"
  | "Soins du Corps"
  | "Parfums"
  | "Cheveux";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number; // in DZD
  stock: number;
  category: ProductCategory;
  image_url: string | null;
  created_at: string;
}

export type OrderStatus = "pending" | "confirmed" | "delivered";

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  total: number; // in DZD
  status: OrderStatus;
  created_at: string;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  total: number;
}

export interface UpsertProductInput {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category: ProductCategory;
  image_url?: string | null;
}
