import React, { useState, useEffect } from 'react';
import { User as UserIcon, Package, Heart, MapPin, LogOut, Shield, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Order } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';
import { api } from '../services/api';

interface UserAccountPageProps {
  initialSubTab?: string;
  onNavigateDetail: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const UserAccountPage: React.FC<UserAccountPageProps> = ({ initialSubTab = 'profile', onNavigateDetail, onNavigate }) => {
  const { user, updateUser, logout } = useAuth();
  const { wishlist, currency, showToast } = useCart();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>(initialSubTab as any || 'profile');
  const [orders, setOrders] = useState<Order[]>([]);

  // Profile Form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await api.getOrders(user?.email || user?.phone);
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone, email });
    showToast('Cập nhật thông tin cá nhân thành công!');
  };

  const wishlistedProducts = INITIAL_PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} alt={user?.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#e11d48]" />
            <div>
              <h1 className="font-serif text-2xl font-bold text-zinc-100">{user?.name}</h1>
              <p className="text-xs text-zinc-400">{user?.email} • {user?.phone}</p>
              <span className="mt-1 inline-block bg-rose-950/80 text-[#e11d48] font-extrabold text-[10px] px-2.5 py-0.5 rounded border border-rose-800/60 uppercase">
                {user?.role} MEMBER
              </span>
            </div>
          </div>

          <button 
            onClick={logout}
            className="px-4 py-2 bg-zinc-900 hover:bg-rose-950/80 text-zinc-300 hover:text-rose-400 border border-zinc-800 hover:border-rose-800 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất</span>
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 bg-[#121212] rounded-2xl border border-zinc-800 p-4 shadow-xl space-y-1 h-fit">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center space-x-3 transition-colors ${
                activeTab === 'profile' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Thông Tin Tài Khoản</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'orders' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>Lịch Sử Đặt Món</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                activeTab === 'wishlist' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4" />
                <span>Danh Sách Yêu Thích</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                  Cập Nhật Thông Tin Cá Nhân
                </h3>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg text-xs">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Họ và Tên</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Số Điện Thoại</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Địa Chỉ Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <button type="submit" className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-lg shadow-rose-950/50">
                    Lưu Thay Đổi
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                  Lịch Sử Đặt Món
                </h3>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-zinc-800 rounded-xl p-5 space-y-3 bg-zinc-900/50">
                        <div className="flex flex-wrap items-center justify-between text-xs gap-2 border-b border-zinc-800 pb-2">
                          <div>
                            <span className="font-mono font-bold text-sm text-[#e11d48]">{order.orderNumber}</span>
                            <span className="text-zinc-500 ml-2">({formatDate(order.createdAt)})</span>
                          </div>
                          <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                            {order.orderStatus}
                          </span>
                        </div>

                        <div className="text-xs space-y-1">
                          <p className="text-zinc-400">Chi nhánh: <strong className="text-zinc-200">{order.branchName}</strong></p>
                          <p className="text-zinc-400">Số món: <strong className="text-zinc-200">{order.items.length} món</strong></p>
                          <p className="font-serif text-sm font-bold text-zinc-200 mt-1">
                            Tổng thanh toán: <span className="text-[#e11d48]">{formatCurrency(order.total, currency)}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-500 text-xs">
                    Bạn chưa có đơn hàng nào. Hãy thử món mới nhé!
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                  Danh Sách Món Yêu Thích ({wishlistedProducts.length})
                </h3>

                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {wishlistedProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onNavigateDetail={onNavigateDetail} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-500 text-xs">
                    Chưa có món ăn nào trong danh sách yêu thích.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
