/* =====================================================================
   DATA LAYER (demo) — Sales Partner Ford
   In production every block below is published from Sales Partner via API.
   Range, list prices, promotional prices (Rabla de la Ford + customer
   advantage), series, engines, colours, interiors and factory options come
   from ford.ro (Ford România, configurator & range pages, October 2026).
   Images are hot-linked from the Ford media servers (gpas-cache.ford.com,
   ford.ro). Bilingual fields are { ro, en }. Dealer data is fictional.
   All stored prices are WITH VAT (commercial vehicles, which Ford lists
   without VAT, are stored ×1.21); the private / business toggle shows
   net prices for companies.
   ===================================================================== */
window.SP = window.SP || {};

SP.DEALER = {
  name: 'Sales Partner Ford',
  short: 'SP Ford',
  legal: {
    company: 'Demo Auto Dealer S.R.L.', address: 'Șos. Berceni 200, Sector 4, București',
    reg: 'J40/0000/2026', cui: 'RO00000000', capital: '200 RON', email: 'contact@sp-ford.demo'
  },
  importer: {
    company: 'Ford România S.R.L.', official: 'Ford România', site: 'https://www.ford.ro',
    assistance: '+40 21 529 00 70'
  },
  phone: '021 555 03 00', phoneService: '021 555 03 10', phonePro: '021 555 03 30', whatsapp: '+40 722 000 500',
  email: 'vanzari@sp-ford.demo', emailService: 'service@sp-ford.demo', emailPro: 'fordpro@sp-ford.demo',
  hours: [
    { d: { ro: 'Luni – Vineri', en: 'Monday – Friday' }, h: '09:00 – 19:00' },
    { d: { ro: 'Sâmbătă', en: 'Saturday' }, h: '10:00 – 14:00' },
    { d: { ro: 'Duminică', en: 'Sunday' }, h: null }
  ],
  hoursService: [
    { d: { ro: 'Luni – Vineri', en: 'Monday – Friday' }, h: '07:30 – 18:00' },
    { d: { ro: 'Sâmbătă', en: 'Saturday' }, h: '08:00 – 13:00' }
  ],
  social: { fb: '#', ig: '#', yt: '#', tt: '#', in: '#' }
};

SP.TEAM = {
  vd: { name: 'Victor Drăgan', role: { ro: 'Director General', en: 'General Manager' } },
  as: { name: 'Alina Stoica', role: { ro: 'Director Vânzări Autoturisme', en: 'Passenger Car Sales Director' } },
  bm: { name: 'Bogdan Matei', role: { ro: 'Consilier vânzări', en: 'Sales advisor' }, phone: '+40 722 000 501' },
  ec: { name: 'Elena Cazacu', role: { ro: 'Consilier vânzări electrice', en: 'EV sales advisor' }, phone: '+40 722 000 502' },
  ft: { name: 'Florin Tudose', role: { ro: 'Manager Ford Pro', en: 'Ford Pro Manager' }, phone: '+40 722 000 530' },
  lp: { name: 'Laura Popa', role: { ro: 'Consilier flote & vehicule comerciale', en: 'Fleet & commercial vehicle advisor' }, phone: '+40 722 000 531' },
  dn: { name: 'Dan Nistor', role: { ro: 'Șef Service Ford Pro', en: 'Head of Ford Pro Service' } },
  im: { name: 'Irina Marin', role: { ro: 'Consilier service', en: 'Service advisor' }, phone: '+40 722 000 510' }
};

/* image helpers — Ford media servers */
SP.FR = 'https://www.ford.ro';
SP.gpas = id => 'https://www.gpas-cache.ford.com/guid/' + id + '.jpg';
SP.gpng = id => 'https://www.gpas-cache.ford.com/guid/' + id + '.png';
SP.chip = c => 'https://www.gpas-cache.ford.com/colourchip/' + c + '.jpg';
SP.nav = n => SP.FR + '/content/dam/guxeu/global-shared/vehicle-images/global-navigation/' + n + '-global-nav.png';
SP.LOGO = SP.FR + '/content/dam/guxeu/global-shared/header/ford_oval_blue_logo.svg';
SP.LOGO_W = SP.FR + '/content/dam/guxeu/global-shared/header/ford-logo-white.svg';
SP.LINK = n => SP.FR + '/content/dam/guxeu/rhd/central/home/dse/link-cards/Link_card_' + n + '_1000x1000.jpg';

