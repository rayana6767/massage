import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, MapPin, MessageCircle, Send } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'О мастере', href: '#hero' },
    { label: 'Услуги и цены', href: '#services' },
    { label: 'Запись на прием', href: '#booking' },
    { label: 'Карта и адрес', href: '#map' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#EAE2D5]'
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Subtitle */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center space-x-3 group text-left"
          >
            <div className="w-11 h-11 rounded-full bg-[#EAE3D2] border border-[#D5C9B3] flex items-center justify-center text-[#556349] font-serif font-bold text-xl group-hover:bg-[#707C64] group-hover:text-white transition-colors duration-300 shadow-xs">
              ПЖ
            </div>
            <div>
              <span className="block text-lg font-semibold tracking-tight text-[#2D2926]">
                Пазылова Жийдегул
              </span>
              <span className="block text-xs font-normal text-[#787169] tracking-wider uppercase">
                Массаж & Косметология
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#4A453F] hover:text-[#707C64] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#707C64] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="hidden xl:flex flex-col items-end text-right">
              <a
                href="tel:+79992004512"
                id="header-phone-link"
                className="text-sm font-semibold text-[#2D2926] hover:text-[#707C64] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#707C64]" />
                +7 (999) 200-45-12
              </a>
              <span className="text-[11px] text-[#787169] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#A89F91]" />
                СПб, ул. Пейзажная, 24
              </span>
            </div>

            {/* Direct Messengers */}
            <div className="hidden md:flex items-center space-x-1.5">
              <a
                href="https://wa.me/79992004512?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D1%81%D0%B5%D0%B0%D0%BD%D1%81%20%D0%BC%D0%B0%D1%81%D1%81%D0%B0%D0%B6%D0%B0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
                className="p-2 rounded-full bg-[#EAE0D5]/60 hover:bg-[#25D366]/15 hover:text-[#128C7E] text-[#554E46] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/massage_spb_zhyidegul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram"
                className="p-2 rounded-full bg-[#EAE0D5]/60 hover:bg-[#0088cc]/15 hover:text-[#0088cc] text-[#554E46] transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Booking CTA Button */}
            <button
              id="header-booking-btn"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-[#707C64] hover:bg-[#5A664F] text-white shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Записаться
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              id="mobile-quick-book-btn"
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#707C64] text-white"
            >
              Запись
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2D2926] hover:bg-[#EAE2D5] focus:outline-hidden"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="lg:hidden bg-[#FAF7F2] border-b border-[#EAE2D5] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#3D3833] hover:bg-[#F0E9DF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#EAE2D5] space-y-3">
            <div className="flex items-center justify-between text-sm text-[#5A534B]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#707C64]" />
                СПб, ул. Пейзажная, 24
              </span>
              <span className="text-xs text-[#8C8377]">09:00 – 21:00</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://wa.me/79992004512"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#EAE0D5] text-[#2D2926] text-sm font-medium hover:bg-[#DFD4C7]"
              >
                <MessageCircle className="w-4 h-4 text-[#128C7E]" />
                WhatsApp
              </a>
              <a
                href="https://t.me/massage_spb_zhyidegul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#EAE0D5] text-[#2D2926] text-sm font-medium hover:bg-[#DFD4C7]"
              >
                <Send className="w-4 h-4 text-[#0088cc]" />
                Telegram
              </a>
            </div>

            <button
              id="mobile-drawer-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-[#707C64] hover:bg-[#5A664F] text-white font-medium text-center shadow-xs"
            >
              Записаться на сеанс
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
