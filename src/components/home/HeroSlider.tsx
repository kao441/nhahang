import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Utensils, Calendar, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface HeroSliderProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const { openReservationModal } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'TINH HOA ẨM THỰC THƯỢNG HẠNG',
      subtitle: 'Bít Tết Bò Wagyu A5 & Hải Sản Cao Cấp Tươi Sống Mỗi Ngày',
      description: 'Trải nghiệm hành trình ẩm thực phong cách 5 sao trong không gian kiến trúc tân cổ điển sang trọng giữa lòng thành phố.',
      badge: 'LuxeBistro Fine Dining',
      bgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
      primaryCta: 'Thực Đơn Món Ăn',
      primaryAction: () => onNavigate('products'),
      secondaryCta: 'Đặt Bàn Ngay',
      secondaryAction: openReservationModal
    },
    {
      id: 2,
      title: 'KHÔNG GIAN SANG TRỌNG & ĐẲNG CẤP',
      subtitle: 'Nơi Gặp Gỡ Tinh Tế Cho Những Bữa Tiệc Kỷ Niệm Đáng Nhớ',
      description: 'Phòng VIP riêng tư, bộ sưu tập hơn 200 dòng rượu vang hảo hạng nhập khẩu Pháp & Ý chọn lọc bởi Sommelier chuyên nghiệp.',
      badge: 'Luxury Atmosphere',
      bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600',
      primaryCta: 'Khám Phá Chi Nhánh',
      primaryAction: () => onNavigate('locations'),
      secondaryCta: 'Đặt Bàn Giữ Chỗ',
      secondaryAction: openReservationModal
    },
    {
      id: 3,
      title: 'ƯU ĐÃI THƯỞNG THỨC MÔN MỚI',
      subtitle: 'Giảm 15% Cho Đơn Hàng Đầu Tiên Với Mã LU XE 2026',
      description: 'Giao hàng tận nơi phong cách Fine Dining trọn vẹn hương vị độc đáo nguyên bản tới tận bàn ăn nhà bạn.',
      badge: 'Special Offer',
      bgImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600',
      primaryCta: 'Săn Mã Ưu Đãi',
      primaryAction: () => onNavigate('promotions'),
      secondaryCta: 'Đặt Món Ngay',
      secondaryAction: () => onNavigate('products')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden bg-black text-white group">
      
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Dark Gradient overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

          {/* Slide Text Content Container */}
          <div className="max-w-7xl mx-auto h-full px-6 flex items-center relative z-20">
            <div className="max-w-2xl space-y-4 animate-fadeIn">
              
              <span className="inline-flex items-center space-x-1.5 bg-[#e11d48] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-rose-950/60">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-amber-400 font-medium text-sm sm:text-base tracking-wide">
                {slide.subtitle}
              </p>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                {slide.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={slide.primaryAction}
                  className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-rose-950/50 transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>{slide.primaryCta}</span>
                </button>

                <button 
                  onClick={slide.secondaryAction}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{slide.secondaryCta}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-[#e11d48] text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 border border-zinc-800"
        title="Trượt sang trái"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-[#e11d48] text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 border border-zinc-800"
        title="Trượt sang phải"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-[#e11d48]' : 'w-2 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>

    </div>
  );
};
