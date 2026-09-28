"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { formatVND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      }
    });
    toast.success(`Đã thêm ${product.name} vào giỏ!`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group relative block rounded-2xl bg-zinc-900 border border-zinc-800 p-4 transition-all hover:scale-[1.02] hover:border-purple-500 overflow-hidden">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-800 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-zinc-300">
          {product.category}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">{product.name}</h3>
        <p className="text-purple-400 font-bold">{formatVND(product.price)}</p>
      </div>
      <button 
        onClick={handleAddToCart}
        className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition-colors font-medium relative z-10"
      >
        Thêm vào giỏ
      </button>
    </Link>
  );
}
