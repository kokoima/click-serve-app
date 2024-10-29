import { create } from "zustand";
import { OrderItem } from "@/types/api";

interface CartStore {
  items: OrderItem[];
  total: number;
  addToCart: (item: OrderItem) => void;
  removeFromCart: (productId: string) => void;
  getQuantity: (productId: string) => number;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.productId === item.productId);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },
  getQuantity: (productId) => {
    const item = get().items.find((i) => i.productId === productId);
    return item?.quantity || 0;
  },
  clearCart: () => set({ items: [] }),
}));