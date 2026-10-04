"use client";
// 🟣 DÀNH CHO NGƯỜI D (Backend & Data)
// Trang Thanh Toán Thành Công:
// - payOS tự động chuyển hướng người dùng về đây khi thanh toán hoàn tất.
// - Đọc mã orderCode từ URL, thông báo cảm ơn.
// - Đừng quên clearCart() dọn sạch giỏ hàng.

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="p-8 text-center text-white mt-10">
      <h1 className="text-4xl font-bold text-green-500 mb-4">Thanh toán thành công! 🎉</h1>
      <p className="mb-6">Cảm ơn bạn đã mua hàng tại VIBE Store.</p>
      <Link href="/" className="bg-blue-600 px-6 py-2 rounded font-bold hover:bg-blue-700">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}
