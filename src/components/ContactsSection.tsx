import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

export const ContactsSection: React.FC = () => {
  const STUDIO_COORDS = { lat: 59.998246, lng: 30.468453 };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBibSijTQnLA6EI8zigQaxPQDd_V0Z8nP4';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=59.998246,30.468453';
  const yandexMapsUrl = 'https://yandex.ru/maps/?text=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9F%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F%2C%2024';
  const twoGisUrl = 'https://2gis.ru/spb/search/%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9F%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F%2C%2024';

  return (
    <section id="map" className="py-20 bg-[#F5EFEB] border-t border-[#EAE0D3]">
      <div id="contacts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8E1D5] text-xs font-semibold text-[#535F47] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#707C64]" />
            <span>Локация на Google Картах</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2D2926] tracking-tight">
            Кабинет мастера на карте
          </h2>
          <p className="mt-2 text-base text-[#61584F]">
            Санкт-Петербург, ул. Пейзажная, д. 24 (Красногвардейский район)
          </p>
        </div>

        {/* Google Maps Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E8DFCFA0] shadow-xs">
            {/* Map Header bar */}
            <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#EAE2D5] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
                <span className="text-xs font-bold text-[#2D2926]">
                  Google Карты
                </span>
                <span className="text-xs text-[#787169]">
                  • ул. Пейзажная, 24
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2D2926] text-white text-xs font-medium hover:bg-[#4A453F] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Маршрут в Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={yandexMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D5CBBF] text-[#4A453F] text-xs font-medium hover:bg-[#EFE8DE] transition-colors"
                >
                  <span>Яндекс Карты</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={twoGisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D5CBBF] text-[#4A453F] text-xs font-medium hover:bg-[#EFE8DE] transition-colors"
                >
                  <span>2ГИС</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="relative w-full h-[460px] sm:h-[500px] bg-[#EFE8DE]">
              <APIProvider apiKey={googleMapsApiKey}>
                <Map
                  defaultCenter={STUDIO_COORDS}
                  defaultZoom={16}
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                  gestureHandling="cooperative"
                >
                  <AdvancedMarker
                    position={STUDIO_COORDS}
                    title="Кабинет массажа Пазыловой Жийдегул — ул. Пейзажная, 24"
                  >
                    <Pin
                      background="#707C64"
                      borderColor="#3D4537"
                      glyphColor="#FFFFFF"
                      scale={1.2}
                    />
                  </AdvancedMarker>
                </Map>
              </APIProvider>

              {/* Floating marker overlay badge for quick reference */}
              <div className="absolute top-4 left-4 max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-md border border-[#EAE2D5] pointer-events-auto z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#707C64]" />
                  <span className="text-xs font-bold text-[#2D2926]">
                    Студия Пазыловой Жийдегул
                  </span>
                </div>
                <p className="text-[11px] text-[#554E46] leading-tight font-medium">
                  Санкт-Петербург, ул. Пейзажная, 24
                </p>
                <p className="text-[10px] text-[#787169] mt-1">
                  Отдельный оборудованный домашний кабинет
                </p>
              </div>
            </div>

            {/* Map Footer Bar */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#EAE2D5] flex flex-wrap items-center justify-between text-xs text-[#787169]">
              <span>Координаты: 59.9982° N, 30.4685° E</span>
              <span className="text-[#556349] font-medium">Бесплатная парковка вокруг дома</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
