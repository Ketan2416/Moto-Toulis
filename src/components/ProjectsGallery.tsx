import React, { useState } from 'react';
import { Wrench, CheckCircle, ArrowRight, X, Star, Gauge, Calendar, Cog } from 'lucide-react';
import { RECENT_PROJECTS, ProjectItem } from '../data/workshopData';

interface ProjectsGalleryProps {
  lang: 'en' | 'el';
  onBookServiceForBike: (bikeModel: string) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ lang, onBookServiceForBike }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<Record<string, 'after' | 'before'>>({});

  const filterTabs = [
    { id: 'all', labelEn: 'All Projects', labelEl: 'Όλα τα Έργα' },
    { id: 'superbike', labelEn: 'Superbike & Sport', labelEl: 'Superbike & Sport' },
    { id: 'adventure', labelEn: 'Adventure & Touring', labelEl: 'Adventure & Touring' },
    { id: 'custom', labelEn: 'Custom & Restomod', labelEl: 'Custom & Restomod' },
    { id: 'scooter', labelEn: 'Maxi-Scooter & CVT', labelEl: 'Maxi-Scooter & CVT' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? RECENT_PROJECTS
    : RECENT_PROJECTS.filter(p => p.category === selectedFilter);

  const toggleViewMode = (projectId: string, mode: 'after' | 'before', e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveViewMode(prev => ({ ...prev, [projectId]: mode }));
  };

  return (
    <section id="projects" className="py-24 bg-neutral-900/40 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-2">
              {lang === 'en' ? 'Craftsmanship & Proven Results' : 'Αποδείξεις Μηχανολογικής Ακρίβειας'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
              {lang === 'en' ? 'Recent Workshop Projects' : 'Πρόσφατα Έργα & Ανακατασκευές'}
            </h2>
            <p className="text-base text-neutral-400">
              {lang === 'en'
                ? 'From track-day engine blueprinting and high-performance suspension overhauls to bespoke custom fabrications. Inspect our real workshop builds below.'
                : 'Από αγωνιστικό άνοιγμα κινητήρων και επισκευή αναρτήσεων μέχρι χειροποίητες custom εξατμίσεις. Δείτε πραγματικά έργα από το συνεργείο μας.'}
            </p>
          </div>

          {/* Social Proof Claim */}
          <div className="border border-neutral-800 bg-neutral-950 p-4 rounded-xl text-xs text-neutral-300 max-w-xs shrink-0">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>5.0 Star Rated on Google</span>
            </div>
            <p className="text-neutral-400 leading-snug">
              {lang === 'en'
                ? 'Trusted by riders in Limassol, Nicosia & Paphos for honest diagnostic expertise.'
                : 'Εμπιστοσύνη από αναβάτες σε όλη την Κύπρο για τίμια διάγνωση και άριστο αποτέλεσμα.'}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {lang === 'en' ? tab.labelEn : tab.labelEl}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const viewMode = activeViewMode[project.id] || 'after';

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="group cursor-pointer rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition-all duration-200 flex flex-col"
              >
                {/* Project Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.bikeModel}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

                  {/* Clean unboxed metadata overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                    <span className="font-mono bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-800">
                      {project.bikeModel}
                    </span>
                    <span className="font-mono bg-neutral-950/80 backdrop-blur-md px-2 py-1 rounded border border-neutral-800">
                      {project.year} · {project.engineDisplacement}
                    </span>
                  </div>

                  {/* View Details Prompt on Hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-md">
                      <span>{lang === 'en' ? 'View Full Build Specs' : 'Αναλυτικές Προδιαγραφές'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {lang === 'en' ? project.titleEn : project.titleEl}
                    </h3>

                    {/* Brief description */}
                    <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                      {lang === 'en' ? project.descriptionEn : project.descriptionEl}
                    </p>

                    {/* Interactive Before vs. After mechanical diagnostics inspector */}
                    <div className="border border-neutral-800 rounded-lg p-3.5 bg-neutral-900/60 mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                          {lang === 'en' ? 'Mechanical Diagnostics' : 'Διάγνωση & Αποτέλεσμα'}
                        </span>
                        {/* Segmented mini switcher */}
                        <div className="flex items-center border border-neutral-800 rounded p-0.5 bg-neutral-950 text-[11px]">
                          <button
                            type="button"
                            onClick={(e) => toggleViewMode(project.id, 'before', e)}
                            className={`px-2 py-0.5 rounded transition-colors ${
                              viewMode === 'before'
                                ? 'bg-rose-500/20 text-rose-300 font-medium'
                                : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            {lang === 'en' ? 'Symptoms (Before)' : 'Πριν (Πρόβλημα)'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => toggleViewMode(project.id, 'after', e)}
                            className={`px-2 py-0.5 rounded transition-colors ${
                              viewMode === 'after'
                                ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                                : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            {lang === 'en' ? 'Outcome (After)' : 'Μετά (Αποτέλεσμα)'}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                        {viewMode === 'before'
                          ? (lang === 'en' ? project.beforeNotesEn : project.beforeNotesEl)
                          : (lang === 'en' ? project.afterNotesEn : project.afterNotesEl)}
                      </p>
                    </div>
                  </div>

                  {/* Highlights list preview */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 text-neutral-300 font-mono">
                      <Wrench className="w-3.5 h-3.5 text-amber-500" />
                      <span>{project.workPerformedEn.length} {lang === 'en' ? 'Operations Completed' : 'Εργασίες Ολοκληρώθηκαν'}</span>
                    </span>

                    <span className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1">
                      <span>{lang === 'en' ? 'Inspect Build' : 'Προβολή'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-900/90 text-neutral-300 hover:text-white border border-neutral-700/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-neutral-900">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.bikeModel}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{activeModalProject.bikeModel}</span>
                  <span aria-hidden="true">·</span>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeModalProject.year}</span>
                  <span aria-hidden="true">·</span>
                  <Cog className="w-3.5 h-3.5" />
                  <span>{activeModalProject.engineDisplacement}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white leading-tight">
                  {lang === 'en' ? activeModalProject.titleEn : activeModalProject.titleEl}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Detailed Description */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-500 font-semibold mb-2">
                  {lang === 'en' ? 'Project Overview' : 'Περιγραφή Έργου'}
                </h4>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                  {lang === 'en' ? activeModalProject.descriptionEn : activeModalProject.descriptionEl}
                </p>
              </div>

              {/* Before & After comparison grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-rose-900/30">
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-1">
                    {lang === 'en' ? 'Symptoms Upon Workshop Arrival' : 'Συμπτώματα Κατά την Παραλαβή'}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                    {lang === 'en' ? activeModalProject.beforeNotesEn : activeModalProject.beforeNotesEl}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-emerald-900/30">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                    {lang === 'en' ? 'Final Mechanical Results' : 'Τελικό Αποτέλεσμα & Δοκιμή'}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                    {lang === 'en' ? activeModalProject.afterNotesEn : activeModalProject.afterNotesEl}
                  </p>
                </div>
              </div>

              {/* Two Column: Work Done & Parts Installed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    {lang === 'en' ? 'Operations Performed' : 'Εργασίες που Εκτελέστηκαν'}
                  </h4>
                  <ul className="space-y-2">
                    {(lang === 'en' ? activeModalProject.workPerformedEn : activeModalProject.workPerformedEl).map((op, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{op}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                    {lang === 'en' ? 'Genuine & Performance Parts Used' : 'Ανταλλακτικά & Υλικά'}
                  </h4>
                  <ul className="space-y-2">
                    {(lang === 'en' ? activeModalProject.partsInstalledEn : activeModalProject.partsInstalledEl).map((part, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Wrench className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                        <span>{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rider Testimonial */}
              {activeModalProject.testimonial && (
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(activeModalProject.testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-neutral-400 ml-2 font-mono">
                      {activeModalProject.testimonial.rider}
                    </span>
                  </div>
                  <blockquote className="text-xs italic text-neutral-300">
                    &ldquo;{lang === 'en' ? activeModalProject.testimonial.quoteEn : activeModalProject.testimonial.quoteEl}&rdquo;
                  </blockquote>
                </div>
              )}

              {/* Modal Action Footer */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  {lang === 'en' ? 'Have a similar bike or mechanical issue?' : 'Έχετε παρόμοια μοτοσυκλέτα ή πρόβλημα;'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const bike = activeModalProject.bikeModel;
                    setActiveModalProject(null);
                    onBookServiceForBike(bike);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'en' ? `Book Service for ${activeModalProject.bikeModel}` : `Κλείστε Σέρβις για ${activeModalProject.bikeModel}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
