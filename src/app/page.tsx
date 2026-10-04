"use client";

import { useState } from "react";
import Link from "next/link";
import CourtCard from "@/components/CourtCard";
import { courts } from "@/lib/courts";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(courts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourts = courts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-sm relative overflow-hidden w-full max-w-5xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 uppercase tracking-tight text-slate-800 leading-tight">
          Nền Tảng Đặt Sân <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Thông Minh</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Quên đi nỗi lo gọi điện hỏi lịch trống hay chuyển khoản thủ công. 
          Hiển thị lịch trống thời gian thực, thanh toán và giữ chỗ tự động qua payOS.
        </p>
        <Link href="/search" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-12 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
          Bắt đầu Tìm Sân
        </Link>
      </section>

      {/* Danh sách Tất cả các sân */}
      <section className="max-w-6xl mx-auto" id="all-courts">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Tất Cả Các Cụm Sân</h2>
          <span className="text-slate-500 font-medium bg-slate-100 px-4 py-1.5 rounded-full text-sm">{courts.length} sân</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[400px]">
          {currentCourts.map((court: any) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                document.getElementById('all-courts')?.scrollIntoView({ behavior: 'smooth' });
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
                    document.getElementById('all-courts')?.scrollIntoView({ behavior: 'smooth' });
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
                document.getElementById('all-courts')?.scrollIntoView({ behavior: 'smooth' });
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
