import { Establishment, Product, Order } from "../types/api";

const API_BASE = import.meta.env.VITE_USE_MOCK === "true" 
  ? "/mock-api"
  : "https://www.clicktodrink.es/api/v1";

export const getEstablishment = async (id: string): Promise<Establishment> => {
  const response = await fetch(`${API_BASE}/establishments/${id}`);
  if (!response.ok) throw new Error("Failed to fetch establishment");
  return response.json();
};

export const getProducts = async (establishmentId: string): Promise<Product[]> => {
  const response = await fetch(`${API_BASE}/establishments/${establishmentId}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const createOrder = async (order: Omit<Order, "id" | "status">): Promise<Order> => {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const response = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!response.ok) throw new Error("Failed to fetch order");
  return response.json();
};