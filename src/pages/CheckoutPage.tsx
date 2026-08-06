import React, { useState } from 'react';
import { ShieldCheck, Truck, Store, CreditCard, Banknote, MapPin, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { INITIAL_BRANCHES } from '../data/mockData';
import { formatCurrency } from '../lib/utils';
import { api } from '../services/api';

interface CheckoutPageProps {
  onOrderSuccess: (orderId: string) => void;
  onNavigate: (tab: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderSuccess, onNavigate }) => {
  const { cart, subtotal, discountAmount, shippingFee, total, activeCoupon, clearCart, currency, showToast } = useCart();
  const { user } = useAuth();

  const [fulfillmentType, setFulfillmentType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || 'Số 12, Ngõ 45 Lý Nam Đế');
  const [district, setDistrict] = useState(user?.addresses?.[0]?.district || 'Hoàn Kiếm');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Hà Nội');
  
  const [branchId, setBranchId] = useState(INITIAL_BRANCHES[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VNPAY' | 'MOMO' | 'CREDIT_CARD'>('COD');
  const [orderNotes, setOrderNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBranch = INITIAL_BRANCHES.find(b => b.id === branchId) || INITIAL_BRANCHES[0];

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast('Vui lòng điền họ tên và số điện thoại nhận hàng');
      return;
    }

    if (fulfillmentType === 'DELIVERY' && (!street || !district || !city)) {
      showToast('Vui lòng cung cấp địa chỉ giao hàng chi tiết');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullAddress = fulfillmentType === 'DELIVERY' 
        ? `${street}, Phường/Quận ${district}, ${city}`
        : `Nhận tại nhà hàng: ${selectedBranch.address}`;

      const createdOrder = await api.createOrder({
        customerName,
        customerPhone,
        customerEmail,
        shippingAddress: fullAddress,
        branchId,
        branchName: selectedBranch.name,
        items: cart,
        subtotal,
        discount: discountAmount,
        shippingFee: fulfillmentType === 'DELIVERY' ? shippingFee : 0,
        total: fulfillmentType === 'DELIVERY' ? total : (subtotal - discountAmount),
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        orderStatus: 'CONFIRMED',
        notes: orderNotes,
        couponCode: activeCoupon?.code
      });

      clearCart();
      showToast('Đặt hàng thành công!');
      onOrderSuccess(createdOrder.id);
    } catch {
      showToast('Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <button onClick={() => onNavigate('home')} className="hover:text-[#e11d48]">Trang chủ</button>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <button onClick={() => onNavigate('cart')} className="hover:text-[#e11d48]">Giỏ hàng</button>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="font-bold text-zinc-100">Thanh Toán Đơn Hàng</span>
        </div>

        <h1 className="font-serif text-3xl font-extrabold text-zinc-100">
          Xác Nhận & Thanh Toán
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Left */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Fulfillment Type Switcher */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-4">
              <h3 className="font-serif text-base font-bold text-zinc-100">1. Hình Thức Nhận Món</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('DELIVERY')}
                  className={`p-4 rounded-xl border text-left flex items-center space-x-3 transition-colors ${
                    fulfillmentType === 'DELIVERY' 
                      ? 'border-[#e11d48] bg-rose-950/40 text-zinc-100' 
                      : 'border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  <Truck className="w-6 h-6 text-[#e11d48]" />
                  <div>
                    <p className="font-bold text-xs text-zinc-100">Giao Hàng Tận Nơi</p>
                    <p className="text-[11px] text-zinc-400">Giao nóng tận bàn nhà bạn</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('PICKUP')}
                  className={`p-4 rounded-xl border text-left flex items-center space-x-3 transition-colors ${
                    fulfillmentType === 'PICKUP' 
                      ? 'border-[#e11d48] bg-rose-950/40 text-zinc-100' 
                      : 'border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  <Store className="w-6 h-6 text-[#e11d48]" />
                  <div>
                    <p className="font-bold text-xs text-zinc-100">Tự Đến Lấy Tại Nhà Hàng</p>
                    <p className="text-[11px] text-zinc-400">Tiết kiệm thời gian chờ</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer & Address Form */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-4 text-xs">
              <h3 className="font-serif text-base font-bold text-zinc-100">2. Thông Tin Khách Hàng</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Họ và Tên *</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Số Điện Thoại Nhận Hàng *</label>
                  <input 
                    type="tel" 
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    required
                    placeholder="0912 345 678"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Email Thông Báo (Tùy chọn)</label>
                <input 
                  type="email" 
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
              </div>

              {/* Branch Selector */}
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Chọn Chi Nhánh Phục Vụ *</label>
                <select 
                  value={branchId}
                  onChange={e => setBranchId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 font-semibold text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {INITIAL_BRANCHES.map(b => (
                    <option key={b.id} value={b.id} className="bg-zinc-900 text-zinc-100">{b.name} ({b.address})</option>
                  ))}
                </select>
              </div>

              {/* Street Address if Delivery */}
              {fulfillmentType === 'DELIVERY' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Địa Chỉ Đường/Số Nhà *</label>
                    <input 
                      type="text" 
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      required
                      placeholder="Số nhà, ngõ, tên đường..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Quận / Huyện *</label>
                      <input 
                        type="text" 
                        value={district}
                        onChange={e => setDistrict(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-300 mb-1">Tỉnh / Thành Phố *</label>
                      <input 
                        type="text" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-zinc-300 mb-1">Ghi Chú Giao Hàng</label>
                <textarea 
                  rows={2} 
                  placeholder="Ghi chú thêm về thời gian giao hoặc hướng dẫn vị trí..."
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
              </div>

            </div>

            {/* Payment Methods */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-4">
              <h3 className="font-serif text-base font-bold text-zinc-100">3. Phương Thức Thanh Toán</h3>

              <div className="space-y-2.5 text-xs">
                
                {/* COD */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'COD' ? 'border-[#e11d48] bg-rose-950/40' : 'border-zinc-800 hover:bg-zinc-900'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#e11d48]"
                    />
                    <Banknote className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-bold text-zinc-100">Thanh Toán Khi Nhận Hàng (COD)</p>
                      <p className="text-[11px] text-zinc-400">Thanh toán tiền mặt cho nhân viên giao đồ ăn</p>
                    </div>
                  </div>
                </label>

                {/* VNPay */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'VNPAY' ? 'border-[#e11d48] bg-rose-950/40' : 'border-zinc-800 hover:bg-zinc-900'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'VNPAY'}
                      onChange={() => setPaymentMethod('VNPAY')}
                      className="accent-[#e11d48]"
                    />
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="font-bold text-zinc-100">Cổng Thanh Toán VNPay QR</p>
                      <p className="text-[11px] text-zinc-400">Quét mã QR từ ứng dụng Ngân hàng / VNPay</p>
                    </div>
                  </div>
                  <span className="bg-blue-950/80 text-blue-400 border border-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Khuyên dùng</span>
                </label>

                {/* MoMo */}
                <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-colors ${
                  paymentMethod === 'MOMO' ? 'border-[#e11d48] bg-rose-950/40' : 'border-zinc-800 hover:bg-zinc-900'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'MOMO'}
                      onChange={() => setPaymentMethod('MOMO')}
                      className="accent-[#e11d48]"
                    />
                    <CreditCard className="w-5 h-5 text-pink-400" />
                    <div>
                      <p className="font-bold text-zinc-100">Ví Điện Tử MoMo</p>
                      <p className="text-[11px] text-zinc-400">Thanh toán tức thì qua ví MoMo</p>
                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Summary Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-4 text-xs">
              <h3 className="font-serif text-base font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                Đơn Hàng Của Bạn ({cart.length} món)
              </h3>

              <div className="divide-y divide-zinc-800 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-zinc-100">{item.product.name} x{item.quantity}</p>
                      <p className="text-[11px] text-zinc-400">{item.product.categoryName}</p>
                    </div>
                    <span className="font-bold text-zinc-100">
                      {formatCurrency(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-3 space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Giảm giá Voucher:</span>
                    <span>-{formatCurrency(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>{fulfillmentType === 'PICKUP' ? 'Miễn phí (Tự lấy)' : formatCurrency(shippingFee, currency)}</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-3 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-zinc-100">Thành Tiền:</span>
                <span className="font-serif text-2xl font-extrabold text-[#e11d48]">
                  {formatCurrency(fulfillmentType === 'DELIVERY' ? total : (subtotal - discountAmount), currency)}
                </span>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-rose-950/50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'Đang Tạo Đơn Hàng...' : 'HOÀN TẤT ĐẶT HÀNG'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-zinc-500 text-center">
                Bằng việc nhấn đặt hàng, bạn đồng ý với Điều khoản dịch vụ của LuxeBistro.
              </p>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
