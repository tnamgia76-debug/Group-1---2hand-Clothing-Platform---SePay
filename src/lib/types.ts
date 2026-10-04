// ===== COURT =====
export interface Court {
  id: number;
  name: string;
  slug: string;
  pricePerHour: number;
  image: string;
  images?: string[];
  location: string;
  description: string;
  amenities: string[]; // Trà đá, Wifi, Giữ xe, Thảm xịn...
  isAvailable: boolean;
}

// ===== BOOKING / CART =====
export interface CartItem {
  court: Court;
  date: string; // YYYY-MM-DD
  timeSlot: string; // VD: "18:00 - 19:30"
  duration: number; // số giờ, VD: 1.5
  price: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { courtId: number; date: string; timeSlot: string } }
  | { type: "CLEAR_CART" };

// ===== PAYMENT =====
export interface PaymentRequest {
  orderCode: number;
  amount: number;
  description: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  items: PaymentItem[];
}

export interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}
