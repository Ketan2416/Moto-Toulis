import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface CostEstimatorProps {
  lang: 'en' | 'el';
  onBookWithEstimates: (details: { bikeType: string; services: string[]; estimatedTotal: string }) => void;
}

interface BikeTypeConfig {
  id: string;
  nameEn: string;
  nameEl: string;
  example: string;
  oilVolume: string;
  baseMultiplier: number;
}

const BIKE_TYPES: BikeTypeConfig[] = [
  {
    id: 'scooter',
    nameEn: 'City Scooter (125cc – 300cc)',
    nameEl: 'Scooter Πόλης (125cc – 300cc)',
    example: 'Vespa, PCX, Symphony, Beverly 300',
    oilVolume: '1.2 – 1.6L',
    baseMultiplier: 0.85,
  },
  {
    id: 'maxi-scooter',
    nameEn: 'Maxi-Scooter (400cc – 560cc)',
    nameEl: 'Maxi-Scooter (400cc – 560cc)',
    example: 'T-MAX 560, X-ADV 750, AK 550',
    oilVolume: '2.5 – 3.0L',
    baseMultiplier: 1.15,
  },
  {
    id: 'naked-street',
    nameEn: 'Naked / Middleweight (400cc – 800cc)',
    nameEl: 'Naked / Μεσαίου Κυβισμού (400cc – 800cc)',
    example: 'MT-07, Hornet 750, Z650, Monster',
    oilVolume: '2.6 – 3.2L',
    baseMultiplier: 1.0,
  },
  {
    id: 'superbike',
    nameEn: 'Superbike / Liter Class (998cc – 1300cc)',
    nameEl: 'Superbike / 1000cc+ (998cc – 1300cc)',
    example: 'YZF-R1, CBR1000RR, S1000RR, Panigale',
    oilVolume: '3.6 – 4.2L',
    baseMultiplier: 1.35,
  },
  {
    id: 'adventure',
    nameEn: 'Adventure & Touring (700cc – 1300cc)',
    nameEl: 'Adventure & On/Off (700cc – 1300cc)',
    example: 'BMW GS 1250, Tenere 700, Africa Twin',
    oilVolume: '3.5 – 4.0L',
    baseMultiplier: 1.25,
  },
];

