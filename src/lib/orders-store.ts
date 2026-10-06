import { Order, CreateOrderInput, OrderStatus } from "./types/database";
import fs from "fs";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "src/lib/orders-store.json");

export function getLocalOrders(): Order[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {}
  return [];
}

export function saveLocalOrder(input: CreateOrderInput): Order {
  const orders = getLocalOrders();
  const newOrder: Order = {
    id: "ord-" + Math.random().toString(36).substring(2, 11),
    customer_name: input.customer_name,
    customer_phone: input.customer_phone,
    items: input.items,
    total: input.total,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  } catch (e) {}
  return newOrder;
}

export function updateLocalOrderStatus(orderId: string, status: OrderStatus): boolean {
  const orders = getLocalOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index > -1) {
    orders[index].status = status;
    try {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
      return true;
    } catch (e) {}
  }
  return false;
}
