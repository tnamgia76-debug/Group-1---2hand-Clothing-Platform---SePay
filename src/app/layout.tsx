import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmashCourt - Đặt Sân Cầu Lông",
  description: "Hệ thống đặt sân cầu lông trực tuyến, thanh toán nhanh qua payOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0' } }} />
        </CartProvider>
      </body>
    </html>
  );
}
