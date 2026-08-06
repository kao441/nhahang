export type UserRole = 'ADMIN' | 'STAFF' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  itemCount?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  categoryName: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isAvailable: boolean;
  preparationTime?: string; // e.g., "15-20 mins"
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  spicinessLevel?: number; // 0 to 3
}

export interface CartItem {
  product: Product;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  branchId: string;
  branchName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'COD' | 'VNPAY' | 'MOMO' | 'CREDIT_CARD';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus: 'PENDING' | 'CONFIRMED' | 'COOKING' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TableReservation {
  id: string;
  reservationCode: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  branchId: string;
  branchName: string;
  guestCount: number;
  reservationDate: string;
  reservationTime: string;
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  openingHours: string;
  mapUrl?: string;
  latitude: number;
  longitude: number;
  image: string;
  isMainBranch?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount?: number;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  likesCount: number;
  commentsCount: number;
  isFeatured?: boolean;
}

export interface BlogComment {
  id: string;
  postId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED';
  createdAt: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalReservations: number;
  monthlyRevenue: { month: string; revenue: number; orders: number }[];
  categorySales: { category: string; sales: number }[];
  recentOrders: Order[];
  topProducts: { name: string; salesCount: number; revenue: number }[];
}
