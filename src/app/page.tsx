import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Vibe Collection
          </span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
          Khám phá bộ sưu tập mới nhất với thiết kế hiện đại, chất liệu cao cấp và phong cách tối giản. 
          Tích hợp thanh toán payOS siêu tốc.
        </p>
        <Link 
          href="#products" 
          className="inline-block bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform"
        >
          Mua ngay
        </Link>
      </section>

      {/* Product Grid */}
      <section id="products" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
