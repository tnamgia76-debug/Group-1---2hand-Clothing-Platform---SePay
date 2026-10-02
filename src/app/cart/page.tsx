"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = state.items.reduce((acc, item) => acc + item.price, 0);

  const removeItem = (courtId: string, date: string, timeSlot: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { courtId, date, timeSlot } });
  };

  if (!mounted) return null;

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col justify-center">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-slate-800">Lịch đặt của bạn trống</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Bạn chưa chọn ca sân nào. Hãy quay lại trang chủ để tìm và chốt lịch sân phù hợp nhé!
        </p>
        <div>
          <Link href="/" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg text-white rounded-xl font-bold transition-all">
            Tìm Sân Ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Chi tiết Lịch Đặt</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-white border border-slate-200 shadow-sm rounded-2xl relative">
              <button 
                onClick={() => removeItem(item.court.id, item.date, item.timeSlot)}
                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.court.image} alt={item.court.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-800">{item.court.name}</p>
                <p className="text-slate-500 text-sm mt-1">Ngày chơi: <strong>{item.date.split('-').reverse().join('/')}</strong></p>
                <p className="text-slate-500 text-sm">Ca chơi: <strong>{item.timeSlot}</strong></p>
              </div>
              <div className="font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                {item.price.toLocaleString('vi-VN')}đ
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Tóm tắt thanh toán</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-slate-500">
              <span>Số ca đã chọn</span>
              <span className="font-bold text-slate-800">{state.items.length} ca</span>
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-lg">
              <span className="text-slate-800">Tổng cộng</span>
              <span className="text-blue-600">{total.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all"
            onClick={() => alert("Chức năng Thanh toán cần Người A (Backend) kết nối với payOS!")}
          >
            Tiến hành thanh toán (Thử nghiệm)
          </button>
        </div>
      </div>
    </div>
  );
}