SP.LOCATIONS = [
  { id: 'berceni', name: { ro: 'Showroom Ford & Service Berceni', en: 'Ford Showroom & Service Berceni' }, short: { ro: 'Showroom Berceni', en: 'Berceni Showroom' },
    address: 'Șos. Berceni 200, Sector 4, București', phone: '021 555 03 00', email: 'vanzari@sp-ford.demo',
    lat: 44.3812, lng: 26.1196, img: SP.LINK('Dealer'), types: ['sales', 'service', 'parts', 'charging'],
    services: { ro: ['Vânzări autoturisme Ford — toată gama', 'Test drive Puma, Kuga, Capri, Explorer, Mustang Mach-E', 'Service autorizat Ford, inclusiv vehicule electrice', 'Piese & accesorii originale Ford', 'Stație de încărcare DC 120 kW', 'Finanțare Ford Credit, leasing, asigurări'],
                en: ['Ford passenger car sales — the full range', 'Puma, Kuga, Capri, Explorer, Mustang Mach-E test drives', 'Authorised Ford service, incl. electric vehicles', 'Genuine Ford parts & accessories', '120 kW DC charging station', 'Ford Credit finance, leasing, insurance'] },
    team: ['vd', 'as', 'bm', 'ec'] },
  { id: 'pro', name: { ro: 'Ford Pro Center Chitila', en: 'Ford Pro Center Chitila' }, short: { ro: 'Ford Pro Center', en: 'Ford Pro Center' }, pro: true,
    address: 'Șos. Chitilei 400, Sector 1, București', phone: '021 555 03 30', email: 'fordpro@sp-ford.demo',
    lat: 44.4935, lng: 26.0360, img: SP.gpas('aa756e80-d533-3ac1-a662-8bf08341a1ac'), types: ['sales', 'service', 'body', 'fleet'],
    services: { ro: ['Vehicule comerciale Ford Pro: Transit, Transit Custom, Ranger', 'Test drive vehicule comerciale încărcate', 'Service Ford Pro: program extins, linie rapidă pentru flote', 'Caroserie & vopsitorie, recepție daune', 'Consultanță flote, leasing operațional, Ford Pro Telematics', 'Suprastructuri și transformări prin parteneri'],
                en: ['Ford Pro commercial vehicles: Transit, Transit Custom, Ranger', 'Loaded commercial-vehicle test drives', 'Ford Pro service: extended hours, fast lane for fleets', 'Body & paint shop, insurance claims', 'Fleet consulting, operating lease, Ford Pro Telematics', 'Body conversions through partners'] },
    team: ['ft', 'lp', 'dn', 'im'] }
];

SP.FUEL = {
  ice: { ro: 'Benzină', en: 'Petrol' }, diesel: { ro: 'Diesel', en: 'Diesel' }, mhev: { ro: 'Mild hybrid', en: 'Mild hybrid' }, hev: { ro: 'Hibrid', en: 'Hybrid' },
  phev: { ro: 'Plug-in hibrid', en: 'Plug-in hybrid' }, ev: { ro: 'Electric', en: 'Electric' }
};
SP.BODY = {
  suv: { ro: 'SUV', en: 'SUV' }, sport: { ro: 'Sport', en: 'Sports car' }, mpv: { ro: 'Monovolum', en: 'MPV' },
  van: { ro: 'Furgon / Van', en: 'Van' }, pickup: { ro: 'Pick-up', en: 'Pick-up' }, bus: { ro: 'Microbuz', en: 'Minibus' }
};
SP.SEG = { cars: { ro: 'Autoturisme', en: 'Cars' }, ev: { ro: 'Electrificate', en: 'Electrified' }, pro: { ro: 'Comerciale & Pick-up', en: 'Commercial & Pick-up' } };

/* ---------------------------------------------------------------- HERO (ford.eu Ford Range film) */
SP.HERO = {
  desktop: 'https://www.ford.eu/videos/guxeu/de/homepage/2026/macher-praemie/hero-v2/desktop/J114362_24882_WK_Ford_Range_CXC-CCRT_RSF-Bld_T1_EU_EN_Clean_TVC_6s_1920x1080_25p_AE001_RSF_6Mbps.mp4',
  mobile: 'https://www.ford.eu/videos/guxeu/de/homepage/2026/macher-praemie/hero-v2/mobile/J114362_25054_WK_Ford_Range_CXC-CCRT_RSF-Bld_T1_EU_EN_Clean_9x16_6s_1080x1920_25p_AE001_RSF_6Mbps.mp4',
  poster: 'https://www.ford.eu/content/dam/guxeu/de/home/dse/hero/ford-homepage-de-16x9-macher_praemie_video_thumb_1920x1080.jpg'
};
SP.PRO_IMG = 'aa756e80-d533-3ac1-a662-8bf08341a1ac';

/* ---------------------------------------------------------------- MODELS — ford.ro range (Oct 2026)
   Cars: list "de la" + promo "de la", VAT incl. Commercials: Ford lists them excl. VAT → stored ×1.21.
   Models with SP.CFG get their versions from the configurator data (series × engine). */
