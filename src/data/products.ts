/**
 * @deprecated LEGACY MOCK DATA FILE
 * 
 * This file contains static mock data for development reference ONLY.
 * All production data comes from Supabase via hooks in:
 *   - src/hooks/useShopData.ts (products, categories, reviews, slider)
 *   - src/hooks/useOrders.ts (orders)
 * 
 * DO NOT import from this file in production code.
 * This file will be removed in a future version.
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  category: string;
  categorySlug: string;
  stock: number;
  sku: string;
  shortDescription: string;
  description: string;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface SliderSlide {
  id: string;
  image: string;
  heading: string;
  text: string;
  ctaText: string;
  ctaLink: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

// Sample Categories
export const categories: Category[] = [
  {
    id: '1',
    name: "Women's Fashion",
    slug: 'womens-fashion',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80',
    productCount: 4,
  },
  {
    id: '2',
    name: "Men's Fashion",
    slug: 'mens-fashion',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
    productCount: 4,
  },
  {
    id: '3',
    name: "Baby's Fashion",
    slug: 'babys-fashion',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
    productCount: 4,
  },
  {
    id: '4',
    name: 'Casual Wear',
    slug: 'casual-wear',
    image: 'https://images.unsplash.com/photo-1525171254930-643fc658b64e?w=600&q=80',
    productCount: 4,
  },
  {
    id: '5',
    name: 'Formal Wear',
    slug: 'formal-wear',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    productCount: 4,
  },
  {
    id: '6',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    productCount: 4,
  },
];

// Sample Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Fit Oxford Shirt',
    slug: 'classic-fit-oxford-shirt',
    price: 1299,
    salePrice: 999,
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    stock: 45,
    sku: 'MW-OXF-001',
    shortDescription: 'Premium cotton Oxford shirt with a timeless button-down collar.',
    description: 'Elevate your wardrobe with this classic Oxford shirt. Crafted from 100% premium cotton, featuring a button-down collar, single chest pocket, and adjustable cuffs. Perfect for both office and casual wear.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Slim Fit Chino Trousers',
    slug: 'slim-fit-chino-trousers',
    price: 1499,
    category: 'Casual Wear',
    categorySlug: 'casual-wear',
    stock: 30,
    sku: 'MW-CHI-002',
    shortDescription: 'Comfortable slim-fit chinos in a versatile neutral tone.',
    description: 'These slim-fit chinos are a wardrobe essential. Made from stretch cotton twill for maximum comfort, featuring a flat front, belt loops, and clean-finished hems. Pair with a shirt or tee for any occasion.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Premium Denim Jacket',
    slug: 'premium-denim-jacket',
    price: 2499,
    salePrice: 1999,
    category: 'Casual Wear',
    categorySlug: 'casual-wear',
    stock: 20,
    sku: 'MW-DNM-003',
    shortDescription: 'Classic denim jacket with a modern washed finish.',
    description: 'A wardrobe staple that never goes out of style. This premium denim jacket features a button-front closure, chest pockets, and a comfortable regular fit. The washed finish gives it a vintage character.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: '4',
    name: 'Floral Print Maxi Dress',
    slug: 'floral-print-maxi-dress',
    price: 1899,
    salePrice: 1499,
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    stock: 25,
    sku: 'WW-MXD-001',
    shortDescription: 'Elegant floral maxi dress perfect for summer occasions.',
    description: 'Turn heads with this stunning floral print maxi dress. Features a flattering V-neckline, flowing skirt, and adjustable waist tie. Made from lightweight, breathable fabric — ideal for summer events, brunches, and vacation.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Silk Blend Blouse',
    slug: 'silk-blend-blouse',
    price: 1599,
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    stock: 35,
    sku: 'WW-BLS-002',
    shortDescription: 'Luxurious silk blend blouse with delicate pleating.',
    description: 'Effortlessly chic, this silk blend blouse features delicate front pleating, a relaxed fit, and mother-of-pearl buttons. The smooth, lustrous fabric drapes beautifully. Pair with tailored trousers for the office or jeans for a casual look.',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
      'https://images.unsplash.com/photo-1551163943-3f7fb896e3f2?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '6',
    name: 'High-Waist Palazzo Pants',
    slug: 'high-waist-palazzo-pants',
    price: 1399,
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    stock: 40,
    sku: 'WW-PLZ-003',
    shortDescription: 'Flowy high-waist palazzo pants for effortless elegance.',
    description: 'These flowing palazzo pants offer the perfect blend of style and comfort. Featuring a high waist with a wide self-tie belt, wide legs, and a luxurious drape. Available in multiple colors to suit every taste.',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    ],
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'Boys Graphic Print T-Shirt',
    slug: 'boys-graphic-print-tshirt',
    price: 599,
    salePrice: 449,
    category: "Baby's Fashion",
    categorySlug: 'babys-fashion',
    stock: 60,
    sku: 'KW-TSH-001',
    shortDescription: 'Fun graphic print t-shirt in soft, breathable cotton.',
    description: 'Let kids express their style with this fun graphic print t-shirt. Made from 100% soft cotton, it\'s comfortable for all-day wear. Features vibrant, long-lasting prints and reinforced stitching for durability.',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Girls Party Frock',
    slug: 'girls-party-frock',
    price: 899,
    category: "Baby's Fashion",
    categorySlug: 'babys-fashion',
    stock: 35,
    sku: 'KW-FRK-002',
    shortDescription: 'Adorable party frock with tulle layers and satin details.',
    description: 'Make every occasion special with this beautiful party frock. Features a satin bodice with floral appliqué, a tulle-layered skirt, and a comfortable cotton lining. Perfect for birthdays, weddings, and family gatherings.',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    ],
    isBestSeller: true,
  },
  {
    id: '9',
    name: 'Kids Denim Dungarees',
    slug: 'kids-denim-dungarees',
    price: 1099,
    salePrice: 849,
    category: "Baby's Fashion",
    categorySlug: 'babys-fashion',
    stock: 25,
    sku: 'KW-DNG-003',
    shortDescription: 'Adorable denim dungarees with adjustable straps.',
    description: 'These classic denim dungarees are perfect for playful adventures. Featuring adjustable shoulder straps, multiple pockets, and a comfortable relaxed fit. Made from durable denim that gets softer with every wash.',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: '10',
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    price: 1999,
    category: 'Accessories',
    categorySlug: 'accessories',
    stock: 20,
    sku: 'AC-BAG-001',
    shortDescription: 'Genuine leather crossbody bag with adjustable strap.',
    description: 'This elegant crossbody bag is crafted from genuine leather with a smooth finish. Features an adjustable strap, magnetic snap closure, interior zip pocket, and card slots. Compact yet spacious enough for your daily essentials.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    ],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '11',
    name: 'Classic Aviator Sunglasses',
    slug: 'classic-aviator-sunglasses',
    price: 799,
    salePrice: 599,
    category: 'Accessories',
    categorySlug: 'accessories',
    stock: 50,
    sku: 'AC-SUN-002',
    shortDescription: 'Retro aviator sunglasses with UV400 protection.',
    description: 'These timeless aviator sunglasses combine classic style with modern UV400 protection. Features a lightweight metal frame, polarized lenses, and adjustable nose pads for a comfortable fit. Comes with a protective case and cleaning cloth.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '12',
    name: 'Woven Leather Belt',
    slug: 'woven-leather-belt',
    price: 699,
    category: 'Accessories',
    categorySlug: 'accessories',
    stock: 55,
    sku: 'AC-BLT-003',
    shortDescription: 'Hand-woven leather belt with brushed metal buckle.',
    description: 'Add a sophisticated touch to any outfit with this hand-woven leather belt. Crafted from genuine leather strips, featuring a brushed antique metal buckle. The woven design allows for flexible sizing. Perfect for both formal and casual wear.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
    ],
    isBestSeller: true,
  },
  // ── Men's Fashion ──────────────────────────────────────
  {
    id: '13',
    name: 'Tailored Wool Blazer',
    slug: 'tailored-wool-blazer',
    price: 3499,
    salePrice: 2799,
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    stock: 18,
    sku: 'MW-BLZ-004',
    shortDescription: 'Slim-fit wool blend blazer with notch lapels.',
    description: 'Command attention with this impeccably tailored wool blend blazer. Features notch lapels, a two-button front, functional sleeve buttons, and a fully lined interior. Perfect for business meetings, dinners, and formal events.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
    ],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '14',
    name: 'Classic Polo T-Shirt',
    slug: 'classic-polo-tshirt',
    price: 899,
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    stock: 70,
    sku: 'MW-POL-005',
    shortDescription: 'Breathable piqué cotton polo with contrast collar.',
    description: 'A timeless polo shirt crafted from premium piqué cotton. Features a ribbed collar and cuffs, two-button placket, and side vents for comfortable movement. Available in six versatile colors.',
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: '15',
    name: 'Stretch Jogger Pants',
    slug: 'stretch-jogger-pants',
    price: 1199,
    salePrice: 949,
    category: "Men's Fashion",
    categorySlug: 'mens-fashion',
    stock: 40,
    sku: 'MW-JOG-006',
    shortDescription: 'Tapered jogger pants with elastic cuffs and drawstring waist.',
    description: 'Upgrade your casual wardrobe with these tapered jogger pants. Made from a soft cotton-polyester blend with four-way stretch, featuring an elastic drawstring waist, zippered pockets, and ribbed ankle cuffs.',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    ],
    isBestSeller: true,
  },
  // ── Women's Fashion ────────────────────────────────────
  {
    id: '16',
    name: 'Embroidered Cotton Kurti',
    slug: 'embroidered-cotton-kurti',
    price: 1299,
    salePrice: 1049,
    category: "Women's Fashion",
    categorySlug: 'womens-fashion',
    stock: 30,
    sku: 'WW-KRT-004',
    shortDescription: 'Hand-embroidered cotton kurti with mirror work details.',
    description: 'This stunning cotton kurti showcases intricate hand embroidery and delicate mirror work. Features a mandarin collar, three-quarter sleeves, and side slits for easy movement. Pair with leggings or palazzo pants for a complete look.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  // ── Baby's Fashion ─────────────────────────────────────
  {
    id: '17',
    name: 'Toddler Canvas Sneakers',
    slug: 'toddler-canvas-sneakers',
    price: 699,
    salePrice: 549,
    category: "Baby's Fashion",
    categorySlug: 'babys-fashion',
    stock: 45,
    sku: 'KW-SNK-004',
    shortDescription: 'Adorable canvas sneakers with easy velcro straps.',
    description: 'These cute and practical canvas sneakers are designed for little adventurers. Feature easy-to-use velcro straps, cushioned insoles, and non-slip rubber soles. Available in fun colors and patterns that kids love.',
    images: [
      'https://images.unsplash.com/photo-1555009306-30a937a36929?w=800&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80',
    ],
    isBestSeller: true,
    isFeatured: true,
  },
  // ── Casual Wear ────────────────────────────────────────
  {
    id: '18',
    name: 'Graphic Print Hoodie',
    slug: 'graphic-print-hoodie',
    price: 1799,
    salePrice: 1399,
    category: 'Casual Wear',
    categorySlug: 'casual-wear',
    stock: 35,
    sku: 'CW-HOD-001',
    shortDescription: 'Oversized graphic hoodie in heavyweight French terry.',
    description: 'Stay cozy and stylish with this oversized graphic hoodie. Made from premium heavyweight French terry cotton, featuring a bold chest print, kangaroo pocket, drawstring hood, and ribbed trims. Perfect for layering on cool days.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '19',
    name: 'Cotton Cargo Shorts',
    slug: 'cotton-cargo-shorts',
    price: 999,
    category: 'Casual Wear',
    categorySlug: 'casual-wear',
    stock: 50,
    sku: 'CW-SHR-002',
    shortDescription: 'Relaxed-fit cargo shorts with multiple utility pockets.',
    description: 'Built for adventure and everyday comfort, these cargo shorts feature a relaxed fit, multiple utility pockets with button flaps, and a durable cotton twill construction. Belt loops and zip-fly closure complete the look.',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&q=80',
    ],
    isBestSeller: true,
  },
  // ── Formal Wear ────────────────────────────────────────
  {
    id: '20',
    name: 'Pinstripe Three-Piece Suit',
    slug: 'pinstripe-three-piece-suit',
    price: 7999,
    salePrice: 6499,
    category: 'Formal Wear',
    categorySlug: 'formal-wear',
    stock: 10,
    sku: 'FW-SUT-001',
    shortDescription: 'Classic pinstripe three-piece suit in navy wool blend.',
    description: 'Make a statement with this classic pinstripe three-piece suit. Crafted from fine wool blend fabric, includes a single-breasted jacket with peak lapels, matching waistcoat, and flat-front trousers. Fully lined for a polished finish.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
    ],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '21',
    name: 'French Cuff Dress Shirt',
    slug: 'french-cuff-dress-shirt',
    price: 1899,
    category: 'Formal Wear',
    categorySlug: 'formal-wear',
    stock: 30,
    sku: 'FW-DSH-002',
    shortDescription: 'Crisp white dress shirt with French cuffs and spread collar.',
    description: 'Elevate your formal wardrobe with this immaculate white dress shirt. Features a spread collar, French cuffs for cufflinks, a slim fit silhouette, and wrinkle-resistant premium cotton construction. A boardroom essential.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '22',
    name: 'Slim Fit Dress Trousers',
    slug: 'slim-fit-dress-trousers',
    price: 1699,
    salePrice: 1399,
    category: 'Formal Wear',
    categorySlug: 'formal-wear',
    stock: 25,
    sku: 'FW-DTR-003',
    shortDescription: 'Tailored slim-fit dress trousers with crease detailing.',
    description: 'These expertly tailored dress trousers offer a modern slim fit with classic crease detailing. Made from a wool-polyester blend for shape retention, featuring a hook-and-bar closure, belt loops, and a clean hemmed finish.',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    ],
    isBestSeller: true,
  },
  {
    id: '23',
    name: 'Silk Necktie & Pocket Square Set',
    slug: 'silk-necktie-pocket-square-set',
    price: 999,
    salePrice: 799,
    category: 'Formal Wear',
    categorySlug: 'formal-wear',
    stock: 40,
    sku: 'FW-TIE-004',
    shortDescription: 'Premium silk necktie with matching pocket square in gift box.',
    description: 'Complete your formal look with this premium silk necktie and matching pocket square. Features a rich satin finish, precise stitching, and comes beautifully presented in a gift box. Available in a range of sophisticated patterns.',
    images: [
      'https://images.unsplash.com/photo-1589756823695-278bc923a84d?w=800&q=80',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
    ],
    isNew: true,
  },
  // ── Accessories ────────────────────────────────────────
  {
    id: '24',
    name: 'Canvas Weekend Tote Bag',
    slug: 'canvas-weekend-tote-bag',
    price: 1299,
    category: 'Accessories',
    categorySlug: 'accessories',
    stock: 30,
    sku: 'AC-TOT-004',
    shortDescription: 'Spacious canvas tote with leather handles and zip top.',
    description: 'This versatile canvas tote bag is perfect for weekends, work, or travel. Features durable waxed canvas, reinforced leather handles, a secure zip-top closure, interior organizer pockets, and a detachable shoulder strap.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    ],
    isNew: true,
    isFeatured: true,
  },
];

// Sample Slider Slides
export const sliderSlides: SliderSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    heading: 'New Season Collection',
    text: 'Discover the latest trends in fashion and clothing',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
    heading: 'Summer Sale',
    text: 'Up to 50% off on selected clothing items',
    ctaText: 'View Collection',
    ctaLink: '/shop?sale=true',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    heading: 'Premium Fashion',
    text: 'Handpicked clothing for every style and occasion',
    ctaText: 'Explore',
    ctaLink: '/shop',
  },
];

// Sample Reviews
export const reviews: Review[] = [
  {
    id: '1',
    name: 'Fatima Rahman',
    rating: 5,
    text: 'The quality of the fabrics is outstanding! I ordered three dresses and each one fits perfectly. Will definitely shop again.',
    date: '2026-01-15',
  },
  {
    id: '2',
    name: 'Arif Hossain',
    rating: 5,
    text: 'Bought a formal shirt and chinos for my office. The fitting is excellent and the material feels premium. Highly recommended!',
    date: '2026-01-10',
  },
  {
    id: '3',
    name: 'Nusrat Jahan',
    rating: 4,
    text: 'Great variety of kids clothing. My daughter loves her new party frock! Fast delivery too.',
    date: '2026-01-05',
  },
];

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isFeatured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.isBestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
};
