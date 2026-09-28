// 🟡 DÀNH CHO NGƯỜI C (Pages)
// Trang Chi Tiết Sân Cầu Lông:
// - Tìm thông tin sân dựa theo ID trên URL.
// - Hiển thị giá, địa chỉ, tiện ích (amenities).
// - Form chọn Ngày (Date picker) và Khung giờ (Time slot: 18:00 - 19:30).
// - Gọi hàm addToCart() từ CartContext để bỏ lượt đặt sân này vào giỏ.

export default function CourtDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Chi tiết Sân ID: {params.id}</h1>
      <p>TODO: NGƯỜI C SẼ THIẾT KẾ CHỌN NGÀY GIỜ ĐẶT SÂN Ở ĐÂY</p>
    </div>
  );
}