(function () {
  const V = 1.21, cv = n => Math.round(n * V);
  const one = (list, promo, trim, engine, fuel, extra) => [Object.assign({ trim: trim || { ro: 'Versiunea de pornire', en: 'Entry version' }, engine: engine || '', list, promo: promo || null, cp: null, kwh: null, gb: 'auto', dr: '', fuel, f: [] }, extra || {})];
  const M = (id, name, seg, body, cut, gal, variants, extra) => Object.assign({ id, name, seg, body, cut, gallery: gal, variants }, extra || {});
  const v = (id, name, fuel, versions, extra) => Object.assign({ id, name, fuel, versions }, extra || {});
  const CV = SP.CFG_VERSIONS || {};
  const cfgV = (mid, filter) => (CV[mid] || []).filter(filter || (() => true)).map(x => Object.assign({}, x));
  const G = SP.gpas, N = SP.nav;
  SP.MODELS = [
    M('puma', 'Puma', 'cars', 'suv', N('puma'), [G('06376282-b45a-30cf-b369-446b2ee3c53b'), G('495361e1-836d-3b9e-a85d-29095ded3672')],
      [v('puma', 'Puma', 'mhev', cfgV('puma')), v('puma-gen-e', 'Puma Gen-E', 'ev', one(36000, 26900, null, { ro: 'Electric, 168 CP, 43 kWh', en: 'Electric, 168 hp, 43 kWh' }, 'ev'), { label: 'Gen-E', cut: N('puma-gen-e') })],
      { tagline: { ro: 'SUV-ul compact Ford, hibrid sau 100% electric.', en: 'Ford’s compact SUV, hybrid or fully electric.' }, intro: { ro: 'Puma combină designul de crossover cu motoare EcoBoost Hybrid de 125–160 CP, MegaBox de 80 l în portbagaj și versiunea ST. Puma Gen-E este varianta 100% electrică.', en: 'Puma pairs crossover design with 125–160 hp EcoBoost Hybrid engines, an 80-litre MegaBox in the boot and the ST version. Puma Gen-E is the fully electric version.' } }),
    M('kuga', 'Kuga', 'cars', 'suv', N('kuga'), [G('8d1bf1ce-8665-3523-bb2b-c52989eee3bb')], [v('kuga', 'Kuga', 'hev', cfgV('kuga'))],
      { tagline: { ro: 'SUV de familie: benzină, hibrid sau plug-in hibrid.', en: 'Family SUV: petrol, hybrid or plug-in hybrid.' }, intro: { ro: 'Kuga vine cu motor EcoBoost 1.5, Full Hybrid FWD sau AWD și Plug-in Hybrid de 243 CP, în seriile Titanium, ST-Line, ST-Line X și Active X.', en: 'Kuga comes with a 1.5 EcoBoost, Full Hybrid FWD or AWD and a 243 hp Plug-in Hybrid, in Titanium, ST-Line, ST-Line X and Active X.' } }),
    M('capri', 'Capri', 'cars', 'suv', N('capri'), [G('cf691464-cb7b-3059-9b0e-9c04e312fdb1')], [v('capri', 'Capri', 'ev', cfgV('capri'))],
      { isNew: true, tagline: { ro: 'SUV coupé 100% electric, până la 627 km.', en: 'Fully electric coupé SUV, up to 627 km.' }, intro: { ro: 'Capri este SUV-ul coupé electric Ford: baterie de 58, 77 sau 79 kWh, tracțiune spate sau integrală de 340 CP și până la 627 km autonomie WLTP.', en: 'Capri is Ford’s electric coupé SUV: a 58, 77 or 79 kWh battery, rear- or 340 hp all-wheel drive and up to 627 km WLTP range.' } }),
    M('explorer', 'Explorer', 'cars', 'suv', N('explorer'), [G('9e57e301-9e6d-3c82-88dd-01a1e1151d65')], [v('explorer', 'Explorer', 'ev', cfgV('explorer'))],
      { tagline: { ro: 'SUV electric spațios, până la 602 km.', en: 'Spacious electric SUV, up to 602 km.' }, intro: { ro: 'Explorer EV oferă spațiu de familie, MegaConsole de 17 l, baterii de 58–79 kWh și până la 602 km autonomie, cu tracțiune spate sau integrală.', en: 'Explorer EV offers family space, a 17-litre MegaConsole, 58–79 kWh batteries and up to 602 km of range, with rear- or all-wheel drive.' } }),
    M('mach-e', 'Mustang Mach-E', 'cars', 'suv', N('mach-e'), [G('8ccfceef-ca98-31aa-a269-15cc993bdc65')], [v('mach-e', 'Mustang Mach-E', 'ev', one(50800, 40000, null, null, 'ev'))],
      { tagline: { ro: 'SUV-ul electric cu spirit Mustang.', en: 'The electric SUV with Mustang spirit.' }, intro: { ro: 'Mustang Mach-E combină performanța Mustang cu propulsia 100% electrică, tracțiune spate sau integrală și versiunea GT.', en: 'Mustang Mach-E combines Mustang performance with a fully electric drivetrain, rear- or all-wheel drive and the GT version.' } }),
    M('mustang', 'Mustang', 'cars', 'sport', N('mustang'), [G('52a4827b-1e66-3742-880c-990848fc7385')], [v('mustang', 'Mustang', 'ice', one(59350, null, null, { ro: '5.0 V8', en: '5.0 V8' }, 'ice'))],
      { tagline: { ro: 'V8 de 5.0 litri. Fastback sau Convertible.', en: '5.0-litre V8. Fastback or Convertible.' }, intro: { ro: 'Noul Mustang păstrează motorul V8 de 5.0 litri, cu cutie manuală sau automată, în caroseriile Fastback și Convertible.', en: 'The new Mustang keeps the 5.0-litre V8, with a manual or automatic gearbox, as a Fastback or Convertible.' } }),
    M('bronco', 'Bronco', 'cars', 'suv', N('bronco'), [G('5b0f5c00-36a9-307c-a994-be1e876203e7')], [v('bronco', 'Bronco', 'ice', one(75650, 53000, null, { ro: '2.7 EcoBoost V6, 4x4', en: '2.7 EcoBoost V6, 4x4' }, 'ice'))],
      { tagline: { ro: 'Off-road-ul legendar, construit pentru aventură.', en: 'The legendary off-roader, built for adventure.' }, intro: { ro: 'Bronco are tracțiune 4x4 permanentă, sistemul G.O.A.T. cu moduri de teren și plafon și uși demontabile.', en: 'Bronco has permanent 4x4, the G.O.A.T. terrain modes and removable roof and doors.' } }),
    M('tourneo-courier', 'Tourneo Courier', 'cars', 'mpv', N('tourneo-courier'), [G('45c88c2d-d202-369d-b23b-5d38f37cf2fc')],
      [v('tourneo-courier', 'Tourneo Courier', 'ice', one(24587, 21000, null, null, 'ice')), v('e-tourneo-courier', 'E-Tourneo Courier', 'ev', one(35054, 29000, null, null, 'ev'), { label: 'E-Tourneo Courier' })],
      { tagline: { ro: 'MPV compact, benzină sau electric.', en: 'Compact MPV, petrol or electric.' }, intro: { ro: 'Tourneo Courier oferă spațiu generos pentru familie într-un format compact, cu motor EcoBoost sau 100% electric.', en: 'Tourneo Courier offers generous family space in a compact footprint, with EcoBoost or fully electric power.' } }),
    M('tourneo-connect', 'Tourneo Connect', 'cars', 'mpv', N('tourneo-connect'), [G('57878453-b07e-32cb-ae47-6a7bf2fba5b1')], [v('tourneo-connect', 'Tourneo Connect', 'diesel', one(34388, 31350, null, null, 'diesel'))],
      { tagline: { ro: 'Până la 7 locuri, flexibil pentru familie.', en: 'Up to 7 seats, flexible for families.' }, intro: { ro: 'Tourneo Connect are până la 7 locuri, scaune rabatabile și ampatament standard sau lung.', en: 'Tourneo Connect has up to 7 seats, folding seats and a standard or long wheelbase.' } }),
    M('tourneo-custom', 'Tourneo Custom', 'cars', 'mpv', N('tourneo-custom'), [G('dbe0c57c-8d73-3132-9ede-2321d873a4e1')],
      [v('tourneo-custom', 'Tourneo Custom', 'diesel', one(53712, null, null, null, 'diesel')), v('e-tourneo-custom', 'E-Tourneo Custom', 'ev', one(54474, 49474, null, null, 'ev'), { label: 'E-Tourneo Custom' })],
      { tagline: { ro: 'Până la 9 locuri, diesel, PHEV sau electric.', en: 'Up to 9 seats, diesel, PHEV or electric.' }, intro: { ro: 'Tourneo Custom transportă până la 9 persoane, cu configurare flexibilă a scaunelor și propulsie diesel, plug-in hibrid sau electrică.', en: 'Tourneo Custom carries up to 9 people, with flexible seating and diesel, plug-in hybrid or electric power.' } }),
    M('mustang-gtd', 'Mustang GTD', 'cars', 'sport', SP.FR + '/content/dam/guxeu/rhd/central/home/dse/column-cards/exterior/ford-homepage-eu-mustang-gtd-exterior-16x7-1920x840.jpg', [], [v('mustang-gtd', 'Mustang GTD', 'ice', [])],
      { status: 'soon', isNew: true, tagline: { ro: 'Supercar-ul Mustang omologat pentru stradă. În curând.', en: 'The road-legal Mustang supercar. Coming soon.' }, intro: { ro: 'Mustang GTD aduce tehnologia de competiție pe drumurile publice. Lasă-ne datele și te anunțăm când avem informații de la Ford România.', en: 'Mustang GTD brings racing technology to public roads. Leave your details and we’ll let you know when Ford România releases information.' } }),
    /* ---- Ford Pro: commercial vehicles (list excl. VAT on ford.ro) ---- */
    M('transit-courier', 'Transit Courier', 'pro', 'van', G('e1dd85f7-7064-37c2-8022-f44d041949f5'), [],
      [v('transit-courier', 'Transit Courier', 'diesel', one(cv(17270), null, null, null, 'diesel')), v('e-transit-courier', 'E-Transit Courier', 'ev', one(cv(31600), null, null, null, 'ev'), { label: 'E-Transit Courier' })],
      { tagline: { ro: 'Furgonul compact pentru oraș.', en: 'The compact van for the city.' }, intro: { ro: 'Transit Courier oferă 2,9 m³ volum de încărcare într-un format compact, cu motor EcoBoost / EcoBlue sau 100% electric.', en: 'Transit Courier offers 2.9 m³ of load space in a compact footprint, with EcoBoost / EcoBlue or fully electric power.' } }),
    M('transit-connect', 'Transit Connect', 'pro', 'van', G('56a0d70d-30f5-3be1-b6e2-91b8de5efa8d'), [], [v('transit-connect', 'Transit Connect', 'diesel', one(cv(25330), null, null, null, 'diesel'))],
      { tagline: { ro: 'Furgon mic, inclusiv plug-in hibrid.', en: 'Small van, including plug-in hybrid.' }, intro: { ro: 'Transit Connect are ampatament standard sau lung, motor diesel, benzină sau plug-in hibrid și tracțiune integrală opțională.', en: 'Transit Connect comes in standard or long wheelbase, with diesel, petrol or plug-in hybrid power and optional AWD.' } }),
    M('transit-custom', 'Transit Custom', 'pro', 'van', G('d0d8cc37-bfa9-382f-aee5-3dac863d4c18'), [G('101f2902-2523-3e6a-a962-03abfa24292f')],
      [v('transit-custom', 'Transit Custom', 'diesel', cfgV('transit-custom', x => x.fuel !== 'ev')), v('e-transit-custom', 'E-Transit Custom', 'ev', cfgV('transit-custom', x => x.fuel === 'ev'), { label: 'E-Transit Custom' })],
      { tagline: { ro: 'Furgonul de 1 tonă: diesel, PHEV sau electric.', en: 'The 1-tonne van: diesel, PHEV or electric.' }, intro: { ro: 'Noul Transit Custom are motoare EcoBlue de 110–150 CP, plug-in hibrid de 232 CP sau E-Transit Custom electric, caroserii Van, DCIV și Kombi și seriile Trend, Limited, Trail și Sport.', en: 'The new Transit Custom has 110–150 hp EcoBlue engines, a 232 hp plug-in hybrid or the electric E-Transit Custom, Van, DCIV and Kombi bodies and the Trend, Limited, Trail and Sport series.' } }),
    M('transit', 'Transit', 'pro', 'van', G('2af0e9cc-ddc7-3f32-98a9-8ae61dd41e84'), [],
      [v('transit', 'Transit', 'diesel', one(cv(33745), null, null, null, 'diesel')), v('e-transit', 'E-Transit', 'ev', one(cv(53895), null, null, null, 'ev'), { label: 'E-Transit' })],
      { tagline: { ro: 'Furgonul mare, de la 3,5 la 4,7 tone.', en: 'The large van, from 3.5 to 4.7 tonnes.' }, intro: { ro: 'Transit este disponibil ca furgon, șasiu cabină sau microbuz, cu tracțiune față, spate sau integrală și versiunea E-Transit 100% electrică.', en: 'Transit comes as a van, chassis cab or minibus, with front-, rear- or all-wheel drive and the fully electric E-Transit.' } }),
    M('transit-city', 'Transit City', 'pro', 'van', G('cc768c0e-b97d-3fbd-807f-6f522df73427'), [], [v('transit-city', 'Transit City', 'ev', one(cv(32423), null, null, null, 'ev'))],
      { isNew: true, tagline: { ro: 'Furgon electric pentru livrări urbane.', en: 'Electric van for urban deliveries.' }, intro: { ro: 'Transit City este furgonul electric gândit pentru livrări în oraș: costuri reduse, autonomie pentru o zi de lucru și acces în zonele cu emisii reduse.', en: 'Transit City is the electric van built for city deliveries: low running costs, a full day of range and access to low-emission zones.' } }),
    M('ranger', 'Ranger', 'pro', 'pickup', G('48a2d5c6-62ec-30d4-94f4-94416e034553'), [G('aa756e80-d533-3ac1-a662-8bf08341a1ac')],
      [v('ranger', 'Ranger', 'diesel', cfgV('ranger')), v('ranger-raptor', 'Ranger Raptor', 'ice', one(cv(63120), null, null, { ro: '3.0 EcoBoost V6, 292 CP', en: '3.0 EcoBoost V6, 292 hp' }, 'ice'), { label: 'Raptor' })],
      { tagline: { ro: 'Pick-up-ul nr. 1 în Europa. Acum și PHEV.', en: 'Europe’s No. 1 pick-up. Now also PHEV.' }, intro: { ro: 'Ranger are motor V6 EcoBlue de 240 CP sau plug-in hibrid de 281 CP, tracțiune 4x4, sarcină utilă de până la 1 tonă și seriile XLT, Limited, Wildtrak, Platinum și MS-RT. Ranger Raptor este versiunea de performanță off-road.', en: 'Ranger has a 240 hp EcoBlue V6 or a 281 hp plug-in hybrid, 4x4, up to 1 tonne payload and the XLT, Limited, Wildtrak, Platinum and MS-RT series. Ranger Raptor is the off-road performance version.' } }),
    M('transit-bus', 'Transit Bus', 'pro', 'bus', G('a6e9523f-44db-3423-9240-c3fc833d0eaf'), [], [v('transit-bus', 'Transit Bus', 'diesel', one(cv(44375), null, null, null, 'diesel'))],
      { tagline: { ro: 'Microbuz de până la 18 locuri.', en: 'Minibus with up to 18 seats.' }, intro: { ro: 'Transit Bus transportă până la 17+1 persoane, pentru transport școlar, turistic sau de personal.', en: 'Transit Bus carries up to 17+1 people, for school, tourist or staff transport.' } })
  ];
  SP.MODELS.forEach((m, i) => {
    m.no = i + 1; m.status = m.status || 'sale';
    m.hero = m.gallery[0] || m.cut;
    m.variants.forEach(x => {
      x.family = m; x.cut = x.cut || m.cut; x.gallery = m.gallery.length ? m.gallery : [m.cut];
      x.versions.forEach((y, j) => { y.id = x.id + '-' + (j + 1); y.variant = y.variant || x; y.trim = SP.L ? y.trim : y.trim; y.promoP = y.promo; });
    });
    m.fuels = [...new Set(m.variants.flatMap(x => x.versions.length ? x.versions.map(y => y.fuel || x.fuel) : [x.fuel]))];
  });
  /* private / business: recompute promo + best (Rabla de la Ford is for private buyers only) */
  SP.applyMode = () => SP.MODELS.forEach(m => {
    m.variants.forEach(x => {
      x.versions.forEach(y => { y.variant = x; y.promo = SP.biz ? (y.adv ? y.list - y.adv : (y.rabla ? null : y.promoP)) : y.promoP; if (y.promo != null && y.promo >= y.list) y.promo = null; y.best = y.promo || y.list; });
      x.from = x.versions.length ? Math.min(...x.versions.map(y => y.list)) : null; x.best = x.versions.length ? Math.min(...x.versions.map(y => y.best)) : null;
    });
    const all = m.variants.flatMap(x => x.versions);
    m.from = all.length ? Math.min(...all.map(y => y.list)) : null; m.best = all.length ? Math.min(...all.map(y => y.best)) : null;
    m.count = all.length; m.maxSave = all.length ? Math.max(...all.map(y => y.list - y.best)) : 0;
  });
  SP.applyMode();
})();
SP.model = id => SP.MODELS.find(m => m.id === id);
SP.variant = id => SP.MODELS.flatMap(m => m.variants).find(v => v.id === id);
SP.version = id => SP.MODELS.flatMap(m => m.variants).flatMap(v => v.versions).find(x => x.id === id);
SP.PRICES_VALID = '2026-11-30';

