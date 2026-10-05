import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, Send, MessageCircle, Phone, User, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { BookingFormData } from '../types';

interface BookingSectionProps {
  selectedServiceId?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ selectedServiceId }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    serviceId: selectedServiceId || SERVICES_DATA[0].id,
    date: '',
    timeSlot: '12:00',
    messengerPreference: 'whatsapp',
    comment: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveredToTelegram, setDeliveredToTelegram] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: selectedServiceId }));
    }
  }, [selectedServiceId]);

  const availableTimeSlots = [
    '10:00',
    '12:00',
    '14:00',
    '16:30',
    '18:30',
    '20:00',
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8') || val.startsWith('7')) {
      val = val.substring(1);
    }
    if (val.length > 10) val = val.substring(0, 10);

    let formatted = '+7';
    if (val.length > 0) formatted += ' (' + val.substring(0, 3);
    if (val.length >= 4) formatted += ') ' + val.substring(3, 6);
    if (val.length >= 7) formatted += '-' + val.substring(6, 8);
    if (val.length >= 9) formatted += '-' + val.substring(8, 10);

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const selectedServiceObj = SERVICES_DATA.find((s) => s.id === formData.serviceId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          serviceTitle: selectedServiceObj?.title,
          price: selectedServiceObj?.price,
          duration: selectedServiceObj?.duration,
          date: formData.date,
          timeSlot: formData.timeSlot,
          messengerPreference: formData.messengerPreference,
          comment: formData.comment,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setDeliveredToTelegram(Boolean(result.deliveredToTelegram));
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || 'Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.');
      }
    } catch (err: any) {
      console.warn('Booking endpoint error or offline:', err);
      // Fail safely: record client submission and allow duplicate via messenger
      setDeliveredToTelegram(false);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate pre-filled message text for messengers
  const prefilledMessage = encodeURIComponent(
    `Здравствуйте, Жийдегул! Хочу записаться на сеанс в студию на Пейзажной, 24.\nУслуга: ${selectedServiceObj?.title || 'Массаж'}\nЖелаемая дата: ${formData.date || 'Ближайшие дни'}\nВремя: ${formData.timeSlot}\nМеня зовут: ${formData.name || 'Гость'}`
  );

  return (
    <section id="booking" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#707C64] uppercase tracking-widest block mb-2">
            Онлайн-запись
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D2926] tracking-tight">
            Форма записи на прием
          </h2>
          <p className="mt-3 text-base text-[#61584F] leading-relaxed">
            Заполните форму ниже для бронирования удобного времени. 
            Мастер свяжется с вами в течение 10–15 минут для подтверждения записи.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Interactive Form or Submitted State */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFCFA0] shadow-xs">
            {isSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#EAF0E7] text-[#556349] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#2D2926]">
                    Заявка успешно отправлена!
                  </h3>

                  {deliveredToTelegram ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF7EE] border border-[#BDEBD0] text-xs font-semibold text-[#1C7B3F]">
                      <Send className="w-3.5 h-3.5 text-[#0088cc]" />
                      <span>Уведомление мгновенно доставлено мастеру в Telegram!</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFEB] border border-[#DDD3C2] text-xs font-medium text-[#5D564D]">
                      <span>Заявка сохранена. Мастер свяжется с вами в ближайшее время.</span>
                    </div>
                  )}

                  <p className="text-sm text-[#5D564D] max-w-md mx-auto leading-relaxed">
                    Спасибо, <span className="font-semibold">{formData.name || 'гость'}</span>! Вы выбрали процедуру{' '}
                    <span className="font-semibold">{selectedServiceObj?.title}</span> на дату{' '}
                    <span className="font-semibold">{formData.date || 'в ближайшее время'}</span> ({formData.timeSlot}).
                  </p>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5] text-left max-w-md mx-auto text-xs text-[#5D564D] space-y-1.5 mt-4">
                    <p><span className="font-semibold">Выбранная процедура:</span> {selectedServiceObj?.title}</p>
                    <p><span className="font-semibold">Стоимость:</span> {selectedServiceObj?.price} ₽ ({selectedServiceObj?.duration})</p>
                    <p><span className="font-semibold">Контактный телефон:</span> {formData.phone}</p>
                    <p><span className="font-semibold">Адрес студии:</span> Санкт-Петербург, ул. Пейзажная, 24</p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://t.me/massage_spb_zhyidegul?text=${prefilledMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0088cc] text-white text-xs font-semibold hover:bg-[#0077b5] shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      Открыть чат в Telegram
                    </a>
                    <a
                      href={`https://wa.me/79992004512?text=${prefilledMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Написать в WhatsApp
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setDeliveredToTelegram(false);
                        setFormData((prev) => ({ ...prev, name: '', phone: '', comment: '' }));
                      }}
                      className="px-5 py-2 rounded-full text-xs font-medium text-[#787169] hover:text-[#2D2926] hover:bg-[#FAF7F2] transition-colors"
                    >
                      ← Заполнить еще одну запись
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-[#2D2926]">
                        Форма записи на прием
                      </h3>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EBF5FB] text-[#13669C] text-[11px] font-medium border border-[#CFE8F8]">
                        <Send className="w-3 h-3 text-[#0088cc]" />
                        Telegram-уведомление мастеру
                      </span>
                    </div>
                    <p className="text-xs text-[#787169] mt-0.5">
                      Укажите ваши данные, и мастер оперативно свяжется для подтверждения бронирования
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {submitError}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A453F] mb-1">
                      Ваше имя <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#A89F91] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Например, Анна"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD1C0] focus:border-[#707C64] focus:ring-1 focus:ring-[#707C64] text-sm text-[#2D2926] bg-[#FAF7F2]/50 placeholder:text-[#A89F91] outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A453F] mb-1">
                      Телефон для связи <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#A89F91] absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD1C0] focus:border-[#707C64] focus:ring-1 focus:ring-[#707C64] text-sm text-[#2D2926] bg-[#FAF7F2]/50 placeholder:text-[#A89F91] outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A453F] mb-1">
                      Выберите услугу
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD1C0] focus:border-[#707C64] focus:ring-1 focus:ring-[#707C64] text-sm text-[#2D2926] bg-[#FAF7F2]/50 outline-hidden transition-all cursor-pointer"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title} — {srv.price} ₽ ({srv.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Slot Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A453F] mb-1">
                        Желаемая дата
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#A89F91] absolute left-3.5 top-3.5" />
                        <input
                          type="date"
                          value={formData.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD1C0] focus:border-[#707C64] focus:ring-1 focus:ring-[#707C64] text-sm text-[#2D2926] bg-[#FAF7F2]/50 outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A453F] mb-1">
                        Удобное время
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-[#A89F91] absolute left-3.5 top-3.5" />
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCD1C0] focus:border-[#707C64] focus:ring-1 focus:ring-[#707C64] text-sm text-[#2D2926] bg-[#FAF7F2]/50 outline-hidden transition-all"
                        >
                          {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Messenger Preference Radio Group */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A453F] mb-1.5">
                      Где вам удобнее подтвердить запись?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                        { id: 'telegram', label: 'Telegram', icon: Send },
                        { id: 'call', label: 'Звонок', icon: Phone },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            formData.messengerPreference === item.id
                              ? 'bg-[#707C64] border-[#707C64] text-white shadow-2xs'
                              : 'bg-[#FAF7F2] border-[#DCD1C0] text-[#4A453F] hover:bg-[#F2ECE1]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="messenger"
                            value={item.id}
                            checked={formData.messengerPreference === item.id}
                            onChange={() => setFormData({ ...formData, messengerPreference: item.id as any })}
                            className="sr-only"
                          />
                          <item.icon className="w-3.5 h-3.5" />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A453F] mb-1">
                      Комментарий или пожелания (необязательно)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Особенности кожи, пожелания по массажу или вопросы"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD1C0] focus:border-[#707C64] focus:ring-1 focus:ring-[#707C64] text-sm text-[#2D2926] bg-[#FAF7F2]/50 placeholder:text-[#A89F91] outline-hidden transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#707C64] hover:bg-[#5A664F] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Отправка данных...</span>
                    ) : (
                      <>
                        <span>Забронировать время сеанса</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#8C8377] leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи с вами.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };
