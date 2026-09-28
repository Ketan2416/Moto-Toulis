import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, WORKSHOP_INFO, FAQ_LIST } from '../data/workshopData';

interface ReviewsSectionProps {
  lang: 'en' | 'el';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              {lang === 'en' ? 'Rider Community Feedback' : 'Κριτικές Αναβατών'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
              {lang === 'en' ? 'Words from Cyprus Riders' : 'Τι Λένε οι Πελάτες μας'}
            </h2>
            <p className="text-base text-neutral-400">
              {lang === 'en'
                ? 'From track riders pushing the limit at Achna Speedway to everyday commuters navigating Limassol traffic.'
                : 'Από αναβάτες πίστας στην Άχνα μέχρι καθημερινούς οδηγούς στους δρόμους της Λεμεσού.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={WORKSHOP_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>{lang === 'en' ? 'Facebook Community' : 'Κοινότητα Facebook'}</span>
            </a>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-neutral-400">{t.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 italic">
                  &ldquo;{lang === 'en' ? t.commentEn : t.commentEl}&rdquo;
                </p>
              </div>

              {/* Attributable author with unboxed metadata */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                  <span className="text-amber-400 font-mono">{t.bike}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pt-12 border-t border-neutral-800/80">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white mb-2">
              {lang === 'en' ? 'Frequently Asked Questions' : 'Συχνές Ερωτήσεις'}
            </h3>
            <p className="text-xs text-neutral-400">
              {lang === 'en'
                ? 'Everything you need to know before bringing your motorcycle to Moto Toulis.'
                : 'Όλα όσα πρέπει να γνωρίζετε πριν φέρετε τη μηχανή σας στο συνεργείο.'}
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_LIST.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80"
              >
                <h4 className="text-sm sm:text-base font-semibold text-white mb-2">
                  {lang === 'en' ? faq.qEn : faq.qEl}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {lang === 'en' ? faq.aEn : faq.aEl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
