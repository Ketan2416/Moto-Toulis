import React from 'react';
import { ArrowUp, MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/workshopData';

interface FooterProps {
  lang: 'en' | 'el';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Col 1: Wordmark & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="text-2xl font-display font-extrabold tracking-wider text-white hover:text-amber-500 transition-colors uppercase inline-block"
            >
              Moto Toulis
            </a>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'Independent specialized motorcycle mechanic and custom performance workshop in Limassol, Cyprus. Diagnostics, engine overhauls, suspension rebuilding, and factory-spec maintenance.'
                : 'Ανεξάρτητο εξειδικευμένο συνεργείο μοτοσυκλετών και μηχανολογικών επισκευών στη Λεμεσό. Διαγνωστικά, ανακατασκευές κινητήρων, ρύθμιση αναρτήσεων και τακτική συντήρηση.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={WORKSHOP_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors inline-flex items-center gap-2 text-xs"
                aria-label="Visit Facebook Page"
              >
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>facebook.com/mototoulis</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              {lang === 'en' ? 'Quick Links' : 'Γρήγορη Πλοήγηση'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  {lang === 'en' ? 'Workshop Services' : 'Υπηρεσίες Συνεργείου'}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">
                  {lang === 'en' ? 'Recent Builds Gallery' : 'Πρόσφατα Έργα'}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-400 transition-colors">
                  {lang === 'en' ? 'Cost Estimator' : 'Υπολογισμός Κόστους'}
                </a>
              </li>
              <li>
                <a href="#workshop" className="hover:text-amber-400 transition-colors">
                  {lang === 'en' ? 'Equipment & Standards' : 'Εξοπλισμός & Πρότυπα'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  {lang === 'en' ? 'Location & Operating Hours' : 'Τοποθεσία & Ωράριο'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              {lang === 'en' ? 'Workshop Facility' : 'Στοιχεία Επικοινωνίας'}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{WORKSHOP_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`} className="hover:text-amber-400 font-mono">
                  {WORKSHOP_INFO.phoneGreek}
                </a>
                <span className="text-neutral-500">(EL)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href={`tel:${WORKSHOP_INFO.phoneEnglishRaw}`} className="hover:text-amber-400 font-mono">
                  {WORKSHOP_INFO.phoneEnglish}
                </a>
                <span className="text-neutral-500">(EN)</span>
              </div>
              <div className="pt-2">
                <a
                  href={WORKSHOP_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>{lang === 'en' ? 'Find us on Google Maps' : 'Βρείτε μας στους Χάρτες Google'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Moto Toulis. {lang === 'en' ? 'All rights reserved.' : 'Με επιφύλαξη παντός δικαιώματος.'} Limassol, Cyprus.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>{lang === 'en' ? 'Back to Top' : 'Επιστροφή στην Κορυφή'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};
