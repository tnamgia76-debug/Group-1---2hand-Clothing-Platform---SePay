"use client";

import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { CartItem, CartState, CartAction } from "@/lib/types";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "INIT_CART": {
      const items = action.payload;
      return { 
        ...state, 
        items,
        totalItems: items.length,
        totalAmount: items.reduce((acc, item) => acc + item.price, 0)
      };
    }
    case "ADD_TO_CART": {
      const exists = state.items.some(
        (i) => i.court.id === action.payload.court.id && i.date === action.payload.date && i.timeSlot === action.payload.timeSlot
      );
      if (exists) return state;
      const newItems = [...state.items, action.payload];
      return { 
        ...state, 
        items: newItems,
        totalItems: newItems.length,
        totalAmount: newItems.reduce((acc, item) => acc + item.price, 0)
      };
    }
    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (i) => !(i.court.id === action.payload.courtId && i.date === action.payload.date && i.timeSlot === action.payload.timeSlot)
      );
      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
        totalAmount: newItems.reduce((acc, item) => acc + item.price, 0)
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [], totalItems: 0, totalAmount: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("smashcourt_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.items) {
          dispatch({ type: "INIT_CART", payload: parsed.items });
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("smashcourt_cart", JSON.stringify(state));
    }
  }, [state, isMounted]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