/* ---------------------------------------------------------------- CONFIGURATOR: dealer accessories & services (demo prices, VAT incl.) */
SP.ACCESSORIES = [
  { id: 'mats', name: { ro: 'Set covorașe cauciuc originale Ford', en: 'Genuine Ford rubber floor mats' }, price: 129, fits: 'all' },
  { id: 'tray', name: { ro: 'Tavă portbagaj / protecție compartiment marfă', en: 'Boot liner / load-floor protection' }, price: 119, fits: 'all' },
  { id: 'film', name: { ro: 'Folie protecție vopsea (față)', en: 'Paint protection film (front)' }, price: 590, fits: 'all' },
  { id: 'tow', name: { ro: 'Cârlig remorcare detașabil, montat', en: 'Detachable tow bar, fitted' }, price: 890, fits: ['ice', 'mhev', 'hev', 'phev', 'diesel'] },
  { id: 'wallbox', name: { ro: 'Ford Connected Wallbox 11 kW, montaj inclus', en: 'Ford Connected Wallbox 11 kW, installed' }, price: 1290, fits: ['ev', 'phev'] },
  { id: 'racking', name: { ro: 'Rafturi compartiment marfă (partener Sortimo)', en: 'Load-area racking (Sortimo partner)' }, price: 1890, fits: ['pro'] },
  { id: 'winter', name: { ro: 'Set roți iarnă complete', en: 'Complete winter wheel set' }, price: 1390, fits: 'all' },
  { id: 'service', name: { ro: 'Ford Protect Service Plan 3 ani', en: 'Ford Protect Service Plan 3 years' }, price: 790, fits: 'all' },
  { id: 'warranty', name: { ro: 'Ford Protect extensie garanție 5 ani / 100.000 km', en: 'Ford Protect warranty extension 5 years / 100,000 km' }, price: 690, fits: 'all' }
];

