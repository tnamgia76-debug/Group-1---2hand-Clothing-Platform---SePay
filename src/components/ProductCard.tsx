// 🔵 DÀNH CHO NGƯỜI B (UI Components)
// ProductCard component: 
// - Nhận vào prop là 1 object Product (import từ types).
// - Hiển thị ảnh, tên, giá (dùng formatVND từ utils.ts), nút thêm giỏ hàng.
// - Card có hiệu ứng hover mượt mà.

import { Product } from "@/lib/types";
import { formatVND } from "@/lib/utils";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border border-gray-700 p-4 rounded bg-gray-800">
      <div>TODO: PRODUCT CARD - NGƯỜI B SẼ LÀM Ở ĐÂY ({product.name})</div>
    </div>
  );
}
