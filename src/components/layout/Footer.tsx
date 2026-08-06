import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, ThumbsUp, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-zinc-300 font-sans border-t-4 border-[#e11d48] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-[#e11d48] rounded-md flex items-center justify-center text-white font-serif font-black text-lg shadow-md shadow-rose-950/50">
                LB
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                LUXE<span className="text-[#e11d48]">BISTRO</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Nhà hàng ẩm thực cao cấp chuẩn 5 sao, mang đến trải nghiệm hương vị thượng hạng cùng không gian sang trọng bậc nhất.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2.5 text-zinc-300">
                <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <span>Số 2, Trịnh Văn Bô, phường Phương Canh, Nam Từ Liêm, Hà Nội</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#e11d48] shrink-0" />
                <span>Hotline: <strong className="text-white">0988 123 456</strong></span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#e11d48] shrink-0" />
                <span>Email: contact@luxebistro.vn</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-[#e11d48] shrink-0" />
                <span>Website: www.luxebistro.vn</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#e11d48] rounded-full"></span>
              <span>Về Nhà Hàng LuxeBistro</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-rose-400 transition-colors">
                  Giới Thiệu Về Nhà Hàng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-rose-400 transition-colors">
                  Tin Tức & Tuyển Dụng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-rose-400 transition-colors">
                  Điều Khoản Dịch Vụ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-rose-400 transition-colors">
                  Chính Sách Bảo Mật
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('promotions')} className="hover:text-rose-400 transition-colors">
                  Chương Trình Tiếp Thị Liên Kết
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-rose-400 transition-colors">
                  Liên Hệ Với Truyền Thông
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Menu Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#e11d48] rounded-full"></span>
              <span>Thực Đơn Nổi Bật</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('products', 'cat-1')} className="hover:text-rose-400 transition-colors">
                  Bít Tết Bò Wagyu A5 Dát Vàng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'cat-1')} className="hover:text-rose-400 transition-colors">
                  Tôm Hùm Alaska Đút Lò Bơ Tỏi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'cat-2')} className="hover:text-rose-400 transition-colors">
                  Gan Ngỗng Pháp Pan-Seared Foie Gras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'cat-4')} className="hover:text-rose-400 transition-colors">
                  Sườn Cừu New Zealand Nướng Thảo Mộc
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'cat-6')} className="hover:text-rose-400 transition-colors">
                  Rượu Vang Đỏ Cao Cấp Nhập Khẩu
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Fanpage Widget */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#e11d48] rounded-full"></span>
              <span>Kết Nối Với Chúng Tôi</span>
            </h4>

            {/* Mock Social Fanpage Box */}
            <div className="bg-zinc-900/90 rounded-lg p-4 border border-zinc-800 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#e11d48] rounded text-white flex items-center justify-center font-bold text-sm shadow">
                  LOGO
                </div>
                <div>
                  <p className="text-sm font-bold text-white">LuxeBistro Restaurant</p>
                  <p className="text-[11px] text-zinc-400">20,000 người theo dõi</p>
                </div>
              </div>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center justify-center space-x-1.5 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Thích Trang (Like Page)</span>
              </a>
            </div>

            <div className="mt-4 flex items-center space-x-3 text-zinc-400">
              <a href="#" className="p-2 bg-zinc-800 hover:bg-[#e11d48] hover:text-white rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-800 hover:bg-[#e11d48] hover:text-white rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-800 hover:bg-[#e11d48] hover:text-white rounded-full transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 LuxeBistro Restaurant. All Rights Reserved. Designed for Enterprise Experience.</p>
          
          <div className="flex items-center space-x-4">
            <span className="text-zinc-500">Thanh toán an toàn:</span>
            <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-300 font-bold border border-zinc-700/50">VNPay</span>
            <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-300 font-bold border border-zinc-700/50">MoMo</span>
            <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-300 font-bold border border-zinc-700/50">COD</span>
            <button 
              onClick={scrollToTop}
              className="p-2 bg-[#e11d48] text-white rounded hover:bg-rose-700 transition-colors ml-2 shadow-md shadow-rose-950/50"
              title="Về đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