interface ServiceOption {
  id: string;
  nameEn: string;
  nameEl: string;
  baseMin: number;
  baseMax: number;
  hours: number;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'oil-filter',
    nameEn: '100% Synthetic Oil (Motul) & OEM Filter',
    nameEl: 'Πλήρως Συνθετικό Λάδι (Motul) & Γνήσιο Φίλτρο',
    baseMin: 55,
    baseMax: 90,
    hours: 1,
  },
  {
    id: 'plugs-air',
    nameEn: 'NGK Spark Plugs & High-Flow Air Filter Service',
    nameEl: 'Μπουζί NGK & Καθαρισμός/Αλλαγή Φίλτρου Αέρα',
    baseMin: 35,
    baseMax: 70,
    hours: 1,
  },
  {
    id: 'brake-flush',
    nameEn: 'DOT 5.1 Racing Brake & Clutch Fluid Hydraulic Flush',
    nameEl: 'Εξαέρωση & Νέα Υγρά Φρένων DOT 5.1 & Συμπλέκτη',
    baseMin: 40,
    baseMax: 65,
    hours: 1.5,
  },
  {
    id: 'fork-seals',
    nameEn: 'Front Fork Rebuild (SKF Seals + Motorex Damper Fluid)',
    nameEl: 'Επισκευή Μπροστινού (Τσιμούχες SKF & Λάδια Motorex)',
    baseMin: 95,
    baseMax: 160,
    hours: 3,
  },
  {
    id: 'chain-sprockets',
    nameEn: 'Heavy-Duty DID Gold X-Ring Chain & JT Sprockets',
    nameEl: 'Χρυσή Αλυσίδα DID X-Ring & Γρανάζια JT',
    baseMin: 110,
    baseMax: 185,
    hours: 2,
  },
  {
    id: 'valve-clearance',
    nameEn: 'Valve Clearance Check & Micrometer Precision Shimming',
    nameEl: 'Έλεγχος & Ρύθμιση Βαλβίδων με Καπελότα Ακριβείας',
    baseMin: 120,
    baseMax: 220,
    hours: 4.5,
  },
  {
    id: 'tire-mount',
    nameEn: 'Scratch-Free Tire Mount & Computer Spin Balancing (Pair)',
    nameEl: 'Τοποθέτηση Ζεύγους Ελαστικών & Ζυγοστάθμιση Ακριβείας',
    baseMin: 30,
    baseMax: 45,
    hours: 0.75,
  },
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({ lang, onBookWithEstimates }) => {
  const [selectedBikeType, setSelectedBikeType] = useState<string>('naked-street');
  const [selectedServices, setSelectedServices] = useState<string[]>(['oil-filter', 'brake-flush']);

  const currentBike = BIKE_TYPES.find(b => b.id === selectedBikeType) || BIKE_TYPES[2];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculatedMin = Math.round(
    selectedServices.reduce((sum, sId) => {
      const s = SERVICE_OPTIONS.find(opt => opt.id === sId);
      return sum + (s ? s.baseMin * currentBike.baseMultiplier : 0);
    }, 0)
  );

  const calculatedMax = Math.round(
    selectedServices.reduce((sum, sId) => {
      const s = SERVICE_OPTIONS.find(opt => opt.id === sId);
      return sum + (s ? s.baseMax * currentBike.baseMultiplier : 0);
    }, 0)
  );

  const calculatedHours = selectedServices.reduce((sum, sId) => {
    const s = SERVICE_OPTIONS.find(opt => opt.id === sId);
    return sum + (s ? s.hours : 0);
  }, 0);

  const handleCarryToBooking = () => {
    const serviceNames = selectedServices.map(id => {
      const opt = SERVICE_OPTIONS.find(o => o.id === id);
      return opt ? (lang === 'en' ? opt.nameEn : opt.nameEl) : id;
    });

    onBookWithEstimates({
      bikeType: lang === 'en' ? currentBike.nameEn : currentBike.nameEl,
      services: serviceNames,
      estimatedTotal: `€${calculatedMin} – €${calculatedMax}`,
    });
  };

  return (
    <section id="estimator" className="py-24 bg-neutral-950 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
            {lang === 'en' ? 'Transparent Workshop Pricing' : 'Διαφάνεια Τιμών'}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
            {lang === 'en' ? 'Interactive Service Estimator' : 'Υπολογισμός Κόστους Σέρβις'}
          </h2>
          <p className="text-base text-neutral-400">
            {lang === 'en'
              ? 'Select your motorcycle classification and desired mechanical procedures. Our guide estimate reflects genuine Motul fluids, OEM filtration, and calibrated workshop labor.'
              : 'Επιλέξτε την κατηγορία της μηχανής σας και τις εργασίες που επιθυμείτε για άμεση εκτίμηση κόστους με γνήσια ανταλλακτικά και πιστοποιημένη εργασία.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bike Selection & Services (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Bike Category */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                {lang === 'en' ? '1. Select Motorcycle Platform' : '1. Επιλέξτε Κατηγορία Μοτοσυκλέτας'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BIKE_TYPES.map((bike) => {
                  const isSelected = selectedBikeType === bike.id;
                  return (
                    <button
                      key={bike.id}
                      type="button"
                      onClick={() => setSelectedBikeType(bike.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 border-amber-500 shadow-sm'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold uppercase ${isSelected ? 'text-amber-400' : 'text-neutral-200'}`}>
                          {lang === 'en' ? bike.nameEn : bike.nameEl}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                      </div>
                      <div className="text-xs text-neutral-400">{bike.example}</div>
                      <div className="text-[11px] font-mono text-neutral-500 mt-1">
                        {lang === 'en' ? `Oil Capacity: ~${bike.oilVolume}` : `Χωρητικότητα Λαδιού: ~${bike.oilVolume}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Desired Operations */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                {lang === 'en' ? '2. Choose Desired Services' : '2. Επιλέξτε Εργασίες'}
              </label>
              <div className="space-y-2.5">
                {SERVICE_OPTIONS.map((opt) => {
                  const isChecked = selectedServices.includes(opt.id);
                  const optMin = Math.round(opt.baseMin * currentBike.baseMultiplier);
                  const optMax = Math.round(opt.baseMax * currentBike.baseMultiplier);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleService(opt.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-neutral-900 border-amber-500/70 text-white'
                          : 'bg-neutral-950 border-neutral-800/80 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent div
                          className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-sm font-medium">
                          {lang === 'en' ? opt.nameEn : opt.nameEl}
                        </span>
                      </div>

                      <div className="text-xs font-mono tabular-nums text-neutral-400 shrink-0 ml-2">
                        €{optMin} – €{optMax}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Box (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-500 tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>{lang === 'en' ? 'Estimated Total' : 'Εκτιμώμενο Σύνολο'}</span>
            </div>

            <div className="text-3xl sm:text-4xl font-display font-extrabold text-white font-mono tabular-nums mb-1">
              €{calculatedMin} – €{calculatedMax}
            </div>
            <div className="text-xs text-neutral-400 mb-6">
              {lang === 'en' ? 'Estimated Workshop Time: ~' : 'Εκτιμώμενος Χρόνος Εργασίας: ~'}
              <span className="font-mono text-neutral-200">{calculatedHours.toFixed(1)} hrs</span>
            </div>

            {/* Selected Breakdown */}
            <div className="space-y-2 border-t border-b border-neutral-800 py-4 mb-6 text-xs text-neutral-300">
              <div className="flex justify-between text-neutral-400">
                <span>{lang === 'en' ? 'Platform:' : 'Κατηγορία:'}</span>
                <span className="text-neutral-200 font-medium truncate max-w-[180px]">
                  {lang === 'en' ? currentBike.nameEn : currentBike.nameEl}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>{lang === 'en' ? 'Procedures Selected:' : 'Επιλεγμένες Εργασίες:'}</span>
                <span className="text-amber-400 font-mono font-semibold">{selectedServices.length}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>{lang === 'en' ? 'Parts Specification:' : 'Προδιαγραφή Ανταλλακτικών:'}</span>
                <span className="text-neutral-200">Motul & OEM Genuine</span>
              </div>
            </div>

            <div className="space-y-3 mb-6 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'en'
                    ? 'Includes complimentary 32-point chassis and tire pressure safety audit.'
                    : 'Περιλαμβάνει δωρεάν έλεγχο ασφαλείας 32 σημείων και πίεσης ελαστικών.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'en'
                    ? 'Same-day completion available for bookings before 11:00 AM.'
                    : 'Δυνατότητα αυθημερόν παράδοσης για ραντεβού πριν τις 11:00 π.μ.'}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={selectedServices.length === 0}
              onClick={handleCarryToBooking}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-md cursor-pointer"
            >
              <span>{lang === 'en' ? 'Book with This Specification' : 'Κράτηση με Αυτή την Προσφορά'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
