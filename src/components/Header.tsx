import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/workshopData';

interface HeaderProps {
  lang: 'en' | 'el';
  setLang: (lang: 'en' | 'el') => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: lang === 'en' ? 'Services' : 'Υπηρεσίες' },
    { href: '#projects', label: lang === 'en' ? 'Recent Projects' : 'Έργα' },
    { href: '#estimator', label: lang === 'en' ? 'Cost Estimator' : 'Υπολογισμός Κόστους' },
    { href: '#workshop', label: lang === 'en' ? 'Workshop' : 'Συνεργείο' },
    { href: '#contact', label: lang === 'en' ? 'Contact & Hours' : 'Επικοινωνία' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-lg'
          : 'bg-gradient-to-b from-neutral-950/90 to-transparent border-b border-neutral-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark (Display Font) */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-display font-extrabold tracking-wider text-white hover:text-amber-500 transition-colors whitespace-nowrap uppercase"
          >
            Moto Toulis
          </a>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Clean Language Switcher */}
            <div className="flex items-center border border-neutral-800 bg-neutral-900 rounded-lg p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  lang === 'en'
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('el')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  lang === 'el'
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Αλλαγή σε Ελληνικά"
              >
                ΕΛ
              </button>
            </div>

            {/* Quick Call */}
            <a
              href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
              className="hidden xl:flex items-center gap-2 text-xs text-neutral-300 hover:text-amber-400 font-mono transition-colors px-2 py-1"
              title="Call Workshop"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{WORKSHOP_INFO.phoneGreek}</span>
            </a>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shadow-sm hover:shadow-amber-500/20 uppercase tracking-wide cursor-pointer"
            >
              {lang === 'en' ? 'Book Service' : 'Κράτηση Ραντεβού'}
            </button>
          </div>

          {/* Mobile hamburger & mobile language */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'el' : 'en')}
              className="p-1.5 text-xs border border-neutral-800 rounded bg-neutral-900 text-neutral-300 flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-semibold uppercase">{lang}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-neutral-200 hover:text-amber-400 hover:bg-neutral-900 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg uppercase tracking-wide cursor-pointer"
            >
              {lang === 'en' ? 'Book Service Appointment' : 'Κλείστε Ραντεβού'}
            </button>
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 px-1">
              <span>{WORKSHOP_INFO.address}</span>
              <a
                href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
                className="text-amber-400 font-mono font-medium"
              >
                {WORKSHOP_INFO.phoneGreek}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
