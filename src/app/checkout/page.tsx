"use client";
// 🟣 DÀNH CHO NGƯỜI D (Backend & Data)
// Trang Thanh Toán (Checkout):
// - Giao diện Form điền thông tin khách hàng (Tên, SDT, Email, Địa chỉ) -> Có thể nhờ C hỗ trợ nếu lười CSS.
// - Lấy tổng tiền và danh sách sản phẩm từ CartContext.
// - Bấm nút Thanh Toán -> Gửi POST request tới /api/create-payment.
// - Nhận về checkoutUrl -> Redirect User sang trang quét QR của payOS.

export default function CheckoutPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Thanh toán</h1>
      <p>TODO: NGƯỜI D SẼ THIẾT KẾ FORM THANH TOÁN VÀ XỬ LÝ FETCH API Ở ĐÂY</p>
    </div>
  );
}
