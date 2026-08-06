import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-[#121212] text-white px-5 py-3 rounded-xl shadow-2xl border-l-4 border-[#e11d48] flex items-center space-x-3 text-xs font-semibold border border-zinc-800">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
