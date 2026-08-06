import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon } from '../types';
import { INITIAL_COUPONS } from '../data/mockData';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: 'VND' | 'USD';
  activeCoupon: Coupon | null;
  isReservationOpen: boolean;
  quickViewProduct: Product | null;
  toastMessage: string | null;
  
  // Actions
  addToCart: (product: Product, quantity?: number, instructions?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  toggleCurrency: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  openReservationModal: () => void;
  closeReservationModal: () => void;
  
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  showToast: (msg: string) => void;
  
  // Computed
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxebistro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('luxebistro_wishlist');
      return saved ? JSON.parse(saved) : ['p-1', 'p-4'];
    } catch {
      return ['p-1', 'p-4'];
    }
  });

  const [currency, setCurrency] = useState<'VND' | 'USD'>('VND');
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('luxebistro_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxebistro_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, instructions = '') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (instructions) {
          updated[existingIndex].specialInstructions = instructions;
        }
        return updated;
      }
      return [...prev, { product, quantity, specialInstructions: instructions }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Đã xóa món ăn khỏi giỏ hàng');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã xóa khỏi danh sách yêu thích');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích!');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'VND' ? 'USD' : 'VND'));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const coupon = INITIAL_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!coupon) {
      return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
    }
    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Đơn hàng tối thiểu ${coupon.minOrderValue.toLocaleString('vi-VN')}₫ để dùng mã này.`
      };
    }
    setActiveCoupon(coupon);
    showToast(`Áp dụng mã ${coupon.code} thành công!`);
    return { success: true, message: 'Áp dụng mã giảm giá thành công!' };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Đã hủy áp dụng mã giảm giá');
  };

  let discountAmount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'PERCENTAGE') {
      discountAmount = (subtotal * activeCoupon.discountValue) / 100;
      if (activeCoupon.maxDiscountAmount && discountAmount > activeCoupon.maxDiscountAmount) {
        discountAmount = activeCoupon.maxDiscountAmount;
      }
    } else {
      discountAmount = activeCoupon.discountValue;
    }
  }

  const shippingFee = cart.length > 0 ? (subtotal > 1000000 ? 0 : 35000) : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        activeCoupon,
        isReservationOpen,
        quickViewProduct,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        toggleCurrency,
        applyCoupon,
        removeCoupon,
        openReservationModal: () => setIsReservationOpen(true),
        closeReservationModal: () => setIsReservationOpen(false),
        openQuickView: (product: Product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        showToast,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
