import { Product, Order, SellerAnalytics } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Lumina Wireless Silent Mouse',
    category: 'Workspace & Ergonomics',
    price: 1499,
    originalPrice: 2499,
    discountPercentage: 40,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for everyday productivity and clean ergonomics. The Lumina Wireless Mouse features ultra-quiet tactile switches, a high-precision 12,000 DPI sensor, and up to 18 months of battery life on standard AA cells.',
    features: [
      'Silent magnetic click mechanics for quiet study rooms or offices',
      'Dual connectivity: Bluetooth 5.1 & 2.4GHz USB receiver',
      'Ergonomic thumb rest designed for long coding sessions',
      'Textured anti-slip side grips'
    ],
    specs: {
      'DPI': '800 - 12,000 DPI',
      'Battery Life': 'Up to 18 Months',
      'Weight': '88 grams',
      'Warranty': '1 Year Brand Warranty'
    },
    stock: 34,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Rohan Sharma',
        rating: 5,
        date: '2026-06-20',
        comment: 'Really good build quality for the price. The clicks are actually silent, which is great for late night college assignments.',
        verified: true
      },
      {
        id: 'rev-2',
        userName: 'Priya Nair',
        rating: 4,
        date: '2026-06-18',
        comment: 'Connected instantly with my laptop via Bluetooth. Dongle works fine too.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Echoflow Studio Headphones',
    category: 'Audio & Tech',
    price: 4999,
    originalPrice: 7999,
    discountPercentage: 38,
    rating: 4.7,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immerse yourself in clean acoustics. Featuring custom 40mm dynamic drivers and active noise cancelling (ANC) that filters out distracting traffic and fan noise.',
    features: [
      'Active Noise Cancelling (ANC) + Ambient Mode',
      'Balanced audio tuning with deep bass response',
      'Plush memory foam ear cushions for extended comfort',
      '35-hour playback on a full Type-C charge'
    ],
    specs: {
      'Driver Size': '40mm Neodymium',
      'Bluetooth': 'Version 5.3',
      'ANC': 'Up to 30dB reduction',
      'Charging Time': '1.5 Hours'
    },
    stock: 18,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Aditya Verma',
        rating: 5,
        date: '2026-06-22',
        comment: 'Battery backup is solid. Used it on a train journey from Delhi to Jaipur and ANC blocked out most track noise.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Oakwood Minimal Laptop Stand',
    category: 'Workspace & Ergonomics',
    price: 1299,
    originalPrice: 1899,
    discountPercentage: 32,
    rating: 4.6,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from solid seasoned pinewood with smooth rounded edges. Elevates your laptop screen to eye level to prevent neck strain during long working hours.',
    features: [
      'Natural polished wood finish',
      'Ergonomic 15-degree typing angle',
      'Open design improves bottom laptop airflow and cooling',
      'Fits laptops and tablets from 11 to 16 inches'
    ],
    specs: {
      'Material': 'Seasoned Pine Wood',
      'Dimensions': '26cm x 22cm x 12cm',
      'Weight Capacity': 'Up to 5 kg',
      'Anti-slip': 'Silicone base pads'
    },
    stock: 45,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-4',
        userName: 'Sneha Patel',
        rating: 5,
        date: '2026-06-15',
        comment: 'Looks super clean on my study table. Lightweight yet holds my 15.6 inch laptop without any wobble.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'MechPro K3 Mechanical Keyboard',
    category: 'Workspace & Ergonomics',
    price: 3299,
    originalPrice: 4599,
    discountPercentage: 28,
    rating: 4.8,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Compact 75% layout mechanical keyboard with tactile brown switches. Ideal for coders and typists looking for satisfying feedback without loud clicking sounds.',
    features: [
      '84-key space-saving design',
      'Hot-swappable tactile brown switches',
      'White LED backlighting with multiple brightness modes',
      'Detachable braided Type-C cable'
    ],
    specs: {
      'Switch Type': 'Tactile Brown',
      'Keycaps': 'Double-shot ABS',
      'Polling Rate': '1000Hz',
      'Compatibility': 'Windows / Mac / Linux'
    },
    stock: 25,
    reviews: []
  },
  {
    id: 'prod-5',
    name: 'Aero LED Desk Lamp with USB Port',
    category: 'Workspace & Ergonomics',
    price: 1899,
    originalPrice: 2699,
    discountPercentage: 30,
    rating: 4.5,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist aluminum study lamp with touch brightness controls and 3 color temperature settings. Includes a built-in 5V USB port to charge your phone while reading.',
    features: [
      'Touch-sensitive dimming slider',
      '3 color modes: Warm White (3000K), Natural (4500K), Cool Daylight (6000K)',
      'Foldable dual-hinge arm for easy angle adjustment',
      'Eye-protection flicker-free LED panel'
    ],
    specs: {
      'Power Consumption': '10W',
      'USB Output': '5V / 1A',
      'Material': 'ABS + Aluminum alloy',
      'Power Source': 'Bureau of Indian Standards (BIS) certified adapter'
    },
    stock: 40,
    reviews: []
  },
  {
    id: 'prod-6',
    name: 'Apex 1080p Full HD Webcam',
    category: 'Audio & Tech',
    price: 2199,
    originalPrice: 3499,
    discountPercentage: 37,
    rating: 4.6,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp 1080p video streaming at 30fps with automatic low-light correction. Built-in dual noise-isolating mics make it perfect for online lectures and interviews.',
    features: [
      'Full HD 1920x1080 resolution',
      'Auto white balance and exposure correction',
      'Plug & Play USB 2.0 (No drivers required)',
      'Privacy cover clip included'
    ],
    specs: {
      'Focus Type': 'Fixed Focus (80cm to infinity)',
      'Field of View': '78 degrees',
      'Mic': 'Built-in digital microphone',
      'Cable Length': '1.5 meters'
    },
    stock: 20,
    reviews: []
  },
  {
    id: 'prod-7',
    name: 'Nomad Tech Accessory Organizer',
    category: 'Lifestyle & Gadgets',
    price: 799,
    originalPrice: 1299,
    discountPercentage: 38,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    description: 'Keep your hard drives, pen drives, earphones, and power banks neatly arranged. Water-resistant outer shell protects your gadgets during daily commute.',
    features: [
      'Durable water-resistant oxford fabric',
      'Multiple elastic loops and mesh zipper pockets',
      'Padded divider protects fragile hard disks',
      'Compact size fits easily into college bags'
    ],
    specs: {
      'Dimensions': '20cm x 13cm x 5cm',
      'Closure': 'Smooth dual zippers',
      'Color': 'Charcoal Grey',
      'Washable': 'Yes'
    },
    stock: 55,
    reviews: []
  },
  {
    id: 'prod-8',
    name: 'Solaris Active Fitness Watch',
    category: 'Lifestyle & Gadgets',
    price: 3999,
    originalPrice: 5999,
    discountPercentage: 33,
    rating: 4.8,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek metal casing with a vibrant 1.43 inch AMOLED display. Tracks heart rate, step count, sleep patterns, and supports over 100 sports modes.',
    features: [
      '1.43" AMOLED Display with Always-on feature',
      '24/7 Heart rate & Blood Oxygen (SpO2) monitor',
      'IP68 water and dust resistance rating',
      'Up to 7 days normal battery backup'
    ],
    specs: {
      'Screen Resolution': '466 x 466 pixels',
      'Strap Material': 'Soft skin-friendly silicone',
      'App Support': 'Android & iOS compatible',
      'Charging': 'Magnetic snap charger'
    },
    stock: 15,
    reviews: []
  },
  {
    id: 'prod-9',
    name: 'ErgoSoft Extended Desk Mat',
    category: 'Workspace & Ergonomics',
    price: 699,
    originalPrice: 999,
    discountPercentage: 30,
    rating: 4.7,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    description: 'Large 900x400mm mousepad with anti-fray stitched edges. Micro-textured cloth surface provides accurate mouse tracking for both work and casual gaming.',
    features: [
      'Spacious 90cm x 40cm area fits full keyboard and mouse',
      'Non-slip natural rubber base stays planted on glass or wood',
      'Water-resistant coating allows quick wipe cleaning',
      'Reinforced stitched perimeter prevents peeling'
    ],
    specs: {
      'Thickness': '3mm',
      'Surface': 'Speed & Control cloth weave',
      'Base': 'Textured rubber',
      'Color': 'Minimal All-Black'
    },
    stock: 70,
    reviews: []
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-88219',
    customerName: 'Karthik Reddy',
    customerEmail: 'karthik.r@gmail.com',
    shippingAddress: 'Flat 402, Green Meadows, HSR Layout Sector 2, Bengaluru, Karnataka 560102',
    items: [
      {
        productId: 'prod-8',
        name: 'Solaris Active Fitness Watch',
        price: 3999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 3999,
    discount: 0,
    shipping: 0,
    total: 3999,
    status: 'Processing',
    paymentMethod: 'UPI (Google Pay)',
    createdAt: '2 hours ago',
    estimatedDelivery: 'June 28, 2026',
    trackingNumber: 'BLR-EXP-991823'
  },
  {
    id: 'ORD-88218',
    customerName: 'Ananya Mukherjee',
    customerEmail: 'ananya.m@outlook.com',
    shippingAddress: 'B-12, Park Street Apartments, Andheri West, Mumbai, Maharashtra 400053',
    items: [
      {
        productId: 'prod-2',
        name: 'Echoflow Studio Headphones',
        price: 4999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod-9',
        name: 'ErgoSoft Extended Desk Mat',
        price: 699,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 5698,
    discount: 200,
    shipping: 0,
    total: 5498,
    status: 'Shipped',
    paymentMethod: 'Credit Card',
    createdAt: '5 hours ago',
    estimatedDelivery: 'June 27, 2026',
    trackingNumber: 'BOM-DTDC-88392'
  },
  {
    id: 'ORD-88217',
    customerName: 'Vansh Kalleti',
    customerEmail: 'vanshkalleti1234@gmail.com',
    shippingAddress: 'Room 214, Boys Hostel, Campus Road, New Delhi 110007',
    items: [
      {
        productId: 'prod-5',
        name: 'Aero LED Desk Lamp with USB Port',
        price: 1899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 1899,
    discount: 100,
    shipping: 0,
    total: 1799,
    status: 'Delivered',
    paymentMethod: 'UPI (PhonePe)',
    createdAt: '12 hours ago',
    estimatedDelivery: 'June 25, 2026',
    trackingNumber: 'DEL-BLUEDART-112'
  },
  {
    id: 'ORD-88216',
    customerName: 'Siddharth Rao',
    customerEmail: 'siddharth.rao@yahoo.in',
    shippingAddress: 'Plot 45, Jubilee Hills, Hyderabad, Telangana 500033',
    items: [
      {
        productId: 'prod-1',
        name: 'Lumina Wireless Silent Mouse',
        price: 1499,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 2998,
    discount: 0,
    shipping: 0,
    total: 2998,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    createdAt: '1 day ago',
    estimatedDelivery: 'June 24, 2026',
    trackingNumber: 'HYD-EKART-4482'
  }
];

export const INITIAL_ANALYTICS: SellerAnalytics = {
  totalRevenue: 248500,
  totalOrders: 142,
  avgOrderValue: 1750,
  customerSatisfaction: 97.5,
  revenueHistory: [
    { name: 'Mon', revenue: 24500, orders: 14 },
    { name: 'Tue', revenue: 31200, orders: 18 },
    { name: 'Wed', revenue: 38900, orders: 22 },
    { name: 'Thu', revenue: 28400, orders: 16 },
    { name: 'Fri', revenue: 45000, orders: 26 },
    { name: 'Sat', revenue: 52000, orders: 30 },
    { name: 'Sun', revenue: 28500, orders: 16 }
  ],
  categorySales: [
    { name: 'Workspace & Ergonomics', value: 125000 },
    { name: 'Audio & Tech', value: 78500 },
    { name: 'Lifestyle & Gadgets', value: 45000 }
  ]
};
