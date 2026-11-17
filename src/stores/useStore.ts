"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Locale, OrderRecord, OrderStatus, PaymentStatus, Product } from "@/types/store";
import { INITIAL_PRODUCTS } from "@/lib/catalog";
import { STORE_CONFIG } from "@/lib/config";

interface StoreState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  showVes: boolean;
  toggleShowVes: () => void;
  vesRate: number;
  setVesRate: (rate: number) => void;

  products: Product[];
  addProduct: (product: Product) => void;
  updateProductImage: (productId: string, imageUrl: string) => void;
  updateProductPrice: (productId: string, priceUsd: number) => void;

  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;

  favorites: string[];
  toggleFavorite: (productId: string) => void;

  orders: OrderRecord[];
  createOrder: (order: Omit<OrderRecord, "id" | "orderNumber" | "createdAt" | "orderStatus" | "paymentStatus">) => OrderRecord;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      locale: "es",
      setLocale: (locale) => set({ locale }),
      showVes: false,
      toggleShowVes: () => set((s) => ({ showVes: !s.showVes })),
      vesRate: STORE_CONFIG.manualVesRate,
      setVesRate: (vesRate) => set({ vesRate }),

      products: INITIAL_PRODUCTS,
      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),
      updateProductImage: (productId, imageUrl) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, images: [imageUrl, ...p.images.slice(1)] } : p
          ),
        })),
      updateProductPrice: (productId, priceUsd) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === productId ? { ...p, priceUsd } : p)),
        })),

      cart: [],
      isCartOpen: false,
      setCartOpen: (isCartOpen) => set({ isCartOpen }),
      addToCart: (newItem) =>
        set((state) => {
          const existing = state.cart.find((i) => i.variantId === newItem.variantId);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.variantId === newItem.variantId
                  ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, i.maxStock) }
                  : i
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, newItem],
            isCartOpen: true,
          };
        }),
      removeFromCart: (variantId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.variantId !== variantId),
        })),
      updateCartQuantity: (variantId, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((i) => i.variantId !== variantId)
              : state.cart.map((i) =>
                  i.variantId === variantId
                    ? { ...i, quantity: Math.min(quantity, i.maxStock) }
                    : i
                ),
        })),
      clearCart: () => set({ cart: [] }),

      favorites: [],
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),

      orders: [],
      createOrder: (payload) => {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const newOrder: OrderRecord = {
          ...payload,
          id: `ord-${Date.now()}`,
          orderNumber: `VNX-${randomNum}`,
          createdAt: new Date().toISOString(),
          orderStatus: "pendiente_confirmacion",
          paymentStatus: "pendiente",
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [],
        }));
        return newOrder;
      },
      updateOrderStatus: (orderId, orderStatus) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, orderStatus } : o)),
        })),
      updatePaymentStatus: (orderId, paymentStatus) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o)),
        })),
    }),
    {
      name: "vnex-market-storage-v2",
    }
  )
);
