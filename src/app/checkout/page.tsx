"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { state } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const totalAmount = state.items.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) {
      toast.error("Giỏ hàng đang trống!");
      return;
    }

    if (!formData.name || !formData.phone) {
      toast.error("Vui lòng điền đủ tên và số điện thoại!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Đang tạo mã thanh toán...");

    try {
      // 1. Chuẩn bị dữ liệu gửi xuống API (đúng chuẩn type PaymentRequest)
      const payload = {
        orderCode: Number(String(new Date().getTime()).slice(-6)), // Tạo mã đơn ngẫu nhiên 6 số
        amount: totalAmount,
        description: `Thanh toan San cau long`, // payOS giới hạn 25 ký tự
        buyerName: formData.name,
        buyerPhone: formData.phone,
        buyerEmail: formData.email,
        items: state.items.map((item) => ({
          name: `${item.court.name} - ${item.date} ${item.timeSlot}`,
          quantity: 1,
          price: item.price,
        })),
      };

      // 2. Gọi API tạo link của chúng ta
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.checkoutUrl) {
        toast.success("Đang chuyển hướng sang trang thanh toán...", { id: toastId });
        // 3. Chuyển hướng người dùng sang trang quét mã QR của PayOS
        window.location.href = data.checkoutUrl;
      } else {
        toast.error("Có lỗi khi tạo link: " + data.message, { id: toastId });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối đến máy chủ!", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Thanh toán đặt sân</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4">Thông tin của bạn</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Họ và tên *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
              placeholder="VD: Nguyễn Văn A"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Số điện thoại *</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                placeholder="VD: 0987654321"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email (Tuỳ chọn)</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                placeholder="VD: a@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-600 font-medium">Tổng thanh toán:</span>
              <span className="text-3xl font-extrabold text-blue-600">{totalAmount.toLocaleString('vi-VN')}đ</span>
            </div>
            <button
              type="submit"
              disabled={loading || state.items.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang xử lý..." : "Tiến hành quét mã VietQR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
