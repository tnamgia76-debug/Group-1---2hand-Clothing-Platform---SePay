// ===== COURT =====
export interface Court {
  id: string; // Updated to string since we use it in URL params
  name: string;
  slug?: string; // Optional since frontend may not use it
  pricePerHour: number;
  image: string;
  images?: string[];
  address: string; // Updated from location to match frontend
  district: string; // Added for frontend filtering
  ward: string; // Added for frontend filtering
  numberOfCourts: number; // Added for frontend grid logic
  description?: string;
  amenities: string[]; 
  isAvailable?: boolean;
}

// ===== BOOKING / CART =====
export interface CartItem {
  court: Court;
  date: string; // YYYY-MM-DD
  timeSlot: string; // VD: "Sân 2 (18:00)"
  price: number;
}

export interface CartState {
  items: CartItem[];
  totalItems?: number;
  totalAmount?: number;
}

export type CartAction =
  | { type: "INIT_CART"; payload: CartItem[] }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { courtId: string; date: string; timeSlot: string } }
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
