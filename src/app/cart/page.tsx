"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatVND } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  const updateQuantity = (productId: number, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, size, color, quantity: newQuantity },
    });
  };

  const removeItem = (productId: number, size: string, color: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { productId, size, color },
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng trống</h1>
        <p className="text-zinc-400 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <Link
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {state.items.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl relative">
              <button 
                onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <Link href={`/product/${item.product.id}`} className="text-lg font-bold hover:text-purple-400">
                  {item.product.name}
                </Link>
                <p className="text-zinc-400 text-sm mt-1">Phân loại: {item.selectedColor}, {item.selectedSize}</p>
                <p className="text-purple-400 font-bold mt-2">{formatVND(item.product.price)}</p>
              </div>
              <div className="flex items-center gap-4 bg-zinc-950 px-4 py-2 rounded-lg border border-zinc-800">
                <button 
                  onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                  className="text-zinc-400 hover:text-white"
                >-</button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                  className="text-zinc-400 hover:text-white"
                >+</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-6">Tổng đơn hàng</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-zinc-400">
              <span>Tạm tính</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Phí vận chuyển</span>
              <span>{formatVND(shipping)}</span>
            </div>
            <div className="border-t border-zinc-800 pt-4 flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span className="text-purple-400">{formatVND(total)}</span>
            </div>
          </div>
          <button 
            onClick={() => router.push('/checkout')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all"
          >
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
