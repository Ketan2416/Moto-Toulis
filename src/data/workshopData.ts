export interface ServiceItem {
  id: string;
  titleEn: string;
  titleEl: string;
  category: 'maintenance' | 'engine' | 'suspension' | 'electrical' | 'brakes' | 'transmission';
  descriptionEn: string;
  descriptionEl: string;
  turnaroundEn: string;
  turnaroundEl: string;
  estimatedPrice: string;
  includedEn: string[];
  includedEl: string[];
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleEl: string;
  category: 'superbike' | 'engine' | 'custom' | 'adventure' | 'scooter' | 'enduro';
  bikeModel: string;
  year: number;
  engineDisplacement: string;
  image: string;
  beforeNotesEn?: string;
  beforeNotesEl?: string;
  afterNotesEn?: string;
  afterNotesEl?: string;
  descriptionEn: string;
  descriptionEl: string;
  workPerformedEn: string[];
  workPerformedEl: string[];
  partsInstalledEn: string[];
  partsInstalledEl: string[];
  testimonial?: {
    rider: string;
    quoteEn: string;
    quoteEl: string;
    rating: number;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  bike: string;
  location: string;
  rating: number;
  date: string;
  commentEn: string;
  commentEl: string;
}

export const WORKSHOP_INFO = {
  name: 'Moto Toulis',
  legalName: 'Moto Toulis Motorcycle Mechanic & Service',
  address: 'Omonoias 74b, Lemesos 3048, Cyprus',
  city: 'Limassol',
  country: 'Cyprus',
  lat: 34.6677512,
  lng: 33.0135204,
  mapsUrl: 'https://maps.app.goo.gl/V1kSPiSwa6Awbzrh6',
  facebookUrl: 'https://www.facebook.com/mototoulis/',
  phoneGreek: '+357 96 323535',
  phoneGreekRaw: '+35796323535',
  phoneEnglish: '+357 96 643063',
  phoneEnglishRaw: '+35796643063',
  email: 'mototoulis.service@gmail.com',
  schedule: {
    weekdays: '08:00 – 18:30',
    saturday: '08:00 – 16:00',
    sunday: 'Closed',
  },
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'full-service',
    titleEn: 'Comprehensive Periodic Service & Inspection',
    titleEl: 'Πλήρες Περιοδικό Σέρβις & Έλεγχος',
    category: 'maintenance',
    descriptionEn: 'Factory-spec multi-point service using premium synthetic oils (Motul / Castrol), OEM filters, spark plugs, and thorough chassis torque inspection.',
    descriptionEl: 'Πλήρες σέρβις εργοστασιακών προδιαγραφών με συνθετικά λιπαντικά υψηλής απόδοσης, γνήσια φίλτρα, μπουζί και πλήρη έλεγχο ροπών πλαισίου.',
    turnaroundEn: '2 – 4 hours (Same Day)',
    turnaroundEl: '2 – 4 ώρες (Αυθημερόν)',
    estimatedPrice: 'From €70 – €160',
    includedEn: [
      'Motul 300V / 7100 100% Synthetic Oil exchange',
      'OEM or K&N Oil filter & crush washer',
      'Air filter cleaning or replacement',
      'Spark plugs inspection / NGK Iridium installation',
      'Drive chain de-greasing, ultrasonic lube & laser tensioning',
      '32-point safety, chassis, tire & fastener check',
    ],
    includedEl: [
      'Αλλαγή 100% συνθετικού λαδιού Motul 300V / 7100',
      'Γνήσιο ή K&N φίλτρο λαδιού & ροδέλα τάπας',
      'Καθαρισμός ή αντικατάσταση φίλτρου αέρα',
      'Έλεγχος μπουζί / τοποθέτηση ιριδίου NGK',
      'Καθαρισμός, λίπανση & ευθυγράμμιση αλυσίδας με laser',
      'Τεχνικός έλεγχος ασφαλείας 32 σημείων',
    ],
    featured: true,
  },
  {
    id: 'engine-rebuild',
    titleEn: 'Precision Engine Diagnostics & Top-End Rebuilds',
    titleEl: 'Διαγνωστικά Κινητήρα & Ανακατασκευή Κεφαλής',
    category: 'engine',
    descriptionEn: 'Microscopic valve clearance adjustment, shim calibration, timing chain replacement, cylinder honing, and complete bottom/top end overhauls.',
    descriptionEl: 'Ρύθμιση βαλβίδων με καλιμπραρισμένα καπελότα, αλλαγή καδένας χρονισμού, ρεκτιφιέ κυλίνδρων και πλήρης ανακατασκευή κινητήρα.',
    turnaroundEn: '2 – 5 days',
    turnaroundEl: '2 – 5 εργάσιμες',
    estimatedPrice: 'Quote upon inspection',
    includedEn: [
      'Micrometer valve lash measurement & precision shimming',
      'Digital compression & cylinder leak-down testing',
      'Camshaft lobes & timing guide wear inspection',
      'Ultrasonic fuel injector & throttle body cleaning',
      'New OEM gaskets, O-rings & copper crush seals',
      'Cylinder head torque-to-yield sequence calibration',
    ],
    includedEl: [
      'Μικρομετρικός έλεγχος διακένων βαλβίδων & νέα καπελότα',
      'Έλεγχος συμπίεσης και διαρροής κυλίνδρου',
      'Έλεγχος εκκεντροφόρων και οδηγών καδένας',
      'Υπερηχητικός καθαρισμός μπεκ ψεκασμού & πεταλούδων',
      'Νέες εργοστασιακές φλάντζες, τσιμούχες & ροδέλες',
      'Σύσφιξη κεφαλής με δυναμόκλειδο ακριβείας',
    ],
    featured: true,
  },
  {
    id: 'suspension-tuning',
    titleEn: 'Suspension Fork Rebuild & Dynamic Sag Tuning',
    titleEl: 'Επισκευή Μπροστινού Συστήματος & Ρύθμιση Αναρτήσεων',
    category: 'suspension',
    descriptionEn: 'Complete teardown of inverted (USD) and conventional forks, SKF dual-compound seal replacement, damper valving, and custom rider sag setup.',
    descriptionEl: 'Πλήρες άνοιγμα αναποδογυρισμένων (USD) και συμβατικών πιρουνιών, τσιμούχες SKF χαμηλής τριβής, φρέσκα λάδια και ρύθμιση sag.',
    turnaroundEn: '1 – 2 days',
    turnaroundEl: '1 – 2 ημέρες',
    estimatedPrice: 'From €90 – €190',
    includedEn: [
      'Inner stanchion inspection & micro-polishing',
      'SKF low-friction oil & dust seal replacement',
      'Motorex / Öhlins high-performance fork oil with exact air gap',
      'Damper cartridge flushing & rebound valve check',
      'Static & dynamic rider sag tuning on delivery',
    ],
    includedEl: [
      'Μικρο-γυάλισμα καλαμιών και έλεγχος γρατσουνιών',
      'Αντικατάσταση τσιμουχών & ξυστρών SKF',
      'Υγρά ανάρτησης Motorex / Öhlins με ακριβές διάκενο αέρα',
      'Καθαρισμός φυσιγγίων και βαλβίδων απόσβεσης',
      'Ρύθμιση στατικού και δυναμικού sag αναβάτη',
    ],
    featured: true,
  },
  {
    id: 'brakes-abs',
    titleEn: 'Braking Systems, Caliper Overhaul & ABS Flush',
    titleEl: 'Συστήματα Φρένων, Ανακατασκευή Δαγκάνων & ABS',
    category: 'brakes',
    descriptionEn: 'Piston de-glaze and rebuild, Brembo/SBS sintered brake pad installation, braided stainless steel lines, and DOT 5.1 pressure fluid purge.',
    descriptionEl: 'Καθαρισμός εμβόλων δαγκάνας, τακάκια Brembo/SBS, σωληνάκια υψηλής πίεσης και εξαέρωση κυκλώματος ABS με DOT 5.1.',
    turnaroundEn: '2 – 4 hours',
    turnaroundEl: '2 – 4 ώρες',
    estimatedPrice: 'From €50 – €140',
    includedEn: [
      'Ultrasonic caliper cleaning & seal replacement',
      'SBS / Brembo Sintered racing or street pads',
      'Disc runout measurement with digital dial indicator',
      'Master cylinder piston & reservoir diaphragm inspection',
      'Full ABS hydraulic block bleed with DOT 5.1 racing fluid',
    ],
    includedEl: [
      'Υπερηχητικός καθαρισμός δαγκάνων & αλλαγή τσιμουχών',
      'Τοποθέτηση μεταλλικών τακακιών SBS / Brembo',
      'Μέτρηση στρέβλωσης δισκόπλακας με ρολόι ακριβείας',
      'Έλεγχος τρόμπας φρένου και διαφράγματος δοχείου',
      'Πλήρης εξαέρωση μονάδας ABS με υγρά DOT 5.1',
    ],
  },
  {
    id: 'electrical-diagnostics',
    titleEn: 'ECU Diagnostics, Charging & Electrical Systems',
    titleEl: 'Ηλεκτρονικά Διαγνωστικά, Στατήρες & Πλεξούδες',
    category: 'electrical',
    descriptionEn: 'Computer OBD diagnostic trouble code reading, stator and regulator/rectifier load testing, parasitic drain detection, and custom loom wiring.',
    descriptionEl: 'Διαγνωστικός έλεγχος εγκεφάλου OBD, έλεγχος στατήρα & ανορθωτή υπό φορτίο, ανίχνευση διαρροών ρεύματος και επισκευή πλεξούδας.',
    turnaroundEn: '1 – 2 days',
    turnaroundEl: '1 – 2 ημέρες',
    estimatedPrice: 'From €45 – €120',
    includedEn: [
      'OBD diagnostic scanning & sensor telemetry live data',
      'Stator AC phase balance & insulation resistance test',
      'MOSFET regulator/rectifier DC voltage stabilization',
      'Battery CCA conductance test & terminal conditioning',
      'Wiring repair with marine-grade heat-shrink and OEM crimps',
    ],
    includedEl: [
      'Σύνδεση με διαγνωστικό εγκεφάλου OBD & ζωντανά δεδομένα',
      'Μέτρηση στατήρα AC και αντίστασης μόνωσης',
      'Έλεγχος ανορθωτή MOSFET για σταθερή τάση φόρτισης',
      'Έλεγχος μπαταρίας CCA και καθαρισμός πόλων',
      'Επισκευές καλωδιώσεων με αδιάβροχα θερμοσυστελλόμενα',
    ],
  },
  {
    id: 'cvt-chain-drivetrain',
    titleEn: 'Drivetrain, Clutch & Scooter CVT Overhaul',
    titleEl: 'Μετάδοση, Συμπλέκτης & Αναβάθμιση CVT Scooter',
    category: 'transmission',
    descriptionEn: 'DID / JT heavy-duty gold chain and sprocket installation, wet clutch friction plate replacement, and maxi-scooter (T-MAX, Beverly, X-ADV) CVT transmission service.',
    descriptionEl: 'Τοποθέτηση χρυσής αλυσίδας & γραναζιών DID/JT, δίσκοι συμπλέκτη και σέρβις φυγοκεντρικής μετάδοσης CVT για scooter & maxi-scooter.',
    turnaroundEn: 'Same Day (2 – 4 hours)',
    turnaroundEl: 'Αυθημερόν (2 – 4 ώρες)',
    estimatedPrice: 'From €60 – €180',
    includedEn: [
      'DID X-Ring / ZVM-X heavy-duty chain riveting',
      'Hardened steel JT front and rear sprockets',
      'Swingarm chain slider & guide inspection',
      'Scooter variator roller weights & slider guide replacement',
      'Kevlar reinforced drive belt & clutch bell deglazing',
    ],
    includedEl: [
      'Πρεσάρισμα αλυσίδας DID X-Ring / ZVM-X με ειδικό εργαλείο',
      'Ατσάλινα σκληρυμένα γρανάζια JT εμπρός & πίσω',
      'Έλεγχος γλίστρας ψαλιδιού και οδηγών αλυσίδας',
      'Αλλαγή μπιλιών variator scooter & οδηγών',
      'Τοποθέτηση ιμάντα Kevlar & τρόχισμα καμπάνας συμπλέκτη',
    ],
  },
  {
    id: 'tire-wheel-service',
    titleEn: 'Tire Fitting, Wheel Balancing & Rim Trueing',
    titleEl: 'Τοποθέτηση Ελαστικών & Ζυγοστάθμιση Ακριβείας',
    category: 'maintenance',
    descriptionEn: 'Scratch-free pneumatic tire mounting for sport, tourer, and dirt bikes, computerized dynamic wheel balancing, valve stems, and spoke tensioning.',
    descriptionEl: 'Τοποθέτηση ελαστικών χωρίς γρατσουνιές στη ζάντα, ηλεκτρονική ζυγοστάθμιση ακριβείας, βαλβίδες και ακτινολόγηση τροχών.',
    turnaroundEn: '45 minutes',
    turnaroundEl: '45 λεπτά',
    estimatedPrice: 'From €25 – €50 per pair',
    includedEn: [
      'Scratch-free pneumatic bead breaker & rim protection clamps',
      'Computerized dynamic spin balancing to within 1 gram',
      'High-pressure angled metal valve stem installation',
      'Wheel bearing play and axle straightness check',
      'Precise rear wheel chain alignment with laser guide',
    ],
    includedEl: [
      'Τοποθέτηση με ειδικά πλαστικά προστασίας ζάντας',
      'Ηλεκτρονική δυναμική ζυγοστάθμιση ακριβείας γραμμαρίου',
      'Τοποθέτηση γωνιακών μεταλλικών βαλβίδων αέρα',
      'Έλεγχος ρουλεμάν τροχού και άξονα',
      'Ευθυγράμμιση πίσω τροχού με ένδειξη laser',
    ],
  },
  {
    id: 'custom-exhaust-mot',
    titleEn: 'Custom Upgrades, Exhaust Fitting & Cyprus MOT Prep',
    titleEl: 'Custom Αναβαθμίσεις, Εξατμίσεις & Προετοιμασία ΜΟΤ',
    category: 'engine',
    descriptionEn: 'Aftermarket performance exhaust installation with custom dB-killers, tail tidy kits, radiator guards, crash protection, and full Cyprus MOT compliance check.',
    descriptionEl: 'Τοποθέτηση επώνυμων εξατμίσεων, σιγαστήρες dB-killer, προστατευτικά κάγκελα, tail tidy και πλήρης προετοιμασία για έλεγχο ΜΟΤ.',
    turnaroundEn: '1 – 2 days',
    turnaroundEl: '1 – 2 ημέρες',
    estimatedPrice: 'From €40 – €150',
    includedEn: [
      'Stainless steel / titanium exhaust header & slip-on fitting',
      'Exhaust port copper crush gasket sealing',
      'Tail tidy wiring & LED indicator resistor balancing',
      'Crash sliders & engine casing protection fitment',
      'Headlight alignment, decibel check & MOT roadworthiness audit',
    ],
    includedEl: [
      'Τοποθέτηση εξατμίσεων τιτανίου / ανοξείδωτου χάλυβα',
      'Στεγανοποίηση λαιμών με χάλκινες ροδέλες',
      'Τοποθέτηση βάσης πινακίδας & αντιστάσεων LED φλας',
      'Τοποθέτηση μανιταριών και προστατευτικών κάρτερ',
      'Ρύθμιση ύψους φαναριού & έλεγχος προδιαγραφών ΜΟΤ',
    ],
  },
];

