import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, MessageSquare, Phone, Clock, Download } from 'lucide-react';
import { WORKSHOP_INFO, SERVICES_LIST } from '../data/workshopData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'el';
  initialServiceId?: string;
  initialBikeModel?: string;
  initialEstimates?: {
    bikeType: string;
    services: string[];
    estimatedTotal: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialServiceId,
  initialBikeModel,
  initialEstimates,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bikeMakeModel: initialBikeModel || '',
    bikeYear: '',
    selectedService: initialServiceId || 'full-service',
    preferredDate: '',
    preferredTime: '09:00',
    notes: '',
    preferredContact: 'phone', // 'phone' | 'whatsapp'
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialBikeModel) {
      setFormData(prev => ({ ...prev, bikeMakeModel: initialBikeModel }));
    }
    if (initialServiceId) {
      setFormData(prev => ({ ...prev, selectedService: initialServiceId }));
    }
    if (initialEstimates) {
      setFormData(prev => ({
        ...prev,
        bikeMakeModel: prev.bikeMakeModel || initialEstimates.bikeType,
        notes: `Selected Estimates: ${initialEstimates.services.join(', ')} (${initialEstimates.estimatedTotal})`,
      }));
    }
  }, [initialBikeModel, initialServiceId, initialEstimates]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = lang === 'en' ? 'Please enter your name' : 'Παρακαλούμε εισάγετε το όνομά σας';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = lang === 'en' ? 'Valid telephone required (e.g. +357 99 123456)' : 'Απαιτείται έγκυρο τηλέφωνο';
    }
    if (!formData.bikeMakeModel.trim()) {
      errs.bikeMakeModel = lang === 'en' ? 'Motorcycle make & model required' : 'Απαιτείται μοντέλο μοτοσυκλέτας';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = lang === 'en' ? 'Select a preferred date' : 'Επιλέξτε επιθυμητή ημερομηνία';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const downloadCalendarFile = () => {
    const title = `Moto Toulis Workshop: ${formData.bikeMakeModel}`;
    const desc = `Service Appointment at Moto Toulis (Omonoias 74b, Lemesos, Cyprus). Notes: ${formData.notes || 'Motorcycle maintenance'}`;
    const dateFormatted = formData.preferredDate.replace(/-/g, '');
    const startTime = formData.preferredTime.replace(':', '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Moto Toulis Limassol//Service Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${WORKSHOP_INFO.address}`,
      `DTSTART:${dateFormatted}T${startTime}00`,
      `DTEND:${dateFormatted}T${String(Number(startTime.slice(0, 2)) + 2).padStart(2, '0')}${startTime.slice(2)}00`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `moto-toulis-appointment-${formData.preferredDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const composeWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Moto Toulis!\n\nI would like to book a service appointment:\n` +
      `• Rider: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Motorcycle: ${formData.bikeMakeModel} (${formData.bikeYear || 'N/A'})\n` +
      `• Service: ${formData.selectedService}\n` +
      `• Preferred Date: ${formData.preferredDate} at ${formData.preferredTime}\n` +
      `• Additional Details: ${formData.notes || 'None'}`
    );
    // Greek number for EL, english number for EN
    const phoneNum = lang === 'en' ? '35796643063' : '35796323535';
    return `https://wa.me/${phoneNum}?text=${text}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-1">
                {lang === 'en' ? 'Workshop Booking Request' : 'Αίτημα Ραντεβού Συνεργείου'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white">
                {lang === 'en' ? 'Schedule Service / Inspection' : 'Προγραμματίστε Σέρβις ή Έλεγχο'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {lang === 'en'
                  ? 'Reserve your workshop bay at Omonoias 74b, Lemesos. We will confirm your timing promptly.'
                  : 'Κλείστε θέση στο συνεργείο μας στην Ομονοίας 74b. Θα επιβεβαιώσουμε άμεσα το ραντεβού.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {lang === 'en' ? 'Full Name *' : 'Ονοματεπώνυμο *'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Alex Georgiou' : 'π.χ. Αλέξανδρος Γεωργίου'}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 ${
                      errors.name ? 'border-rose-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {lang === 'en' ? 'Telephone Number *' : 'Τηλέφωνο Επικοινωνίας *'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+357 99 123456"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono ${
                      errors.phone ? 'border-rose-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Motorcycle Make & Model + Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {lang === 'en' ? 'Motorcycle Make & Model *' : 'Μάρκα & Μοντέλο Μοτοσυκλέτας *'}
                  </label>
                  <input
                    type="text"
                    value={formData.bikeMakeModel}
                    onChange={(e) => setFormData({ ...formData, bikeMakeModel: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Yamaha R1, BMW R1250GS, T-Max 560' : 'π.χ. Yamaha R1, BMW R1250GS, T-Max 560'}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 ${
                      errors.bikeMakeModel ? 'border-rose-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.bikeMakeModel && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.bikeMakeModel}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {lang === 'en' ? 'Year (Approx)' : 'Έτος'}
                  </label>
                  <input
                    type="text"
                    value={formData.bikeYear}
                    onChange={(e) => setFormData({ ...formData, bikeYear: e.target.value })}
                    placeholder="2021"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {lang === 'en' ? 'Desired Service Category' : 'Επιλογή Υπηρεσίας'}
                </label>
                <select
                  value={formData.selectedService}
                  onChange={(e) => setFormData({ ...formData, selectedService: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {lang === 'en' ? srv.titleEn : srv.titleEl} ({srv.estimatedPrice})
                    </option>
                  ))}
                  <option value="custom-diagnostics">
                    {lang === 'en' ? 'Diagnostic Inspection / Unknown Noise / Breakdown' : 'Διαγνωστικός Έλεγχος / Περίεργος Θόρυβος'}
                  </option>
                  <option value="mot-prep">
                    {lang === 'en' ? 'Pre-MOT Inspection & Roadworthiness' : 'Προετοιμασία Ελέγχου ΜΟΤ'}
                  </option>
                </select>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {lang === 'en' ? 'Preferred Date (Mon–Sat) *' : 'Επιθυμητή Ημερομηνία (Δευ–Σαβ) *'}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border text-sm text-white focus:outline-none focus:border-amber-500 ${
                      errors.preferredDate ? 'border-rose-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {lang === 'en' ? 'Preferred Slot' : 'Επιθυμητή Ώρα'}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value="08:30">08:30 (Morning Drop-off)</option>
                    <option value="10:00">10:00</option>
                    <option value="12:00">12:00 (Midday)</option>
                    <option value="14:30">14:30 (Afternoon)</option>
                    <option value="16:30">16:30</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  {lang === 'en' ? 'Symptoms, Specific Work or Notes' : 'Περιγραφή Προβλήματος / Σημειώσεις'}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    lang === 'en'
                      ? 'e.g. Fork oil leaking, noisy valvetrain, need fresh Motul 300V oil and spark plugs.'
                      : 'π.χ. Διαρροή λαδιού από το πιρούνι, θόρυβος στις βαλβίδες, ανάγκη για λάδια Motul 300V.'
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Cancel' : 'Ακύρωση'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-md cursor-pointer"
                >
                  {lang === 'en' ? 'Submit Booking Request' : 'Αποστολή Αιτήματος'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-extrabold uppercase text-white mb-2">
                {lang === 'en' ? 'Booking Request Registered' : 'Το Αίτημα Καταχωρήθηκε'}
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                {lang === 'en'
                  ? `Thank you, ${formData.name}. We have reserved your provisional slot for ${formData.bikeMakeModel} on ${formData.preferredDate} at ${formData.preferredTime}.`
                  : `Ευχαριστούμε, ${formData.name}. Καταχωρήθηκε η προσωρινή κράτηση για ${formData.bikeMakeModel} στις ${formData.preferredDate} και ώρα ${formData.preferredTime}.`}
              </p>
            </div>

            {/* Quick Actions: WhatsApp & Calendar Download */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 max-w-lg mx-auto space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold">
                {lang === 'en' ? 'Instant Confirmation Options' : 'Άμεσες Ενέργειες'}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={composeWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Send via WhatsApp' : 'Αποστολή σε WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={downloadCalendarFile}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? 'Add to Calendar' : 'Προσθήκη Ημερολογίου'}</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-neutral-400 flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'en' ? 'Need immediate assistance?' : 'Επείγουσα επισκευή;'}</span>
              <a
                href={`tel:${WORKSHOP_INFO.phoneGreekRaw}`}
                className="text-amber-400 font-mono font-medium hover:underline"
              >
                {WORKSHOP_INFO.phoneGreek}
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Close Window' : 'Κλείσιμο Παραθύρου'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
