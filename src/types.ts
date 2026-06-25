export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  stock: number;
  isFeatured?: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
}

export interface SellerAnalytics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  customerSatisfaction: number;
  revenueHistory: { name: string; revenue: number; orders: number }[];
  categorySales: { name: string; value: number }[];
}

export type ActiveTab = 'catalog' | 'dashboard';
