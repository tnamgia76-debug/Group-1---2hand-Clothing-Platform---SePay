"use client";
// 🟣 DÀNH CHO NGƯỜI D (Backend & Data)
// Trang Hủy Thanh Toán:
// - Khách hàng bấm hủy khi ở trang payOS sẽ văng về đây.
// - Khuyên khách quay lại giỏ hàng hoặc thử lại.

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="p-8 text-center text-white mt-10">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Thanh toán bị huỷ ❌</h1>
      <p className="mb-6">Rất tiếc giao dịch của bạn chưa được hoàn tất.</p>
      <Link href="/cart" className="bg-gray-600 px-6 py-2 rounded font-bold hover:bg-gray-700">
        Quay lại giỏ hàng
      </Link>
    </div>
  );
}
