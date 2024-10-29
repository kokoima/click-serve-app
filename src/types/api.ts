export interface Establishment {
  id: string;
  name: string;
  description: string;
  images: string[];
  zone?: Zone;
}

export interface Zone {
  id: string;
  name: string;
  type: "table" | "pickup";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: "pending" | "confirmed" | "ready" | "delivered";
  total: number;
  paymentMethod?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  variants?: Record<string, string>;
}