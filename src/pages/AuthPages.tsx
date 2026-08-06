import React, { useState } from 'react';
import { Lock, Mail, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface AuthPagesProps {
  onSuccess: () => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({ onSuccess }) => {
  const { login, register, switchDemoRole } = useAuth();
  const { showToast } = useCart();

  const [mode, setMode] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>('LOGIN');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'LOGIN') {
      if (!email) {
        showToast('Vui lòng nhập Email');
        return;
      }
      await login(email, password);
      showToast('Đăng nhập thành công!');
      onSuccess();
    } else if (mode === 'REGISTER') {
      if (!name || !email || !phone) {
        showToast('Vui lòng điền đầy đủ thông tin');
        return;
      }
      await register(name, email, phone, password);
      showToast('Đăng ký tài khoản thành công!');
      onSuccess();
    } else {
      showToast('Mã khôi phục mật khẩu đã gửi tới email của bạn');
      setMode('LOGIN');
    }
  };

  return (
    <div className="w-full bg-[#0a0a0a] min-h-[80vh] flex items-center justify-center py-12 px-4 font-sans animate-fadeIn">
      <div className="bg-[#121212] text-zinc-100 rounded-2xl border border-zinc-800 shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-zinc-950 text-white p-6 text-center space-y-2 border-b-4 border-[#e11d48]">
          <div className="w-10 h-10 bg-[#e11d48] rounded-xl flex items-center justify-center mx-auto text-white font-serif font-black text-xl shadow-lg shadow-rose-950/60">
            LB
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-100">
            {mode === 'LOGIN' ? 'Đăng Nhập LuxeBistro' : mode === 'REGISTER' ? 'Tạo Tài Khoản Mới' : 'Khôi Phục Mật Khẩu'}
          </h2>
          <p className="text-xs text-zinc-400">Trải nghiệm dịch vụ Fine Dining dành riêng cho hội viên</p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {mode === 'REGISTER' && (
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Họ và Tên *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 pl-8 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <User className="w-4 h-4 text-zinc-400 absolute left-2.5 top-3" />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-zinc-300 mb-1">Địa Chỉ Email *</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="admin@luxebistro.vn hoặc minhnv@gmail.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 pl-8 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {mode === 'REGISTER' && (
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Số Điện Thoại *</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="0912 345 678" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 pl-8 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-2.5 top-3" />
                </div>
              </div>
            )}

            {mode !== 'FORGOT' && (
              <div>
                <label className="block font-bold text-zinc-300 mb-1">Mật Khẩu *</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 pl-8 text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-2.5 top-3" />
                </div>
              </div>
            )}

            {mode === 'LOGIN' && (
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => setMode('FORGOT')}
                  className="text-[11px] text-[#e11d48] hover:underline font-semibold"
                >
                  Quên mật khẩu?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#e11d48] hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-rose-950/50 transition-colors flex items-center justify-center space-x-1"
            >
              <span>{mode === 'LOGIN' ? 'Đăng Nhập' : mode === 'REGISTER' ? 'Tạo Tài Khoản' : 'Gửi Yêu Cầu'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Role Switcher Demo Bar */}
          <div className="pt-4 border-t border-zinc-800 text-center space-y-2">
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
              Chuyển nhanh vai trò thử nghiệm:
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => { switchDemoRole('ADMIN'); onSuccess(); }}
                className="flex-1 bg-zinc-900 hover:bg-rose-800 text-white text-[10px] font-bold py-1.5 rounded transition-colors border border-zinc-700"
              >
                Tài khoản Admin
              </button>
              <button 
                onClick={() => { switchDemoRole('STAFF'); onSuccess(); }}
                className="flex-1 bg-zinc-900 hover:bg-rose-800 text-white text-[10px] font-bold py-1.5 rounded transition-colors border border-zinc-700"
              >
                Nhân viên Staff
              </button>
              <button 
                onClick={() => { switchDemoRole('CUSTOMER'); onSuccess(); }}
                className="flex-1 bg-zinc-900 hover:bg-rose-800 text-white text-[10px] font-bold py-1.5 rounded transition-colors border border-zinc-700"
              >
                Khách hàng
              </button>
            </div>
          </div>

          {/* Toggle Register/Login */}
          <div className="text-center text-xs text-zinc-400">
            {mode === 'LOGIN' ? (
              <p>
                Chưa có tài khoản?{' '}
                <button onClick={() => setMode('REGISTER')} className="text-[#e11d48] font-bold hover:underline">
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <p>
                Đã có tài khoản?{' '}
                <button onClick={() => setMode('LOGIN')} className="text-[#e11d48] font-bold hover:underline">
                  Đăng nhập
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
