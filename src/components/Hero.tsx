import React from 'react';
import { ArrowRight, Wrench, ShieldCheck, MapPin, Clock, PhoneCall, Gauge, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { WORKSHOP_INFO } from '../data/workshopData';
import { getShopStatus } from '../utils/timeHelper';
import heroBgImage from '../assets/images/hero_light_atelier_1790589450987.jpg';

interface HeroProps {
  lang: 'en' | 'el';
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const shopStatus = getShopStatus();

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-50">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Moto Toulis Light Premium Motorcycle Atelier in Limassol"
          className="w-full h-full object-cover object-center opacity-75 filter contrast-105 scale-102 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Subtle radial and linear overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/75 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent" />
      </div>

      {/* Floating Animated Sparks / Ambient Lights */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Proposition & Actions (7 Cols) */}
          <div className="lg:col-span-7">
            {/* Live Shop Hours Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 text-xs text-slate-800 mb-6 backdrop-blur-md shadow-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  shopStatus.isOpen
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-amber-500'
                }`}
              />
              <span className="font-semibold">
                {lang === 'en' ? shopStatus.statusTextEn : shopStatus.statusTextEl}
              </span>
              {shopStatus.nextOpenEn && (
                <>
                  <span className="text-slate-300" aria-hidden="true">·</span>
                  <span className="text-slate-600">
                    {lang === 'en' ? shopStatus.nextOpenEn : shopStatus.nextOpenEl}
                  </span>
                </>
              )}
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-slate-950 leading-none mb-6 text-balance">
              {lang === 'en' ? (
                <>
                  Precision Motorcycle Mechanics <span className="text-amber-600">In Limassol</span>
                </>
              ) : (
                <>
                  Μηχανική Ακριβείας Μοτοσυκλετών <span className="text-amber-600">Στη Λεμεσό</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-8 max-w-2xl">
              {lang === 'en'
                ? 'Dedicated to high-performance superbikes, adventure tourers, custom builds, and maxi-scooters. Comprehensive diagnostic scanning, engine rebuilds, suspension servicing, and factory-spec maintenance on Omonoias Avenue.'
                : 'Εξειδίκευση σε superbikes, adventure μηχανές, custom κατασκευές και maxi-scooters. Ηλεκτρονικά διαγνωστικά, ανακατασκευές κινητήρων, ρύθμιση αναρτήσεων και συντήρηση εργοστασιακών προδιαγραφών στην Ομονοίας.'}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Book Service Appointment' : 'Κλείστε Ραντεβού Σέρβις'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors backdrop-blur-sm shadow-xs"
              >
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>{lang === 'en' ? 'Explore Recent Projects' : 'Δείτε Πρόσφατα Έργα'}</span>
              </a>
            </div>

            {/* Editorial Clean Trust Metadata (Zero-Pill discipline) */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-800 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{WORKSHOP_INFO.address}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{lang === 'en' ? 'OEM & Racing Spec Parts' : 'Γνήσια & Αγωνιστικά Ανταλλακτικά'}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{lang === 'en' ? 'Fast Same-Day Turnaround' : 'Αυθημερόν Εξυπηρέτηση'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Animated Mechanical Blueprint HUD & Live Specs (5 Cols) */}
          <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
              {/* Outer Slowly Rotating Mechanical Blueprint Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-amber-600/30 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-slate-300 animate-spin-reverse-slow pointer-events-none" />

              {/* Crosshair & Degree Markings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent absolute" />
              </div>

              {/* Central Glowing Core HUD */}
              <div className="relative z-10 w-48 h-48 rounded-full bg-white border border-slate-200 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 mb-2">
                  <Gauge className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                  {lang === 'en' ? 'Toulis Engineering' : 'Μηχανική Τούλης'}
                </div>
                <div className="text-[11px] text-slate-600 font-mono mt-0.5 font-medium">
                  100% Factory Nm Specs
                </div>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  OBD DIAGNOSTICS READY
                </div>
              </div>

              {/* Floating Animated Mechanical Tags */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-0 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-800 shadow-md"
              >
                <div className="text-[10px] text-slate-500 uppercase">Tolerance Check</div>
                <div className="text-amber-600 font-bold">±0.02 mm Shims</div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-4 right-0 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-800 shadow-md"
              >
                <div className="text-[10px] text-slate-500 uppercase">Suspension Valving</div>
                <div className="text-emerald-700 font-bold">SKF Green Seals</div>
              </motion.div>

              <motion.div
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-800 shadow-md"
              >
                <div className="text-[10px] text-slate-500 uppercase">Hydraulics</div>
                <div className="text-slate-900 font-bold">DOT 5.1 Racing</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Quick Contact & Working Hours Bar at Hero Bottom */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-200 bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 shrink-0 border border-amber-200">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                {lang === 'en' ? 'Direct Workshop Lines' : 'Τηλέφωνα Επικοινωνίας'}
              </div>
              <div className="flex flex-col mt-0.5 font-mono text-sm">
                <a
                  href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
                  className="text-slate-900 hover:text-amber-600 font-bold transition-colors"
                >
                  {WORKSHOP_INFO.phoneGreek} <span className="text-xs text-slate-500 font-normal">(EL)</span>
                </a>
                <a
                  href={`tel:${WORKSHOP_INFO.phoneEnglishRaw}`}
                  className="text-slate-700 hover:text-amber-600 transition-colors text-xs font-medium"
                >
                  {WORKSHOP_INFO.phoneEnglish} <span className="text-xs text-slate-500 font-normal">(EN)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 shrink-0 border border-amber-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                {lang === 'en' ? 'Operating Hours' : 'Ώρες Λειτουργίας'}
              </div>
              <div className="text-sm text-slate-800 mt-0.5">
                <p>Mon – Fri: <span className="font-mono text-slate-950 font-semibold">08:00 – 18:30</span></p>
                <p className="text-xs text-slate-600">Sat: <span className="font-mono text-slate-950 font-medium">08:00 – 16:00</span> · Sun: Closed</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 shrink-0 border border-amber-200">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                {lang === 'en' ? 'Workshop Location' : 'Τοποθεσία Συνεργείου'}
              </div>
              <p className="text-sm text-slate-800 font-medium mt-0.5">{WORKSHOP_INFO.address}</p>
              <a
                href={WORKSHOP_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-600 hover:underline inline-flex items-center gap-1 mt-0.5 font-bold"
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

