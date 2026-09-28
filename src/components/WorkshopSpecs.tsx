import React from 'react';
import { Cpu, Wrench, Shield, Sparkles, Activity, Disc } from 'lucide-react';

interface WorkshopSpecsProps {
  lang: 'en' | 'el';
}

export const WorkshopSpecs: React.FC<WorkshopSpecsProps> = ({ lang }) => {
  const specs = [
    {
      icon: Cpu,
      titleEn: 'Electronic OBD & ECU Telemetry',
      titleEl: 'Ηλεκτρονικά Διαγνωστικά OBD & Τηλεμετρία',
      descEn: 'Comprehensive OBD multi-brand scanner interface reading live sensor streams, TPS voltage, ABS actuator testing, and fault history clearing.',
      descEl: 'Πολυδιαγνωστικό σύστημα για έλεγχο δεδομένων σε πραγματικό χρόνο, τάση πεταλούδας TPS, έλεγχο μονάδων ABS και μηδενισμό σφαλμάτων.',
    },
    {
      icon: Wrench,
      titleEn: 'Factory Torque-Spec Assembly',
      titleEl: 'Σύσφιξη με Ροπόκλειδα Ακριβείας',
      descEn: 'Every axle, triple clamp, brake caliper, and cylinder head fastener is torqued with calibrated digital and click-type precision wrenches.',
      descEl: 'Κάθε άξονας, τιμονόπλακα, δαγκάνα και κεφαλή σφίγγεται αυστηρά με πιστοποιημένα ροπόκλειδα σύμφωνα με το εγχειρίδιο του κατασκευαστή.',
    },
    {
      icon: Activity,
      titleEn: 'Suspension Dyno & Vacuum Bleeding',
      titleEl: 'Εξειδικευμένα Εργαλεία Αναρτήσεων',
      descEn: 'Specialized inverted fork seal drivers, SKF installation tools, and vacuum fluid bleeders to eliminate microscopic cavitation in damper cartridges.',
      descEl: 'Ειδικοί οδηγοί τσιμουχών για πιρούνια USD, εργαλεία SKF και σύστημα εξαέρωσης υπό κενό για εξάλειψη φυσαλίδων στα φυσίγγια.',
    },
    {
      icon: Sparkles,
      titleEn: 'Ultrasonic De-Carbon & Parts Bath',
      titleEl: 'Υπερηχητικό Μπάνιο Καθαρισμού',
      descEn: 'High-frequency cavitation bath that purges varnished fuel residue, clogged micro-jets in carburetors, and baked-on carbon on intake valves.',
      descEl: 'Μπάνιο υπερήχων υψηλής συχνότητας που απομακρύνει επικαθίσεις καυσίμου, βουλωμένα ζιγκλέρ καρμπυρατέρ και άνθρακα από βαλβίδες.',
    },
    {
      icon: Disc,
      titleEn: 'Laser Alignment & Dynamic Balancing',
      titleEl: 'Ευθυγράμμιση Laser & Ζυγοστάθμιση',
      descEn: 'Laser-guided drive chain line tracking ensuring zero sprocket tooth side-wear, and dynamic computerized wheel balancing to within 1 gram.',
      descEl: 'Ευθυγράμμιση αλυσίδας με δέσμη laser για αποφυγή πλευρικής φθοράς γραναζιών και ηλεκτρονική ζυγοστάθμιση τροχών στο 1 γραμμάριο.',
    },
    {
      icon: Shield,
      titleEn: 'Hospital-Grade Workshop Hygiene',
      titleEl: 'Απόλυτη Καθαριότητα Χώρου Εργασίας',
      descEn: 'Engine builds occur on clean stainless steel benches under dedicated LED surgical lighting with nitrile gloves and zero abrasive contaminants.',
      descEl: 'Οι ανακατασκευές κινητήρων γίνονται σε ανοξείδωτους πάγκους με χειρουργικό φωτισμό LED και απόλυτη προστασία από σκόνες και γρέζια.',
    },
  ];

  return (
    <section id="workshop" className="py-24 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-2 font-bold">
            {lang === 'en' ? 'Standards & Equipment' : 'Εξοπλισμός & Πρότυπα'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-slate-950 mb-3">
            {lang === 'en' ? 'Workshop Diagnostics & Tooling' : 'Εξειδικευμένος Εξοπλισμός Συνεργείου'}
          </h2>
          <p className="text-base text-slate-600">
            {lang === 'en'
              ? 'Modern superbikes and complex electronic injection systems demand high-precision tooling. We invest continuously in calibrated instruments to safeguard your motorcycle.'
              : 'Οι σύγχρονες μοτοσυκλέτες απαιτούν εργαλεία υψηλής ακρίβειας. Επενδύουμε συνεχώς σε διαγνωστικά μηχανήματα για να διασφαλίζουμε το καλύτερο αποτέλεσμα.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/60 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-extrabold uppercase text-slate-950 mb-2">
                  {lang === 'en' ? item.titleEn : item.titleEl}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {lang === 'en' ? item.descEn : item.descEl}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
