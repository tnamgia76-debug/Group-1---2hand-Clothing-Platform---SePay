"use client";

import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

function SuccessContent() {
  const { dispatch } = useCart();
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "PAID" || !status) {
      dispatch({ type: "CLEAR_CART" });
      
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#22c55e', '#3b82f6', '#a855f7']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22c55e', '#3b82f6', '#a855f7']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [dispatch, status]);

  return (
    <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 mx-auto animate-bounce shadow-[0_0_30px_rgba(34,197,94,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Thanh toán thành công!
      </h1>
      
      {orderCode && (
        <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl inline-block mt-4">
          <p className="text-sm text-zinc-400 mb-1">Mã đơn hàng của bạn</p>
          <p className="text-2xl font-bold font-mono tracking-wider text-white">#{orderCode}</p>
        </div>
      )}

      <p className="text-zinc-400 text-lg max-w-md mx-auto mb-8 mt-4">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được thanh toán thành công và đang được xử lý.
      </p>
      <Link href="/" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Đang tải...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