export const RECENT_PROJECTS: ProjectItem[] = [
  {
    id: 'project-r1m-engine',
    titleEn: 'Yamaha YZF-R1M — Top-End Blueprinted Rebuild & Valve Clearance',
    titleEl: 'Yamaha YZF-R1M — Πλήρης Ανακατασκευή Κεφαλής & Ρύθμιση Βαλβίδων',
    category: 'superbike',
    bikeModel: 'Yamaha YZF-R1M (Crossplane CP4)',
    year: 2021,
    engineDisplacement: '998cc',
    image: '/src/assets/images/project_superbike_engine_1790583592008.jpg',
    beforeNotesEn: 'Arrived with noisy valve train, rough idle hunting between 1,100–1,500 rpm, and reduced top-end pull at track revs.',
    beforeNotesEl: 'Ήρθε στο συνεργείο με θόρυβο στις βαλβίδες, ασταθές ρελαντί 1.100–1.500 σ.α.λ. και απώλεια δύναμης στις υψηλές στροφές.',
    afterNotesEn: 'Rock-steady 1,250 rpm idle, 13.8 bar compression across all four cylinders, and razor-sharp throttle transition with zero valvetrain chatter.',
    afterNotesEl: 'Απόλυτα σταθερό ρελαντί στις 1.250 σ.α.λ., 13.8 bar συμπίεση και στους 4 κυλίνδρους και αστραπιαία απόκριση στο γκάζι.',
    descriptionEn: 'Full teardown of the titanium-valve Crossplane cylinder head. Inspected camshaft journals, micrometer-checked all 16 valve clearances, replaced 9 shims to factory race tolerance, and synchronized throttle bodies.',
    descriptionEl: 'Πλήρης αποσυναρμολόγηση της κεφαλής με βαλβίδες τιτανίου. Έλεγχος εκκεντροφόρων, μέτρηση και των 16 διακένων, αλλαγή 9 καπελότων σε αγωνιστικές ανοχές και συγχρονισμός πεταλούδων.',
    workPerformedEn: [
      'Complete cylinder head inspection & valve seat carbon removal',
      'Precision micrometer valve clearance shimming (intake 0.19mm, exhaust 0.24mm)',
      'Timing chain hydraulic tensioner check & cam timing re-indexing',
      'Electronic 4-cylinder throttle body synchronization with digital vacuum gauges',
      'Fresh Motul 300V Factory Line 10W-40 & OEM oil filter',
    ],
    workPerformedEl: [
      'Πλήρης έλεγχος κεφαλής και απομάκρυνση επικαθίσεων άνθρακα',
      'Μικρομετρική ρύθμιση βαλβίδων (εισαγωγή 0.19mm, εξαγωγή 0.24mm)',
      'Έλεγχος υδραυλικού εντατήρα καδένας και ακριβής χρονισμός',
      'Ηλεκτρονικός συγχρονισμός 4 πεταλούδων με ψηφιακά υποπιεσόμετρα',
      'Καινούριο λιπαντικό Motul 300V Factory Line 10W-40 & φίλτρο Yamaha',
    ],
    partsInstalledEn: [
      'OEM Yamaha titanium valve shims (assorted sizes)',
      'OEM cylinder head cover rubber gasket & spark plug well seals',
      'NGK Laser Iridium R0045Q-10 spark plugs',
      'Motul 300V 10W-40 100% Synthetic Ester Core',
    ],
    partsInstalledEl: [
      'Γνήσια καπελότα τιτανίου Yamaha',
      'Γνήσια φλάντζα ψευτοκάπακου & τσιμούχες μπουζοθηκών',
      'Αγωνιστικά μπουζί ιριδίου NGK Laser Iridium',
      'Λιπαντικά Motul 300V 10W-40 Ester Core',
    ],
    testimonial: {
      rider: 'Andreas K. (Limassol Track Rider)',
      quoteEn: 'Toulis is the only mechanic in Cyprus I trust with my R1M. The engine runs smoother than the day it left the showroom, and the throttle pickup out of corners is telepathic.',
      quoteEl: 'Ο Τούλης είναι ο μοναδικός μηχανικός στην Κύπρο που εμπιστεύομαι το R1M μου. Το μοτέρ δουλεύει πιο βελούδινα από καινούριο και η απόκριση στις εξόδους των στροφών είναι τέλεια.',
      rating: 5,
    },
  },
  {
    id: 'project-bmw-gs-suspension',
    titleEn: 'BMW R 1250 GS Adventure — Heavy-Duty Dynamic ESA Suspension Overhaul',
    titleEl: 'BMW R 1250 GS Adventure — Πλήρης Επισκευή Αναρτήσεων Dynamic ESA',
    category: 'adventure',
    bikeModel: 'BMW R 1250 GS Adventure',
    year: 2020,
    engineDisplacement: '1254cc ShiftCam',
    image: '/src/assets/images/project_adventure_suspension_1790583615552.jpg',
    beforeNotesEn: 'Front Telelever fork weeping hydraulic fluid onto brake calipers; excessive front-end dive and sluggish rebound over Limassol rough asphalt.',
    beforeNotesEl: 'Διαρροή λαδιού από τα καλάμια πάνω στις δαγκάνες, υπερβολικό βύθισμα στο φρενάρισμα και αργή απόσβεση στις ανωμαλίες του δρόμου.',
    afterNotesEn: 'Pristine dry stanchions, zero brake contamination, plush high-speed bump absorption with firm, stable braking posture.',
    afterNotesEl: 'Καθρέφτης καλάμια χωρίς ίχνος λαδιού, απόλυτη ασφάλεια στα φρένα και υποδειγματική απορρόφηση στις κακοτεχνίες.',
    descriptionEn: 'Complete teardown of the BMW Telelever stanchions and rear ESA damper link. Replaced leaking seals with SKF heavy-duty green seals, ultrasonic-cleaned the valve stacks, and refilled with Motorex racing damper fluid.',
    descriptionEl: 'Πλήρες άνοιγμα των καλαμιών Telelever και του μοχλικού της πίσω ηλεκτρονικής ανάρτησης ESA. Τοποθέτηση πράσινων τσιμουχών SKF, καθαρισμός βαλβίδων και νέα υγρά Motorex.',
    workPerformedEn: [
      'Telelever slider tube extraction and microscopic scratch burnishing',
      'SKF heavy-duty dual-lip oil & debris wiper seal installation',
      'Motorex Racing Fork Oil 7.5W measurement to factory specification',
      'Electronic Dynamic ESA recalibration via diagnostic computer',
      'Front Brembo calipers degreasing and fresh sintered brake pads',
    ],
    workPerformedEl: [
      'Εξαγωγή καλαμιών Telelever και επιφανειακό γυάλισμα γρατσουνιών',
      'Τοποθέτηση τσιμουχών διπλού χείλους & ξυστρών σκόνης SKF',
      'Υγρά Motorex Racing Fork Oil 7.5W σύμφωνα με τις εργοστασιακές προδιαγραφές',
      'Ηλεκτρονική βαθμονόμηση Dynamic ESA μέσω διαγνωστικού',
      'Απολίπανση δαγκάνων Brembo και νέα μεταλλικά τακάκια',
    ],
    partsInstalledEn: [
      'SKF Heavy-Duty Fork Seal & Dust Cap Kit (Green)',
      'Motorex Racing 7.5W Low Friction Damper Fluid',
      'Brembo Sintered Front Brake Pad Set (07BB38SA)',
      'BMW Telelever lower ball joint dust boot',
    ],
    partsInstalledEl: [
      'Κιτ τσιμουχών & ξυστρών SKF Heavy-Duty (Πράσινο)',
      'Υγρά αναρτήσεων Motorex Racing 7.5W',
      'Μεταλλικά τακάκια Brembo Sintered',
      'Φούσκα μπαλάκι Telelever BMW',
    ],
    testimonial: {
      rider: 'Christos P. (Touring Enthusiast)',
      quoteEn: 'Rode up through the Troodos mountains right after the service. The bike is planted, communicative, and the suspension feels brand new. Outstanding workmanship.',
      quoteEl: 'Ανέβηκα στο Τρόοδος αμέσως μετά το σέρβις. Η μηχανή είναι βράχος, διαβάζει το δρόμο υποδειγματικά και οι αναρτήσεις νιώθουν ολοκαίνουριες. Άψογη δουλειά.',
      rating: 5,
    },
  },
  {
    id: 'project-ducati-monster-restomod',
    titleEn: 'Ducati Monster 900 — Restomod Cafe Racer & Bespoke Exhaust',
    titleEl: 'Ducati Monster 900 — Restomod Cafe Racer & Custom Εξάτμιση',
    category: 'custom',
    bikeModel: 'Ducati Monster 900 Special',
    year: 1999,
    engineDisplacement: '904cc Desmodromic L-Twin',
    image: '/src/assets/images/project_custom_restomod_1790583603491.jpg',
    beforeNotesEn: 'Classic carb-fed Monster stored for 4 years with clogged carburetors, perished belts, dry-rotted electrical loom, and corroded exhaust.',
    beforeNotesEl: 'Κλασικό καρμπυρατεράτο Monster παρατημένο 4 χρόνια με βουλωμένα καρμπυρατέρ, ξεραμένους ιμάντες και φθαρμένη καλωδίωση.',
    afterNotesEn: 'Sensational deep rumble, crisp instantaneous carb throttle response, reliable modernized digital electricals, and head-turning retro-modern stance.',
    afterNotesEl: 'Εκπληκτικός βαθύς ήχος Ducati, ακαριαία απόκριση στο γκάζι, σύγχρονη αξιόπιστη ηλεκτρική εγκατάσταση και ασυναγώνιστη εμφάνιση.',
    descriptionEn: 'Full mechanical revival and bespoke restomod transformation. Serviced Desmodromic valve clearances, installed new Gates Kevlar timing belts, built a custom 2-into-1 stainless exhaust with hand-welded pie-cuts, and modernized the wiring.',
    descriptionEl: 'Πλήρης μηχανική αναβίωση και μετατροπή restomod. Ρύθμιση δεσμοδρομικών βαλβίδων, νέοι ιμάντες χρονισμού Gates Kevlar, χειροποίητη ολόσωμη εξάτμιση inox 2-σε-1 και νέα πλεξούδα.',
    workPerformedEn: [
      'Desmodromic valve opener & closer clearance setting with precision half-rings',
      'Dual Mikuni BDST38 carburetors disassembled, ultrasonically cleaned & re-jetted',
      'Gates Kevlar timing belt installation with sonic tension frequency measurement (110 Hz)',
      'Custom 2-into-1 brushed 304 stainless exhaust fabrication with internal baffle',
      'Minimalist electronic loom with waterproof Deutsch connectors',
    ],
    workPerformedEl: [
      'Ρύθμιση δεσμοδρομικών βαλβίδων ανοίγματος & κλεισίματος με καινούρια ημιδαχτυλίδια',
      'Πλήρες λύσιμο διπλών καρμπυρατέρ Mikuni, υπερηχητικό μπάνιο & νέα ζιγκλέρ',
      'Νέοι ιμάντες Gates Kevlar ρυθμισμένοι με συχνόμετρο (110 Hz)',
      'Χειροποίητη εξάτμιση 2-σε-1 από ανοξείδωτο χάλυβα 304 με σιγαστήρα',
      'Μινιμαλιστική νέα ηλεκτρική πλεξούδα με αδιάβροχα βύσματα Deutsch',
    ],
    partsInstalledEn: [
      'Gates Racing Kevlar Timing Belts',
      'Custom 304 Stainless Steel Mandrel Bends & Pie Cuts',
      'Keihin / Mikuni Brass Jetting & Viton Float Needles',
      'Brembo RCS19 Radial Master Cylinder & Clutch Master',
    ],
    partsInstalledEl: [
      'Ενισχυμένοι ιμάντες Gates Racing Kevlar',
      'Ανοξείδωτες σωληνώσεις 304 & χειροποίητες κοπές',
      'Μπρούτζινα ζιγκλέρ και βελόνες φλοτέρ Viton',
      'Ακτινική τρόμπα φρένου & συμπλέκτη Brembo RCS19',
    ],
    testimonial: {
      rider: 'Nikos D. (Classic Bike Collector)',
      quoteEn: 'Moto Toulis turned an abandoned barn find into a mechanical work of art. The welding on the exhaust is surgical, and that Desmo engine sings flawlessly.',
      quoteEl: 'Ο Μοτο Τούλης μετέτρεψε μια παρατημένη μηχανή σε μηχανολογικό έργο τέχνης. Οι κολλήσεις στην εξάτμιση είναι χειρουργικές και το Desmo κελαηδάει.',
      rating: 5,
    },
  },
  {
    id: 'project-tmax-cvt-tuning',
    titleEn: 'Yamaha T-MAX 560 — Malossi Multivar CVT Performance & 20k Service',
    titleEl: 'Yamaha T-MAX 560 — Αναβάθμιση Μετάδοσης Malossi & Μεγάλο Σέρβις 20k',
    category: 'scooter',
    bikeModel: 'Yamaha T-MAX 560 Tech Max',
    year: 2022,
    engineDisplacement: '562cc Twin',
    image: '/src/assets/images/hero_motorcycle_workshop_1790583579120.jpg',
    beforeNotesEn: 'Sluggish takeoff off the line in Limassol urban traffic, transmission vibration at 40 km/h, and due for major 20,000 km inspection.',
    beforeNotesEl: 'Νωθρή εκκίνηση στα φανάρια στη Λεμεσό, κραδασμοί στη μετάδοση στα 40 χλμ/ώρα και ανάγκη για μεγάλο προγραμματισμένο σέρβις 20.000 χλμ.',
    afterNotesEn: 'Explosive acceleration from 0-100 km/h, linear pull through the entire powerband, zero belt chatter, and silky smooth clutch engagement.',
    afterNotesEl: 'Εκρηκτική εκκίνηση 0-100 χλμ/ώρα, γραμμικό τράβηγμα σε όλο το φάσμα των στροφών και απόλυτα ομαλή σύμπλεξη χωρίς σκορτσαρίσματα.',
    descriptionEn: 'Major milestone service paired with performance CVT tuning. Installed Malossi Multivar 2000 with custom calibrated roller weights, reinforced Kevlar drive belt, secondary drive oil flush, and fresh NGK spark plugs.',
    descriptionEl: 'Μεγάλο σέρβις συνδυασμένο με αναβάθμιση φυγοκεντρικού. Τοποθέτηση Malossi Multivar 2000 με ρυθμισμένες μπίλιες, ενισχυμένο ιμάντα Kevlar και αλλαγή υγρών τελικής μετάδοσης.',
    workPerformedEn: [
      'Malossi Multivar 2000 variator & counter-pulley assembly fitment',
      'Dual roller weight configuration for optimal city torque & highway cruising',
      'Malossi X-Kevlar reinforced drive belt replacement',
      'Secondary reduction gearbox oil exchange (75W-90 Synthetic)',
      'Valve clearance verification & twin throttle body ultrasonic service',
    ],
    workPerformedEl: [
      'Τοποθέτηση βαριατόρ Malossi Multivar 2000 & σταθερής τροχαλίας',
      'Ρύθμιση βάρους μπιλιών για άμεση ροπή στην πόλη και χαμηλές στροφές στο ταξίδι',
      'Τοποθέτηση ενισχυμένου ιμάντα Malossi X-Kevlar',
      'Αλλαγή βαλβολίνης τελικής μετάδοσης (75W-90 Συνθετική)',
      'Έλεγχος διακένων βαλβίδων & καθαρισμός διπλών πεταλούδων',
    ],
    partsInstalledEn: [
      'Malossi Multivar 2000 Variator Kit',
      'Malossi X-Kevlar Drive Belt',
      'Yamaha OEM 20,000km gasket & O-ring pack',
      'Motul Scooter Power 4T 5W-40 100% Synthetic',
    ],
    partsInstalledEl: [
      'Κιτ βαριατόρ Malossi Multivar 2000',
      'Ενισχυμένος ιμάντας Malossi X-Kevlar',
      'Γνήσιο σετ φλαντζών & τσιμουχών Yamaha 20k',
      'Πλήρως συνθετικό λιπαντικό Motul Scooter Power 5W-40',
    ],
    testimonial: {
      rider: 'Giorgos M. (Daily Commuter)',
      quoteEn: 'Transformed my daily commute completely. No more hesitation when overtaking, smooth as glass. Toulis explained every single part he replaced.',
      quoteEl: 'Άλλαξε εντελώς την καθημερινή μου μετακίνηση. Καμία καθυστέρηση στα προσπεράσματα, απίστευτα ομαλό. Ο Τούλης μου εξήγησε αναλυτικά κάθε ανταλλακτικό.',
      rating: 5,
    },
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Stelios Charalambous',
    bike: 'Yamaha MT-09 SP',
    location: 'Limassol, Cyprus',
    rating: 5,
    date: '2 weeks ago',
    commentEn: 'Honest, experienced, and deeply passionate about bikes. Diagnosed an elusive electrical intermittent cut-off that two other shops failed to find. Sorted in 24 hours at a very fair price.',
    commentEl: 'Τίμιος, έμπειρος και με πραγματικό πάθος για τις μηχανές. Εντόπισε ένα περίεργο ηλεκτρικό πρόβλημα διακοπής που άλλα δύο συνεργεία δεν μπορούσαν να βρουν. Το έλυσε σε 24 ώρες σε απόλυτα λογική τιμή.',
  },
  {
    id: 't-2',
    name: 'Dimitris Vassiliou',
    bike: 'Honda CBR1000RR Fireblade',
    location: 'Limassol, Cyprus',
    rating: 5,
    date: '1 month ago',
    commentEn: 'Rebuilt my front Öhlins forks and set up the sag for my exact weight. The difference on track and on the street is night and day. Clean workshop and real precision tools.',
    commentEl: 'Μου έφτιαξε τα μπροστινά Öhlins και ρύθμισε το sag για τα κιλά μου. Η διαφορά στην πίστα και στο δρόμο είναι μέρα με τη νύχτα. Πεντακάθαρο συνεργείο με σοβαρά εργαλεία.',
  },
  {
    id: 't-3',
    name: 'Elena Constantinou',
    bike: 'Vespa GTS 300 Super',
    location: 'Germasogeia, Limassol',
    rating: 5,
    date: '2 months ago',
    commentEn: 'Always transparent about what needs doing right away and what can wait. Full service done quickly, great communication in both Greek and English. Highly recommended!',
    commentEl: 'Πάντα ειλικρινής για το τι χρειάζεται άμεσα αλλαγή και τι μπορεί να περιμένει. Πλήρες σέρβις στην ώρα του, άψογη συνεννόηση. Τον συστήνω ανεπιφύλακτα!',
  },
];

