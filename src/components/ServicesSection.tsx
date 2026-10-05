import React, { useState } from 'react';
import { Clock, Tag, Check, Sparkles, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenPhotoLightbox: (imageUrl: string, title: string, caption?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenPhotoLightbox,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'body' | 'face'>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilter === 'all') return true;
    return service.category === activeFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#707C64] uppercase tracking-widest block mb-2">
            Прайс-лист и протоколы
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D2926] tracking-tight">
            Услуги и цены
          </h2>
          <p className="mt-3 text-base text-[#61584F] leading-relaxed">
            Все процедуры проводятся на сертифицированной профессиональной косметике с соблюдением
            санитарных норм. Выберите подходящую процедуру для расслабления и сияния.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              id="filter-all-btn"
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#707C64] text-white shadow-xs'
                  : 'bg-[#EFE8DE] text-[#4A453F] hover:bg-[#E3D8C8]'
              }`}
            >
              Все услуги ({SERVICES_DATA.length})
            </button>
            <button
              id="filter-body-btn"
              onClick={() => setActiveFilter('body')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'body'
                  ? 'bg-[#707C64] text-white shadow-xs'
                  : 'bg-[#EFE8DE] text-[#4A453F] hover:bg-[#E3D8C8]'
              }`}
            >
              Массаж тела (1)
            </button>
            <button
              id="filter-face-btn"
              onClick={() => setActiveFilter('face')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'face'
                  ? 'bg-[#707C64] text-white shadow-xs'
                  : 'bg-[#EFE8DE] text-[#4A453F] hover:bg-[#E3D8C8]'
              }`}
            >
              Уход за лицом (3)
            </button>
          </div>
        </div>

        {/* Services List Grid */}
        <div className="space-y-12">
          {filteredServices.map((service: ServiceItem) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EBE3D7] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Service Core Info */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0E7] text-[#556349] border border-[#D5E1CE]">
                        {service.categoryLabel}
                      </span>
                      {service.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5ECE8] text-[#9E655C] border border-[#ECD3CC] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-semibold text-[#2D2926] tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-base text-[#5D564D] leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Price & Duration Badge Banner */}
                    <div className="inline-flex flex-wrap items-center gap-4 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D5]">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#707C64]" />
                        <span className="text-xl font-bold text-[#2D2926]">
                          {service.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="h-4 w-px bg-[#D5CBBF] hidden sm:block" />
                      <div className="flex items-center gap-1.5 text-sm text-[#5D564D]">
                        <Clock className="w-4 h-4 text-[#707C64]" />
                        <span>{service.duration}</span>
                      </div>
                      {service.recommendedCourse && (
                        <>
                          <div className="h-4 w-px bg-[#D5CBBF] hidden md:block" />
                          <span className="text-xs text-[#787169]">
                            {service.recommendedCourse}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Key Results / Benefits */}
                    <div>
                      <h4 className="text-xs font-semibold text-[#707C64] uppercase tracking-wider mb-2.5">
                        Результаты процедуры:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#423C36]">
                            <div className="w-4 h-4 rounded-full bg-[#EAF0E7] flex items-center justify-center shrink-0 mt-0.5 text-[#556349]">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Collapsible Protocol Details */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-[#EFE8DE] space-y-3 animate-in fade-in duration-200">
                        <h4 className="text-xs font-semibold text-[#707C64] uppercase tracking-wider">
                          Пошаговый протокол сеанса:
                        </h4>
                        <ol className="space-y-2 text-xs sm:text-sm text-[#554E46]">
                          {service.protocolSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-[#EFE8DE] text-[#2D2926] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                        <p className="text-xs text-[#787169] italic pt-1">
                          {service.fullDesc}
                        </p>
                      </div>
                    )}

                    {/* Buttons: Details & Booking */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        id={`book-service-${service.id}`}
                        onClick={() => onSelectServiceForBooking(service.id)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#707C64] hover:bg-[#5A664F] text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Записаться на сеанс</span>
                      </button>

                      <button
                        onClick={() => toggleExpand(service.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-medium text-[#5D564D] hover:text-[#2D2926] hover:bg-[#FAF7F2] transition-colors"
                      >
                        <span>{isExpanded ? 'Скрыть протокол' : 'Подробнее о процедуре'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Safety & Sanitary Standards */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2D2926] uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#707C64]" />
                        <span>Включено в процедуру:</span>
                      </div>
                      <p className="text-xs text-[#665D53] leading-relaxed">
                        Индивидуальный комплект одноразового белья (простынь, шапочка), стерильные салфетки и премиальный финишный уход.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F5EFEB] border border-[#E4DACD] space-y-2">
                      <span className="text-xs font-bold text-[#2D2926] block">
                        Медицинские стандарты чистоты:
                      </span>
                      <p className="text-xs text-[#665D53] leading-relaxed">
                        Дезинфекция и стерилизация инструментов в сухожаровом шкафу при 180°C. Крафт-пакет вскрывается при клиенте.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
