import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Star, Award, ZoomIn, CheckCircle2, Camera, Check, ShieldCheck, Heart, ArrowRight, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenLightbox?: (imageUrl: string, title: string, description?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenLightbox }) => {
  const [masterPhotoUrl, setMasterPhotoUrl] = useState<string>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('master_photo_version') === 'v3_selfie') {
      return localStorage.getItem('masterPhotoUrl') || `/master_photo.jpg?v=v3`;
    }
    return `/master_photo.jpg?v=v3_${Date.now()}`;
  });
  const [isHovered, setIsHovered] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photo preference and invalidate stale caches
  useEffect(() => {
    const currentVersion = localStorage.getItem('master_photo_version');
    if (currentVersion !== 'v3_selfie') {
      localStorage.setItem('master_photo_version', 'v3_selfie');
      localStorage.removeItem('masterPhotoUrl');
      setMasterPhotoUrl(`/master_photo.jpg?v=v3_${Date.now()}`);
      return;
    }
    const saved = localStorage.getItem('masterPhotoUrl');
    if (saved) {
      setMasterPhotoUrl(saved);
    } else {
      setMasterPhotoUrl(`/master_photo.jpg?v=v3_${Date.now()}`);
    }
  }, []);

  const handleSelectPhoto = (url: string) => {
    setMasterPhotoUrl(url);
    localStorage.setItem('masterPhotoUrl', url);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2500);
  };

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      // Instant visual update on screen
      setMasterPhotoUrl(base64Data);
      localStorage.setItem('masterPhotoUrl', base64Data);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);

      // Save to server
      try {
        await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            target: 'master',
            filename: file.name,
            base64Data,
          }),
        });
      } catch (err) {
        console.warn('Could not persist master photo to server:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    if (onOpenLightbox) {
      onOpenLightbox(
        masterPhotoUrl,
        'Пазылова Жийдегул',
        'Дипломированный мастер массажа и косметик-эстетист (10 официальных сертификатов и дипломов). Частный прием в уютном кабинете по адресу: СПб, ул. Пейзажная, 24.'
      );
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-[#F7F3EC] via-[#FAF7F2] to-[#FAF7F2]"
    >
      {/* Subtle organic decorative background blurs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[#E8DDD0]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#E5EADF]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#F4E3E1]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* PHOTO OF THE MASTER (ПЕРВАЯ СТРАНИЦА: ФОТОГРАФИЯ МАСТЕРА) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative halo/frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/5 group cursor-pointer"
                onClick={handleImageClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={masterPhotoUrl}
                  alt="Пазылова Жийдегул - мастер массажа и косметик-эстетист"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient overlay at bottom for high legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                    <ZoomIn className="w-4 h-4 text-[#D3C7B6]" />
                    <span>Посмотреть крупно</span>
                  </div>
                </div>

                {/* Master Identity Plaque at bottom of Photo */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#EFE8DE]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#707C64] uppercase tracking-wider block">
                        Мастер массажа и косметологии
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#2D2926] leading-tight">
                        Пазылова Жийдегул
                      </h3>
                      <p className="text-xs text-[#787169] mt-0.5">
                        Академия массажа • Академия «Эколь»
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E3D8C8]">
                        <Star className="w-3.5 h-3.5 text-[#C4928B] fill-[#C4928B]" />
                        <span className="text-xs font-bold text-[#2D2926]">5.0</span>
                      </div>
                      <span className="text-[10px] text-[#707C64] font-medium mt-1">
                        100% стерильно
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Selector & Upload Bar */}
              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-1 bg-white/95 p-1 rounded-xl border border-[#EAE2D5] shadow-2xs text-xs">
                  <span className="text-[11px] font-medium text-[#787169] px-1">Фото:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectPhoto('/master_photo.jpg?v=' + Date.now())}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      (!masterPhotoUrl.includes('master_photo_v1') && !masterPhotoUrl.includes('master_photo_v2') && !masterPhotoUrl.startsWith('data:'))
                        ? 'bg-[#707C64] text-white shadow-2xs'
                        : 'text-[#554E46] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    Селфи (новое)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPhoto('/master_photo_v2.jpg?v=2')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      masterPhotoUrl.includes('master_photo_v2')
                        ? 'bg-[#707C64] text-white shadow-2xs'
                        : 'text-[#554E46] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    В кабинете
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectPhoto('/master_photo_v1.jpg?v=1')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      masterPhotoUrl.includes('master_photo_v1')
                        ? 'bg-[#707C64] text-white shadow-2xs'
                        : 'text-[#554E46] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    Портрет
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {uploadSuccess && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#556349] font-medium bg-[#EAF0E7] px-2 py-1 rounded-lg animate-in fade-in duration-200">
                      <Check className="w-3 h-3 text-[#556349]" />
                      Обновлено!
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#554E46] hover:text-[#2D2926] border border-[#EAE2D5] text-xs font-medium shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                    title="Загрузить свое фото с телефона или компьютера"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#707C64]" />
                    <span>Свое фото</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Informational badges below the photo - non-overlapping, never covers face or icons */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3.5 border border-[#EBE3D7] shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF0E7] flex items-center justify-center text-[#556349] font-bold text-base shrink-0">
                    10
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2D2926]">10 лет опыта</p>
                    <p className="text-[11px] text-[#787169] mt-0.5">Косметолог и консультант</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-[#EBE3D7] shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5ECE8] flex items-center justify-center text-[#9E655C] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2D2926]">Индивидуально</p>
                    <p className="text-[11px] text-[#787169] mt-0.5">Только вы и мастер</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MASTER NAME, SURNAME & REST OF THE TEXT (ИМЯ, ФАМИЛИЯ И РЯДОМ ОСТАЛЬНАЯ НАДПИСЬ) */}
          <div className="lg:col-span-7 text-left space-y-6 order-2 lg:order-1">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] border border-[#DDD3C2] text-xs font-semibold text-[#535F47]">
              <span className="w-2 h-2 rounded-full bg-[#707C64] animate-pulse" />
              <span>Частная студия массажа • Санкт-Петербург</span>
            </div>

            {/* Main Headline with Master's Full Name */}
            <div>
              <div className="text-sm sm:text-base font-semibold text-[#707C64] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#707C64]" />
                <span>Сертифицированный мастер</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-bold text-[#2D2926] leading-[1.15] tracking-tight">
                Пазылова Жийдегул
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-serif italic text-[#707C64]">
                Профессиональный массаж и уход за лицом
              </p>
            </div>

            {/* Key Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-1">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#EBE3D7] shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#EAF0E7] flex items-center justify-center shrink-0 text-[#556349]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D2926]">10 Дипломов</h4>
                  <p className="text-[11px] text-[#787169] mt-0.5">Академия массажа и «Эколь»</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#EBE3D7] shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#F5ECE8] flex items-center justify-center shrink-0 text-[#9E655C]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D2926]">100% СанПиН</h4>
                  <p className="text-[11px] text-[#787169] mt-0.5">Сухожар, одноразовое белье</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#EBE3D7] shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#EFE8DC] flex items-center justify-center shrink-0 text-[#6B5F4A]">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D2926]">Только для вас</h4>
                  <p className="text-[11px] text-[#787169] mt-0.5">Уют, тишина и комфорт</p>
                </div>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-book-cta-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold bg-[#707C64] hover:bg-[#5A664F] text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span>Записаться к Жийдегул</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                id="hero-services-anchor-btn"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-base font-medium text-[#4A453F] bg-white border border-[#DDD3C2] hover:bg-[#F2ECE1] transition-colors"
              >
                Услуги и цены
              </a>

              <a
                href="#certificates"
                id="hero-certificates-anchor-btn"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-full text-sm font-medium text-[#707C64] hover:text-[#525E49] hover:bg-[#EFE8DD] transition-colors"
              >
                Дипломы мастера →
              </a>
            </div>

            {/* Address & Hours Mini-Bar */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-[#787169]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#707C64]" />
                СПб, Красногвардейский р-н, ул. Пейзажная, 24
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#707C64]" />
                Ежедневно: 09:00 – 21:00 (по предварительной записи)
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
