import React, { useState } from 'react';
import { Check, Clock, Tag, ArrowRight } from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/workshopData';

interface ServicesSectionProps {
  lang: 'en' | 'el';
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelEn: 'All Services', labelEl: 'Όλες οι Υπηρεσίες' },
    { id: 'maintenance', labelEn: 'Periodic & Fluids', labelEl: 'Συντήρηση & Λιπαντικά' },
    { id: 'engine', labelEn: 'Engine Rebuilds', labelEl: 'Κινητήρες & Ρυθμίσεις' },
    { id: 'suspension', labelEn: 'Suspension & Forks', labelEl: 'Αναρτήσεις & Πιρούνια' },
    { id: 'brakes', labelEn: 'Brakes & ABS', labelEl: 'Φρένα & ABS' },
    { id: 'electrical', labelEn: 'ECU & Electrical', labelEl: 'Ηλεκτρονικά & Πλεξούδες' },
    { id: 'transmission', labelEn: 'Drivetrain & CVT', labelEl: 'Μετάδοση & CVT' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-2 font-bold">
            {lang === 'en' ? 'Mechanical Capabilities' : 'Μηχανολογικές Υπηρεσίες'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-slate-950 mb-4">
            {lang === 'en' ? 'Workshop Repair Services' : 'Υπηρεσίες Επισκευής & Συντήρησης'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {lang === 'en'
              ? 'Every motorcycle is treated with hospital-grade cleanliness and calibrated torque specifications. We diagnose with electronic precision and use exclusively genuine OEM or certified high-performance racing components.'
              : 'Κάθε μοτοσυκλέτα αντιμετωπίζεται με σχολαστική καθαριότητα και ροπές σύσφιξης σύμφωνα με το εργοστάσιο. Διαγνωστικά τελευταίας γενιάς και πιστοποιημένα εξαρτήματα.'}
          </p>
        </div>

        {/* Category Tabs (Segmented control button row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {lang === 'en' ? cat.labelEn : cat.labelEl}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-amber-500/60 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Natural Editorial Numbering & Turnaround Header */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-mono text-amber-600 font-bold">{indexStr}.</span>
                    <div className="flex items-center gap-1.5 font-mono text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lang === 'en' ? service.turnaroundEn : service.turnaroundEl}</span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-slate-950 mb-2 group-hover:text-amber-600 transition-colors">
                    {lang === 'en' ? service.titleEn : service.titleEl}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {lang === 'en' ? service.descriptionEn : service.descriptionEl}
                  </p>

                  {/* Scope / Included Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-200">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">
                      {lang === 'en' ? "What's Included in This Service" : 'Τι Περιλαμβάνει η Εργασία'}
                    </div>
                    {(lang === 'en' ? service.includedEn : service.includedEl).map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Price Range & Book Action */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-900 font-bold">{service.estimatedPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookService(service.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-200 hover:bg-amber-500 hover:text-slate-950 rounded-lg transition-all cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Book Service' : 'Κλείστε Σέρβις'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency / Diagnostics Banner */}
        <div className="mt-12 p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-display font-bold uppercase text-slate-950 mb-1">
              {lang === 'en' ? 'Unsure what your motorcycle needs?' : 'Δεν είστε βέβαιοι τι πρόβλημα έχει η μηχανή σας;'}
            </h4>
            <p className="text-sm text-slate-600">
              {lang === 'en'
                ? 'Bring your motorcycle by Omonoias 74b for an instant electronic computer scan and mechanical diagnostic appraisal.'
                : 'Ελάτε από το συνεργείο μας στην Ομονοίας 74b για άμεσο διαγνωστικό έλεγχο και τεχνική εκτίμηση.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onBookService('full-service')}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            {lang === 'en' ? 'Schedule Diagnostic Check' : 'Προγραμματίστε Έλεγχο'}
          </button>
        </div>
      </div>
    </section>
  );
};
