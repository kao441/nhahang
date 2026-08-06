import React, { useState } from 'react';
import { Search, X, Utensils, ChevronRight } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../../data/mockData';
import { formatCurrency } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateDetail: (productId: string) => void;
  onNavigateCategory: (catId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigateDetail, onNavigateCategory }) => {
  const { currency } = useCart();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim() 
    ? INITIAL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121212] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-zinc-800 text-zinc-100">
        
        {/* Search Bar */}
        <div className="p-4 bg-[#0a0a0a] flex items-center space-x-3 text-white border-b border-zinc-800">
          <Search className="w-5 h-5 text-rose-500" />
          <input 
            type="text" 
            placeholder="Tìm kiếm món ăn, Bò Wagyu, Tôm Hùm, Rượu Vang..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-zinc-500 outline-none font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-400 hover:text-white text-xs">
              Xóa
            </button>
          )}
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() ? (
            <div>
              <p className="text-xs text-zinc-400 mb-3 font-semibold uppercase tracking-wider">
                Kết quả tìm kiếm ({results.length})
              </p>

              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => {
                        onNavigateDetail(product.id);
                        onClose();
                      }}
                      className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700/80 cursor-pointer transition-colors group"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-100 group-hover:text-[#e11d48] transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">{product.categoryName}</p>
                      </div>
                      <span className="font-serif text-sm font-bold text-[#e11d48]">
                        {formatCurrency(product.price, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-500 text-xs">
                  Không tìm thấy món ăn phù hợp với từ khóa "{query}"
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Popular Categories */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Danh Mục Phổ Biến
                </h4>
                <div className="flex flex-wrap gap-2">
                  {INITIAL_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onNavigateCategory(cat.id);
                        onClose();
                      }}
                      className="bg-zinc-900 hover:bg-rose-950/60 hover:text-rose-400 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors flex items-center space-x-1"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3 h-3 text-zinc-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Keywords */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Gợi Ý Tìm Kiếm
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Bò Wagyu A5', 'Tôm Hùm Alaska', 'Sườn Cừu', 'Gan Ngỗng', 'Rượu Vang Đỏ', 'Salad'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs text-zinc-400 hover:text-[#e11d48] underline underline-offset-2"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
