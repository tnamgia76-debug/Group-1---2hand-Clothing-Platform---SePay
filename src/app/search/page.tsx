"use client";

import { useState, useEffect } from "react";
import CourtCard from "@/components/CourtCard";
import { mockCourts } from "@/lib/mockData";

const locations = {
  "Hai Bà Trưng": ["Bách Khoa", "Minh Khai", "Đồng Tâm", "Thanh Nhàn"],
  "Cầu Giấy": ["Dịch Vọng Hậu", "Quan Hoa", "Mai Dịch", "Yên Hòa"],
  "Hoàng Mai": ["Hoàng Văn Thụ", "Đại Kim", "Giáp Bát", "Tân Mai"],
  "Nam Từ Liêm": ["Mỹ Đình 1", "Mỹ Đình 2", "Trung Văn", "Mễ Trì"],
  "Long Biên": ["Ngọc Lâm", "Bồ Đề", "Gia Thụy", "Thạch Bàn"],
  "Thanh Xuân": ["Thanh Xuân Trung", "Thanh Xuân Bắc", "Nhân Chính"],
  "Tây Hồ": ["Bưởi", "Thụy Khuê", "Nhật Tân", "Quảng An"],
  "Đống Đa": ["Trung Liệt", "Ô Chợ Dừa", "Láng Hạ", "Nam Đồng"],
  "Hoàn Kiếm": ["Trần Hưng Đạo", "Hàng Bài", "Phan Chu Trinh"],
  "Hà Đông": ["Quang Trung", "Vạn Phúc", "Hà Cầu", "Mộ Lao"]
};

export default function SearchPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [searchName, setSearchName] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDistrict, selectedWard, searchName]);

  const districts = Object.keys(locations);
  const wards = selectedDistrict ? locations[selectedDistrict as keyof typeof locations] : [];

  const isFiltering = selectedDistrict !== "" || searchName !== "";

  let filteredCourts = [];
  if (isFiltering) {
    filteredCourts = mockCourts.filter(c => {
      if (selectedDistrict && c.district !== selectedDistrict) return false;
      if (selectedWard && c.ward !== selectedWard) return false;
      if (searchName && !c.name.toLowerCase().includes(searchName.toLowerCase())) return false;
      return true;
    });
  } else {
    // Sân nổi bật mặc định khi chưa có bộ lọc
    filteredCourts = mockCourts.slice(0, 6);
  }

  const totalPages = Math.ceil(filteredCourts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourts = filteredCourts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bộ Lọc Tìm Kiếm */}
      <section className="mb-10 max-w-5xl mx-auto" id="search">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Tìm Sân Phù Hợp</h1>
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-200 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Quận / Huyện</label>
            <select 
              value={selectedDistrict}
              onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedWard(""); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
            >
              <option value="">Tất cả Quận</option>
              {districts.map(d => <option key={d} value={d}>Quận {d}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Phường / Xã</label>
            <select 
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:bg-slate-100 font-medium cursor-pointer"
            >
              <option value="">Tất cả Phường</option>
              {wards.map(w => <option key={w} value={w}>Phường {w}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Tên sân</label>
            <input 
              type="text" 
              placeholder="Nhập tên sân..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* Grid Sân */}
      <section id="courts" className="scroll-mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            {!isFiltering ? "Cụm Sân Nổi Bật" : (filteredCourts.length > 0 ? "Kết Quả Tìm Kiếm" : "Không tìm thấy sân nào")}
          </h2>
          <span className="text-slate-500 font-medium bg-slate-100 px-4 py-1.5 rounded-full text-sm">{filteredCourts.length} {isFiltering ? "kết quả" : "sân"}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[350px]">
          {currentCourts.map((court: any) => (
            <CourtCard key={court.id} court={court} />
          ))}
          {currentCourts.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-slate-400 h-full bg-white rounded-3xl border border-slate-100 p-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <p className="text-lg font-medium text-slate-500">Thử thay đổi bộ lọc hoặc tìm kiếm quận khác nhé!</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Trang trước
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                    currentPage === i + 1 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Trang sau
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
