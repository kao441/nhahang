import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Clock, Printer, ArrowLeft, Utensils, MapPin, Phone } from 'lucide-react';
import { Order } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (tab: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, onNavigate }) => {
  const { currency } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orders = await api.getOrders();
      const found = orders.find(o => o.id === orderId) || orders[0];
      setOrder(found || null);
    };
    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="py-20 text-center text-zinc-400 bg-[#0a0a0a] min-h-screen">
        Đang tải thông tin hóa đơn...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        
        {/* Success Card */}
        <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-8 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h1 className="font-serif text-3xl font-extrabold text-zinc-100">
            Cảm Ơn Quý Khách Đã Đặt Hàng!
          </h1>

          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Đơn hàng của quý khách đã được chuyển tới bếp LuxeBistro chi nhánh <strong className="text-zinc-100">{order.branchName}</strong>. Đội ngũ đầu bếp đang chuẩn bị món ăn với tất cả sự tỉ mỉ.
          </p>

          <div className="inline-block bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-mono text-zinc-300">
            Mã Đơn Hàng: <strong className="text-[#e11d48] text-base">{order.orderNumber}</strong>
          </div>

          {/* Order Status Tracker */}
          <div className="pt-6 border-t border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Trạng Thái Đơn Hàng</h4>
            
            <div className="grid grid-cols-4 gap-2 text-[11px] font-bold">
              <div className="text-center space-y-1">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-emerald-400">Đã Xác Nhận</span>
              </div>

              <div className="text-center space-y-1">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto animate-pulse shadow">
                  <Utensils className="w-4 h-4" />
                </div>
                <span className="text-amber-400">Đang Chế Biến</span>
              </div>

              <div className="text-center space-y-1 opacity-50">
                <div className="w-8 h-8 bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-zinc-500">Đang Giao Hàng</span>
              </div>

              <div className="text-center space-y-1 opacity-50">
                <div className="w-8 h-8 bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-zinc-500">Hoàn Tất</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Receipt Detail */}
        <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-6 text-xs print:p-0 print:border-none print:bg-white print:text-black">
          
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-100">Chi Tiết Hóa Đơn</h3>
              <p className="text-zinc-400">Thời gian đặt: {formatDate(order.createdAt)}</p>
            </div>

            <button 
              onClick={handlePrint}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg font-bold flex items-center space-x-1 print:hidden transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>In Hóa Đơn</span>
            </button>
          </div>

          {/* Customer & Branch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
            <div>
              <p className="font-bold text-zinc-100 mb-1">Thông Tin Nhận Hàng</p>
              <p className="text-zinc-300 font-medium">{order.customerName}</p>
              <p className="text-zinc-400 flex items-center space-x-1 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-[#e11d48]" />
                <span>{order.customerPhone}</span>
              </p>
              <p className="text-zinc-400 flex items-start space-x-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#e11d48] shrink-0 mt-0.5" />
                <span>{order.shippingAddress}</span>
              </p>
            </div>

            <div>
              <p className="font-bold text-zinc-100 mb-1">Phương Thức Thanh Toán</p>
              <p className="text-zinc-300 font-bold uppercase">{order.paymentMethod}</p>
              <p className="text-emerald-400 font-semibold mt-0.5">Trạng thái: {order.paymentStatus}</p>
              <p className="text-zinc-400 mt-2">Phục vụ bởi: <strong className="text-zinc-200">{order.branchName}</strong></p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-200 uppercase">Danh Sách Món Ăn</h4>
            
            <div className="divide-y divide-zinc-800 border-t border-b border-zinc-800 py-2">
              {order.items.map(item => (
                <div key={item.product.id} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-200">{item.product.name}</span>
                    <span className="text-zinc-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-bold text-zinc-200">
                    {formatCurrency(item.product.price * item.quantity, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-right font-medium text-zinc-300">
            <p>Tạm tính: <strong>{formatCurrency(order.subtotal, currency)}</strong></p>
            {order.discount > 0 && <p className="text-emerald-400">Giảm giá: <strong>-{formatCurrency(order.discount, currency)}</strong></p>}
            <p>Phí giao hàng: <strong>{formatCurrency(order.shippingFee, currency)}</strong></p>
            <p className="font-serif text-xl font-extrabold text-[#e11d48] pt-2 border-t border-zinc-800">
              Tổng Cộng: {formatCurrency(order.total, currency)}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="text-center pt-4">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors inline-flex items-center space-x-2 shadow-lg shadow-rose-950/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở Về Trang Chủ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
