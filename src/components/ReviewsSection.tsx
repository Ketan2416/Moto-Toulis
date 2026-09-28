import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS, WORKSHOP_INFO, FAQ_LIST } from '../data/workshopData';

interface ReviewsSectionProps {
  lang: 'en' | 'el';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-2 font-bold">
              {lang === 'en' ? 'Rider Community Feedback' : 'Κριτικές Αναβατών'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-slate-950 mb-3">
              {lang === 'en' ? 'Words from Cyprus Riders' : 'Τι Λένε οι Πελάτες μας'}
            </h2>
            <p className="text-base text-slate-600">
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
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Facebook Community' : 'Κοινότητα Facebook'}</span>
            </a>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{t.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{lang === 'en' ? t.commentEn : t.commentEl}&rdquo;
                </p>
              </div>

              {/* Attributable author with unboxed metadata */}
              <div className="pt-4 border-t border-slate-200">
                <div className="text-sm font-bold text-slate-950">{t.name}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                  <span className="text-amber-600 font-mono font-bold">{t.bike}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pt-12 border-t border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-slate-950 mb-2">
              {lang === 'en' ? 'Frequently Asked Questions' : 'Συχνές Ερωτήσεις'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'Everything you need to know before bringing your motorcycle to Moto Toulis.'
                : 'Όλα όσα πρέπει να γνωρίζετε πριν φέρετε τη μηχανή σας στο συνεργείο.'}
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_LIST.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <h4 className="text-sm sm:text-base font-bold text-slate-950 mb-2">
                  {lang === 'en' ? faq.qEn : faq.qEl}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
