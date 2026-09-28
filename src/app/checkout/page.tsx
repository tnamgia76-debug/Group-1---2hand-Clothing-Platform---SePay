"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatVND } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 30000 : 0;
  const totalAmount = subtotal + shipping;

  useEffect(() => {
    if (isMounted && state.items.length === 0) {
      router.push("/cart");
    }
  }, [isMounted, state.items.length, router]);

  if (!isMounted || state.items.length === 0) {
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode: Number(String(Date.now()).slice(-6)),
          amount: totalAmount,
          description: `DH${String(Date.now()).slice(-6)}`,
          buyerName: formData.name,
          buyerPhone: formData.phone,
          items: state.items.map(item => ({
            name: `${item.product.name} (${item.selectedColor}, ${item.selectedSize})`,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Có lỗi xảy ra: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Thanh Toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Họ và tên</label>
              <input 
                required type="text" name="name" 
                value={formData.name} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Số điện thoại</label>
              <input 
                required type="tel" name="phone" 
                value={formData.phone} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input 
                required type="email" name="email" 
                value={formData.email} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Nhập địa chỉ email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Địa chỉ giao hàng</label>
              <input 
                required type="text" name="address" 
                value={formData.address} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Nhập địa chỉ chi tiết"
              />
            </div>
          </form>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Đơn hàng của bạn</h2>
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {state.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-zinc-400">{item.selectedColor}, {item.selectedSize}</p>
                  </div>
                  <p className="font-bold text-sm text-purple-400">{formatVND(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-4 mb-8">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Phí vận chuyển</span>
                <span>{formatVND(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="text-purple-400">{formatVND(totalAmount)}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              ) : "Thanh toán qua payOS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
