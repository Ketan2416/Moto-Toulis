import React from 'react';
import { ArrowRight, Wrench, ShieldCheck, MapPin, Clock, PhoneCall } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/workshopData';
import { getShopStatus } from '../utils/timeHelper';

interface HeroProps {
  lang: 'en' | 'el';
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const shopStatus = getShopStatus();

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-neutral-950">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_motorcycle_workshop_1790583579120.jpg"
          alt="Moto Toulis Motorcycle Workshop in Limassol"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-75 contrast-110"
          referrerPolicy="no-referrer"
        />
        {/* Subtle radial and linear overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Live Shop Hours Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 mb-6 backdrop-blur-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                shopStatus.isOpen
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-amber-500'
              }`}
            />
            <span className="font-medium">
              {lang === 'en' ? shopStatus.statusTextEn : shopStatus.statusTextEl}
            </span>
            {shopStatus.nextOpenEn && (
              <>
                <span className="text-neutral-600" aria-hidden="true">·</span>
                <span className="text-neutral-400">
                  {lang === 'en' ? shopStatus.nextOpenEn : shopStatus.nextOpenEl}
                </span>
              </>
            )}
          </div>

          {/* Headline with text-wrap: balance */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-white leading-none mb-6 text-balance">
            {lang === 'en' ? (
              <>
                Precision Motorcycle Mechanics <span className="text-amber-500">In Limassol</span>
              </>
            ) : (
              <>
                Μηχανική Ακριβείας Μοτοσυκλετών <span className="text-amber-500">Στη Λεμεσό</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            {lang === 'en'
              ? 'Dedicated to high-performance superbikes, adventure tourers, custom builds, and maxi-scooters. Comprehensive diagnostic scanning, engine rebuilds, suspension servicing, and factory-spec maintenance on Omonoias Avenue.'
              : 'Εξειδίκευση σε superbikes, adventure μηχανές, custom κατασκευές και maxi-scooters. Ηλεκτρονικά διαγνωστικά, ανακατασκευές κινητήρων, ρύθμιση αναρτήσεων και συντήρηση εργοστασιακών προδιαγραφών στην Ομονοίας.'}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Book Service Appointment' : 'Κλείστε Ραντεβού Σέρβις'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors backdrop-blur-sm"
            >
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>{lang === 'en' ? 'Explore Recent Projects' : 'Δείτε Πρόσφατα Έργα'}</span>
            </a>
          </div>

          {/* Editorial Clean Trust Metadata (Zero-Pill discipline) */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{WORKSHOP_INFO.address}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{lang === 'en' ? 'OEM & Racing Spec Parts' : 'Γνήσια & Αγωνιστικά Ανταλλακτικά'}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{lang === 'en' ? 'Fast Same-Day Turnaround' : 'Αυθημερόν Εξυπηρέτηση'}</span>
            </span>
          </div>
        </div>

        {/* Quick Contact & Working Hours Bar at Hero Bottom */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-amber-500 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                {lang === 'en' ? 'Direct Workshop Lines' : 'Τηλέφωνα Επικοινωνίας'}
              </div>
              <div className="flex flex-col mt-0.5 font-mono text-sm">
                <a
                  href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
                  className="text-neutral-100 hover:text-amber-400 transition-colors"
                >
                  {WORKSHOP_INFO.phoneGreek} <span className="text-xs text-neutral-500">(EL)</span>
                </a>
                <a
                  href={`tel:${WORKSHOP_INFO.phoneEnglishRaw}`}
                  className="text-neutral-300 hover:text-amber-400 transition-colors text-xs"
                >
                  {WORKSHOP_INFO.phoneEnglish} <span className="text-xs text-neutral-500">(EN)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-amber-500 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                {lang === 'en' ? 'Operating Hours' : 'Ώρες Λειτουργίας'}
              </div>
              <div className="text-sm text-neutral-200 mt-0.5">
                <p>Mon – Fri: <span className="font-mono text-neutral-300">08:00 – 18:30</span></p>
                <p className="text-xs text-neutral-400">Sat: <span className="font-mono text-neutral-300">08:00 – 16:00</span> · Sun: Closed</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-amber-500 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                {lang === 'en' ? 'Workshop Location' : 'Τοποθεσία Συνεργείου'}
              </div>
              <p className="text-sm text-neutral-200 mt-0.5">{WORKSHOP_INFO.address}</p>
              <a
                href={WORKSHOP_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1 mt-0.5 font-medium"
              >
                <span>{lang === 'en' ? 'Open in Google Maps' : 'Άνοιγμα στους Χάρτες'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
