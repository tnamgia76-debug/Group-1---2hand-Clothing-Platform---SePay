import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-8 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-red-500">Thanh toán bị hủy</h1>
      <p className="text-zinc-400 text-lg max-w-md mx-auto mb-8">
        Quá trình thanh toán đã bị hủy. Đơn hàng của bạn chưa được thanh toán.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/cart" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
          Về giỏ hàng
        </Link>
        <Link href="/" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
