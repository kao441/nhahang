import React, { useState } from 'react';
import { Tag, Copy, Check, Clock, Sparkles, Utensils } from 'lucide-react';
import { INITIAL_COUPONS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';

interface PromotionsPageProps {
  onNavigate: (tab: string) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({ onNavigate }) => {
  const { applyCoupon, currency } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleClaim = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Banner */}
        <div className="bg-[#121212] text-white rounded-2xl p-8 border-b border-rose-900/60 relative overflow-hidden shadow-2xl">
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="bg-[#e11d48] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-rose-950/60">
              Ưu Đãi Đặc Biệt
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Khuyến Mãi & Voucher LuxeBistro
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Thưởng thức nghệ thuật ẩm thực đỉnh cao với vô vàn mã giảm giá hấp dẫn dành cho khách hàng thân thiết.
            </p>
          </div>
        </div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_COUPONS.map(coupon => (
            <div key={coupon.id} className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-950/80 text-[#e11d48] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border border-rose-800/60">
                    Voucher Khuyến Mãi
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium">Hạn dùng: {coupon.validUntil}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-zinc-100">{coupon.title}</h3>
                <p className="text-xs text-zinc-400">{coupon.description}</p>

                <div className="bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 text-xs space-y-1 text-zinc-300">
                  <p>• Đơn tối thiểu: <strong>{formatCurrency(coupon.minOrderValue, currency)}</strong></p>
                  {coupon.maxDiscountAmount && (
                    <p>• Giảm tối đa: <strong>{formatCurrency(coupon.maxDiscountAmount, currency)}</strong></p>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                <div className="font-mono text-base font-extrabold text-[#e11d48] bg-rose-950/60 px-3 py-1 rounded border border-rose-800/80">
                  {coupon.code}
                </div>

                <button 
                  onClick={() => handleClaim(coupon.code)}
                  className="bg-zinc-800 hover:bg-[#e11d48] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow-md border border-zinc-700 hover:border-rose-600"
                >
                  {copiedCode === coupon.code ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode === coupon.code ? 'Đã Lưu!' : 'Lưu & Dùng'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
