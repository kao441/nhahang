import React, { useState } from 'react';
import { 
  ChevronRight, Star, Clock, Flame, ShieldAlert, Heart, ShoppingBag, 
  Plus, Minus, Share2, ThumbsUp, MessageSquare, Utensils
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  productId: string;
  onNavigateDetail: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigateDetail, onNavigate }) => {
  const { addToCart, toggleWishlist, isWishlisted, currency, showToast } = useCart();

  const product = INITIAL_PRODUCTS.find(p => p.id === productId || p.slug === productId) || INITIAL_PRODUCTS[0];
  
  const [selectedImg, setSelectedImg] = useState<string>(product.images[0] || '');
  const [qty, setQty] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Reviews local state
  const [reviews, setReviews] = useState([
    {
      id: 'r-1',
      name: 'Trần Hoàng Nam',
      rating: 5,
      date: '2026-05-10',
      comment: 'Thịt bò mềm mọng tan ngay trong miệng, nước xốt Truffle thơm lừng đậm đà. Đáng giá tiền!'
    },
    {
      id: 'r-2',
      name: 'Lê Thanh Hà',
      rating: 5,
      date: '2026-04-28',
      comment: 'Phục vụ vô cùng chu đáo, đồ ăn nóng hổi mạ vàng rất đẹp mắt khi chụp ảnh.'
    }
  ]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const isFav = isWishlisted(product.id);

  const relatedProducts = INITIAL_PRODUCTS.filter(p => p.categoryId === product.categoryId && p.id !== product.id);

  const handleAddToCart = () => {
    addToCart(product, qty, specialNote);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !reviewerName) {
      showToast('Vui lòng nhập tên và nhận xét của bạn');
      return;
    }
    const rev = {
      id: `rev-${Date.now()}`,
      name: reviewerName,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment
    };
    setReviews([rev, ...reviews]);
    setNewComment('');
    setReviewerName('');
    showToast('Cảm ơn bạn đã gửi đánh giá!');
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400 border-b border-zinc-800 pb-4">
          <button onClick={() => onNavigate('home')} className="hover:text-[#e11d48]">Trang chủ</button>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <button onClick={() => onNavigate('products')} className="hover:text-[#e11d48]">Sản phẩm</button>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="font-bold text-zinc-100">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Gallery Left */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-[#121212] shadow-xl">
              <img 
                src={selectedImg || product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === img ? 'border-[#e11d48] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Right */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold text-[#e11d48] bg-rose-950/60 border border-rose-800/60 px-3 py-1 rounded-full uppercase tracking-wider">
                {product.categoryName}
              </span>

              <h1 className="font-serif text-3xl font-extrabold text-zinc-100 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
                <span className="text-zinc-700">|</span>
                <span className="text-zinc-400">{reviews.length + product.reviewCount} đánh giá từ khách hàng</span>
                <span className="text-zinc-700">|</span>
                <span className="text-emerald-400 font-bold">Đang phục vụ tươi mỗi ngày</span>
              </div>

              {/* Price */}
              <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 flex items-baseline space-x-3 shadow-md">
                <span className="font-serif text-3xl font-extrabold text-[#e11d48]">
                  {formatCurrency(product.price, currency)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-zinc-500 line-through">
                    {formatCurrency(product.originalPrice, currency)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.longDescription || product.description}
              </p>

              {/* Spec Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
                {product.preparationTime && (
                  <div className="flex items-center space-x-2 bg-[#121212] border border-zinc-800 p-2.5 rounded-lg">
                    <Clock className="w-4 h-4 text-rose-500" />
                    <span>Thời gian chuẩn bị: <strong className="text-zinc-100">{product.preparationTime}</strong></span>
                  </div>
                )}
                {product.calories && (
                  <div className="flex items-center space-x-2 bg-[#121212] border border-zinc-800 p-2.5 rounded-lg">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>Hàm lượng calo: <strong className="text-zinc-100">{product.calories} kcal</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Yêu cầu đặc biệt cho đầu bếp</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Làm chín tái medium-rare, không xốt tỏi..."
                  value={specialNote}
                  onChange={e => setSpecialNote(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-xs text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center border border-zinc-700 rounded-xl p-1 bg-zinc-900">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-extrabold text-zinc-100">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#e11d48] hover:bg-rose-700 text-white py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-rose-950/50 transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ĐẶT HÀNG NGAY</span>
                </button>

                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isFav ? 'bg-rose-950/80 border-rose-800 text-rose-400' : 'border-zinc-700 text-zinc-400 hover:text-rose-400'
                  }`}
                  title="Yêu thích"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info: Ingredients & Reviews */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <div className="flex border-b border-zinc-800 gap-6 text-sm font-bold">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`pb-3 border-b-2 transition-colors ${activeTab === 'desc' ? 'border-[#e11d48] text-[#e11d48]' : 'border-transparent text-zinc-400'}`}
            >
              Mô Tả & Nguyên Liệu
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-[#e11d48] text-[#e11d48]' : 'border-transparent text-zinc-400'}`}
            >
              Đánh Giá Thực Khách ({reviews.length})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'desc' ? (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <p>{product.longDescription || product.description}</p>
                {product.ingredients && (
                  <div>
                    <h4 className="font-bold text-zinc-100 text-sm mb-2">Thành Phần Nguyên Liệu Chính:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map(ing => (
                        <span key={ing} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full font-medium">
                          • {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Submit review */}
                <form onSubmit={handleAddReview} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <h4 className="font-bold text-xs text-zinc-100 uppercase tracking-wider">Viết Đánh Giá Của Bạn</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Họ và tên của bạn" 
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      className="bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                    />
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-bold text-zinc-300">Số sao:</span>
                      {[1, 2, 3, 4, 5].map(s => (
                        <button 
                          key={s} 
                          type="button" 
                          onClick={() => setNewRating(s)}
                          className={`p-1 ${s <= newRating ? 'text-amber-400' : 'text-zinc-600'}`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea 
                    rows={2} 
                    placeholder="Cảm nhận của bạn về hương vị và cách phục vụ món ăn..." 
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                  <button type="submit" className="bg-[#e11d48] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors shadow-md shadow-rose-950/50">
                    Gửi Đánh Giá
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map(rev => (
                    <div key={rev.id} className="p-4 border-b border-zinc-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-zinc-100">{rev.name}</strong>
                        <span className="text-zinc-500">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-zinc-300 pt-1">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products matching Page 4 wireframe */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="text-center space-y-1">
              <h2 className="font-serif text-2xl font-extrabold text-zinc-100 uppercase tracking-wide">
                SẢN PHẨM LIÊN QUAN
              </h2>
              <p className="text-xs text-zinc-400">Thưởng thức thêm những món ăn cùng phong cách ấn tượng</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(rel => (
                <ProductCard 
                  key={rel.id} 
                  product={rel} 
                  onNavigateDetail={onNavigateDetail} 
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
