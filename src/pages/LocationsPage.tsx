import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Navigation, Globe } from 'lucide-react';
import { INITIAL_BRANCHES } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const LocationsPage: React.FC = () => {
  const { openReservationModal } = useCart();
  const [selectedBranch, setSelectedBranch] = useState(INITIAL_BRANCHES[0]);

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
            Hệ Thống Cửa Hàng / Nhà Hàng
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
            Địa Điểm LuxeBistro Fine Dining
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Chào đón quý khách tại các tọa độ đắc địa bậc nhất trung tâm Hà Nội & TP. Hồ Chí Minh
          </p>
        </div>

        {/* Branch Cards & Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Branch List Left */}
          <div className="lg:col-span-5 space-y-4">
            {INITIAL_BRANCHES.map(branch => (
              <div 
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selectedBranch.id === branch.id 
                    ? 'bg-[#121212] border-[#e11d48] shadow-2xl ring-2 ring-rose-500/30' 
                    : 'bg-[#121212] border-zinc-800 hover:border-zinc-700 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-zinc-100">{branch.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium">{branch.city}</p>
                  </div>
                  {branch.isMainBranch && (
                    <span className="bg-[#e11d48] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-md shadow-rose-950/50">
                      Trụ sở chính
                    </span>
                  )}
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-zinc-300">
                  <p className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#e11d48] shrink-0" />
                    <span>{branch.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#e11d48] shrink-0" />
                    <span>Giờ hoạt động: {branch.openingHours}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openReservationModal();
                    }}
                    className="bg-[#e11d48] hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 shadow-md shadow-rose-950/50"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Đặt bàn tại chi nhánh này</span>
                  </button>

                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-zinc-300 hover:text-[#e11d48] font-bold flex items-center space-x-1 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Chỉ đường</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Map Preview Right */}
          <div className="lg:col-span-7 bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden shadow-xl flex flex-col h-[500px]">
            <div className="p-4 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#e11d48]" />
                <span className="font-serif font-bold text-sm text-zinc-100">{selectedBranch.name}</span>
              </div>
              <span className="text-xs text-zinc-400">{selectedBranch.district}, {selectedBranch.city}</span>
            </div>

            {/* Visual Map Mockup */}
            <div className="flex-1 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
              <img src={selectedBranch.image} alt={selectedBranch.name} className="w-full h-full object-cover filter brightness-75 contrast-125" />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-[#e11d48] rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-zinc-100">{selectedBranch.name}</h4>
                <p className="text-xs max-w-md text-zinc-300">{selectedBranch.address}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.address)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#e11d48] text-white hover:bg-rose-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-lg shadow-rose-950/60"
                >
                  Mở Google Maps chỉ đường
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
