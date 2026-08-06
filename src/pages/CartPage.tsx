import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';

interface CartPageProps {
  onNavigate: (tab: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { 
    cart, removeFromCart, updateQuantity, clearCart, 
    subtotal, activeCoupon, applyCoupon, removeCoupon, 
    discountAmount, shippingFee, total, currency, showToast 
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#0a0a0a] min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 animate-fadeIn text-zinc-100">
        <div className="w-20 h-20 bg-rose-950/80 text-[#e11d48] border border-rose-800/60 rounded-full flex items-center justify-center mb-4 shadow-xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-zinc-100">Giỏ Hàng Của Bạn Đang Trống</h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-sm text-center">
          Hãy khám phá thực đơn Fine Dining hảo hạng của LuxeBistro và lựa chọn những món ăn yêu thích nhé.
        </p>
        <button 
          onClick={() => onNavigate('products')}
          className="mt-6 bg-[#e11d48] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-rose-950/50 hover:bg-rose-700 transition-colors"
        >
          Khám Phá Thực Đơn Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <button onClick={() => onNavigate('home')} className="hover:text-[#e11d48]">Trang chủ</button>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="font-bold text-zinc-100">Giỏ Hàng Của Bạn</span>
        </div>

        <h1 className="font-serif text-3xl font-extrabold text-zinc-100">
          Giỏ Hàng Đặt Món ({cart.length} món)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-4">
            
            <div className="hidden sm:grid grid-cols-12 pb-3 border-b border-zinc-800 text-xs font-bold text-zinc-400 uppercase">
              <span className="col-span-6">Món Ăn</span>
              <span className="col-span-2 text-center">Đơn Giá</span>
              <span className="col-span-2 text-center">Số Lượng</span>
              <span className="col-span-2 text-right">Thành Tiền</span>
            </div>

            <div className="divide-y divide-zinc-800/80">
              {cart.map(item => (
                <div key={item.product.id} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center space-x-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-zinc-800" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-zinc-100">{item.product.name}</h4>
                      <p className="text-[11px] text-zinc-400">{item.product.categoryName}</p>
                      {item.specialInstructions && (
                        <p className="text-[10px] text-amber-400 italic mt-0.5">Note: {item.specialInstructions}</p>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="sm:col-span-2 text-left sm:text-center font-bold text-xs text-zinc-300">
                    {formatCurrency(item.product.price, currency)}
                  </div>

                  {/* Qty Controls */}
                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded-lg p-0.5">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 text-zinc-400 hover:text-white">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-zinc-100">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 text-zinc-400 hover:text-white">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end space-x-3">
                    <span className="font-serif font-extrabold text-sm text-[#e11d48]">
                      {formatCurrency(item.product.price * item.quantity, currency)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                      title="Xóa món"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs">
              <button 
                onClick={clearCart}
                className="text-zinc-500 hover:text-rose-400 font-medium transition-colors"
              >
                Xóa toàn bộ giỏ hàng
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="text-[#e11d48] font-bold hover:underline"
              >
                + Tiếp tục chọn món
              </button>
            </div>

          </div>

          {/* Order Summary Right */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Box */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-5 shadow-xl space-y-3">
              <h4 className="font-serif text-sm font-bold text-zinc-100 flex items-center space-x-2">
                <Tag className="w-4 h-4 text-[#e11d48]" />
                <span>Mã Giảm Giá / Voucher</span>
              </h4>

              {activeCoupon ? (
                <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-emerald-300">{activeCoupon.code}</p>
                    <p className="text-[11px] text-emerald-400">{activeCoupon.title}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-rose-400 font-bold hover:underline">
                    Hủy
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Mã voucher (VD: LUXE2026)" 
                      value={couponCodeInput}
                      onChange={e => setCouponCodeInput(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs font-mono uppercase text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                    />
                    <button type="submit" className="bg-zinc-800 hover:bg-[#e11d48] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-zinc-700">
                      Áp Dụng
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                </form>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-4 text-xs">
              <h4 className="font-serif text-base font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                Tóm Tắt Đơn Hàng
              </h4>

              <div className="space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span>Tạm tính món ăn:</span>
                  <span className="font-bold text-zinc-100">{formatCurrency(subtotal, currency)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Giảm giá Voucher:</span>
                    <span>-{formatCurrency(discountAmount, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">Miễn phí</strong> : formatCurrency(shippingFee, currency)}</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-3 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-zinc-100">Tổng Thanh Toán:</span>
                <span className="font-serif text-2xl font-extrabold text-[#e11d48]">
                  {formatCurrency(total, currency)}
                </span>
              </div>

              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-rose-950/50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>TIẾP TỤC THANH TOÁN</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-zinc-500 text-center flex items-center justify-center space-x-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bảo mật thông tin thanh toán tuyệt đối</span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
