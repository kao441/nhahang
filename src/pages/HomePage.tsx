import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { AboutSection } from '../components/home/AboutSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionBanner } from '../components/home/PromotionBanner';
import { LatestBlogs } from '../components/home/LatestBlogs';
import { MapPin, Star, Utensils, Award } from 'lucide-react';
import { INITIAL_BRANCHES } from '../data/mockData';

interface HomePageProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 animate-fadeIn">
      {/* 1. Hero Banner Slider */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. About Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* 3. Featured Products Grid */}
      <FeaturedProducts 
        onNavigateDetail={(id) => onNavigate('product-detail', id)}
        onNavigateProducts={(catId) => onNavigate('products', catId)}
      />

      {/* 4. Promotion Banner with Countdown */}
      <PromotionBanner onNavigate={onNavigate} />

      {/* 5. Latest Blogs */}
      <LatestBlogs onNavigateBlog={(blogId) => onNavigate('blog-detail', blogId)} />

      {/* 6. Restaurant Locations Quick Preview */}
      <section className="py-16 bg-[#0a0a0a] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
              Hệ Thống Nhà Hàng
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-zinc-100">
              Ghé Thăm LuxeBistro Gần Bạn Nhất
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_BRANCHES.map(branch => (
              <div key={branch.id} className="bg-[#121212] border border-zinc-800/80 rounded-2xl overflow-hidden p-5 flex flex-col justify-between hover:shadow-2xl transition-all">
                <div className="space-y-3">
                  <img src={branch.image} alt={branch.name} className="w-full h-40 object-cover rounded-xl" />
                  <h3 className="font-serif text-base font-bold text-zinc-100">{branch.name}</h3>
                  <p className="text-xs text-zinc-400 flex items-start space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="text-xs text-zinc-500 font-medium">Giờ mở cửa: {branch.openingHours}</p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#e11d48]">{branch.phone}</span>
                  <button 
                    onClick={() => onNavigate('locations')}
                    className="text-xs font-bold text-zinc-200 hover:text-[#e11d48] underline"
                  >
                    Xem Chi Tiết &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
