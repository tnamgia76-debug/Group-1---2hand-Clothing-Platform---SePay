export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Áo Thun Oversize Premium",
    price: 299000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Áo",
    description: "Áo thun oversize chất cotton 100%, form rộng thoải mái",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Trắng", "Be"]
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    price: 450000,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500",
    category: "Quần",
    description: "Quần jeans slim fit co giãn, tôn dáng",
    sizes: ["28", "29", "30", "31", "32"],
    colors: ["Xanh đậm", "Xanh nhạt"]
  },
  {
    id: 3,
    name: "Túi Tote Canvas",
    price: 189000,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500",
    category: "Phụ kiện",
    description: "Túi tote canvas bền đẹp, thân thiện môi trường",
    sizes: ["One Size"],
    colors: ["Trắng kem", "Đen"]
  },
  {
    id: 4,
    name: "Mắt Kính Thời Trang",
    price: 250000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "Phụ kiện",
    description: "Mắt kính chống tia UV, kiểu dáng hiện đại",
    sizes: ["One Size"],
    colors: ["Đen", "Nâu", "Trong suốt"]
  },
  {
    id: 5,
    name: "Áo Khoác Bomber",
    price: 650000,
    image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500",
    category: "Áo",
    description: "Áo khoác bomber chất liệu dù chống nước nhẹ",
    sizes: ["M", "L", "XL"],
    colors: ["Xanh rêu", "Đen"]
  },
  {
    id: 6,
    name: "Giày Sneaker Classic",
    price: 850000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
    category: "Giày",
    description: "Giày sneaker phong cách classic dễ phối đồ",
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Trắng", "Đen"]
  },
  {
    id: 7,
    name: "Áo Sơ Mi Cổ Cubar",
    price: 320000,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500",
    category: "Áo",
    description: "Áo sơ mi lụa mềm mại, cổ cubar thoáng mát",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Trắng", "Be", "Đen"]
  },
  {
    id: 8,
    name: "Ví Da Nam Cao Cấp",
    price: 490000,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    category: "Phụ kiện",
    description: "Ví da thật nguyên miếng, thiết kế tinh tế",
    sizes: ["One Size"],
    colors: ["Nâu bò", "Đen"]
  }
];
