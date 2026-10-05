import React from 'react';
import { MapPin, Phone, MessageCircle, Send, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B2723] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3D3833]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#443E38]">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#707C64] flex items-center justify-center text-white font-serif font-bold text-lg">
                ПЖ
              </div>
              <div>
                <span className="block text-lg font-semibold text-white tracking-tight">
                  Пазылова Жийдегул
                </span>
                <span className="block text-xs text-[#A89F91] tracking-wider uppercase">
                  Массаж и эстетическая косметология
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#C4BCB1] leading-relaxed max-w-sm">
              Уютный домашний кабинет в Санкт-Петербурге. Индивидуальный подход, 
              медицинские стандарты стерильности и бережная забота о вашей красоте и здоровье.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/79992004512"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3833] hover:bg-[#25D366] hover:text-white flex items-center justify-center text-[#D8CFC4] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/massage_spb_zhyidegul"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3833] hover:bg-[#0088cc] hover:text-white flex items-center justify-center text-[#D8CFC4] transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="tel:+79992004512"
                className="w-9 h-9 rounded-full bg-[#3D3833] hover:bg-[#707C64] hover:text-white flex items-center justify-center text-[#D8CFC4] transition-colors"
                title="Позвонить"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A89F91]">
              Навигация по сайту
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#D8CFC4]">
              <li><a href="#hero" className="hover:text-white transition-colors">О мастере</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Услуги и цены</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Запись на прием</a></li>
              <li><a href="#map" className="hover:text-white transition-colors">Карта и адрес</a></li>
            </ul>
          </div>

          {/* Location & Working info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A89F91]">
              Адрес и контакты
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#D8CFC4]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#707C64] shrink-0 mt-0.5" />
                <span>Санкт-Петербург, ул. Пейзажная, д. 24</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#707C64] shrink-0" />
                <a href="tel:+79992004512" className="hover:text-white transition-colors">
                  +7 (999) 200-45-12
                </a>
              </p>
              <p className="text-[11px] text-[#A89F91] pt-1">
                Часы работы: ежедневно с 09:00 до 21:00. Прием исключительно по предварительной записи.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8377]">
          <p>© {new Date().getFullYear()} Мастер массажа и косметик-эстетист Пазылова Жийдегул. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              С заботой и теплом <Heart className="w-3 h-3 text-[#C4928B] fill-[#C4928B]" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#3D3833] text-[#D8CFC4] hover:text-white hover:bg-[#4E473F] transition-colors"
              title="Наверх"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
