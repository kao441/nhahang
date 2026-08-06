import React, { useState } from 'react';
import { X, Star, ShoppingBag, Clock, Flame, ShieldAlert, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/utils';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isWishlisted, currency } = useCart();
  const [qty, setQty] = useState(1);
  const [instructions, setInstructions] = useState('');

  if (!quickViewProduct) return null;

  const isFav = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty, instructions);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121212] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-zinc-800 relative text-zinc-100">
        
        <button 
          onClick={closeQuickView}
          className="absolute top-3 right-3 p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="relative aspect-square bg-zinc-900 overflow-hidden">
            <img 
              src={quickViewProduct.images[0]} 
              alt={quickViewProduct.name}
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-[#e11d48] uppercase tracking-wider">
                {quickViewProduct.categoryName}
              </span>

              <h3 className="font-serif text-xl font-bold text-zinc-100 mt-1">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-center space-x-2 mt-2 text-xs">
                <div className="flex items-center text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1">{quickViewProduct.rating}</span>
                </div>
                <span className="text-zinc-700">|</span>
                <span className="text-zinc-400">{quickViewProduct.reviewCount} đánh giá từ thực khách</span>
              </div>

              <div className="mt-3">
                <span className="font-serif text-2xl font-extrabold text-[#e11d48]">
                  {formatCurrency(quickViewProduct.price, currency)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="ml-2 text-sm text-zinc-500 line-through">
                    {formatCurrency(quickViewProduct.originalPrice, currency)}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specs */}
              <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-400">
                {quickViewProduct.preparationTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span>Thời gian chuẩn bị: <strong className="text-zinc-200">{quickViewProduct.preparationTime}</strong></span>
                  </div>
                )}
                {quickViewProduct.calories && (
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>Năng lượng: <strong className="text-zinc-200">{quickViewProduct.calories} kcal</strong></span>
                  </div>
                )}
                {quickViewProduct.allergens && quickViewProduct.allergens.length > 0 && (
                  <div className="flex items-center space-x-2 text-amber-400">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Lưu ý dị ứng: <strong>{quickViewProduct.allergens.join(', ')}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Ghi chú khẩu vị cho đầu bếp</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Làm chín tái, không hành, cay ít..."
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-zinc-700 rounded-lg p-1 bg-zinc-900">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1 hover:bg-zinc-800 rounded text-zinc-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-zinc-100">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="p-1 hover:bg-zinc-800 rounded text-zinc-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#e11d48] hover:bg-rose-700 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-rose-950/50 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>

                <button 
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isFav ? 'bg-rose-950/80 border-rose-800 text-rose-400' : 'border-zinc-700 text-zinc-400 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
