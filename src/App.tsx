import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AtmosphereBanner } from './components/AtmosphereBanner';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection } from './components/BookingSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { QuickContactFloating } from './components/QuickContactFloating';

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const bookingElem = document.getElementById('booking');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLightbox = (imageUrl: string, title: string, description?: string) => {
    setLightboxData({
      isOpen: true,
      imageUrl,
      title,
      description,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#3D3833] font-sans antialiased selection:bg-[#E2D5C3] selection:text-[#2B2723]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Navigation */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 2. Atmosphere & Safety at Home */}
        <AtmosphereBanner />

        {/* 3. Services & Pricing Section */}
        <ServicesSection
          onSelectServiceForBooking={handleOpenBooking}
          onOpenPhotoLightbox={handleOpenLightbox}
        />

        {/* 4. Online Booking Section */}
        <BookingSection selectedServiceId={selectedServiceId} />

        {/* 5. Google Maps Location Section */}
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Messenger Speed Dial */}
      <QuickContactFloating onOpenBooking={() => handleOpenBooking()} />

      {/* Fullscreen Lightbox Modal for Photos */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        onClose={handleCloseLightbox}
        imageUrl={lightboxData.imageUrl}
        title={lightboxData.title}
        description={lightboxData.description}
      />
    </div>
  );
}
