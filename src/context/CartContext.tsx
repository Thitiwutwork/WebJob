import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/database';

export type BundleTier = 'standard' | 'starter_bundle' | 'business_bundle';

export interface CartItem {
  product: Product;
  quantity: number;
  bundleTier?: BundleTier;
  bundlePrice?: number;
  bundleLabel?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    bundleTier?: BundleTier,
    bundlePrice?: number,
    bundleLabel?: string
  ) => void;
  updateItemBundle: (
    productId: string,
    bundleTier: BundleTier,
    bundlePrice: number,
    bundleLabel: string
  ) => void;
  removeFromCart: (productId: string, bundleTier?: BundleTier) => void;
  clearCart: () => void;
  totalAmount: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'namenoname_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    quantity = 1,
    bundleTier: BundleTier = 'standard',
    bundlePrice?: number,
    bundleLabel?: string
  ) => {
    const finalPrice = bundlePrice !== undefined ? bundlePrice : product.price;
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && (item.bundleTier || 'standard') === bundleTier
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && (item.bundleTier || 'standard') === bundleTier
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          bundleTier,
          bundlePrice: finalPrice,
          bundleLabel,
        },
      ];
    });
  };

  const updateItemBundle = (
    productId: string,
    bundleTier: BundleTier,
    bundlePrice: number,
    bundleLabel: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              bundleTier,
              bundlePrice,
              bundleLabel,
            }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, bundleTier?: BundleTier) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (bundleTier === undefined || (item.bundleTier || 'standard') === bundleTier)
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.bundlePrice !== undefined ? item.bundlePrice : item.product.price) * item.quantity,
    0
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateItemBundle,
        removeFromCart,
        clearCart,
        totalAmount,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
