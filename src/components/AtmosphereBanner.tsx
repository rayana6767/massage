import React from 'react';
import { Wind, HeartHandshake, Sparkles, Shield, UserCheck, Sliders } from 'lucide-react';

export const AtmosphereBanner: React.FC = () => {
  const highlights = [
    {
      icon: Shield,
      title: 'Стерильность как в клинике',
      description: 'Все металлические инструменты проходят дезинфекцию и обработку в сухожаре при 180°C. Крафт-пакет вскрывается при вас.',
      badgeColor: 'bg-[#EAF0E7] text-[#556349]',
    },
    {
      icon: HeartHandshake,
      title: 'Одноразовые материалы',
      description: 'Индивидуальный одноразовый комплект для каждого гостя (простыни, шапочки, тапочки). Безупречная чистота и забота о вашей гигиене.',
      badgeColor: 'bg-[#F4EBE3] text-[#8C6B53]',
    },
    {
      icon: Wind,
      title: 'Чистый воздух и тишина',
      description: 'Работает ультрафиолетовый бактерицидный рециркулятор воздуха. Никаких телефонных звонков клиники и посторонних звуков.',
      badgeColor: 'bg-[#E7EFF0] text-[#486B73]',
    },
    {
      icon: UserCheck,
      title: 'Приватность и забота',
      description: 'Вы — единственный гость в студии во время сеанса. Никакой спешки, переходов из кабинета в кабинет или очередей.',
      badgeColor: 'bg-[#F5ECE8] text-[#9E655C]',
    },
    {
      icon: Sparkles,
      title: 'Ароматерапия',
      description: 'Эфирные терапевтические масла лаванды, бергамота и эвкалипта помогают мгновенно переключиться и снять тревожность.',
      badgeColor: 'bg-[#F1ECE4] text-[#6B5F4A]',
    },
    {
      icon: Sliders,
      title: 'Индивидуальный протокол',
      description: 'Глубина и интенсивность проработки подбираются индивидуально с учетом вашего мышечного тонуса, пожеланий и самочувствия.',
      badgeColor: 'bg-[#EAE4DC] text-[#5A5046]',
    },
  ];

  return (
    <section id="atmosphere" className="py-16 bg-[#F4EDE2] border-y border-[#E8DFCFA0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#707C64] uppercase tracking-widest block mb-2">
            Безопасность и комфорт
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2D2926] tracking-tight">
            Особая атмосфера домашнего кабинета
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#665D53] leading-relaxed">
            Я создала пространство, где медицинские стандарты чистоты гармонично сочетаются 
            с домашним теплом, уютом и полным отсутствием городской спешки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E5DAC8] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${item.badgeColor} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#2D2926] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#665D53] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
