/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { CostEstimator } from './components/CostEstimator';
import { WorkshopSpecs } from './components/WorkshopSpecs';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [lang, setLang] = useState<'en' | 'el'>('en');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
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

        {/* 3. Recent Projects Gallery with Before/After Diagnostics & Specs */}
        <ProjectsGallery
          lang={lang}
          onBookServiceForBike={(bike) => handleOpenBooking(undefined, bike)}
        />

        {/* 4. Interactive Transparent Cost Estimator */}
        <CostEstimator
          lang={lang}
          onBookWithEstimates={handleOpenBookingWithEstimates}
        />

        {/* 5. Tooling, Diagnostics & Hygiene Standards */}
        <WorkshopSpecs
          lang={lang}
        />

        {/* 6. Rider Proof, Testimonials & FAQs */}
        <ReviewsSection
          lang={lang}
        />

        {/* 7. Location, Live Open/Closed Status, Interactive Map & Direct Call Lines */}
        <LocationHours
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

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
    </div>
  );
}
