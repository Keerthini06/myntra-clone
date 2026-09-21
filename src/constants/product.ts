export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
  rating: number;
  stock: number;
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Regular Fit Casual Shirt',
    brand: 'Roadster',
    price: 799,
    originalPrice: 1599,
    discount: 50,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White'],
    rating: 4.3,
    stock: 25,
  },

  {
    id: 'p2',
    name: 'Floral Printed Dress',
    brand: 'DressBerry',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Black'],
    rating: 4.5,
    stock: 18,
  },

  {
    id: 'p3',
    name: 'Casual Sneakers',
    brand: 'HRX',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White', 'Red'],
    rating: 4.4,
    stock: 30,
  },

  {
    id: 'p4',
    name: 'Women Shoulder Bag',
    brand: 'Mast & Harbour',
    price: 899,
    originalPrice: 1799,
    discount: 50,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    sizes: ['FREE SIZE'],
    colors: ['Brown', 'Black'],
    rating: 4.2,
    stock: 12,
  },

  {
    id: 'p5',
    name: 'Oversized Graphic T-Shirt',
    brand: 'H&M',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    rating: 4.1,
    stock: 40,
  },

  {
    id: 'p6',
    name: 'Women Straight Jeans',
    brand: 'Roadster',
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
    sizes: ['26', '28', '30', '32'],
    colors: ['Blue', 'Black'],
    rating: 4.4,
    stock: 22,
  },

  {
    id: 'p7',
    name: 'Kids Printed T-Shirt',
    brand: 'U.S. Polo Assn.',
    price: 599,
    originalPrice: 999,
    discount: 40,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    sizes: ['2-3Y', '4-5Y', '6-7Y'],
    colors: ['Yellow', 'Blue'],
    rating: 4.3,
    stock: 20,
  },

  {
    id: 'p8',
    name: 'Matte Lipstick',
    brand: 'Maybelline',
    price: 499,
    originalPrice: 699,
    discount: 29,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa',
    sizes: ['FREE SIZE'],
    colors: ['Red', 'Pink', 'Nude'],
    rating: 4.6,
    stock: 50,
  },
];