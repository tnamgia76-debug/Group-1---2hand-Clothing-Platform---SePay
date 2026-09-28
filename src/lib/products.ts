import { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Áo Thun Oversize Premium",
    slug: "ao-thun-oversize-premium",
    price: 299000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Áo",
    description: "Áo thun oversize chất cotton 100%, form rộng thoải mái, phù hợp mọi dáng người.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Trắng", "Be"],
    inStock: true,
  },
  // Thêm dữ liệu sản phẩm khác tại đây...
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}
