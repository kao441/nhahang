import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../context/CartContext';

interface ProductsPageProps {
  selectedCategory?: string;
  onNavigateDetail: (productId: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ selectedCategory, onNavigateDetail }) => {
  const { currency } = useCart();
  
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter Logic
  let filtered = INITIAL_PRODUCTS.filter(p => {
    const matchCategory = activeCategory === 'all' || p.categoryId === activeCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = p.price <= maxPrice;
    return matchCategory && matchSearch && matchPrice;
  });

  // Sort Logic
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-zinc-400">
          <span>Trang chủ</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="font-bold text-zinc-100">Thực Đơn Sản Phẩm</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="bg-[#121212] p-6 rounded-2xl border border-zinc-800 shadow-xl space-y-6 h-fit">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#e11d48]" />
                <span>Bộ Lọc Tìm Kiếm</span>
              </h3>
              {(activeCategory !== 'all' || searchQuery || maxPrice < 2000000) && (
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); setMaxPrice(2000000); }}
                  className="text-xs text-[#e11d48] font-bold hover:underline"
                >
                  Xóa lọc
                </button>
              )}
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Tìm Món Ăn</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ví dụ: Bò Wagyu, Tôm hùm..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 pl-8 text-xs text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">Danh Mục Thực Đơn</label>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveCategory('all'); setCurrentPage(1); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    activeCategory === 'all' ? 'bg-[#e11d48] text-white' : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>Tất Cả Danh Mục</span>
                  <span>({INITIAL_PRODUCTS.length})</span>
                </button>

                {INITIAL_CATEGORIES.map(cat => {
                  const count = INITIAL_PRODUCTS.filter(p => p.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        activeCategory === cat.id ? 'bg-[#e11d48] text-white' : 'text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-zinc-300 mb-1">
                <span>Khoảng Giá Tối Đa</span>
                <span className="text-[#e11d48]">{formatCurrency(maxPrice, currency)}</span>
              </div>
              <input 
                type="range" 
                min={200000} 
                max={2000000} 
                step={50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#e11d48]"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>200.000₫</span>
                <span>2.000.000₫</span>
              </div>
            </div>

          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-[#121212] p-4 rounded-2xl border border-zinc-800 shadow-xl flex flex-wrap items-center justify-between gap-4 text-xs">
              <p className="text-zinc-400">
                Hiển thị <strong className="text-zinc-100">{filtered.length}</strong> món ăn phù hợp
              </p>

              <div className="flex items-center space-x-4">
                {/* Sorting */}
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-400">Sắp xếp:</span>
                  <select 
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="bg-zinc-900 border border-zinc-700 rounded-lg p-1.5 text-zinc-100 font-semibold outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="featured" className="bg-zinc-900 text-zinc-100">Món Nổi Bật</option>
                    <option value="price-asc" className="bg-zinc-900 text-zinc-100">Giá: Thấp đến Cao</option>
                    <option value="price-desc" className="bg-zinc-900 text-zinc-100">Giá: Cao đến Thấp</option>
                    <option value="rating" className="bg-zinc-900 text-zinc-100">Đánh Giá Cao Nhất</option>
                  </select>
                </div>

                {/* View Switcher */}
                <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded-lg p-0.5">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#e11d48] text-white' : 'text-zinc-400 hover:text-white'}`}
                    title="Chế độ lưới"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-[#e11d48] text-white' : 'text-zinc-400 hover:text-white'}`}
                    title="Chế độ danh sách"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            {paginated.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {paginated.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onNavigateDetail={onNavigateDetail} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#121212] rounded-2xl p-12 text-center border border-zinc-800 space-y-3">
                <p className="text-zinc-400 text-sm font-medium">Không tìm thấy món ăn nào theo bộ lọc đã chọn.</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); setMaxPrice(2000000); }}
                  className="bg-[#e11d48] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors shadow-lg shadow-rose-950/50"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === idx + 1 
                        ? 'bg-[#e11d48] text-white shadow-lg shadow-rose-950/50' 
                        : 'bg-[#121212] text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