/* ---------------------------------------------------------------- STOCK (demo — live: Sales Partner API) */
(function () {
  const COL = { alb: ['Frozen White', 'Frozen White', '#F4F4F2'], negru: ['Agate Black', 'Agate Black', '#15171A'], gri: ['Magnetic Grey', 'Magnetic Grey', '#5C6166'], argintiu: ['Solar Silver', 'Solar Silver', '#A9ADB2'], albastru: ['Desert Island Blue', 'Desert Island Blue', '#2F5D7E'], galben: ['Vivid Yellow', 'Vivid Yellow', '#F2C200'], verde: ['Bursting Green', 'Bursting Green', '#7A9A3A'], portocaliu: ['Ignite Orange', 'Ignite Orange', '#D9531E'] };
  /* id, model, variant, version index, colour, status, km, extra discount, location, advisor */
  const rows = [
    ['FD-2601', 'puma', 'puma', 0, 'alb', 'stock', 0, 0, 'berceni', 'bm'], ['FD-2602', 'puma', 'puma', 5, 'galben', 'stock', 0, 400, 'berceni', 'bm'],
    ['FD-2603', 'kuga', 'kuga', 7, 'gri', 'stock', 0, 0, 'berceni', 'bm'], ['FD-2604', 'kuga', 'kuga', 14, 'albastru', 'transit', 0, 0, 'berceni', 'bm'],
    ['FD-2605', 'capri', 'capri', 0, 'galben', 'stock', 0, 0, 'berceni', 'ec'], ['FD-2606', 'explorer', 'explorer', 1, 'argintiu', 'demo', 3200, 1500, 'berceni', 'ec'],
    ['FD-2607', 'mach-e', 'mach-e', 0, 'negru', 'stock', 0, 1000, 'berceni', 'ec'], ['FD-2608', 'tourneo-connect', 'tourneo-connect', 0, 'alb', 'stock', 0, 0, 'berceni', 'bm'],
    ['FD-2609', 'transit-custom', 'transit-custom', 0, 'alb', 'stock', 0, 0, 'pro', 'lp'], ['FD-2610', 'transit-custom', 'transit-custom', 3, 'gri', 'stock', 0, 500, 'pro', 'lp'],
    ['FD-2611', 'transit-custom', 'e-transit-custom', 0, 'alb', 'transit', 0, 0, 'pro', 'lp'], ['FD-2612', 'ranger', 'ranger', 0, 'alb', 'stock', 0, 0, 'pro', 'ft'],
    ['FD-2613', 'ranger', 'ranger', 3, 'portocaliu', 'demo', 4100, 2000, 'pro', 'ft'], ['FD-2614', 'transit', 'transit', 0, 'alb', 'stock', 0, 0, 'pro', 'lp'],
    ['FD-2615', 'transit-courier', 'transit-courier', 0, 'alb', 'stock', 0, 0, 'pro', 'lp'], ['FD-2616', 'bronco', 'bronco', 0, 'verde', 'demo', 2500, 2500, 'berceni', 'as']
  ];
  SP.STOCK = rows.map(r => {
    const [id, mid, vid, vi, col, status, km, extra, loc, adv] = r;
    const m = SP.model(mid), variant = m.variants.find(x => x.id === vid), ver = variant.versions[Math.min(vi, variant.versions.length - 1)], c = COL[col];
    const paint = col === 'alb' ? 0 : 700;
    return {
      id, versionId: ver.id, version: ver, variant, model: m, modelId: m.id, year: 2026, km, status,
      color: { name: { ro: c[0], en: c[1] }, hex: c[2], price: paint },
      vin: 'WF0' + (variant.fuel === 'ev' ? 'E' : 'X') + 'XXGCD' + id.slice(-4) + 'R1',
      get priceList() { return ver.list + paint; }, get price() { return ver.best + paint - extra; }, extraDiscount: extra, location: loc, advisor: adv,
      img: variant.cut, gallery: [variant.cut].concat(variant.gallery || [])
    };
  });
})();

