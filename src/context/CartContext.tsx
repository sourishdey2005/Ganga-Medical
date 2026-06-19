
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Medicine = {
  id: number | string;
  name: string;
  manufacturer: string;
  category: string;
  tag?: string;
};

type CartContextType = {
  cart: Medicine[];
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Medicine[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ganga_medical_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('ganga_medical_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (medicine: Medicine) => {
    setCart((prev) => {
      // Prevent duplicates
      if (prev.find(item => item.id === medicine.id)) return prev;
      return [...prev, medicine];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
