import { Court } from "./types";

export const courts: Court[] = [
  {
    id: 1,
    name: "Sân Cầu Lông VIBE Pro - Cầu Giấy",
    slug: "san-vibe-pro-cau-giay",
    pricePerHour: 120000,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500",
    location: "Ngõ 11 Duy Tân, Cầu Giấy, Hà Nội",
    description: "Sân tiêu chuẩn thi đấu, thảm đệm PVC chống trượt cực tốt. Trần cao 12m, đèn không chói mắt.",
    amenities: ["Wifi free", "Nước uống free", "Thảm Enlio", "Giữ xe free"],
    isAvailable: true,
  },
  {
    id: 2,
    name: "Câu Lạc Bộ Cầu Lông Thanh Xuân",
    slug: "clb-cau-long-thanh-xuan",
    pricePerHour: 100000,
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500",
    location: "Khuất Duy Tiến, Thanh Xuân, Hà Nội",
    description: "Cụm 4 sân rộng rãi, phù hợp giao lưu phong trào. Có khu vực ghế ngồi nghỉ ngơi rộng.",
    amenities: ["Căng vợt tại chỗ", "Bán phụ kiện", "Điều hòa nhẹ", "Trà đá"],
    isAvailable: true,
  },
  {
    id: 3,
    name: "Sân Đa Năng Bách Khoa",
    slug: "san-da-nang-bach-khoa",
    pricePerHour: 90000,
    image: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?w=500",
    location: "Trần Đại Nghĩa, Hai Bà Trưng, Hà Nội",
    description: "Sân sinh viên giá rẻ, thoáng mát. Chuyên phục vụ các giải đấu sinh viên và phong trào.",
    amenities: ["Quạt công nghiệp", "Gửi xe máy", "Thuê vợt"],
    isAvailable: true,
  },
  {
    id: 4,
    name: "VIBE Badminton Arena - Q7",
    slug: "vibe-arena-q7",
    pricePerHour: 150000,
    image: "https://images.unsplash.com/photo-1610214041763-71861053df18?w=500",
    location: "Nguyễn Thị Thập, Quận 7, TP.HCM",
    description: "Tổ hợp sân cầu lông cao cấp với cụm 8 sân tiêu chuẩn quốc tế. Hệ thống đèn chống chói hiện đại.",
    amenities: ["Thảm BWF", "Phòng thay đồ", "Nhà tắm", "Cafe"],
    isAvailable: true,
  }
];

export function getCourtById(id: number): Court | undefined {
  return courts.find((c) => c.id === id);
}

export function getCourtBySlug(slug: string): Court | undefined {
  return courts.find((c) => c.slug === slug);
}
