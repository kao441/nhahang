import React, { useState, useEffect } from 'react';
import {
  Phone, Mail, Clock, ShoppingBag, Heart, Search, User as UserIcon,
  Menu as MenuIcon, X, MapPin, ChevronDown, Calendar, Shield, Sparkles, LogOut, PackageCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { formatCurrency } from '../../lib/utils';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onOpenSearch }) => {
  const { cart, wishlist, currency, toggleCurrency, totalItemsCount, subtotal, openReservationModal } = useCart();
  const { user, isAuthenticated, isAdmin, isStaff, logout, switchDemoRole } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'products', label: 'Sản Phẩm / Menu', hasMega: true },
    { id: 'promotions', label: 'Ưu Đãi' },
    { id: 'blog', label: 'Blog' },
    { id: 'locations', label: 'Hệ Thống Nhà Hàng' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  return (
    <header className="w-full relative z-40 font-sans">
      {/* Top Bar */}
      <div className="bg-[#121212] text-gray-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Info */}
          <div className="flex items-center space-x-6 flex-wrap">
            <a href="tel:0988123456" className="flex items-center space-x-1.5 hover:text-red-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Hotline: <strong className="text-white">0988 123 456</strong></span>
            </a>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <div className="hidden sm:flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>contact@luxebistro.vn</span>
            </div>
            <span className="hidden md:inline text-zinc-700">|</span>
            <div className="hidden md:flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>Giờ mở cửa: <strong className="text-white">10:00 - 23:30</strong></span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Demo Role Switcher for Evaluators */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-1 bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-500/30 transition-colors"
                title="Chuyển đổi vai trò trải nghiệm"
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>Quyền: <strong className="text-white uppercase">{user?.role || 'Guest'}</strong></span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl py-1 text-xs z-50">
                  <div className="px-3 py-1 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-800">
                    Chuyển Vai Trò (Test)
                  </div>
                  <button
                    onClick={() => { switchDemoRole('CUSTOMER'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800 flex items-center space-x-2 ${user?.role === 'CUSTOMER' ? 'text-red-400 font-bold' : 'text-gray-300'}`}
                  >
                    <span>Khách Hàng (Customer)</span>
                  </button>
                  <button
                    onClick={() => { switchDemoRole('STAFF'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800 flex items-center space-x-2 ${user?.role === 'STAFF' ? 'text-red-400 font-bold' : 'text-gray-300'}`}
                  >
                    <span>Nhân Viên (Staff)</span>
                  </button>
                  <button
                    onClick={() => { switchDemoRole('ADMIN'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-zinc-800 flex items-center space-x-2 ${user?.role === 'ADMIN' ? 'text-red-400 font-bold' : 'text-gray-300'}`}
                  >
                    <span>Quản Trị Viên (Admin)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              className="hover:text-amber-400 font-medium tracking-wide transition-colors"
            >
              Tỷ giá: <span className="text-white font-bold">{currency}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full bg-[#0a0a0a] text-zinc-100 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 shadow-2xl border-b border-zinc-800/80 py-3 bg-[#0a0a0a]/95 backdrop-blur-md' : 'py-4 border-b border-zinc-800/60'
        }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 text-left group"
          >
            <img
              src="/logo.png"
              alt="LuxeBistro Logo"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-zinc-100 block leading-none">
                LUXE<span className="text-[#e11d48]">BISTRO</span>
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-medium mt-0.5">
                Fine Dining Restaurant
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => item.hasMega && setMegaMenuOpen(true)}
                onMouseLeave={() => item.hasMega && setMegaMenuOpen(false)}
              >
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`font-medium text-sm tracking-wide transition-colors flex items-center space-x-1 ${currentTab === item.id
                    ? 'text-[#e11d48] font-semibold'
                    : 'text-zinc-300 hover:text-[#e11d48]'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.hasMega && <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Active Indicator Bar */}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e11d48] rounded-full animate-fadeIn" />
                )}

                {/* Mega Menu Dropdown */}
                {item.hasMega && megaMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#121212] border border-zinc-800 rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-4 animate-fadeIn z-50">
                    <div className="space-y-2 col-span-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#e11d48]" />
                        <span>Danh Mục Thực Đơn Thượng Hạng</span>
                      </h4>
                      <button
                        onClick={() => { onNavigate('products'); setMegaMenuOpen(false); }}
                        className="text-xs text-[#e11d48] font-medium hover:underline"
                      >
                        Xem tất cả món ăn &rarr;
                      </button>
                    </div>

                    {INITIAL_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onNavigate('products', cat.id);
                          setMegaMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800/80 text-left transition-colors group"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-12 h-12 rounded-md object-cover group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <p className="text-sm font-semibold text-zinc-100 group-hover:text-[#e11d48] transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-xs text-zinc-400 line-clamp-1">
                            {cat.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Quick Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-300 hover:text-[#e11d48] hover:bg-zinc-800/60 rounded-full transition-colors"
              title="Tìm kiếm món ăn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('account', 'wishlist')}
              className="p-2 text-zinc-300 hover:text-[#e11d48] hover:bg-zinc-800/60 rounded-full transition-colors relative"
              title="Danh sách yêu thích"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="flex items-center space-x-2 bg-zinc-800/90 text-zinc-100 hover:bg-[#e11d48] border border-zinc-700/80 px-3.5 py-2 rounded-full transition-all duration-200 shadow-sm group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-zinc-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-zinc-900">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold">
                {formatCurrency(subtotal, currency)}
              </span>
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={openReservationModal}
              className="hidden md:flex items-center space-x-1.5 bg-[#e11d48] text-white hover:bg-rose-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-rose-950/40 hover:shadow-rose-900/60"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Đặt Bàn</span>
            </button>

            {/* User Profile / Auth */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-zinc-300 hover:text-[#e11d48] hover:bg-zinc-800/60 rounded-full transition-colors flex items-center space-x-1"
              >
                {isAuthenticated && user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-rose-500" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#121212] border border-zinc-800 rounded-xl shadow-2xl py-2 text-sm z-50 animate-fadeIn">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="font-semibold text-zinc-100">{user?.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                        <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800/50">
                          {user?.role}
                        </span>
                      </div>

                      {(isAdmin || isStaff) && (
                        <button
                          onClick={() => { onNavigate('admin'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-amber-400 font-semibold flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Trang Quản Trị (Admin Dashboard)</span>
                        </button>
                      )}

                      <button
                        onClick={() => { onNavigate('account'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300 flex items-center space-x-2"
                      >
                        <UserIcon className="w-4 h-4 text-zinc-400" />
                        <span>Tài Khoản & Đơn Hàng</span>
                      </button>

                      <button
                        onClick={() => { onNavigate('account', 'orders'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300 flex items-center space-x-2"
                      >
                        <PackageCheck className="w-4 h-4 text-zinc-400" />
                        <span>Lịch Sử Đặt Món</span>
                      </button>

                      <div className="border-t border-zinc-800 my-1"></div>

                      <button
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-rose-950/60 text-rose-400 font-medium flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng Xuất</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { onNavigate('auth'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-200 font-medium"
                      >
                        Đăng Nhập / Đăng Ký
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-200 hover:text-[#e11d48]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-t border-zinc-800 px-4 py-4 space-y-3 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${currentTab === item.id ? 'bg-rose-950/60 text-rose-400 font-bold border border-rose-800/40' : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
              <button
                onClick={() => { openReservationModal(); setMobileMenuOpen(false); }}
                className="w-full bg-[#e11d48] text-white py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt Bàn Ngay</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