/* ---------------------------------------------------------------- OFFERS (SP Campaigns, demo — based on ford.ro campaigns Oct 2026) */
SP.OFFERS = [
  { id: 'rabla-ford', model: 'puma', cat: 'auto', img: SP.gpas('06376282-b45a-30cf-b369-446b2ee3c53b'), tag: 'Rabla de la Ford',
    title: { ro: 'Rabla de la Ford: Puma de la 18.950 €', en: 'Rabla de la Ford: Puma from €18,950' },
    lead: { ro: 'Predai mașina veche la casare și primești prima Rabla de la Ford plus avantajul client. Puma Titanium de la 18.950 € cu TVA, față de 25.850 € preț de listă.', en: 'Scrap your old car and get the Rabla de la Ford bonus plus the customer advantage. Puma Titanium from €18,950 incl. VAT, versus a €25,850 list price.' }, valid: '2026-11-30', featured: true },
  { id: 'ev-8000', model: 'capri', cat: 'auto', img: SP.gpas('cf691464-cb7b-3059-9b0e-9c04e312fdb1'), tag: '−8.000 € Rabla',
    title: { ro: 'Capri și Explorer electrice cu 8.000 € Rabla de la Ford', en: 'Electric Capri and Explorer with €8,000 Rabla de la Ford' },
    lead: { ro: 'Capri de la 34.000 € și Explorer de la 32.000 € cu TVA, prin Rabla de la Ford și avantaj client.', en: 'Capri from €34,000 and Explorer from €32,000 incl. VAT, with Rabla de la Ford and customer advantage.' }, valid: '2026-11-30' },
  { id: 'kuga-hybrid', model: 'kuga', cat: 'auto', img: SP.gpas('8d1bf1ce-8665-3523-bb2b-c52989eee3bb'), tag: 'Kuga',
    title: { ro: 'Kuga de la 23.900 €', en: 'Kuga from €23,900' },
    lead: { ro: 'SUV-ul de familie Ford, cu motor EcoBoost, Full Hybrid sau Plug-in Hybrid, cu avantaj client și Rabla de la Ford.', en: 'Ford’s family SUV, with EcoBoost, Full Hybrid or Plug-in Hybrid power, customer advantage and Rabla de la Ford.' }, valid: '2026-11-30' },
  { id: 'ford-pro-custom', model: 'transit-custom', cat: 'auto', img: SP.gpas('101f2902-2523-3e6a-a962-03abfa24292f'), tag: 'Ford Pro',
    title: { ro: 'Transit Custom pentru flote: ofertă Ford Pro', en: 'Transit Custom for fleets: Ford Pro offer' },
    lead: { ro: 'Transit Custom de la 31.130 € fără TVA, cu avantaj client, finanțare Ford Credit și pachet de service Ford Pro.', en: 'Transit Custom from €31,130 excl. VAT, with customer advantage, Ford Credit finance and a Ford Pro service plan.' }, valid: '2026-12-31' },
  { id: 'ford-credit', model: null, cat: 'finance', img: SP.LINK('Offers'), tag: 'Ford Credit',
    title: { ro: 'Ford Credit: leasing și credit auto', en: 'Ford Credit: leasing and car finance' },
    lead: { ro: 'Avans de la 10%, rate fixe și leasing operațional cu service inclus pentru companii. Ofertă în 24 de ore.', en: 'From 10% down, fixed instalments and operating lease with service included for companies. Quote within 24 hours.' }, valid: '2026-12-31' },
  { id: 'service-iarna', model: null, cat: 'service', img: SP.LINK('Dealer'), tag: '−15%',
    title: { ro: 'Verificare gratuită de iarnă', en: 'Free winter check' },
    lead: { ro: 'Verificare gratuită în 20 de puncte și reduceri la anvelope, baterii și lichide pentru orice Ford, inclusiv vehicule comerciale.', en: 'Free 20-point check and discounts on tyres, batteries and fluids for any Ford, including commercial vehicles.' }, valid: '2026-12-15' }
];