export const FAQ_LIST = [
  {
    qEn: 'Do I need an appointment before bringing my motorcycle?',
    qEl: 'Χρειάζεται να κλείσω ραντεβού πριν φέρω τη μοτοσυκλέτα;',
    aEn: 'For scheduled services, tire fitting, and diagnostics, booking an appointment in advance guarantees faster turnaround. For emergency breakdowns or flat tires, you can drop in during working hours or call us directly.',
    aEl: 'Για προγραμματισμένα σέρβις, ελαστικά και διαγνωστικά, ένα ραντεβού εξασφαλίζει την ταχύτερη εξυπηρέτησή σας. Σε περιπτώσεις έκτακτης ανάγκης ή κλαταρίσματος, μπορείτε να έρθετε απευθείας ή να μας καλέσετε.',
  },
  {
    qEn: 'What motorcycle makes and models do you service?',
    qEl: 'Ποιες μάρκες και τύπους μοτοσυκλετών επισκευάζετε;',
    aEn: 'We specialize across Japanese (Yamaha, Honda, Suzuki, Kawasaki), European (BMW, Ducati, KTM, Aprilia, Triumph, MV Agusta), as well as modern maxi-scooters (T-MAX, Beverly, Vespa, X-ADV).',
    aEl: 'Εξειδικευόμαστε σε όλες τις Ιαπωνικές (Yamaha, Honda, Suzuki, Kawasaki), Ευρωπαϊκές (BMW, Ducati, KTM, Aprilia, Triumph) καθώς και σε maxi-scooter (T-MAX, Beverly, Vespa, X-ADV).',
  },
  {
    qEn: 'Do you provide authentic OEM replacement parts?',
    qEl: 'Χρησιμοποιείτε γνήσια ανταλλακτικά (OEM);',
    aEn: 'Yes. We source genuine OEM parts directly, as well as proven high-performance aftermarket equipment (Motul, Brembo, NGK, DID, SKF, K&N, Malossi) with full transparency on warranty and invoices.',
    aEl: 'Ναι. Προμηθευόμαστε γνήσια ανταλλακτικά OEM, καθώς και κορυφαία aftermarket εξαρτήματα (Motul, Brembo, NGK, DID, SKF, K&N, Malossi) με πλήρη διαφάνεια.',
  },
  {
    qEn: 'Can you prepare my bike for Cyprus MOT roadworthiness inspection?',
    qEl: 'Μπορείτε να προετοιμάσετε τη μοτοσυκλέτα μου για έλεγχο ΜΟΤ;',
    aEn: 'Yes. We run a comprehensive pre-MOT check covering lights, indicators, horn, chassis numbers, tire tread depth, brake balance, and exhaust emissions/noise compliance.',
    aEl: 'Βεβαίως. Κάνουμε πλήρη προ-έλεγχο ΜΟΤ που καλύπτει φώτα, φλας, κόρνα, αριθμό πλαισίου, πέλμα ελαστικών, φρένα και επίπεδα θορύβου/ρύπων.',
  },
];
