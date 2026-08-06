import React from 'react';
import { Award, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (tab: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
              <span>Về Chúng Tôi</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
              LuxeBistro - Nghệ Thuật Ẩm Thực Vô Song & Trải Nghiệm Thượng Hạng
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Thành lập từ niềm đam mê sâu sắc dành cho văn hóa ẩm thực Âu - Á cao cấp, LuxeBistro không chỉ dừng lại ở một bữa ăn ngon, mà mang tới cho thực khách hành trình đánh thức trọn vẹn mọi giác quan.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Từng miếng thịt Bò Wagyu A5 dát vàng hay tôm hùm đút lò bơ tỏi đều được thực hiện dưới sự chỉ đạo trực tiếp của Đội ngũ Bếp trưởng đạt chứng nhận sao Michelin, đảm bảo tiêu chuẩn an toàn và vệ sinh nguyên liệu hữu cơ khắt khe nhất.
            </p>

            {/* Key Features Badges */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-[#121212] p-3 rounded-xl border border-zinc-800 text-center shadow-lg">
                <Award className="w-6 h-6 text-[#e11d48] mx-auto mb-1" />
                <h4 className="font-bold text-xs text-zinc-100">5-Star Quality</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">Tiêu chuẩn quốc tế</p>
              </div>

              <div className="bg-[#121212] p-3 rounded-xl border border-zinc-800 text-center shadow-lg">
                <ShieldCheck className="w-6 h-6 text-[#e11d48] mx-auto mb-1" />
                <h4 className="font-bold text-xs text-zinc-100">100% Organic</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">Nguyên liệu tươi sạch</p>
              </div>

              <div className="bg-[#121212] p-3 rounded-xl border border-zinc-800 text-center shadow-lg">
                <HeartHandshake className="w-6 h-6 text-[#e11d48] mx-auto mb-1" />
                <h4 className="font-bold text-xs text-zinc-100">Chu Đáo 24/7</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5">Phục vụ chuyên nghiệp</p>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => onNavigate('about')}
                className="bg-[#121212] hover:bg-[#e11d48] border border-zinc-700 hover:border-[#e11d48] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all inline-flex items-center space-x-2"
              >
                <span>Xem Thêm Về LuxeBistro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Image Composition */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800" 
                alt="LuxeBistro Interior" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#e11d48] text-white p-6 rounded-2xl shadow-2xl shadow-rose-950/60 max-w-xs hidden sm:block border border-rose-500/30">
              <span className="font-serif text-3xl font-extrabold block">15+ Năm</span>
              <span className="text-xs text-rose-100 font-medium">Khẳng định vị thế hàng đầu trong ngành nhà hàng cao cấp</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
