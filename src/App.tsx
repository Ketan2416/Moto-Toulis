/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AnimatedMechanicalShowcase } from './components/AnimatedMechanicalShowcase';
import { ProjectsGallery } from './components/ProjectsGallery';
import { CostEstimator } from './components/CostEstimator';
import { WorkshopSpecs } from './components/WorkshopSpecs';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { MessageSquare, Bot } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'en' | 'el'>('en');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingBikeModel, setBookingBikeModel] = useState<string | undefined>(undefined);
  const [bookingEstimates, setBookingEstimates] = useState<{
    bikeType: string;
    services: string[];
    estimatedTotal: string;
  } | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string, bikeModel?: string) => {
    setBookingServiceId(serviceId);
    setBookingBikeModel(bikeModel);
    setBookingEstimates(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithEstimates = (estimates: {
    bikeType: string;
    services: string[];
    estimatedTotal: string;
  }) => {
    setBookingServiceId(undefined);
    setBookingBikeModel(estimates.bikeType);
    setBookingEstimates(estimates);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Navigation Bar adhering to 3-zone contract */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero with workshop status and high-fidelity visual */}
        <Hero
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 2. Comprehensive Motorcycle Repair & Service Catalog */}
        <ServicesSection
          lang={lang}
          onBookService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* 3. Interactive Animated Mechanical Assemblies & Motorcycle Blueprint */}
        <AnimatedMechanicalShowcase
          lang={lang}
          onBookService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* 4. Recent Projects Gallery with Before/After Diagnostics & Specs */}
        <ProjectsGallery
          lang={lang}
          onBookServiceForBike={(bike) => handleOpenBooking(undefined, bike)}
        />

        {/* 5. Interactive Transparent Cost Estimator */}
        <CostEstimator
          lang={lang}
          onBookWithEstimates={handleOpenBookingWithEstimates}
        />

        {/* 6. Tooling, Diagnostics & Hygiene Standards */}
        <WorkshopSpecs
          lang={lang}
        />

        {/* 7. Rider Proof, Testimonials & FAQs */}
        <ReviewsSection
          lang={lang}
        />

        {/* 8. Location, Live Open/Closed Status, Interactive Map & Direct Call Lines */}
        <LocationHours
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Floating AI Mechanical Advisor Trigger */}
      <button
        type="button"
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-full shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 cursor-pointer font-bold text-xs uppercase tracking-wider"
        aria-label="Open Gemini Diagnostic Assistant"
      >
        <Bot className="w-4 h-4" />
        <span>{lang === 'en' ? 'Ask AI Mechanic' : 'Μηχανικός AI'}</span>
        <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
      </button>

      {/* Clean quiet footer */}
      <Footer lang={lang} />

      {/* Interactive Booking & Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        initialServiceId={bookingServiceId}
        initialBikeModel={bookingBikeModel}
        initialEstimates={bookingEstimates}
      />

      {/* Multi-turn Gemini AI Chatbot */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
        lang={lang}
      />
    </div>
  );
}