/* ---------------------------------------------------------------- NEWS (CMS) */
SP.NEWS = [
  { id: 'capri', date: '2026-10-08', img: SP.gpas('cf691464-cb7b-3059-9b0e-9c04e312fdb1'),
    title: { ro: 'Capri: SUV-ul coupé electric, acum cu 340 CP AWD', en: 'Capri: the electric coupé SUV, now with 340 hp AWD' },
    lead: { ro: 'Gama Capri primește versiunea cu tracțiune integrală și autonomie extinsă.', en: 'The Capri range adds the all-wheel-drive, extended-range version.' } },
  { id: 'ranger-phev', date: '2026-09-24', img: SP.gpas('48a2d5c6-62ec-30d4-94f4-94416e034553'),
    title: { ro: 'Ranger PHEV: primul pick-up plug-in hibrid Ford', en: 'Ranger PHEV: Ford’s first plug-in hybrid pick-up' },
    lead: { ro: '281 CP, tracțiune 4x4 și Pro Power Onboard pentru unelte la locul de muncă.', en: '281 hp, 4x4 and Pro Power Onboard for tools on site.' } },
  { id: 'puma-gen-e', date: '2026-09-10', img: SP.gpas('495361e1-836d-3b9e-a85d-29095ded3672'),
    title: { ro: 'Puma Gen-E: Puma devine electric', en: 'Puma Gen-E: Puma goes electric' },
    lead: { ro: 'Același design, MegaBox mai mare și propulsie 100% electrică.', en: 'Same design, a bigger MegaBox and a fully electric drivetrain.' } },
  { id: 'transit-city', date: '2026-08-28', img: SP.gpas('cc768c0e-b97d-3fbd-807f-6f522df73427'),
    title: { ro: 'Transit City: furgonul electric pentru oraș', en: 'Transit City: the electric van for the city' },
    lead: { ro: 'Noul membru al familiei Ford Pro, gândit pentru livrări urbane.', en: 'The newest member of the Ford Pro family, built for urban deliveries.' } }
];
SP.NEWS_BODY = {
  ro: ['Ford este reprezentat în România de Ford România. Gama cuprinde autoturisme cu motoare EcoBoost, hibride și 100% electrice, precum și vehiculele comerciale Ford Pro: Transit, Transit Custom, Transit Courier, Transit Connect și Ranger.', 'Vehiculele noi beneficiază de garanția Ford, cu extensii Ford Protect disponibile, iar componentele de înaltă tensiune ale vehiculelor electrice au garanție de 8 ani sau 160.000 km.', 'Programează un test drive la Sales Partner Ford și descoperă modelul potrivit pentru tine, cu ofertă personalizată Ford Credit.'],
  en: ['Ford is represented in Romania by Ford România. The range includes EcoBoost, hybrid and fully electric cars, plus Ford Pro commercial vehicles: Transit, Transit Custom, Transit Courier, Transit Connect and Ranger.', 'New vehicles come with the Ford warranty and optional Ford Protect extensions, and the high-voltage components of electric vehicles are covered for 8 years or 160,000 km.', 'Book a test drive at Sales Partner Ford and find the right model for you, with a tailored Ford Credit offer.']
};
