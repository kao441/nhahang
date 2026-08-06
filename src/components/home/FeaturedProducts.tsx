import React, { useState } from 'react';
import { ProductCard } from '../common/ProductCard';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  onNavigateDetail: (productId: string) => void;
  onNavigateProducts: (catId?: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigateDetail, onNavigateProducts }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredProducts = activeTab === 'all' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.categoryId === activeTab);

  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Thực Đơn Nổi Bật</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
            Trải Nghiệm Mỹ Vị Đỉnh Cao
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400">
            Tuyển chọn những tuyệt tác món ăn được thực khách yêu thích nhất tại hệ thống nhà hàng LuxeBistro
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md ${
              activeTab === 'all' 
                ? 'bg-[#e11d48] text-white shadow-rose-950/50' 
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            Tất Cả Món
          </button>

          {INITIAL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md ${
                activeTab === cat.id 
                  ? 'bg-[#e11d48] text-white shadow-rose-950/50' 
                  : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onNavigateDetail={onNavigateDetail} 
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigateProducts(activeTab !== 'all' ? activeTab : undefined)}
            className="bg-[#121212] hover:bg-[#e11d48] border border-zinc-700 hover:border-[#e11d48] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-xl transition-all hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Xem Toàn Bộ Thực Đơn Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
