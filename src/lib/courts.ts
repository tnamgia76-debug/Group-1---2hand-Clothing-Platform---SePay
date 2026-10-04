import { Court } from "./types";

export const courts: Court[] = [
  { id: "1", name: "Sân Cầu Lông Bách Khoa", image: "/images/court1.png", pricePerHour: 120000, amenities: ["Thảm xịn", "Đèn chống chói"], address: "Tạ Quang Bửu, Phường Bách Khoa, Quận Hai Bà Trưng, HN", district: "Hai Bà Trưng", ward: "Bách Khoa", numberOfCourts: 8 },
  { id: "2", name: "Sân Cầu Lông Trần Thái Tông", image: "/images/court2.png", pricePerHour: 150000, amenities: ["Bãi xe rộng", "Điều hoà mát"], address: "Trần Thái Tông, Phường Dịch Vọng Hậu, Quận Cầu Giấy, HN", district: "Cầu Giấy", ward: "Dịch Vọng Hậu", numberOfCourts: 10 },
  { id: "3", name: "Sân Cầu Lông Đền Lừ", image: "/images/court3.png", pricePerHour: 100000, amenities: ["Sân mới", "Free trà đá"], address: "KĐT Đền Lừ, Phường Hoàng Văn Thụ, Quận Hoàng Mai, HN", district: "Hoàng Mai", ward: "Hoàng Văn Thụ", numberOfCourts: 6 },
  { id: "4", name: "Sân Cầu Lông Mỹ Đình", image: "/images/court4.png", pricePerHour: 160000, amenities: ["Tiêu chuẩn thi đấu", "Thảm thạch anh"], address: "Lê Đức Thọ, Phường Mỹ Đình 1, Quận Nam Từ Liêm, HN", district: "Nam Từ Liêm", ward: "Mỹ Đình 1", numberOfCourts: 12 },
  { id: "5", name: "Sân Cầu Lông Đại Kim", image: "/images/court5.png", pricePerHour: 110000, amenities: ["Gần hồ mát", "Trần cao 12m"], address: "KĐT Đại Kim, Phường Đại Kim, Quận Hoàng Mai, HN", district: "Hoàng Mai", ward: "Đại Kim", numberOfCourts: 5 },
  { id: "6", name: "Sân Cầu Lông Quan Hoa", image: "/images/court1.png", pricePerHour: 130000, amenities: ["Sàn gỗ xịn", "Đèn pha"], address: "Quan Hoa, Phường Quan Hoa, Quận Cầu Giấy, HN", district: "Cầu Giấy", ward: "Quan Hoa", numberOfCourts: 7 },
  { id: "7", name: "Sân Cầu Lông Ngọc Lâm", image: "/images/court2.png", pricePerHour: 90000, amenities: ["Giá sinh viên"], address: "Ngọc Lâm, Phường Ngọc Lâm, Quận Long Biên, HN", district: "Long Biên", ward: "Ngọc Lâm", numberOfCourts: 4 },
  { id: "8", name: "Sân Cầu Lông Nguyễn Trãi", image: "/images/court3.png", pricePerHour: 140000, amenities: ["Sân chuẩn quốc tế"], address: "Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, HN", district: "Thanh Xuân", ward: "Thanh Xuân Trung", numberOfCourts: 15 },
  { id: "9", name: "Sân Cầu Lông Hồ Tây", image: "/images/court4.png", pricePerHour: 150000, amenities: ["Gần Hồ Tây", "Căng tin"], address: "Lạc Long Quân, Phường Bưởi, Quận Tây Hồ, HN", district: "Tây Hồ", ward: "Bưởi", numberOfCourts: 6 },
  { id: "10", name: "Sân Cầu Lông Thái Hà", image: "/images/court5.png", pricePerHour: 110000, amenities: ["Giữa trung tâm"], address: "Thái Hà, Phường Trung Liệt, Quận Đống Đa, HN", district: "Đống Đa", ward: "Trung Liệt", numberOfCourts: 8 },
  { id: "11", name: "Sân Cầu Lông Trần Hưng Đạo", image: "/images/court1.png", pricePerHour: 180000, amenities: ["Premium", "Khăn lạnh"], address: "Trần Hưng Đạo, Phường Trần Hưng Đạo, Quận Hoàn Kiếm, HN", district: "Hoàn Kiếm", ward: "Trần Hưng Đạo", numberOfCourts: 4 },
  { id: "12", name: "Sân Cầu Lông Quang Trung", image: "/images/court2.png", pricePerHour: 90000, amenities: ["Rộng rãi", "Gửi xe Free"], address: "Quang Trung, Phường Quang Trung, Quận Hà Đông, HN", district: "Hà Đông", ward: "Quang Trung", numberOfCourts: 10 },
  { id: "13", name: "Sân Cầu Lông Minh Khai", image: "/images/court3.png", pricePerHour: 125000, amenities: ["Thảm mới", "Trần cao"], address: "Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, HN", district: "Hai Bà Trưng", ward: "Minh Khai", numberOfCourts: 7 }
];

export function getCourtById(id: string): Court | undefined {
  return courts.find((c) => c.id === id);
}
