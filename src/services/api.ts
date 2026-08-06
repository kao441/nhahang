import axios from 'axios';
import { Product, Category, Order, TableReservation, BlogPost, ContactMessage, Branch, Coupon, AnalyticsSummary } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANCHES, INITIAL_COUPONS, INITIAL_BLOGS, INITIAL_ANALYTICS } from '../data/mockData';

const API_BASE_URL = '/api';

// Create Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Products
  async getProducts(params?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; sort?: string }) {
    try {
      const response = await apiClient.get<Product[]>('/products', { params });
      return response.data;
    } catch {
      // Local fallback if server endpoint offline
      let list = [...INITIAL_PRODUCTS];
      if (params?.category && params.category !== 'all') {
        list = list.filter(p => p.categoryId === params.category || p.categoryName === params.category);
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
      }
      return list;
    }
  },

  async getProductById(id: string) {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch {
      return INITIAL_PRODUCTS.find(p => p.id === id || p.slug === id) || INITIAL_PRODUCTS[0];
    }
  },

  // Categories
  async getCategories() {
    try {
      const response = await apiClient.get<Category[]>('/categories');
      return response.data;
    } catch {
      return INITIAL_CATEGORIES;
    }
  },

  // Branches
  async getBranches() {
    try {
      const response = await apiClient.get<Branch[]>('/branches');
      return response.data;
    } catch {
      return INITIAL_BRANCHES;
    }
  },

  // Coupons
  async getCoupons() {
    try {
      const response = await apiClient.get<Coupon[]>('/coupons');
      return response.data;
    } catch {
      return INITIAL_COUPONS;
    }
  },

  // Orders
  async createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) {
    try {
      const response = await apiClient.post<Order>('/orders', orderData);
      return response.data;
    } catch {
      const newOrder: Order = {
        ...orderData,
        id: `ord-${Date.now()}`,
        orderNumber: `LXB-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // Save locally
      const savedOrders = JSON.parse(localStorage.getItem('luxebistro_orders') || '[]');
      localStorage.setItem('luxebistro_orders', JSON.stringify([newOrder, ...savedOrders]));
      return newOrder;
    }
  },

  async getOrders(userPhoneOrEmail?: string) {
    try {
      const response = await apiClient.get<Order[]>('/orders', { params: { user: userPhoneOrEmail } });
      return response.data;
    } catch {
      const savedOrders = JSON.parse(localStorage.getItem('luxebistro_orders') || '[]');
      return savedOrders;
    }
  },

  // Reservations
  async createReservation(data: Omit<TableReservation, 'id' | 'reservationCode' | 'createdAt'>) {
    try {
      const response = await apiClient.post<TableReservation>('/reservations', data);
      return response.data;
    } catch {
      const newRes: TableReservation = {
        ...data,
        id: `res-${Date.now()}`,
        reservationCode: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      };
      const saved = JSON.parse(localStorage.getItem('luxebistro_reservations') || '[]');
      localStorage.setItem('luxebistro_reservations', JSON.stringify([newRes, ...saved]));
      return newRes;
    }
  },

  // Contact
  async sendContact(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) {
    try {
      const response = await apiClient.post('/contact', data);
      return response.data;
    } catch {
      return { success: true, message: 'Cảm ơn bạn! Yêu cầu hỗ trợ đã được gửi thành công.' };
    }
  },

  // Blogs
  async getBlogs() {
    try {
      const response = await apiClient.get<BlogPost[]>('/blogs');
      return response.data;
    } catch {
      return INITIAL_BLOGS;
    }
  },

  // Analytics
  async getAnalytics() {
    try {
      const response = await apiClient.get<AnalyticsSummary>('/analytics');
      return response.data;
    } catch {
      return INITIAL_ANALYTICS;
    }
  }
};
