'use client'

import { createContext, useContext, useState, useEffect } from "react";
import type { Card } from "@/types/Card";

type CartItem = {
  card: Card;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (card: Card, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  loaded: boolean; // 👈 NOVO
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "mtg_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false); // 👈 NOVO

  // 🔹 CARREGAR
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Erro ao carregar carrinho", err);
    } finally {
      setLoaded(true); 
    }
  }, []);

  // 🔹 SALVAR
  useEffect(() => {
    if (!loaded) return; // 👈 evita sobrescrever antes de carregar
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  function addToCart(card: Card, quantity: number) {
    setCart(prev => {
      const existing = prev.find(i => i.card.id === card.id);

      if (existing) {
        return prev.map(i =>
          i.card.id === card.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prev, { card, quantity }];
    });
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(i => i.card.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loaded }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro do CartProvider");
  return context;
}