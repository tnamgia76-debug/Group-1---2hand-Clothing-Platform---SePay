// ===== PRODUCT =====
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

// ===== CART =====
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" };

// ===== PAYMENT =====
export interface PaymentRequest {
  orderCode: number;
  amount: number;
  description: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  buyerAddress?: string;
  items: PaymentItem[];
}

export interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}
