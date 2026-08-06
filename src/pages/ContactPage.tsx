import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export const ContactPage: React.FC = () => {
  const { showToast } = useCart();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !message) {
      showToast('Vui lòng điền họ tên, số điện thoại và nội dung cần hỗ trợ');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.sendContact({ fullName, email, phone, message });
      setSubmitted(true);
      showToast('Yêu cầu hỗ trợ đã gửi thành công!');
    } catch {
      showToast('Đã có lỗi xảy ra. Vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <span>Trang chủ</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="font-bold text-zinc-100">Liên Hệ Vẫn Đáp</span>
        </div>

        {/* Main Grid matching Wireframe Page 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-[#121212] rounded-2xl border border-zinc-800 p-8 shadow-xl space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-extrabold text-zinc-100">
                Bạn cần hỗ trợ?
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Rất hân hạnh được hỗ trợ bạn, hãy để lại thông tin cho chúng tôi nhé. Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian sớm nhất.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-6 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-emerald-300">Gửi Yêu Cầu Thành Công</h3>
                <p className="text-xs text-emerald-400">
                  Cảm ơn <strong className="text-zinc-100">{fullName}</strong>! Bộ phận CSKH LuxeBistro sẽ liên hệ qua điện thoại trong vòng 15 phút.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-xs text-[#e11d48] font-bold hover:underline pt-2"
                >
                  Gửi câu hỏi khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Họ và tên *</label>
                    <input 
                      type="text" 
                      placeholder="Tên đầy đủ"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-300 mb-1">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      placeholder="Số điện thoại"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Email liên hệ</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-300 mb-1">Nội dung hỗ trợ *</label>
                  <textarea 
                    rows={4} 
                    placeholder="Đừng ngại hỏi về đơn hàng/thắc mắc của bạn..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-xl shadow-lg shadow-rose-950/50 transition-colors inline-flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}</span>
                </button>

              </form>
            )}
          </div>

          {/* Right Direct Contact Info matching Page 5 */}
          <div className="lg:col-span-5 bg-[#121212] rounded-2xl border border-zinc-800 p-8 shadow-xl space-y-6">
            <h2 className="font-serif text-2xl font-bold text-zinc-100">
              Liên hệ với chúng tôi
            </h2>

            <div className="space-y-4 text-xs text-zinc-400">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-100">Email:</p>
                  <p>support@luxebistro.vn</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-100">Tổng đài CSKH:</p>
                  <p className="text-sm font-bold text-[#e11d48]">0988 123 456</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-100">Thời gian làm việc:</p>
                  <p>10:00 - 23:30 tất cả các ngày trong tuần</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-100">Trụ sở chính:</p>
                  <p>Số 2, Trịnh Văn Bô, Phường Phương Canh, Nam Từ Liêm, Hà Nội</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-zinc-900 rounded-xl h-48 overflow-hidden relative border border-zinc-800 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600" alt="Map" className="w-full h-full object-cover filter brightness-75 contrast-125" />
              <div className="absolute bg-black/80 border border-zinc-700 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-lg">
                Trụ sở Nam Từ Liêm, Hà Nội
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
