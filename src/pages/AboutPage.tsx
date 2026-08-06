import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Utensils, Star, Users, Flame, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const chefs = [
    {
      name: 'Chef Michael Vance',
      role: 'Executive Master Chef',
      experience: '20 năm kinh nghiệm tại các nhà hàng 3 sao Michelin Pháp',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Chef Akira Tanaka',
      role: 'Wagyu & Robata Specialist',
      experience: 'Chuyên gia ẩm thực Nhật Bản với kỹ thuật nướng Robata truyền thống',
      avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Thùy Chan',
      role: 'Head Culinary Editor & Food Stylist',
      experience: 'Sáng tạo thực đơn và thẩm mỹ trình bày món ăn chuẩn Fine Dining',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 animate-fadeIn pb-16">
      
      {/* Banner Header */}
      <div className="relative py-20 bg-zinc-950 text-white overflow-hidden border-b border-rose-900/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-3">
          <span className="text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-rose-800">
            Câu Chuyện Thương Hiệu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-zinc-100">
            Giới Thiệu Về LuxeBistro
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
            Hành trình kiến tạo không gian Fine Dining đỉnh cao và định nghĩa lại sự tinh tế trong ẩm thực cao cấp tại Việt Nam.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-extrabold text-zinc-100">
              Lịch Sử & Triết Lý Ẩm Thực
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              LuxeBistro được thành lập từ năm 2011 với khát vọng mang nghệ thuật ẩm thực thế giới kết hợp hoàn hảo cùng hương vị tinh tế Việt Nam. Chúng tôi tin rằng mỗi món ăn là một tác phẩm nghệ thuật, mang trong mình tâm huyết của người đầu bếp và câu chuyện của những nguyên liệu quý hiếm.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Tại LuxeBistro, chúng tôi cam kết sử dụng 100% nguyên liệu tươi xanh đạt chứng nhận organic thủy canh và nhập khẩu trực tiếp các nguyên liệu cao cấp nhất như Bò Wagyu A5 Nhật Bản, Tôm Hùm Alaska, Nấm Truffle Pháp.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 shadow-xl">
                <span className="font-serif text-2xl font-bold text-[#e11d48]">Tầm Nhìn</span>
                <p className="text-xs text-zinc-400 mt-1">Trở thành biểu tượng Fine Dining hàng đầu khu vực với phong cách dịch vụ 5 sao chuẩn mực.</p>
              </div>

              <div className="bg-[#121212] p-4 rounded-xl border border-zinc-800 shadow-xl">
                <span className="font-serif text-2xl font-bold text-[#e11d48]">Sứ Mệnh</span>
                <p className="text-xs text-zinc-400 mt-1">Gắn kết cảm xúc của thực khách thông qua từng bữa ăn hoàn hảo và dịch vụ tận tâm.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600" alt="Wagyu Dish" className="rounded-2xl shadow-xl w-full h-64 object-cover border border-zinc-800" />
            <img src="https://images.unsplash.com/photo-1559742811-8228636d253b?auto=format&fit=crop&q=80&w=600" alt="Lobster Dish" className="rounded-2xl shadow-xl w-full h-64 object-cover mt-8 border border-zinc-800" />
          </div>
        </div>

        {/* Master Chefs */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
              Đội Ngũ Bếp Trưởng
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-zinc-100">
              Bàn Tay Vàng Tạo Nên Mỹ Vị
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map(chef => (
              <div key={chef.name} className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 text-center shadow-xl space-y-4">
                <img src={chef.avatar} alt={chef.name} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-rose-800 shadow-lg" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-100">{chef.name}</h3>
                  <p className="text-xs font-bold text-[#e11d48] mt-0.5">{chef.role}</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{chef.experience}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
