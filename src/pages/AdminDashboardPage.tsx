import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Package, ShoppingCart, Users, Tag, Utensils, Calendar, 
  Plus, Trash2, Edit, Check, Clock, ShieldAlert, Sparkles, MapPin 
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANCHES, INITIAL_COUPONS, INITIAL_ANALYTICS } from '../data/mockData';
import { Product, Order, TableReservation, Coupon, Branch } from '../types';
import { formatCurrency, formatDate } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export const AdminDashboardPage: React.FC = () => {
  const { currency, showToast } = useCart();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'reservations' | 'coupons'>('analytics');
  
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  // New Product Modal Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(350000);
  const [newCategory, setNewCategory] = useState(INITIAL_CATEGORIES[0].id);
  const [newDesc, setNewDesc] = useState('');
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800');

  useEffect(() => {
    const loadAdminData = async () => {
      const oList = await api.getOrders();
      setOrders(oList);
      
      const savedRes = JSON.parse(localStorage.getItem('luxebistro_reservations') || '[]');
      setReservations(savedRes);
    };
    loadAdminData();
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const cat = INITIAL_CATEGORIES.find(c => c.id === newCategory);
    const newProd: Product = {
      id: `p-${Date.now()}`,
      name: newName,
      slug: newName.toLowerCase().replace(/\s+/g, '-'),
      description: newDesc,
      price: newPrice,
      categoryId: newCategory,
      categoryName: cat?.name || 'Món Chính Luxury',
      images: [newImg],
      rating: 5.0,
      reviewCount: 1,
      isAvailable: true,
      isNew: true
    };

    setProducts([newProd, ...products]);
    setIsAddProductOpen(false);
    setNewName('');
    showToast('Đã thêm món mới vào thực đơn!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Đã xóa món khỏi thực đơn');
  };

  const handleChangeOrderStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    showToast(`Đã cập nhật trạng thái đơn hàng: ${newStatus}`);
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-8 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#e11d48] rounded-xl flex items-center justify-center font-serif font-black text-white text-xl shadow-lg shadow-rose-950/60">
              LB
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-zinc-100">Bảng Quản Trị CMS LuxeBistro</h1>
              <p className="text-xs text-zinc-400">Hệ thống quản lý thực đơn, đơn hàng, đặt bàn và doanh thu</p>
            </div>
          </div>

          <span className="bg-rose-950/80 text-rose-400 text-xs font-bold px-3 py-1 rounded-full border border-rose-800/80">
            ADMINISTRATOR MODE
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'analytics' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'bg-[#121212] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Thống Kê Doanh Thu</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'products' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'bg-[#121212] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Thực Đơn Món Ăn ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'orders' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'bg-[#121212] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Đơn Hàng Online ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'reservations' ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'bg-[#121212] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt Bàn Giữ Chỗ ({reservations.length})</span>
          </button>
        </div>

        {/* Tab 1: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-2 shadow-xl">
                <span className="text-xs text-zinc-400 font-bold uppercase">Tổng Doanh Thu</span>
                <p className="font-serif text-2xl font-extrabold text-[#e11d48]">
                  {formatCurrency(INITIAL_ANALYTICS.totalRevenue, currency)}
                </p>
                <p className="text-[10px] text-emerald-400">+18% so với tháng trước</p>
              </div>

              <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-2 shadow-xl">
                <span className="text-xs text-zinc-400 font-bold uppercase">Tổng Đơn Hàng</span>
                <p className="font-serif text-2xl font-extrabold text-zinc-100">
                  {INITIAL_ANALYTICS.totalOrders} đơn
                </p>
                <p className="text-[10px] text-zinc-400">Tỷ lệ hoàn tất 98.5%</p>
              </div>

              <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-2 shadow-xl">
                <span className="text-xs text-zinc-400 font-bold uppercase">Lượt Khách Đặt Bàn</span>
                <p className="font-serif text-2xl font-extrabold text-zinc-100">
                  {INITIAL_ANALYTICS.totalReservations} lượt
                </p>
                <p className="text-[10px] text-emerald-400">+24% giờ cao điểm</p>
              </div>

              <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-2 shadow-xl">
                <span className="text-xs text-zinc-400 font-bold uppercase">Khách Hàng Thân Thiết</span>
                <p className="font-serif text-2xl font-extrabold text-zinc-100">
                  {INITIAL_ANALYTICS.totalCustomers} thành viên
                </p>
                <p className="text-[10px] text-zinc-400">Tỷ lệ quay lại 65%</p>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-zinc-100">Top 3 Món Ăn Bán Chạy Nhất</h3>
              <div className="space-y-3 text-xs">
                {INITIAL_ANALYTICS.topProducts.map((tp, idx) => (
                  <div key={tp.name} className="flex items-center justify-between p-3 bg-zinc-900/80 rounded-xl border border-zinc-800">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-[#e11d48] text-white font-bold rounded-full flex items-center justify-center text-xs shadow-md">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-zinc-100">{tp.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#e11d48]">{formatCurrency(tp.revenue, currency)}</p>
                      <p className="text-[10px] text-zinc-400">{tp.salesCount} lượt gọi món</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-zinc-100">Quản Lý Thực Đơn Nhà Hàng</h3>
              <button 
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2 shadow-lg shadow-rose-950/50"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Món Mới</span>
              </button>
            </div>

            {/* Add product modal form */}
            {isAddProductOpen && (
              <form onSubmit={handleAddProduct} className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 space-y-4 text-xs shadow-xl">
                <h4 className="font-bold text-rose-400 uppercase">Thêm Món Mới Vào Menu</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Tên món ăn *</label>
                    <input 
                      type="text" 
                      placeholder="Ví dụ: Bò Wagyu Nướng Sốt Nấm"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-bold mb-1">Giá bán (VND) *</label>
                    <input 
                      type="number" 
                      value={newPrice}
                      onChange={e => setNewPrice(Number(e.target.value))}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Danh mục *</label>
                  <select 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none"
                  >
                    {INITIAL_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Mô tả món ăn</label>
                  <textarea 
                    rows={2} 
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="Mô tả nguyên liệu, cách chế biến..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow">
                    Lưu Món Mới
                  </button>
                  <button type="button" onClick={() => setIsAddProductOpen(false)} className="bg-zinc-800 text-zinc-300 font-bold px-4 py-2 rounded-lg text-xs hover:bg-zinc-700">
                    Hủy
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden text-xs shadow-xl">
              <div className="grid grid-cols-12 p-4 font-bold text-zinc-400 border-b border-zinc-800 uppercase bg-zinc-950/60">
                <span className="col-span-6">Tên Món</span>
                <span className="col-span-3">Danh Mục</span>
                <span className="col-span-2">Đơn Giá</span>
                <span className="col-span-1 text-right">Thao Tác</span>
              </div>

              <div className="divide-y divide-zinc-800/80">
                {products.map(p => (
                  <div key={p.id} className="grid grid-cols-12 p-4 items-center hover:bg-zinc-900/40 transition-colors">
                    <div className="col-span-6 flex items-center space-x-3">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-800" />
                      <span className="font-bold text-zinc-100">{p.name}</span>
                    </div>
                    <span className="col-span-3 text-zinc-400">{p.categoryName}</span>
                    <span className="col-span-2 font-bold text-[#e11d48]">{formatCurrency(p.price, currency)}</span>
                    <div className="col-span-1 text-right">
                      <button onClick={() => handleDeleteProduct(p.id)} className="text-rose-400 hover:text-rose-300 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-zinc-100">Quản Lý Đơn Hàng Phục Vụ</h3>
            
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-[#121212] border border-zinc-800 rounded-2xl p-5 space-y-3 text-xs shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div>
                      <span className="font-mono font-bold text-[#e11d48] text-sm">{order.orderNumber}</span>
                      <span className="text-zinc-500 ml-2">({formatDate(order.createdAt)})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-400">Trạng thái:</span>
                      <select 
                        value={order.orderStatus}
                        onChange={e => handleChangeOrderStatus(order.id, e.target.value as any)}
                        className="bg-zinc-900 border border-zinc-700 rounded p-1 text-[#e11d48] font-bold outline-none"
                      >
                        <option value="CONFIRMED">CONFIRMED (Đã xác nhận)</option>
                        <option value="COOKING">COOKING (Đang nấu)</option>
                        <option value="DELIVERING">DELIVERING (Đang giao)</option>
                        <option value="COMPLETED">COMPLETED (Hoàn tất)</option>
                        <option value="CANCELLED">CANCELLED (Hủy)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                    <p>Khách hàng: <strong className="text-zinc-100">{order.customerName}</strong> ({order.customerPhone})</p>
                    <p>Chi nhánh: <strong className="text-zinc-100">{order.branchName}</strong></p>
                    <p className="sm:col-span-2">Địa chỉ: {order.shippingAddress}</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold">
                    <span className="text-zinc-300">Tổng tiền ({order.items.length} món):</span>
                    <span className="text-[#e11d48] font-serif text-sm">{formatCurrency(order.total, currency)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
