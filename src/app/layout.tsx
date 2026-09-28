import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "VIBE Fashion Store",
  description: "Trải nghiệm mua sắm thời trang cực VIBE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-gray-950 text-white min-h-screen flex flex-col">
        {/* <CartProvider> */}
          {/* <Navbar /> */}
          <div className="flex-grow">
            {children}
          </div>
          {/* <Footer /> */}
        {/* </CartProvider> */}
      </body>
    </html>
  );
}
