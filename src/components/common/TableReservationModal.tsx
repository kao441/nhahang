import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle, Sparkles, Utensils } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_BRANCHES } from '../../data/mockData';
import { api } from '../../services/api';

export const TableReservationModal: React.FC = () => {
  const { isReservationOpen, closeReservationModal, showToast } = useCart();
  const { user } = useAuth();

  const [branchId, setBranchId] = useState(INITIAL_BRANCHES[0].id);
  const [guestCount, setGuestCount] = useState(2);
  const [reservationDate, setReservationDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [reservationTime, setReservationTime] = useState('18:30');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservationCode, setConfirmedReservationCode] = useState<string | null>(null);

  if (!isReservationOpen) return null;

  const selectedBranch = INITIAL_BRANCHES.find(b => b.id === branchId) || INITIAL_BRANCHES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast('Vui lòng điền họ tên và số điện thoại liên hệ');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.createReservation({
        customerName,
        customerPhone,
        customerEmail,
        branchId,
        branchName: selectedBranch.name,
        guestCount,
        reservationDate,
        reservationTime,
        specialRequests,
        status: 'CONFIRMED'
      });

      setConfirmedReservationCode(res.reservationCode);
      showToast(`Đặt bàn thành công! Mã giữ chỗ: ${res.reservationCode}`);
    } catch {
      showToast('Đã có lỗi xảy ra. Vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmedReservationCode(null);
    closeReservationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121212] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-zinc-800">
        
        {/* Header */}
        <div className="bg-[#0a0a0a] text-white p-6 relative flex items-center justify-between border-b-4 border-[#e11d48]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#e11d48] rounded-xl flex items-center justify-center text-white shadow-md shadow-rose-950/50">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-zinc-100">Đặt Bàn Giữ Chỗ Thượng Hạng</h3>
              <p className="text-xs text-zinc-400">Đăng ký giữ bàn trực tuyến - Phục vụ chu đáo 5 sao</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedReservationCode ? (
            /* Confirmation State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-800 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-zinc-100">
                Đặt Bàn Thành Công!
              </h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Mã giữ chỗ bàn của quý khách là: <strong className="text-[#e11d48] font-mono text-lg">{confirmedReservationCode}</strong>.
                LuxeBistro đã gửi xác nhận đến số điện thoại <strong className="text-zinc-100">{customerPhone}</strong>.
              </p>

              <div className="bg-zinc-900/90 rounded-xl p-4 text-left border border-zinc-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Chi nhánh:</span>
                  <span className="font-semibold text-zinc-100">{selectedBranch.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Thời gian:</span>
                  <span className="font-semibold text-zinc-100">{reservationTime} - {reservationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Số lượng khách:</span>
                  <span className="font-semibold text-zinc-100">{guestCount} người</span>
                </div>
              </div>

              <button 
                onClick={handleClose}
                className="w-full bg-[#e11d48] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-rose-700 transition-colors shadow-lg"
              >
                Hoàn Tất & Đóng
              </button>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Branch Selector */}
              <div>
                <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
                  <span>Chọn Chi Nhánh Nhà Hàng *</span>
                </label>
                <select 
                  value={branchId}
                  onChange={e => setBranchId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                >
                  {INITIAL_BRANCHES.map(branch => (
                    <option key={branch.id} value={branch.id} className="bg-zinc-900 text-zinc-100">
                      {branch.name} ({branch.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Grid Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>Ngày *</span>
                  </label>
                  <input 
                    type="date"
                    value={reservationDate}
                    onChange={e => setReservationDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>Giờ Đặt *</span>
                  </label>
                  <select 
                    value={reservationTime}
                    onChange={e => setReservationTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {['11:00', '11:30', '12:00', '12:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(t => (
                      <option key={t} value={t} className="bg-zinc-900 text-zinc-100">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>Số Khách *</span>
                  </label>
                  <select 
                    value={guestCount}
                    onChange={e => setGuestCount(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map(n => (
                      <option key={n} value={n} className="bg-zinc-900 text-zinc-100">{n} người</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Customer Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Họ & Tên Khách Hàng *</label>
                  <input 
                    type="text"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Số Điện Thoại Liên Hệ *</label>
                  <input 
                    type="tel"
                    placeholder="Ví dụ: 0912 345 678"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Email Xác Nhận (Tùy chọn)</label>
                <input 
                  type="email"
                  placeholder="contact@gmail.com"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Ghi Chú Đặt Bàn / Yêu Cầu Đặc Biệt</label>
                <textarea 
                  rows={2}
                  placeholder="Ví dụ: Đặt vị trí bàn gần cửa sổ, tiệc sinh nhật, ghế trẻ em..."
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
                />
              </div>

              <div className="pt-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#e11d48] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-rose-700 transition-colors shadow-lg shadow-rose-950/50 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang Xử Lý Giữ Chỗ...' : 'Xác Nhận Đặt Bàn Ngay'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
