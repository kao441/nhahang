import React, { useState, useEffect } from 'react';
import { Tag, Clock, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface PromotionBannerProps {
  onNavigate: (tab: string) => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ onNavigate }) => {
  const { applyCoupon, showToast } = useCart();
  const [copied, setCopied] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LUXE2026');
    setCopied(true);
    applyCoupon('LUXE2026');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-12 bg-[#0a0a0a] text-white relative overflow-hidden border-b border-zinc-800">
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#e11d48]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-[#121212] via-zinc-900 to-[#121212] border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center space-x-1.5 bg-[#e11d48] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-rose-950/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chương Trình Ưu Đãi Độc Quyền</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Giảm Ngay 15% Cho Đơn Hàng Fine Dining Tận Nơi
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Nhập mã <strong className="text-amber-400 font-mono text-base">LUXE2026</strong> khi thanh toán để nhận ngay chiết khấu 15% tối đa 300.000₫ cùng quà tặng tráng miệng đặc biệt.
            </p>

            {/* Live Countdown Timer */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-xs text-zinc-400 font-bold uppercase">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>Thời gian còn lại:</span>
              </div>

              <div className="flex items-center space-x-2 font-mono font-bold text-sm">
                <span className="bg-[#e11d48] text-white px-2.5 py-1 rounded shadow-md shadow-rose-950/50">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-zinc-500">:</span>
                <span className="bg-[#e11d48] text-white px-2.5 py-1 rounded shadow-md shadow-rose-950/50">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-zinc-500">:</span>
                <span className="bg-[#e11d48] text-white px-2.5 py-1 rounded shadow-md shadow-rose-950/50">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Right Copy Voucher Box */}
          <div className="lg:col-span-5 bg-zinc-950/90 p-6 rounded-2xl border border-zinc-800 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-[#e11d48]/20 text-[#e11d48] rounded-xl flex items-center justify-center mx-auto border border-[#e11d48]/30">
              <Tag className="w-6 h-6" />
            </div>

            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Mã Voucher Hot</p>
              <p className="font-mono text-2xl font-black text-amber-400 tracking-wider mt-1">
                LUXE2026
              </p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleCopyCode}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 uppercase"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã Áp Dụng!' : 'Sao Chép & Dùng Ngay'}</span>
              </button>

              <button 
                onClick={() => onNavigate('products')}
                className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors border border-zinc-700"
                title="Đến thực đơn"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
