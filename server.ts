import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// In ESM, derive __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial Indian E-Commerce Catalog Data in Rupees (₹)
let products = [
  {
    id: 'prod-1',
    name: 'Lumina Wireless Silent Mouse',
    category: 'Accessories',
    price: 1499,
    originalPrice: 2499,
    discountPercentage: 40,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience ultra-smooth navigation with the Lumina Wireless Mouse. Featuring ergonomic contours, whisper-quiet clicks, and an astonishing 24-month battery life on a single AA battery.',
    features: [
      'Whisper-silent clicking mechanism (90% noise reduction)',
      'High-precision 4000 DPI optical sensor',
      'Dual connectivity: Bluetooth 5.2 & 2.4GHz USB Nano receiver',
      'Ergonomic thumb rest designed for all-day comfort'
    ],
    specs: {
      'Brand': 'Lumina',
      'Connectivity': 'Wireless / Bluetooth',
      'DPI': '1000 - 4000 Adjustable',
      'Battery Life': 'Up to 24 Months',
      'Warranty': '1 Year Domestic Warranty'
    },
    stock: 45,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aarav Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '18 Jun 2026',
        comment: 'Absolutely amazing mouse! The clicks are genuinely silent, perfect for late-night work without disturbing anyone. Worth every rupee.',
        verified: true
      },
      {
        id: 'rev-2',
        userName: 'Priya Patel',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 4,
        date: '12 Jun 2026',
        comment: 'Great connectivity with my MacBook and Windows laptop. Swift delivery in Bengaluru!',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Echoflow Pro Noise Cancelling Headphones',
    category: 'Audio',
    price: 4999,
    originalPrice: 7999,
    discountPercentage: 38,
    rating: 4.9,
    reviewsCount: 389,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immerse yourself in studio-grade acoustics. Echoflow Pro delivers hybrid active noise cancellation, custom 40mm neodymium drivers, and plush memory foam earcups.',
    features: [
      'Hybrid Active Noise Cancellation (ANC) up to 35dB',
      '50 Hours playback time (40 Hours with ANC On)',
      'Fast Type-C charging: 10 mins charge gives 5 hours playtime',
      'Multipoint pairing to connect mobile and laptop simultaneously'
    ],
    specs: {
      'Brand': 'Echoflow',
      'Driver Size': '40mm Dynamic',
      'ANC': 'Yes, Hybrid',
      'Bluetooth Version': '5.3',
      'Weight': '240g'
    },
    stock: 18,
    isFeatured: true,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Rohan Verma',
        rating: 5,
        date: '20 Jun 2026',
        comment: 'Best ANC headphones under ₹5,000! The bass is punchy and vocals are crystal clear.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Oakwood Handcrafted Tablet & Laptop Stand',
    category: 'Workspace',
    price: 1250,
    originalPrice: 1800,
    discountPercentage: 30,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Elevate your device and posture with this sustainably sourced Indian Teakwood stand. Designed with optimal ventilation slots and anti-slip silicone pads.',
    features: [
      'Eco-friendly solid Indian hardwood construction',
      'Ergonomic 18-degree viewing angle',
      'Integrated cable management notch',
      'Compatible with iPads, tablets, and laptops up to 15.6 inches'
    ],
    specs: {
      'Material': 'Teakwood & Silicone',
      'Dimensions': '26cm x 22cm x 12cm',
      'Max Load': '10 kg',
      'Finish': 'Matte Walnut Lacquer'
    },
    stock: 32,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'prod-4',
    name: 'VoltMax Ultra-Slim 20,000mAh Power Bank',
    category: 'Accessories',
    price: 1999,
    originalPrice: 3499,
    discountPercentage: 43,
    rating: 4.6,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1609592424008-272f10b7849e?auto=format&fit=crop&w=800&q=80',
    description: 'Never run out of battery on the go. Featuring 33W SuperVOOC & Power Delivery fast charging, dual Type-C ports, and aerospace-grade aluminum casing.',
    features: [
      '33W Two-Way Fast Charging',
      'Simultaneous triple device charging',
      '12-layer circuit protection against overheating and overvoltage',
      'BIS Certified safe for Indian flight travel'
    ],
    specs: {
      'Capacity': '20,000 mAh Li-Polymer',
      'Output Ports': '2 x USB-C, 1 x USB-A',
      'Charging Time': '3.5 Hours with PD charger',
      'Weight': '310g'
    },
    stock: 60,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'prod-5',
    name: 'CyberBlade RGB Mechanical Gaming Keyboard',
    category: 'Gaming',
    price: 3499,
    originalPrice: 5999,
    discountPercentage: 41,
    rating: 4.8,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Dominate every match with hot-swappable Outemu Red linear switches, customized per-key RGB backlight, and aircraft-grade brushed aluminum frame.',
    features: [
      '100% Anti-ghosting N-key rollover',
      'Hot-swappable PCB compatible with 3-pin and 5-pin switches',
      '18 dynamic RGB lighting modes with speed control',
      'Detachable braided Type-C cable'
    ],
    specs: {
      'Layout': 'Compact Tenkeyless (87 Keys)',
      'Switch Type': 'Outemu Red (Linear & Quiet)',
      'Keycaps': 'Double-shot PBT',
      'Polling Rate': '1000Hz'
    },
    stock: 25,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'prod-6',
    name: 'Aura Smart Eye-Care LED Desk Lamp',
    category: 'Workspace',
    price: 2199,
    originalPrice: 3200,
    discountPercentage: 31,
    rating: 4.7,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80',
    description: 'Protect your vision during intense reading or coding sessions. Features auto-brightness sensing, 5 color temperature modes, and a built-in 10W wireless smartphone charger.',
    features: [
      'Zero blue-light hazard & flicker-free illumination',
      'Touch slider brightness adjustment (10% to 100%)',
      'Integrated 10W Qi Wireless charging base',
      'Multi-angle flexible aluminum arm'
    ],
    specs: {
      'Wattage': '14W LED',
      'Color Temp': '2700K - 6500K',
      'Power Source': 'BIS AC Adapter included',
      'USB Output': '5V/2A'
    },
    stock: 40,
    isFeatured: false,
    reviews: []
  }
];

