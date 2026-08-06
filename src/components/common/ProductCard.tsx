import React from 'react';
import { Heart, ShoppingBag, Eye, Star, Flame, Clock } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  onNavigateDetail: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigateDetail }) => {
  const { addToCart, toggleWishlist, isWishlisted, currency, openQuickView } = useCart();
  const isFav = isWishlisted(product.id);

  return (
    <div className="bg-[#121212] rounded-xl border border-zinc-800/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-zinc-700/80 transition-all duration-300 flex flex-col group relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => onNavigateDetail(product.id)}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isSale && (
            <span className="bg-[#e11d48] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
              Ưu Đãi
            </span>
          )}
          {product.isNew && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
              Món Mới
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors shadow z-10 ${
            isFav ? 'bg-rose-950/80 text-rose-400 border border-rose-800' : 'bg-black/60 text-zinc-300 hover:text-rose-400 hover:bg-black/80'
          }`}
          title={isFav ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="bg-zinc-900/90 hover:bg-zinc-900 text-zinc-100 border border-zinc-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 transition-transform shadow hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Nhanh</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="font-semibold text-rose-400 uppercase tracking-wider">{product.categoryName}</span>
            <div className="flex items-center space-x-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onNavigateDetail(product.id)}
            className="font-serif text-base font-bold text-zinc-100 group-hover:text-[#e11d48] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Cooking time & Calories preview */}
          {(product.preparationTime || product.calories) && (
            <div className="flex items-center space-x-3 text-[10px] text-zinc-400 mt-2">
              {product.preparationTime && (
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{product.preparationTime}</span>
                </span>
              )}
              {product.calories && (
                <span className="flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>{product.calories} kcal</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Price & Action */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif font-extrabold text-base text-[#e11d48]">
                {formatCurrency(product.price, currency)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatCurrency(product.originalPrice, currency)}
                </span>
              )}
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="bg-zinc-800 hover:bg-[#e11d48] text-zinc-100 p-2.5 rounded-lg transition-colors shadow-sm flex items-center space-x-1 text-xs font-bold border border-zinc-700/60"
            title="Thêm vào giỏ"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Đặt Món</span>
          </button>
        </div>

      </div>

    </div>
  );
};
