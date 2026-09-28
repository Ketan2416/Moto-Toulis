import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/workshopData';
import { getShopStatus } from '../utils/timeHelper';

interface LocationHoursProps {
  lang: 'en' | 'el';
  onOpenBooking: () => void;
}

export const LocationHours: React.FC<LocationHoursProps> = ({ lang, onOpenBooking }) => {
  const shopStatus = getShopStatus();

  return (
    <section id="contact" className="py-24 bg-slate-50/80 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-2 font-bold">
            {lang === 'en' ? 'Workshop Facility' : 'Εγκαταστάσεις & Ωράριο'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-slate-950 mb-3">
            {lang === 'en' ? 'Location & Operating Hours' : 'Τοποθεσία & Ώρες Λειτουργίας'}
          </h2>
          <p className="text-base text-slate-600">
            {lang === 'en'
              ? 'Conveniently situated on Omonoias Avenue in Limassol with ample bike parking and easy access from the highway.'
              : 'Σε κεντρικό σημείο στη λεωφόρο Ομονοίας στη Λεμεσό, με εύκολη πρόσβαση από τον αυτοκινητόδρομο και άνετο χώρο στάθμευσης.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details & Schedule (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
            <div>
              {/* Live Status indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-800 mb-6 font-semibold">
                <span
                  className={`w-2 h-2 rounded-full ${
                    shopStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span>
                  {lang === 'en' ? shopStatus.statusTextEn : shopStatus.statusTextEl}
                </span>
                {shopStatus.nextOpenEn && (
                  <>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-600 font-normal">
                      {lang === 'en' ? shopStatus.nextOpenEn : shopStatus.nextOpenEl}
                    </span>
                  </>
                )}
              </div>

              {/* Address card */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 shrink-0 border border-amber-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-500 tracking-wider font-bold">
                      {lang === 'en' ? 'Street Address' : 'Διεύθυνση Συνεργείου'}
                    </h3>
                    <div className="text-base font-bold text-slate-950 mt-0.5">
                      {WORKSHOP_INFO.address}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {lang === 'en'
                        ? 'Omonoias Avenue near New Port intersection, Limassol'
                        : 'Λεωφόρος Ομονοίας πλησίον Νέου Λιμανιού, Λεμεσός'}
                    </div>
                  </div>
                </div>

                {/* Direct Phone Lines */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 shrink-0 border border-amber-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-500 tracking-wider font-bold">
                      {lang === 'en' ? 'Direct Telephone Contacts' : 'Τηλεφωνικές Γραμμές'}
                    </h3>
                    <div className="space-y-1.5 mt-1">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
                          className="font-mono text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
                        >
                          {WORKSHOP_INFO.phoneGreek}
                        </a>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {lang === 'en' ? '(Greek Speaking / Ελληνικά)' : '(Ελληνικά)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${WORKSHOP_INFO.phoneEnglishRaw}`}
                          className="font-mono text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors"
                        >
                          {WORKSHOP_INFO.phoneEnglish}
                        </a>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {lang === 'en' ? '(English Speaking)' : '(English)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours Table */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-700 tracking-wider mb-3 font-bold">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'en' ? 'Workshop Operating Hours' : 'Εβδομαδιαίο Πρόγραμμα'}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-700 font-medium">
                      {lang === 'en' ? 'Monday – Friday' : 'Δευτέρα – Παρασκευή'}
                    </span>
                    <span className="font-mono text-slate-950 font-bold">08:00 – 18:30</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-700 font-medium">
                      {lang === 'en' ? 'Saturday' : 'Σάββατο'}
                    </span>
                    <span className="font-mono text-slate-950 font-bold">08:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">
                      {lang === 'en' ? 'Sunday' : 'Κυριακή'}
                    </span>
                    <span className="font-mono text-amber-600 font-bold">
                      {lang === 'en' ? 'Closed' : 'Κλειστά'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'en' ? 'Book Appointment' : 'Κλείστε Ραντεβού'}</span>
              </button>

              <a
                href={WORKSHOP_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-600" />
                <span>{lang === 'en' ? 'Directions' : 'Οδηγίες'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual & Direct Links (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
            {/* Visual map preview / embed container */}
            <div className="relative h-80 sm:h-96 w-full bg-slate-100 overflow-hidden">
              <iframe
                title="Moto Toulis Location Map"
                src={`https://maps.google.com/maps?q=${WORKSHOP_INFO.lat},${WORKSHOP_INFO.lng}&z=16&output=embed`}
                className="w-full h-full border-0 contrast-105 opacity-95"
                loading="lazy"
                aria-label="Google Maps preview of Moto Toulis"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl text-slate-900">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-display font-extrabold uppercase text-slate-950 text-sm">Moto Toulis</span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                    Limassol, CY
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono">
                  34.66775° N, 33.01352° E
                </p>
                <a
                  href={WORKSHOP_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:underline"
                >
                  <span>{lang === 'en' ? 'Open in Google Maps App' : 'Άνοιγμα στην εφαρμογή Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Transit Notes */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-950 mb-1 uppercase text-[11px] tracking-wider text-amber-600">
                  {lang === 'en' ? 'From A1 Highway / Port' : 'Από τον Αυτοκινητόδρομο Α1 / Λιμάνι'}
                </h4>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {lang === 'en'
                    ? 'Take the Omonoias exit heading South towards the port. Workshop is located on the right side with dedicated bike bays.'
                    : 'Πάρτε την έξοδο Ομονοίας προς νότια κατεύθυνση. Το συνεργείο βρίσκεται στα δεξιά με άνετη πρόσβαση.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-950 mb-1 uppercase text-[11px] tracking-wider text-amber-600">
                  {lang === 'en' ? 'Breakdowns & Recovery' : 'Οδική Βοήθεια & Μεταφορά'}
                </h4>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {lang === 'en'
                    ? 'Broken down in Limassol? Call us directly and we can recommend local motorcycle recovery transport to our workshop.'
                    : 'Έμεινε η μηχανή σας; Καλέστε μας απευθείας για να σας κατευθύνουμε για άμεση ρυμούλκηση στο συνεργείο.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
