"use client";

import { useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { courts, getCourtById } from "@/lib/courts";

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 5; i < 24; i++) {
    slots.push(`${i}:00`);
    slots.push(`${i}:30`);
  }
  return slots;
};
const timeSlots = generateTimeSlots();

export default function CourtDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  if (!id) return <div className="p-8 text-white">Đang tải...</div>;

  const court = getCourtById(id);

  const { dispatch } = useCart();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState<{courtIdx: number, time: string}[]>([]);

  if (!court) return notFound();

  const getSlotStatus = (courtIdx: number, timeStr: string, date: string) => {
    const hash = courtIdx * 31 + timeStr.charCodeAt(0) * 17 + timeStr.charCodeAt(3) * 7 + date.charCodeAt(date.length-1);
    if (hash % 10 < 2) return "locked"; 
    if (hash % 10 < 5) return "booked"; 
    return "available";
  };

  const toggleSlot = (courtIdx: number, time: string, status: string) => {
    if (status !== "available") return;
    const isSelected = selectedSlots.some(s => s.courtIdx === courtIdx && s.time === time);
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter(s => !(s.courtIdx === courtIdx && s.time === time)));
    } else {
      setSelectedSlots([...selectedSlots, { courtIdx, time }]);
    }
  };

  const handleBook = () => {
    if (selectedSlots.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 ca chơi!");
      return;
    }
    
    // Đẩy từng slot vào Cart Context
    selectedSlots.forEach(slot => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          court,
          date: selectedDate,
          timeSlot: `Sân ${slot.courtIdx + 1} (${slot.time})`,
          price: court.pricePerHour / 2
        }
      });
    });

    toast.success(`Đã thêm ${selectedSlots.length} ca. Đang chuyển tới trang Lịch Đặt...`);
    setTimeout(() => {
      router.push('/cart');
    }, 1000);
  };

  const totalPrice = selectedSlots.length * (court.pricePerHour / 2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Thông tin sân */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2 text-slate-800">{court.name}</h1>
          <p className="text-slate-500 mb-4">{court.address}</p>
          <div className="flex gap-2 mb-6 flex-wrap">
            {court.amenities.map((am: string, i: number) => (
              <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md border border-slate-200">
                {am}
              </span>
            ))}
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md border border-blue-200">
              Tổng cộng: {court.numberOfCourts} sân
            </span>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">{court.pricePerHour.toLocaleString('vi-VN')}đ <span className="text-lg font-normal text-slate-400">/giờ</span></p>
          <p className="text-sm text-slate-500">Mỗi block là 30 phút ({ (court.pricePerHour / 2).toLocaleString('vi-VN') }đ)</p>
        </div>
      </div>

      {/* Grid Đặt Sân */}
      <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-3xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Lịch Trống & Đặt Sân</h2>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlots([]); 
            }}
            className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all w-full md:w-auto font-medium shadow-sm"
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 items-center text-sm mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 font-medium text-slate-600"><span className="w-5 h-5 bg-white rounded border border-slate-300 shadow-sm"></span> Trống</div>
          <div className="flex items-center gap-2 font-medium text-slate-600"><span className="w-5 h-5 bg-rose-500 rounded shadow-sm"></span> Đã đặt</div>
          <div className="flex items-center gap-2 font-medium text-slate-600">
            <span className="w-5 h-5 bg-slate-200 rounded relative overflow-hidden flex items-center justify-center border border-slate-300">
              <span className="w-[120%] h-[2px] bg-slate-400 -rotate-45 absolute"></span>
            </span> Khoá
          </div>
          <div className="flex items-center gap-2 font-medium text-slate-600"><span className="w-5 h-5 bg-blue-500 rounded shadow-sm"></span> Đang chọn</div>
        </div>

        {/* Bảng Table Grid chọn giờ */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 bg-white custom-scrollbar shadow-inner">
          <table className="w-full text-center border-collapse text-xs select-none min-w-[1200px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-slate-50 border-r border-b border-slate-200 p-3 min-w-[80px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-slate-500">
                  {selectedDate.split('-').reverse().join('/')}
                </th>
                {timeSlots.map(t => (
                  <th key={t} className="border-b border-r border-slate-200 p-2 min-w-[40px] md:min-w-[50px] bg-slate-50 font-semibold text-slate-600">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: court.numberOfCourts }).map((_, cIdx) => (
                <tr key={cIdx}>
                  <td className="sticky left-0 z-10 bg-white border-r border-b border-slate-200 p-3 font-bold text-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
                    Sân {cIdx + 1}
                  </td>
                  {timeSlots.map(t => {
                    const status = getSlotStatus(cIdx, t, selectedDate);
                    const isSelected = selectedSlots.some(s => s.courtIdx === cIdx && s.time === t);
                    
                    let bgClass = "bg-white hover:bg-slate-100 cursor-pointer";
                    let innerContent = null;
                    
                    if (status === "locked") {
                      bgClass = "bg-slate-200 cursor-not-allowed";
                      innerContent = <div className="w-[140%] h-[1px] bg-slate-400 -rotate-45 absolute top-1/2 left-[-20%]"></div>;
                    } else if (status === "booked") {
                      bgClass = "bg-rose-500 cursor-not-allowed";
                    } else if (isSelected) {
                      bgClass = "bg-blue-500 cursor-pointer border-[2px] border-blue-300 z-10 relative shadow-sm";
                    }

                    return (
                      <td 
                        key={t} 
                        onClick={() => toggleSlot(cIdx, t, status)}
                        className={`border-r border-b border-slate-200 p-0 m-0 ${bgClass} transition-colors relative overflow-hidden`}
                      >
                        <div className="h-8 md:h-10 w-full relative">
                          {innerContent}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nút hành động */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-slate-500 mb-1 font-medium">Đã chọn: <strong className="text-slate-800 text-lg">{selectedSlots.length}</strong> ca (30 phút/ca)</p>
            <p className="text-3xl font-bold text-blue-600">{totalPrice.toLocaleString('vi-VN')}đ</p>
          </div>
          <button
            onClick={handleBook}
            disabled={selectedSlots.length === 0}
            className="w-full md:w-auto px-12 py-4 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none"
          >
            TIẾP THEO
          </button>
        </div>

      </div>
    </div>
  );
}
