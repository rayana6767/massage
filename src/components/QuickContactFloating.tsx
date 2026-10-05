import React, { useState } from 'react';
import { MessageCircle, Send, X, Phone, Calendar } from 'lucide-react';

interface QuickContactFloatingProps {
  onOpenBooking: () => void;
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options */}
      {isOpen && (
        <div className="mb-3 flex flex-col items-end space-y-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenBooking();
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#707C64] hover:bg-[#5A664F] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Записаться онлайн</span>
          </button>

          <a
            href="https://wa.me/79992004512?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BC%D0%B0%D1%81%D1%81%D0%B0%D0%B6%20(%D0%9F%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F%2024)"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Написать в WhatsApp</span>
          </a>

          <a
            href="https://t.me/massage_spb_zhyidegul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Написать в Telegram</span>
          </a>

          <a
            href="tel:+79992004512"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-[#2D2926] border border-[#DDD3C2] text-xs font-semibold shadow-lg hover:bg-[#FAF7F2] transition-all"
          >
            <Phone className="w-4 h-4 text-[#707C64]" />
            <span>Позвонить</span>
          </a>
        </div>
      )}

      {/* Main floating action toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Быстрая связь с мастером"
        className="relative w-14 h-14 rounded-full bg-[#707C64] hover:bg-[#5A664F] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer group"
      >
        {/* Pulse ripple when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-white" />
          </span>
        )}
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
