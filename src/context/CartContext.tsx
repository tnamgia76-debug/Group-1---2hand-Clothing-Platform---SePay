"use client";

// 🟣 DÀNH CHO NGƯỜI D (Backend & Data)
// CartContext:
// - Quản lý giỏ hàng bằng React Context & useReducer.
// - Các action cần có: Thêm sản phẩm, xóa, đổi số lượng.
// - Nhớ lưu vào localStorage để không bị mất khi reload.

import { createContext, useContext, ReactNode } from "react";
// Import các interface từ "@/lib/types"

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // TODO: Implement reducer, state, and localStorage here
  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
