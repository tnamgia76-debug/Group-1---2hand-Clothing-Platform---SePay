"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { formatVND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const product = products.find(p => p.id === id);
  const { dispatch } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || "");

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity: 1,
        selectedSize,
        selectedColor,
      }
    });
    toast.success(`Đã thêm ${product.name} vào giỏ!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-zinc-400 mb-8">
        <Link href="/" className="hover:text-purple-400">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-medium text-zinc-300">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl font-extrabold text-purple-400 mb-6">{formatVND(product.price)}</p>
          <p className="text-zinc-400 mb-8">{product.description}</p>

          {/* Size */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Kích thước</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-purple-500 bg-purple-500/20 text-purple-400"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-white mb-3">Màu sắc</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? "border-purple-500 bg-purple-500/20 text-purple-400"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Thêm vào giỏ
          </button>
          
          <button
             onClick={() => {
                handleAddToCart();
                router.push('/cart');
             }}
             className="w-full mt-4 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-colors text-white"
          >
             Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
