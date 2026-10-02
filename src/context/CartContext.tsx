"use client";

import React, { createContext, useContext, useReducer, useEffect, useState } from "react";

export interface BookingItem {
  court: any;
  date: string;
  timeSlot: string;
  price: number;
}

interface CartState {
  items: BookingItem[];
}

type CartAction =
  | { type: "INIT_CART"; payload: BookingItem[] }
  | { type: "ADD_TO_CART"; payload: BookingItem }
  | { type: "REMOVE_FROM_CART"; payload: { courtId: string; date: string; timeSlot: string } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "INIT_CART":
      return { ...state, items: action.payload };
    case "ADD_TO_CART": {
      const exists = state.items.some(
        (i) => i.court.id === action.payload.court.id && i.date === action.payload.date && i.timeSlot === action.payload.timeSlot
      );
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.court.id === action.payload.courtId && i.date === action.payload.date && i.timeSlot === action.payload.timeSlot)
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
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
