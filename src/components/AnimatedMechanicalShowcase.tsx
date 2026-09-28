import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gauge, Zap, Flame, Shield, RotateCw, Play, Pause } from 'lucide-react';

interface AnimatedMechanicalShowcaseProps {
  lang: 'en' | 'el';
  onBookService: (serviceName?: string) => void;
}

export const AnimatedMechanicalShowcase: React.FC<AnimatedMechanicalShowcaseProps> = ({
  lang,
  onBookService,
}) => {
  const [activeTab, setActiveTab] = useState<'piston' | 'brakes' | 'chain' | 'suspension'>('piston');
  const [rpm, setRpm] = useState<number>(3200);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<number>(1);

  // Speed calculation for SVG animation based on RPM
  const animationDuration = isPlaying ? Math.max(0.2, (60 / rpm) * 2) : 999999;

  const blueprintHotspots = [
    {
      id: 1,
      x: '48%',
      y: '58%',
      nameEn: 'Titanium-Valve High-Revving Engine',
      nameEl: 'Κινητήρας με Βαλβίδες Τιτανίου',
      specsEn: 'Crossplane 4-cylinder / 998cc · 13.8 bar compression · Calibrated shims',
      specsEl: '4-κύλινδρος Crossplane / 998cc · Συμπίεση 13.8 bar · Ρύθμιση καπελότων',
      serviceId: 'engine-rebuild',
    },
    {
      id: 2,
      x: '22%',
      y: '48%',
      nameEn: '43mm Inverted (USD) Cartridge Forks',
      nameEl: 'Αναποδογυρισμένο Πιρούνι USD 43mm',
      specsEn: 'SKF dual-compound low friction seals · Motorex 7.5W · 120mm travel',
      specsEl: 'Τσιμούχες SKF χαμηλής τριβής · Λάδια Motorex 7.5W · Διαδρομή 120mm',
      serviceId: 'suspension-tuning',
    },
    {
      id: 3,
      x: '18%',
      y: '68%',
      nameEn: '320mm Floating Rotor & Monoblock Calipers',
      nameEl: 'Πλευστοί Δίσκοι 320mm & Ακτινικές Δαγκάνες',
      specsEn: 'Brembo radial master cylinder · SBS sintered racing pads · DOT 5.1 flush',
      specsEl: 'Ακτινική τρόμπα Brembo · Μεταλλικά τακάκια SBS · Υγρά DOT 5.1',
      serviceId: 'brakes-abs',
    },
    {
      id: 4,
      x: '78%',
      y: '65%',
      nameEn: 'DID Gold X-Ring Drivetrain & Sprocket',
      nameEl: 'Χρυσή Αλυσίδα DID X-Ring & Γρανάζια',
      specsEn: 'JT hardened steel teeth · Laser line alignment · 35mm free play',
      specsEl: 'Ατσάλινα γρανάζια JT · Ευθυγράμμιση laser · Τζόγος 35mm',
      serviceId: 'cvt-chain-drivetrain',
    },
    {
      id: 5,
      x: '62%',
      y: '50%',
      nameEn: 'Gas-Charged Progressive Monoshock',
      nameEl: 'Πίσω Αμορτισέρ Αζώτου & Μοχλικό',
      specsEn: 'High/low speed compression valves · Nitrogen bladder · Custom rider sag',
      specsEl: 'Βαλβίδες γρήγορης/αργής απόσβεσης · Άζωτο · Ρύθμιση sag αναβάτη',
      serviceId: 'suspension-tuning',
    },
  ];

  return (
    <section id="mechanical-lab" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Background Subtle Technical Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{lang === 'en' ? 'Mechanical Simulation Lab' : 'Εργαστήριο Μηχανολογικής Προσομοίωσης'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-slate-950 mb-3">
              {lang === 'en' ? 'Interactive Animated Assemblies' : 'Κινούμενα Μηχανολογικά Μέρη'}
            </h2>
            <p className="text-base text-slate-600">
              {lang === 'en'
                ? 'Explore the precision tolerances inside high-revving superbike components. Every assembly we rebuild is calibrated to millimeter and Newton-meter perfection.'
                : 'Εξερευνήστε τις ανοχές ακριβείας στο εσωτερικό των εξαρτημάτων. Κάθε εξάρτημα που επισκευάζουμε ρυθμίζεται με απόλυτη ακρίβεια.'}
            </p>
          </div>

          {/* Quick Simulation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto no-scrollbar">
            {[
              { id: 'piston', labelEn: 'Engine & Piston', labelEl: 'Κινητήρας & Έμβολο' },
              { id: 'brakes', labelEn: 'Disc & Caliper', labelEl: 'Δίσκος & Δαγκάνα' },
              { id: 'chain', labelEn: 'Racing Chain', labelEl: 'Αλυσίδα & Γρανάζι' },
              { id: 'suspension', labelEn: 'Suspension Stroke', labelEl: 'Ανάρτηση & Ελατήριο' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {lang === 'en' ? tab.labelEn : tab.labelEl}
              </button>
            ))}
          </div>
        </div>

        {/* Main Mechanical Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Animated Simulator Viewport (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-md overflow-hidden">
            {/* Ambient Backlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar with Real-time Gauges */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold">
                  {activeTab === 'piston' && (lang === 'en' ? '4-Stroke Combustion Simulator' : 'Προσομοιωτής 4-Χρονου Εμβόλου')}
                  {activeTab === 'brakes' && (lang === 'en' ? 'Brembo Racing Rotor Thermal Hub' : 'Πλευστός Δίσκος & Θερμική Απόκριση')}
                  {activeTab === 'chain' && (lang === 'en' ? 'DID ZVM-X Laser Sprocket Mesh' : 'Μετάδοση & Αλυσίδα DID X-Ring')}
                  {activeTab === 'suspension' && (lang === 'en' ? 'Cartridge Fork & Cavitation Bleed' : 'Απόσβεση Πιρουνιού & Έλεγχος Sag')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Animation' : 'Resume Animation'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-600" />}
                </button>
                <div className="text-xs font-mono tabular-nums text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                  {isPlaying ? `${rpm} RPM` : 'STANDSTILL'}
                </div>
              </div>
            </div>

            {/* Central Animated Mechanical SVG Canvas */}
            <div className="relative h-80 sm:h-96 flex items-center justify-center">
              {/* TAB 1: PISTON & CRANKSHAFT */}
              {activeTab === 'piston' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <svg
                    viewBox="0 0 320 360"
                    className="w-full h-full max-h-80 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  >
                    <defs>
                      <linearGradient id="pistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2b2d35" />
                        <stop offset="35%" stopColor="#4a4d5a" />
                        <stop offset="70%" stopColor="#32343e" />
                        <stop offset="100%" stopColor="#1e1f26" />
                      </linearGradient>
                      <linearGradient id="cylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#121318" />
                        <stop offset="50%" stopColor="#22242e" />
                        <stop offset="100%" stopColor="#121318" />
                      </linearGradient>
                      <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#ff4500" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                      </linearGradient>
                    </defs>

                    {/* Cylinder Sleeve Walls with Cross-Hatch Markings */}
                    <rect x="70" y="30" width="180" height="230" fill="url(#cylinderGrad)" stroke="#3a3d4d" strokeWidth="2" rx="4" />
                    {/* Cylinder Bore Cross-hatching lines */}
                    <line x1="80" y1="50" x2="240" y2="90" stroke="#4a4d5a" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" />
                    <line x1="80" y1="90" x2="240" y2="50" stroke="#4a4d5a" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" />
                    <line x1="80" y1="110" x2="240" y2="150" stroke="#4a4d5a" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" />
                    <line x1="80" y1="150" x2="240" y2="110" stroke="#4a4d5a" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" />

                    {/* Spark Plug at Cylinder Top */}
                    <g transform="translate(160, 20)">
                      <rect x="-10" y="-12" width="20" height="24" fill="#64748b" rx="2" />
                      <line x1="0" y1="12" x2="0" y2="24" stroke="#e2e8f0" strokeWidth="3" />
                      <path d="M-4 24 L0 26 L4 24" stroke="#f59e0b" strokeWidth="2" fill="none" />
                      {/* Animated Combustion Flame Burst */}
                      <circle
                        cx="0"
                        cy="30"
                        r="28"
                        fill="url(#flameGrad)"
                        className="animate-spark"
                      />
                    </g>

                    {/* Moving Piston Assembly */}
                    <motion.g
                      animate={isPlaying ? { y: [0, 52, 0] } : { y: 26 }}
                      transition={{
                        duration: animationDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Piston Crown & Skirt */}
                      <rect x="85" y="60" width="150" height="75" rx="6" fill="url(#pistonGrad)" stroke="#64748b" strokeWidth="1.5" />
                      {/* Compression & Oil Rings */}
                      <line x1="85" y1="68" x2="235" y2="68" stroke="#101014" strokeWidth="2" />
                      <line x1="85" y1="74" x2="235" y2="74" stroke="#101014" strokeWidth="2" />
                      <line x1="85" y1="80" x2="235" y2="80" stroke="#101014" strokeWidth="2.5" />

                      {/* Piston Gudgeon/Wrist Pin */}
                      <circle cx="160" cy="98" r="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="160" cy="98" r="6" fill="#f59e0b" />

                      {/* Articulated Connecting Rod (Upper half moves with piston) */}
                      <path
                        d="M152 104 L148 230 L172 230 L168 104 Z"
                        fill="#334155"
                        stroke="#64748b"
                        strokeWidth="1.5"
                      />
                    </motion.g>

                    {/* Rotating Crankshaft Counterweight & Journal */}
                    <motion.g
                      transform="translate(160, 275)"
                      animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                      transition={{
                        duration: animationDuration,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {/* Crank Web / Counterweight */}
                      <circle cx="0" cy="0" r="48" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                      <path d="M-40 0 A40 40 0 0 0 40 0 Z" fill="#0f172a" />
                      {/* Crankpin Offset */}
                      <circle cx="0" cy="-26" r="13" fill="#cbd5e1" stroke="#f59e0b" strokeWidth="3" />
                      <circle cx="0" cy="0" r="10" fill="#334155" />
                    </motion.g>
                  </svg>

                  {/* 4-Stroke Cycle Status Callout */}
                  <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === 'en' ? 'Active 4-Stroke Cycle' : 'Κύκλος 4 Χρόνων'}</span>
                    </span>
                    <span className="font-medium">13.8:1 Compression · 14,200 RPM Peak</span>
                  </div>
                </div>
              )}

              {/* TAB 2: DISC BRAKE & CALIPER */}
              {activeTab === 'brakes' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <svg viewBox="0 0 340 340" className="w-full h-full max-h-80">
                    <defs>
                      <linearGradient id="discSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                      <linearGradient id="goldCarrier" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#78350f" />
                      </linearGradient>
                      <radialGradient id="heatGlow">
                        <stop offset="60%" stopColor="#ff4500" stopOpacity="0.4" />
                        <stop offset="90%" stopColor="#ff0000" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Rotating Disc Rotor */}
                    <motion.g
                      transform="translate(170, 170)"
                      animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                      transition={{
                        duration: animationDuration * 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {/* Outer Braking Band */}
                      <circle cx="0" cy="0" r="140" fill="none" stroke="url(#discSteel)" strokeWidth="48" />
                      {/* Wave Outer Perimeter */}
                      <circle cx="0" cy="0" r="144" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="16 8" />

                      {/* Cross-Drilled Cooling Holes Pattern */}
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <g key={deg} transform={`rotate(${deg})`}>
                          <circle cx="0" cy="-122" r="3" fill="#0f172a" />
                          <circle cx="8" cy="-132" r="3" fill="#0f172a" />
                          <circle cx="-8" cy="-132" r="3" fill="#0f172a" />
                          <circle cx="0" cy="-142" r="3" fill="#0f172a" />
                        </g>
                      ))}

                      {/* Inner Floating Anodized Gold Carrier */}
                      <circle cx="0" cy="0" r="75" fill="none" stroke="url(#goldCarrier)" strokeWidth="24" />
                      {/* Floating Bobbins / Rivets */}
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <g key={deg} transform={`rotate(${deg})`}>
                          <circle cx="0" cy="-90" r="8" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
                          <circle cx="0" cy="-90" r="3" fill="#f59e0b" />
                        </g>
                      ))}

                      {/* Central Axle Mount */}
                      <circle cx="0" cy="0" r="42" fill="#090a0f" stroke="#475569" strokeWidth="2" />
                      <circle cx="0" cy="0" r="24" fill="#0f172a" />
                    </motion.g>

                    {/* Stationary Brembo-Style Monoblock Radial Caliper */}
                    <g transform="translate(240, 60)">
                      <rect x="0" y="0" width="70" height="110" rx="10" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                      {/* Caliper cooling ribs */}
                      <line x1="10" y1="20" x2="60" y2="20" stroke="#3f3f46" strokeWidth="3" />
                      <line x1="10" y1="32" x2="60" y2="32" stroke="#3f3f46" strokeWidth="3" />
                      <line x1="10" y1="44" x2="60" y2="44" stroke="#3f3f46" strokeWidth="3" />
                      {/* Dual Hydraulic Pistons */}
                      <circle cx="35" cy="65" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="35" cy="92" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                      {/* Caliper Nameplate */}
                      <text x="35" y="10" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                        RADIAL 4P
                      </text>
                      {/* Bleed Nipple */}
                      <circle cx="15" cy="-4" r="4" fill="#cbd5e1" />
                    </g>
                  </svg>

                  <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-amber-600 font-semibold">320mm Floating Rotor · Dual 4-Piston</span>
                    <span className="font-medium">Zero Brake Fade Guarantee</span>
                  </div>
                </div>
              )}

              {/* TAB 3: RACING CHAIN & SPROCKET */}
              {activeTab === 'chain' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <svg viewBox="0 0 360 300" className="w-full h-full max-h-80">
                    <defs>
                      <linearGradient id="goldChain" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                    </defs>

                    {/* Large Rear Sprocket (Rotating) */}
                    <motion.g
                      transform="translate(110, 150)"
                      animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                      transition={{
                        duration: animationDuration * 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {/* Sprocket Disc */}
                      <circle cx="0" cy="0" r="95" fill="#18181b" stroke="#52525b" strokeWidth="3" />
                      {/* Lightening Windows */}
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <circle key={deg} cx={Math.cos((deg * Math.PI) / 180) * 55} cy={Math.sin((deg * Math.PI) / 180) * 55} r="16" fill="#090a0f" stroke="#3f3f46" strokeWidth="1.5" />
                      ))}
                      {/* Teeth around perimeter */}
                      {[...Array(36)].map((_, i) => (
                        <rect
                          key={i}
                          x="-3"
                          y="-105"
                          width="6"
                          height="12"
                          rx="2"
                          fill="#a1a1aa"
                          transform={`rotate(${i * 10})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="25" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
                    </motion.g>

                    {/* Small Countershaft Front Sprocket (Rotating Fast) */}
                    <motion.g
                      transform="translate(290, 150)"
                      animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                      transition={{
                        duration: animationDuration * 0.7,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <circle cx="0" cy="0" r="42" fill="#27272a" stroke="#71717a" strokeWidth="2" />
                      {[...Array(16)].map((_, i) => (
                        <rect
                          key={i}
                          x="-2.5"
                          y="-48"
                          width="5"
                          height="9"
                          rx="1.5"
                          fill="#cbd5e1"
                          transform={`rotate(${i * 22.5})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="14" fill="#090a0f" stroke="#e2e8f0" strokeWidth="2" />
                    </motion.g>

                    {/* Continuous Gold Chain Top & Bottom Strands with Motion Dashes */}
                    <motion.line
                      x1="110"
                      y1="55"
                      x2="290"
                      y2="108"
                      stroke="url(#goldChain)"
                      strokeWidth="10"
                      strokeDasharray="14 6"
                      animate={isPlaying ? { strokeDashoffset: [0, -40] } : {}}
                      transition={{ duration: animationDuration * 0.4, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.line
                      x1="110"
                      y1="245"
                      x2="290"
                      y2="192"
                      stroke="url(#goldChain)"
                      strokeWidth="10"
                      strokeDasharray="14 6"
                      animate={isPlaying ? { strokeDashoffset: [0, 40] } : {}}
                      transition={{ duration: animationDuration * 0.4, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Laser Alignment Indicator Beam */}
                    <line x1="290" y1="108" x2="70" y2="50" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </svg>

                  <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-amber-600 font-semibold">DID 525 ZVM-X Gold Chain · Laser True</span>
                    <span className="font-medium">100% Riveted Master Link</span>
                  </div>
                </div>
              )}

              {/* TAB 4: INVERTED FORK & SUSPENSION STROKE */}
              {activeTab === 'suspension' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <svg viewBox="0 0 340 320" className="w-full h-full max-h-80">
                    <defs>
                      <linearGradient id="goldStanchion" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b45309" />
                        <stop offset="40%" stopColor="#f59e0b" />
                        <stop offset="80%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#92400e" />
                      </linearGradient>
                      <linearGradient id="chromeTube" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="50%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                    </defs>

                    {/* Inverted Fork Outer Gold Stanchion (Upper) */}
                    <rect x="90" y="20" width="46" height="150" rx="4" fill="url(#goldStanchion)" stroke="#78350f" strokeWidth="2" />
                    <rect x="190" y="20" width="46" height="150" rx="4" fill="url(#goldStanchion)" stroke="#78350f" strokeWidth="2" />

                    {/* Triple Tree Clamps */}
                    <rect x="70" y="40" width="186" height="20" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
                    <rect x="70" y="110" width="186" height="24" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />

                    {/* SKF Green Seal Collars */}
                    <rect x="88" y="165" width="50" height="12" rx="2" fill="#059669" stroke="#10b981" strokeWidth="1" />
                    <rect x="188" y="165" width="50" height="12" rx="2" fill="#059669" stroke="#10b981" strokeWidth="1" />

                    {/* Reciprocating Inner Chrome Stanchions (Lower Leg Stroke) */}
                    <motion.g
                      animate={isPlaying ? { y: [0, -35, 0] } : { y: -15 }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Hard Chrome Sliders */}
                      <rect x="94" y="175" width="38" height="110" fill="url(#chromeTube)" stroke="#94a3b8" strokeWidth="1" />
                      <rect x="194" y="175" width="38" height="110" fill="url(#chromeTube)" stroke="#94a3b8" strokeWidth="1" />

                      {/* Radial Caliper Foot & Axle Lug */}
                      <path d="M85 270 L140 270 L140 310 L85 310 Z" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
                      <path d="M185 270 L240 270 L240 310 L185 310 Z" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
                      <circle cx="112" cy="290" r="12" fill="#090a0f" stroke="#f59e0b" strokeWidth="2" />
                      <circle cx="212" cy="290" r="12" fill="#090a0f" stroke="#f59e0b" strokeWidth="2" />
                    </motion.g>

                    {/* Travel Stroke Measurement Scale on side */}
                    <g transform="translate(255, 175)">
                      <line x1="0" y1="0" x2="0" y2="100" stroke="#64748b" strokeWidth="2" />
                      <line x1="0" y1="0" x2="10" y2="0" stroke="#f59e0b" strokeWidth="2" />
                      <line x1="0" y1="30" x2="6" y2="30" stroke="#64748b" strokeWidth="1" />
                      <line x1="0" y1="60" x2="6" y2="60" stroke="#64748b" strokeWidth="1" />
                      <line x1="0" y1="90" x2="10" y2="90" stroke="#f59e0b" strokeWidth="2" />
                      <text x="14" y="5" fill="#f59e0b" fontSize="9" fontFamily="monospace">0mm</text>
                      <text x="14" y="95" fill="#f59e0b" fontSize="9" fontFamily="monospace">120mm</text>
                    </g>
                  </svg>

                  <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="text-amber-600 font-semibold">SKF Heavy-Duty Green Seals · 120mm Stroke</span>
                    <span className="font-medium">Micro-Polished Stanchions</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom RPM Controls & Diagnostics Info */}
            <div className="pt-4 border-t border-slate-200 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 flex items-center gap-3">
                <span className="text-xs font-mono uppercase text-slate-600 font-bold">
                  {lang === 'en' ? 'Tachometer Rate' : 'Στροφές (RPM)'}:
                </span>
                <input
                  type="range"
                  min="800"
                  max="14000"
                  step="200"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const sMap: Record<string, string> = {
                    piston: 'engine-rebuild',
                    brakes: 'brakes-abs',
                    chain: 'cvt-chain-drivetrain',
                    suspension: 'suspension-tuning',
                  };
                  onBookService(sMap[activeTab]);
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {lang === 'en' ? 'Book Overhaul For This Assembly' : 'Κλείστε Επισκευή για Αυτό το Μέρος'}
              </button>
            </div>
          </div>

          {/* Interactive Superbike Hotspot Blueprint (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Chassis Blueprint Telemetry' : 'Τηλεμετρία & Σημεία Ελέγχου'}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {selectedHotspot} / {blueprintHotspots.length} Selected
                </span>
              </div>

              {/* Blueprint Bike Diagram Container with Pulsing Hotspots */}
              <div className="relative aspect-[16/10] bg-slate-900 rounded-xl border border-slate-700 mb-6 overflow-hidden flex items-center justify-center p-4 shadow-sm">
                {/* Technical Blueprint Grid */}
                <div className="absolute inset-0 bg-cad-grid opacity-25 pointer-events-none" />

                {/* Stylized Modern Superbike Silhouette Vector */}
                <svg viewBox="0 0 500 320" className="w-full h-full max-h-56 opacity-85 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]">
                  {/* Wheels */}
                  <circle cx="105" cy="220" r="55" fill="none" stroke="#64748b" strokeWidth="8" />
                  <circle cx="105" cy="220" r="32" fill="none" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="395" cy="220" r="55" fill="none" stroke="#64748b" strokeWidth="8" />
                  <circle cx="395" cy="220" r="32" fill="none" stroke="#f59e0b" strokeWidth="3" />

                  {/* Trellis Frame & Geometry Lines */}
                  <path
                    d="M105 220 L160 120 L270 120 L310 180 L395 220"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M160 120 L240 185 L395 220"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="3"
                  />
                  {/* Front USD Forks */}
                  <line x1="160" y1="120" x2="105" y2="220" stroke="#f59e0b" strokeWidth="5" />
                  {/* Clip-on Handlebar & Tank */}
                  <path
                    d="M140 100 L165 110 L230 110 L250 145 L180 145 Z"
                    fill="#18181b"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />
                  {/* Engine Block Silhouette */}
                  <rect x="180" y="160" width="85" height="70" rx="8" fill="#27272a" stroke="#f59e0b" strokeWidth="1.5" />
                  {/* Exhaust Pipe Sweep */}
                  <path
                    d="M230 220 Q280 240 370 210"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="4"
                  />
                  {/* Seat Subframe */}
                  <path
                    d="M270 120 L360 135 L330 160 Z"
                    fill="#18181b"
                    stroke="#64748b"
                    strokeWidth="2"
                  />
                </svg>

                {/* Interactive Hotspot Node Markers */}
                {blueprintHotspots.map((spot) => {
                  const isSelected = selectedHotspot === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setSelectedHotspot(spot.id)}
                      style={{ left: spot.x, top: spot.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-2 z-10"
                      title={lang === 'en' ? spot.nameEn : spot.nameEl}
                    >
                      <span className="relative flex h-5 w-5">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            isSelected ? 'bg-amber-400' : 'bg-neutral-400'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[10px] font-bold font-mono transition-transform duration-200 group-hover:scale-125 ${
                            isSelected
                              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/50'
                              : 'bg-neutral-800 text-neutral-300 border border-neutral-600'
                          }`}
                        >
                          {spot.id}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Hotspot Detailed Card */}
              {(() => {
                const currentSpot = blueprintHotspots.find(s => s.id === selectedHotspot) || blueprintHotspots[0];
                return (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-600 font-bold">
                        ZONE 0{currentSpot.id} · {lang === 'en' ? 'TOLERANCE CRITICAL' : 'ΚΡΙΣΙΜΟ ΣΗΜΕΙΟ'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <h3 className="text-base font-display font-bold uppercase text-slate-950">
                      {lang === 'en' ? currentSpot.nameEn : currentSpot.nameEl}
                    </h3>
                    <p className="text-xs text-slate-700 font-mono leading-relaxed">
                      {lang === 'en' ? currentSpot.specsEn : currentSpot.specsEl}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Quick Hotspot Action */}
            <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                {lang === 'en' ? 'Click nodes to inspect components' : 'Επιλέξτε σημεία για ανάλυση'}
              </div>
              <button
                type="button"
                onClick={() => {
                  const currentSpot = blueprintHotspots.find(s => s.id === selectedHotspot) || blueprintHotspots[0];
                  onBookService(currentSpot.serviceId);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-slate-200"
              >
                <span>{lang === 'en' ? 'Request Service' : 'Αίτηση Σέρβις'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
