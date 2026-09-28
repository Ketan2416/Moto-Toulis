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
    <section id="contact" className="py-24 bg-neutral-900/40 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
            {lang === 'en' ? 'Workshop Facility' : 'Εγκαταστάσεις & Ωράριο'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
            {lang === 'en' ? 'Location & Operating Hours' : 'Τοποθεσία & Ώρες Λειτουργίας'}
          </h2>
          <p className="text-base text-neutral-400">
            {lang === 'en'
              ? 'Conveniently situated on Omonoias Avenue in Limassol with ample bike parking and easy access from the highway.'
              : 'Σε κεντρικό σημείο στη λεωφόρο Ομονοίας στη Λεμεσό, με εύκολη πρόσβαση από τον αυτοκινητόδρομο και άνετο χώρο στάθμευσης.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details & Schedule (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800">
            <div>
              {/* Live Status indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 mb-6">
                <span
                  className={`w-2 h-2 rounded-full ${
                    shopStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
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

              {/* Address card */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-neutral-900 rounded-lg text-amber-500 shrink-0 border border-neutral-800">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      {lang === 'en' ? 'Street Address' : 'Διεύθυνση Συνεργείου'}
                    </h3>
                    <div className="text-base font-semibold text-white mt-0.5">
                      {WORKSHOP_INFO.address}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {lang === 'en'
                        ? 'Omonoias Avenue near New Port intersection, Limassol'
                        : 'Λεωφόρος Ομονοίας πλησίον Νέου Λιμανιού, Λεμεσός'}
                    </div>
                  </div>
                </div>

                {/* Direct Phone Lines */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-neutral-900 rounded-lg text-amber-500 shrink-0 border border-neutral-800">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      {lang === 'en' ? 'Direct Telephone Contacts' : 'Τηλεφωνικές Γραμμές'}
                    </h3>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
                          className="font-mono text-sm font-semibold text-neutral-200 hover:text-amber-400 transition-colors"
                        >
                          {WORKSHOP_INFO.phoneGreek}
                        </a>
                        <span className="text-[11px] text-neutral-400">
                          {lang === 'en' ? '(Greek Speaking / Ελληνικά)' : '(Ελληνικά)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${WORKSHOP_INFO.phoneEnglishRaw}`}
                          className="font-mono text-sm text-neutral-300 hover:text-amber-400 transition-colors"
                        >
                          {WORKSHOP_INFO.phoneEnglish}
                        </a>
                        <span className="text-[11px] text-neutral-400">
                          {lang === 'en' ? '(English Speaking)' : '(English)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours Table */}
              <div className="border-t border-neutral-800/80 pt-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 tracking-wider mb-3">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'en' ? 'Workshop Operating Hours' : 'Εβδομαδιαίο Πρόγραμμα'}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-300">
                      {lang === 'en' ? 'Monday – Friday' : 'Δευτέρα – Παρασκευή'}
                    </span>
                    <span className="font-mono text-white font-medium">08:00 – 18:30</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-300">
                      {lang === 'en' ? 'Saturday' : 'Σάββατο'}
                    </span>
                    <span className="font-mono text-white font-medium">08:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">
                      {lang === 'en' ? 'Sunday' : 'Κυριακή'}
                    </span>
                    <span className="font-mono text-amber-500/80 font-medium">
                      {lang === 'en' ? 'Closed' : 'Κλειστά'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'en' ? 'Book Appointment' : 'Κλείστε Ραντεβού'}</span>
              </button>

              <a
                href={WORKSHOP_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-500" />
                <span>{lang === 'en' ? 'Directions' : 'Οδηγίες'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual & Direct Links (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden">
            {/* Visual map preview / embed container */}
            <div className="relative h-80 sm:h-96 w-full bg-neutral-900 overflow-hidden">
              <iframe
                title="Moto Toulis Location Map"
                src={`https://maps.google.com/maps?q=${WORKSHOP_INFO.lat},${WORKSHOP_INFO.lng}&z=16&output=embed`}
                className="w-full h-full border-0 filter invert contrast-110 hue-rotate-180 opacity-85"
                loading="lazy"
                aria-label="Google Maps preview of Moto Toulis"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-neutral-950/95 backdrop-blur-md p-4 rounded-xl border border-neutral-800 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-display font-bold uppercase text-white text-sm">Moto Toulis</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Limassol, CY
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-mono">
                  34.66775° N, 33.01352° E
                </p>
                <a
                  href={WORKSHOP_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
                >
                  <span>{lang === 'en' ? 'Open in Google Maps App' : 'Άνοιγμα στην εφαρμογή Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Transit Notes */}
            <div className="p-6 bg-neutral-900/60 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div>
                <h4 className="font-semibold text-white mb-1 uppercase text-[11px] tracking-wider text-amber-500">
                  {lang === 'en' ? 'From A1 Highway / Port' : 'Από τον Αυτοκινητόδρομο Α1 / Λιμάνι'}
                </h4>
                <p className="text-neutral-400 leading-relaxed">
                  {lang === 'en'
                    ? 'Take the Omonoias exit heading South towards the port. Workshop is located on the right side with dedicated bike bays.'
                    : 'Πάρτε την έξοδο Ομονοίας προς νότια κατεύθυνση. Το συνεργείο βρίσκεται στα δεξιά με άνετη πρόσβαση.'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1 uppercase text-[11px] tracking-wider text-amber-500">
                  {lang === 'en' ? 'Breakdowns & Recovery' : 'Οδική Βοήθεια & Μεταφορά'}
                </h4>
                <p className="text-neutral-400 leading-relaxed">
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