let orders = [
  {
    id: 'ORD-88219',
    customerName: 'Vikram Aditya',
    customerEmail: 'vikram.a@gmail.com',
    shippingAddress: 'Flat 402, Green Valley Apts, Powai, Mumbai, Maharashtra 400076',
    items: [
      { productId: 'prod-2', name: 'Echoflow Pro Headphones', price: 4999, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 4999,
    discount: 0,
    shipping: 0,
    total: 4999,
    status: 'Processing',
    paymentMethod: 'UPI (Google Pay)',
    createdAt: '2026-06-25T08:30:00Z',
    estimatedDelivery: '27 Jun 2026',
    trackingNumber: 'SEZ-IND-994821'
  },
  {
    id: 'ORD-88218',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha.r@outlook.com',
    shippingAddress: 'Villa 12, Palm Meadows, Whitefield, Bengaluru, Karnataka 560066',
    items: [
      { productId: 'prod-1', name: 'Lumina Wireless Silent Mouse', price: 1499, quantity: 2, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=80' },
      { productId: 'prod-3', name: 'Oakwood Stand', price: 1250, quantity: 1, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 4248,
    discount: 200,
    shipping: 0,
    total: 4048,
    status: 'Shipped',
    paymentMethod: 'Credit Card (HDFC Bank)',
    createdAt: '2026-06-24T14:15:00Z',
    estimatedDelivery: '26 Jun 2026',
    trackingNumber: 'SEZ-IND-883192'
  },
  {
    id: 'ORD-88217',
    customerName: 'Karan Mehra',
    customerEmail: 'karan.m@yahoo.in',
    shippingAddress: 'H.No 45, Sector 17-B, Chandigarh 160017',
    items: [
      { productId: 'prod-5', name: 'CyberBlade RGB Keyboard', price: 3499, quantity: 1, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80' }
    ],
    subtotal: 3499,
    discount: 0,
    shipping: 0,
    total: 3499,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    createdAt: '2026-06-23T10:00:00Z',
    estimatedDelivery: '25 Jun 2026',
    trackingNumber: 'SEZ-IND-771823'
  }
];

// API Routes
app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) return res.status(404).json({ error: 'Product not found' });
  res.json(prod);
});

app.post('/api/products/:id/reviews', (req, res) => {
  const { userName, rating, comment } = req.body;
  const prodIndex = products.findIndex(p => p.id === req.params.id);
  if (prodIndex === -1) return res.status(404).json({ error: 'Product not found' });

  const newReview = {
    id: `rev-${Date.now()}`,
    userName: userName || 'Anonymous Customer',
    userAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName || 'AC')}`,
    rating: Number(rating) || 5,
    date: 'Just now',
    comment: comment || '',
    verified: true
  };

  products[prodIndex].reviews.unshift(newReview);
  products[prodIndex].reviewsCount += 1;
  // Recalculate rating
  const totalScore = products[prodIndex].reviews.reduce((acc, r) => acc + r.rating, 0);
  products[prodIndex].rating = Number((totalScore / products[prodIndex].reviewsCount).toFixed(1));

  res.json(products[prodIndex]);
});

app.get('/api/orders', (_req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { customerName, customerEmail, shippingAddress, items, subtotal, discount, shipping, total, paymentMethod } = req.body;
  
  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: customerName || 'Valued Indian Customer',
    customerEmail: customerEmail || 'customer@shopez.in',
    shippingAddress: shippingAddress || 'New Delhi, India',
    items: items || [],
    subtotal: subtotal || 0,
    discount: discount || 0,
    shipping: shipping || 0,
    total: total || 0,
    status: 'Processing',
    paymentMethod: paymentMethod || 'UPI (PhonePe / GPay)',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    trackingNumber: `SEZ-IND-${Math.floor(100000 + Math.random() * 900000)}`
  };

  orders.unshift(newOrder);

  // Reduce stock
  items.forEach((item: any) => {
    const p = products.find(prod => prod.id === item.productId);
    if (p && p.stock >= item.quantity) {
      p.stock -= item.quantity;
    }
  });

  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const orderIndex = orders.findIndex(o => o.id === req.params.id);
  if (orderIndex === -1) return res.status(404).json({ error: 'Order not found' });

  orders[orderIndex].status = status;
  res.json(orders[orderIndex]);
});

app.get('/api/analytics', (_req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 142805; // Base revenue for historical scale
  const totalOrdersCount = orders.length + 68;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  const revenueHistory = [
    { name: 'Mon', revenue: 18400, orders: 12 },
    { name: 'Tue', revenue: 24200, orders: 16 },
    { name: 'Wed', revenue: 19800, orders: 14 },
    { name: 'Thu', revenue: 31500, orders: 22 },
    { name: 'Fri', revenue: 28900, orders: 19 },
    { name: 'Sat', revenue: 42100, orders: 28 },
    { name: 'Sun', revenue: 38600, orders: 25 }
  ];

  const categorySales = [
    { name: 'Accessories', value: 45 },
    { name: 'Audio', value: 28 },
    { name: 'Workspace', value: 17 },
    { name: 'Gaming', value: 10 }
  ];

  res.json({
    totalRevenue,
    totalOrders: totalOrdersCount,
    avgOrderValue,
    customerSatisfaction: 98.4,
    revenueHistory,
    categorySales
  });
});

// Setup Frontend Serving
async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, process.env.NODE_ENV === 'production' && __dirname.endsWith('dist') ? '.' : 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ShopEZ E-Commerce Server] Running on port ${PORT} (Currency: ₹ INR)`);
  });
}

startServer();
