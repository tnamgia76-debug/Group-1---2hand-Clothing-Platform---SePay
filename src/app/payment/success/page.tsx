"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useCart } from "@/context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const { dispatch } = useCart();

  useEffect(() => {
    // Dọn sạch giỏ hàng ngay khi vào trang Cảm ơn
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-12 max-w-lg mx-auto text-center transform transition-all hover:scale-[1.02]">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Thanh toán thành công!</h1>
      <p className="text-slate-500 mb-8 leading-relaxed">
        Cảm ơn bạn đã tin tưởng và đặt sân tại <strong className="text-blue-600">SmashCourt</strong>. Lịch đặt của bạn đã được xác nhận tự động.
      </p>

      {orderCode && (
        <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 text-sm">
          <span className="text-slate-500">Mã đơn hàng của bạn: </span>
          <strong className="text-slate-800 font-mono tracking-wider">{orderCode}</strong>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Trang chủ
        </Link>
        <Link 
          href="/search" 
          className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
        >
          Đặt sân khác
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[70vh] flex items-center justify-center bg-slate-50/50">
      <Suspense fallback={<div className="text-slate-500 font-bold">Đang tải kết quả thanh toán...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
