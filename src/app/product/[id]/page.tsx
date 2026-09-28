// 🟡 DÀNH CHO NGƯỜI C (Pages)
// Trang Chi Tiết Sản Phẩm:
// - Tìm sản phẩm dựa theo ID trên URL.
// - Cho phép chọn màu sắc, kích cỡ và số lượng.
// - Gọi hàm addToCart() từ CartContext để bỏ vào giỏ hàng.

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Chi tiết sản phẩm ID: {params.id}</h1>
      <p>TODO: NGƯỜI C SẼ THIẾT KẾ GIAO DIỆN Ở ĐÂY</p>
    </div>
  );
}
