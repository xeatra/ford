/* =====================================================================
   PAGES — service · brochures · locations · location · news · article · contact · legal · sitemap · 404
   ===================================================================== */
(function () {
  const SP = window.SP; SP.pages = SP.pages || {};
  const t = SP.t, L = v => SP.L(v), I = SP.icon, esc = SP.esc, en = () => SP.lang === 'en';
  const mapSrc = (lat, lng, z) => 'https://maps.google.com/maps?q=' + lat + ',' + lng + '&z=' + (z || 14) + '&output=embed';

  /* ================================================================ SERVICE */
  SP.pages.service = function () {
    const s = { step: 1, plate: '', km: '', model: 'kuga', svc: ['sv.o1'], pickup: false, courtesy: false, day: null, slot: null };
    const days = []; const d0 = new Date(); d0.setHours(12, 0, 0, 0);
    for (let i = 1; days.length < 10; i++) { const d = new Date(d0); d.setDate(d0.getDate() + i); if (d.getDay() !== 0) days.push(d); }
    const slots = ['08:00', '09:00', '10:00', '11:30', '13:00', '14:00', '15:30', '16:30'];
    const busy = (di, si) => (di * 5 + si * 3) % 7 === 0 || (days[di].getDay() === 6 && si > 3);
    const cards = [['garantie', 'shield', 'sv.w', 'sv.wD', null], ['asistenta', 'headset', 'sv.a', 'sv.aD', SP.DEALER.importer.assistance], ['rechemare', 'alert', 'sv.r', 'sv.rD', null], ['manuale', 'book', 'sv.m', 'sv.mD', null], ['accesorii', 'box', 'sv.acc', 'sv.accD', null]];
    const html = SP.phead(t('nav.service'), t('sv.title'), t('sv.sub')) +
      '<section class="section section--tight" id="programare"><div class="container wiz"><div><ol class="steps">' + ['sv.s1', 'sv.s2', 'sv.s3', 'sv.s4'].map((k, i) => '<li data-st="' + (i + 1) + '"><span>' + (i + 1) + '</span>' + t(k) + '</li>').join('') + '</ol><div class="panel" data-wb></div></div>' +
      '<aside class="wiz__a panel panel--soft" data-ws></aside></div></section>' +
      '<section class="section section--soft"><div class="container"><div class="svcards">' + cards.map(c => '<article class="svc" id="' + c[0] + '">' + I(c[1]) + '<h3>' + t(c[2]) + '</h3><p>' + t(c[3]) + (c[4] ? ' <strong>' + c[4] + '</strong>' : '') + '</p>' +
      (c[0] === 'manuale' ? '<a class="link" href="https://www.ford.ro/" target="_blank" rel="noopener">ford.ro' + I('arrow') + '</a>' : c[0] === 'rechemare' || c[0] === 'accesorii' ? '<a class="link" href="#programare">' + t('nav.booking') + I('arrow') + '</a>' : '') + '</article>').join('') + '</div></div></section>';
    function body() {
      if (s.step === 1) return '<div class="grid-f">' + SP.field('w-plate', 'plate', t('sv.plate') + ' *', '<input id="w-plate" name="plate" value="' + esc(s.plate) + '" placeholder="B 123 OJB">', true) +
        SP.field('w-model', 'model', t('f.model'), '<select id="w-model" name="model">' + SP.MODELS.map(m => '<option value="' + m.id + '"' + (m.id === s.model ? ' selected' : '') + '>' + m.name + '</option>').join('') + '</select>') +
        SP.field('w-km', 'km', t('sv.km'), '<input id="w-km" name="km" inputmode="numeric" value="' + esc(s.km) + '" placeholder="15000">') + '</div>';
      if (s.step === 2) return '<div class="chkgrid">' + ['sv.o1', 'sv.o2', 'sv.o3', 'sv.o4', 'sv.o5', 'sv.o6'].map(k => '<label class="copt copt--chk"><input type="checkbox" name="svc" value="' + k + '"' + (s.svc.includes(k) ? ' checked' : '') + '><span class="copt__box">' + I('check') + '</span><span class="copt__n">' + t(k) + '</span></label>').join('') + '</div><span class="err" data-err="svc"></span>' +
        '<label class="check"><input type="checkbox" name="pickup"' + (s.pickup ? ' checked' : '') + '><span>' + t('sv.pickup') + '</span></label><label class="check"><input type="checkbox" name="courtesy"' + (s.courtesy ? ' checked' : '') + '><span>' + t('sv.courtesy') + '</span></label>';
      if (s.step === 3) return '<p class="lbl">' + t('sv.day') + '</p><div class="days">' + days.map((d, i) => '<button type="button" class="day' + (s.day === i ? ' is-on' : '') + '" data-day="' + i + '"><small>' + d.toLocaleDateString(en() ? 'en-GB' : 'ro-RO', { weekday: 'short' }) + '</small><strong>' + d.getDate() + '</strong><small>' + d.toLocaleDateString(en() ? 'en-GB' : 'ro-RO', { month: 'short' }) + '</small></button>').join('') + '</div>' +
        (s.day == null ? '' : '<p class="lbl">' + t('sv.slot') + '</p><div class="slots">' + slots.map((x, i) => { const b = busy(s.day, i); return '<button type="button" class="slot' + (s.slot === x ? ' is-on' : '') + '" data-slot="' + x + '"' + (b ? ' disabled' : '') + '>' + x + (b ? '<small>' + t('sv.full') + '</small>' : '') + '</button>'; }).join('') + '</div>') + '<span class="err" data-err="slot"></span>';
      return '<form data-wf novalidate><div class="grid-f">' + SP.field('w-n', 'name', t('f.name') + ' *', '<input id="w-n" name="name" autocomplete="name">') + SP.field('w-p', 'phone', t('f.phone') + ' *', '<input id="w-p" name="phone" type="tel" autocomplete="tel">') + SP.field('w-e', 'email', t('f.email') + ' *', '<input id="w-e" name="email" type="email" autocomplete="email">', true) + '</div>' +
        '<label class="check"><input type="checkbox" name="gdpr"><span>' + t('f.gdpr') + ' <a href="legal.html?doc=confidentialitate">' + t('ft.privacy') + '</a></span></label><span class="err" data-err="gdpr"></span></form>';
    }
    function sum() {
      const r = (k, v) => '<div><dt>' + k + '</dt><dd>' + (v || '—') + '</dd></div>';
      return '<h3 class="h4">' + t('nav.booking') + '</h3><dl class="sumdl">' + r(t('sv.s1'), (SP.model(s.model) || {}).name + (s.plate ? ' · ' + esc(s.plate) : '')) + r(t('sv.s2'), s.svc.map(t).join(', ')) + r(t('sv.s3'), s.day != null ? days[s.day].toLocaleDateString(en() ? 'en-GB' : 'ro-RO', { weekday: 'long', day: 'numeric', month: 'long' }) + (s.slot ? ', ' + s.slot : '') : '') + r(t('f.loc'), L(SP.LOCATIONS[0].short)) + '</dl>' +
        '<p class="contactl1">' + I('phone') + '<span>' + t('ct.service') + '<strong>' + SP.DEALER.phoneService + '</strong></span></p>';
    }
    function draw(root) {
      root.querySelectorAll('[data-st]').forEach(li => { const n = +li.dataset.st; li.className = n === s.step ? 'is-on' : n < s.step ? 'is-done' : ''; });
      const b = root.querySelector('[data-wb]');
      b.innerHTML = body() + '<div class="wiz__nav">' + (s.step > 1 ? '<button class="btn btn--line" data-wp>' + I('arrowL') + t('c.back') + '</button>' : '<span></span>') + '<button class="btn btn--ink" data-wn>' + (s.step === 4 ? t('sv.book') : t('c.next')) + I('arrow') + '</button></div>';
      root.querySelector('[data-ws]').innerHTML = sum();
      const sync = () => {
        if (s.step === 1) { s.plate = b.querySelector('[name="plate"]').value.trim(); s.model = b.querySelector('[name="model"]').value; s.km = b.querySelector('[name="km"]').value; }
        if (s.step === 2) { s.svc = [...b.querySelectorAll('[name="svc"]:checked')].map(x => x.value); s.pickup = b.querySelector('[name="pickup"]').checked; s.courtesy = b.querySelector('[name="courtesy"]').checked; }
        root.querySelector('[data-ws]').innerHTML = sum();
      };
      b.querySelectorAll('input,select').forEach(x => x.addEventListener('change', sync));
      b.querySelectorAll('[data-day]').forEach(x => x.addEventListener('click', () => { s.day = +x.dataset.day; s.slot = null; draw(root); }));
      b.querySelectorAll('[data-slot]').forEach(x => x.addEventListener('click', () => { s.slot = x.dataset.slot; draw(root); }));
      const p = b.querySelector('[data-wp]'); if (p) p.addEventListener('click', () => { sync(); s.step--; draw(root); });
      const err = (k, m) => { const e = b.querySelector('[data-err="' + k + '"]'); if (e) e.textContent = m || ''; return !m; };
      b.querySelector('[data-wn]').addEventListener('click', () => {
        if (s.step < 3) sync();
        if (s.step === 1 && s.plate.length < 4) { const f = b.querySelector('[name="plate"]'); f.setAttribute('aria-invalid', ''); err('plate', t('sv.errVeh')); f.focus(); return; }
        if (s.step === 2 && !err('svc', s.svc.length ? '' : t('sv.errSvc'))) return;
        if (s.step === 3 && !err('slot', s.day != null && s.slot ? '' : t('sv.errSlot'))) return;
        if (s.step === 4) { const f = b.querySelector('[data-wf]'); if (!SP.validate(f)) return; /* Integration point: POST /api/service-bookings → SP AfterSales */ b.innerHTML = SP.done(t('sv.ok'), t('sv.okD'), '#' + SP.ref('SRV')); root.querySelectorAll('[data-st]').forEach(li => li.className = 'is-done'); return; }
        s.step++; draw(root);
      });
    }
    return { title: t('sv.title'), html, bind: draw };
  };


  /* ================================================================ FORD PRO CENTER (commercial vehicles, fleets) */
  SP.pages.pro = function () {
    const loc = SP.LOCATIONS.find(l => l.pro) || SP.LOCATIONS[0], list = SP.segModels('pro');
    const why = [['bolt', 'pro.w1', 'pro.w1d'], ['box', 'pro.w2', 'pro.w2d'], ['doc', 'pro.w3', 'pro.w3d'], ['wrench', 'pro.w4', 'pro.w4d']];
    const html = '<section class="prohero"><img src="' + SP.gpas(SP.PRO_IMG) + '" alt=""><div class="container prohero__in"><p class="eyebrow">Ford Pro</p><h1 class="h1">' + t('pro.title') + '</h1><p class="lead">' + t('pro.sub') + '</p>' +
      '<div class="btnrow"><a class="btn btn--white" href="#flota">' + t('pro.fleet') + I('arrow') + '</a><a class="btn btn--glass" href="configurator.html?m=transit-custom">' + t('c.configure') + ' Transit Custom</a></div>' + SP.custSeg('cust--hero') + '</div></section>' +
      '<section class="section"><div class="container">' + SP.shead(t('pro.range'), t('pro.rangeT'), null, [t('nav.prices'), 'preturi.html']) + '<div class="rrow">' + list.map(SP.rangeCard).join('') + '</div></div></section>' +
      '<section class="section section--soft"><div class="container">' + SP.shead('Ford Pro', t('pro.why'), null) + '<div class="qtiles">' + why.map(w => '<div class="qtile">' + I(w[0]) + '<strong>' + t(w[1]) + '</strong><span>' + t(w[2]) + '</span></div>').join('') + '</div></div></section>' +
      '<section class="section" id="flota"><div class="container req"><div class="panel"><p class="eyebrow">Ford Pro</p><h2 class="h3">' + t('pro.fleet') + '</h2><p class="muted">' + t('pro.fleetD') + '</p>' + SP.leadForm({ type: 'fleet', model: 'transit-custom', ctx: 'ford-pro', message: true }) + '</div>' +
      '<aside class="req__a"><a class="lcard" href="locatie.html?id=' + loc.id + '"><img src="' + loc.img + '" alt="" loading="lazy"><div><h3>' + L(loc.name) + '</h3><p>' + I('pin') + loc.address + '</p><p>' + I('phone') + loc.phone + '</p><p>' + I('mail') + loc.email + '</p><span class="link link--sm">' + t('lo.view') + I('arrow') + '</span></div></a></aside></div></section>';
    return { title: t('pro.title'), html };
  };

  /* ================================================================ BROCHURES */
  SP.pages.brochures = function () {
    /* Brochures & technical sheets are published by the importer (ford.ro → Broșuri); live: importer DAM link per model */
    const html = SP.phead(t('nav.brochures'), t('br.title'), t('br.sub')) + '<section class="section section--tight"><div class="container"><div class="brl__g">' +
      SP.MODELS.map(m => '<a class="brc" href="https://www.ford.ro/" target="_blank" rel="noopener"><span class="brc__img"><img src="' + m.cut + '" alt="" loading="lazy"></span><span class="brc__b"><small>' + m.fuels.map(f => L(SP.FUEL[f])).join(' · ') + '</small><strong>' + m.name + '</strong><em>' + t('br.item') + '</em></span><span class="btn btn--line btn--sm">' + I('download') + t('c.download') + '</span></a>').join('') + '</div><p class="note">' + t('br.note') + '</p></div></section>';
    return { title: t('br.title'), html };
  };


  /* ================================================================ LOCATIONS */
  const hours = () => '<table class="hours"><tbody>' + SP.DEALER.hours.map(h => '<tr><th>' + L(h.d) + '</th><td>' + (h.h || t('c.closed')) + '</td></tr>').join('') + '</tbody></table>';
  SP.pages.locations = function () {
    const html = SP.phead(t('nav.locations'), t('lo.title'), t('lo.sub')) + '<section class="section section--tight"><div class="container"><div class="map"><iframe title="Map" src="' + mapSrc(44.465, 26.05, 11) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
      '<div class="grid2 locs">' + SP.LOCATIONS.map(l => '<article class="loc"><img src="' + l.img + '" alt="" loading="lazy"><div class="loc__b"><h3>' + L(l.name) + '</h3><p>' + I('pin') + l.address + '</p><p>' + I('phone') + l.phone + '</p><p>' + I('clock') + SP.DEALER.hours[0].h + ' · ' + L(SP.DEALER.hours[0].d) + '</p>' +
      '<div class="btnrow"><a class="btn btn--ink btn--sm" href="locatie.html?id=' + l.id + '">' + t('lo.view') + I('arrow') + '</a><a class="btn btn--line btn--sm" href="tel:' + l.phone.replace(/\s/g, '') + '">' + I('phone') + t('c.call') + '</a></div></div></article>').join('') + '</div></div></section>';
    return { title: t('lo.title'), html };
  };
  SP.pages.location = function () {
    const l = SP.LOCATIONS.find(x => x.id === SP.param('id')) || SP.LOCATIONS[0];
    const html = '<div class="container crumbs"><a class="link link--sm" href="locatii.html">' + I('arrowL') + t('lo.title') + '</a></div><section class="section section--tight"><div class="container ldet"><div><h1 class="h2">' + L(l.name) + '</h1><p class="muted">' + I('pin') + l.address + '</p><img class="ldet__img" src="' + l.img + '" alt="">' +
      '<div class="map map--sm"><iframe title="Map" src="' + mapSrc(l.lat, l.lng) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>' +
      '<aside class="panel panel--soft ldet__a"><h2 class="h4">' + t('lo.hours') + '</h2>' + hours() + '<div class="btnrow"><a class="btn btn--ink btn--sm" href="tel:' + l.phone.replace(/\s/g, '') + '">' + I('phone') + l.phone + '</a><a class="btn btn--line btn--sm" href="https://www.google.com/maps/search/?api=1&query=' + l.lat + ',' + l.lng + '" target="_blank" rel="noopener">' + I('pin') + t('c.directions') + '</a></div>' +
      '<h2 class="h4">' + t('lo.services') + '</h2><ul class="ticks">' + L(l.services).map(x => '<li>' + I('check') + x + '</li>').join('') + '</ul><h2 class="h4">' + t('lo.team') + '</h2><ul class="team">' + l.team.map(k => SP.TEAM[k]).map(p => '<li><span class="avatar">' + p.name.split(' ').map(x => x[0]).join('') + '</span><span><strong>' + p.name + '</strong><small>' + L(p.role) + '</small></span></li>').join('') + '</ul>' +
      '<a class="btn btn--ink btn--block" href="solicita.html?tip=test-drive">' + t('lo.book') + I('arrow') + '</a></aside></div></section>';
    return { title: L(l.name), html };
  };

  /* ================================================================ NEWS */
  SP.pages.news = function () { return { title: t('nw.title'), html: SP.phead(t('nav.news'), t('nw.title'), t('nw.sub')) + '<section class="section section--tight"><div class="container grid3">' + SP.NEWS.map(SP.newsCard).join('') + '</div></section>' }; };
  SP.pages.article = function () {
    const n = SP.NEWS.find(x => x.id === SP.param('id')) || SP.NEWS[0];
    const html = '<section class="ohero"><img src="' + n.img + '" alt=""><div class="container ohero__in"><a class="link link--sm link--w" href="stiri.html">' + I('arrowL') + t('nw.title') + '</a><p class="kicker kicker--w">' + 'Ford' + ' · ' + SP.date(n.date) + '</p><h1 class="h1 h1--sm">' + L(n.title) + '</h1></div></section>' +
      '<section class="section"><div class="container narrow prose"><p class="lead">' + L(n.lead) + '</p>' + SP.NEWS_BODY[SP.lang].map(p => '<p>' + p + '</p>').join('') + '<div class="btnrow"><a class="btn btn--ink" href="solicita.html?tip=test-drive">' + t('c.testdrive') + I('arrow') + '</a><a class="btn btn--line" href="stiri.html">' + t('nw.more') + '</a></div></div></section>';
    return { title: L(n.title), html };
  };

  /* ================================================================ CONTACT */
  SP.pages.contact = function () {
    const box = (h, ph, em) => '<div class="cbox"><h3>' + h + '</h3><p>' + I('phone') + '<strong>' + ph + '</strong></p><p>' + I('mail') + em + '</p></div>';
    const html = SP.phead(t('nav.contact'), t('ct.title'), t('ct.sub')) + '<section class="section section--tight"><div class="container req"><div class="panel">' + SP.leadForm({ type: 'contact', model: 'kuga', message: true }) + '</div>' +
      '<aside class="req__a">' + box(t('ct.sales'), SP.DEALER.phone, SP.DEALER.email) + box(t('ct.service'), SP.DEALER.phoneService, SP.DEALER.emailService) + '<div class="cbox"><h3>' + t('lo.hours') + '</h3>' + hours() + '</div><a class="btn btn--line btn--block" href="https://wa.me/' + SP.DEALER.whatsapp.replace(/\D/g, '') + '" target="_blank" rel="noopener">' + I('whatsapp') + 'WhatsApp ' + SP.DEALER.whatsapp + '</a></aside></div></section>' +
      '<section class="section section--tight"><div class="container"><div class="map"><iframe title="Map" src="' + mapSrc(SP.LOCATIONS[0].lat, SP.LOCATIONS[0].lng) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div></section>';
    return { title: t('ct.title'), html };
  };

  /* ================================================================ LEGAL (footer links, as on the importer platform) */
  SP.pages.legal = function () {
    const D = SP.DEALER, imp = D.importer;
    const docs = {
      'confidentialitate': { t: 'ft.privacy', p: { ro: [['Operatorul datelor', D.legal.company + ', ' + D.legal.address + ', ' + D.legal.reg + ', ' + D.legal.cui + '.'], ['Ce date colectăm', 'Nume, telefon, email, județ, modelul și configurația de interes, datele vehiculului (număr, VIN, kilometraj) și mesajele trimise prin formulare.'], ['Scopul', 'Răspunsul la solicitări (ofertă, test drive, configurație, programare service) și, doar cu acordul tău, comunicări de marketing.'], ['Unde sunt stocate', 'În sistemul de management al dealerului Sales Partner DMS, găzduit în Uniunea Europeană. Datele pot fi partajate cu importatorul ' + imp.official + ' pentru garanție și campanii de rechemare.'], ['Drepturile tale', 'Acces, rectificare, ștergere, restricționare, portabilitate, opoziție și retragerea consimțământului, la ' + D.legal.email + '. Poți depune plângere la ANSPDCP.']],
        en: [['Data controller', D.legal.company + ', ' + D.legal.address + ', ' + D.legal.reg + ', ' + D.legal.cui + '.'], ['What we collect', 'Name, phone, email, county, model and configuration of interest, vehicle data (plate, VIN, mileage) and messages sent through forms.'], ['Purpose', 'Answering requests (quote, test drive, configuration, service booking) and, only with your consent, marketing.'], ['Where it is stored', 'In the dealer management system Sales Partner DMS, hosted in the European Union. Data may be shared with the importer ' + imp.official + ' for warranty and recall campaigns.'], ['Your rights', 'Access, rectification, erasure, restriction, portability, objection and consent withdrawal, at ' + D.legal.email + '. You can complain to ANSPDCP.']] } },
      'cookies': { t: 'ft.cookies', p: { ro: [['Necesare', 'Limba aleasă și preferințele de cookie. Nu pot fi dezactivate.'], ['Analiză', 'Google Analytics 4, doar cu acordul tău.'], ['Marketing', 'Pixeli de remarketing, doar cu acordul tău. Îți poți schimba alegerea oricând.']], en: [['Necessary', 'Chosen language and cookie preferences. Cannot be disabled.'], ['Analytics', 'Google Analytics 4, only with your consent.'], ['Marketing', 'Remarketing pixels, only with your consent. You can change your choice at any time.']] } },
      'mentiuni-legale': { t: 'ft.legalNotes', p: { ro: [['Prețuri', 'Prețurile afișate reprezintă prețuri recomandate de importatorul Ford România (autoturisme cu TVA, vehicule comerciale fără TVA), fără caracter obligatoriu pentru rețeaua de distribuitori. Prețurile promoționale prin programul Remat sunt destinate persoanelor fizice, în limita stocului disponibil și în condițiile programului. Prețurile nu includ echipamente, accesorii sau dotări opționale.'], ['Date tehnice', 'Consumul și emisiile sunt determinate conform procedurii WLTP (Regulamentul UE 2017/1151). Valorile reale pot diferi.'], ['Imagini', 'Imaginile au caracter de prezentare; anumite echipamente sau culori pot să nu fie disponibile.'], ['Garanție', 'Garanție Ford 5 ani fără limită de kilometri; baterii de tracțiune 8 ani / 160.000 km, conform condițiilor importatorului.']], en: [['Prices', 'Prices shown are recommended prices of the importer Ford România, incl. VAT, not binding for the dealer network. Remat promotional prices are for private buyers, while stocks last and under the programme conditions. Prices exclude optional equipment and accessories.'], ['Technical data', 'Consumption and emissions follow the WLTP procedure (EU Regulation 2017/1151). Real values may differ.'], ['Images', 'Images are illustrative; some equipment or colours may not be available.'], ['Warranty', 'Ford 5-year unlimited-mileage warranty; traction batteries 8 years / 160,000 km, per importer terms.']] } },
      'anpc': { t: 'ft.anpc', p: { ro: [['Autoritatea Națională pentru Protecția Consumatorilor', 'https://anpc.ro'], ['Soluționarea alternativă a litigiilor (SAL)', 'https://anpc.ro/ce-este-sal/'], ['Soluționarea online a litigiilor (SOL)', 'https://ec.europa.eu/consumers/odr']], en: [['National Authority for Consumer Protection', 'https://anpc.ro'], ['Alternative dispute resolution (ADR)', 'https://anpc.ro/ce-este-sal/'], ['Online dispute resolution (ODR)', 'https://ec.europa.eu/consumers/odr']] } },
      'mentiune-legala': { t: 'ft.legal', p: { ro: [['Dealer', D.legal.company + ' · ' + D.legal.address + ' · Nr. Reg. Com.: ' + D.legal.reg + ' · Cod fiscal: ' + D.legal.cui + ' · Capital social: ' + D.legal.capital + ' · ' + D.legal.email], ['Importator', imp.company + ' este importatorul oficial Ford în România · ' + imp.site + ' · Asistență rutieră: ' + imp.assistance], ['Cadru legal', 'Activitățile comerciale și de comerț electronic sunt reglementate de legislația în vigoare în România: comerț electronic, protecția consumatorilor și activități comerciale. Legislația este disponibilă la legislatie.just.ro.']],
        en: [['Dealer', D.legal.company + ' · ' + D.legal.address + ' · Trade reg.: ' + D.legal.reg + ' · Tax ID: ' + D.legal.cui + ' · Share capital: ' + D.legal.capital + ' · ' + D.legal.email], ['Importer', imp.company + ' is the official Ford importer in Romania · ' + imp.site + ' · Roadside assistance: ' + imp.assistance], ['Legal framework', 'Commercial and e-commerce activities are governed by Romanian law on e-commerce, consumer protection and trade. Legislation is available at legislatie.just.ro.']] } }
    };
    const key = docs[SP.param('doc')] ? SP.param('doc') : 'mentiune-legala', d = docs[key];
    const html = SP.phead(t('ft.legal'), t(d.t), t('lg.updated') + ': ' + SP.date('2026-10-01')) + '<section class="section section--tight"><div class="container legal"><nav class="legal__n">' + Object.keys(docs).map(k => '<a href="legal.html?doc=' + k + '"' + (k === key ? ' aria-current="page"' : '') + '>' + t(docs[k].t) + '</a>').join('') + '<a href="sitemap.html">' + t('ft.sitemap') + '</a></nav>' +
      '<div class="prose">' + d.p[SP.lang].map(x => '<h2 class="h4">' + x[0] + '</h2><p>' + esc(x[1]).replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>') + '</p>').join('') + '<p class="note">' + t('lg.demo') + '</p></div></div></section>';
    return { title: t(d.t), html };
  };

  SP.pages.sitemap = function () {
    const g = (h, l) => '<div><h2 class="h4">' + h + '</h2><ul>' + l.map(x => '<li><a href="' + x[1] + '">' + x[0] + '</a></li>').join('') + '</ul></div>';
    const html = SP.phead(t('ft.legal'), t('sm.title'), null) + '<section class="section section--tight"><div class="container smap">' +
      g(t('nav.models'), [[t('mega.all'), 'modele.html']].concat(SP.MODELS.map(m => [m.name, 'model.html?m=' + m.id]))) +
      g(t('ft.buy'), [['Home', 'index.html'], [t('nav.prices'), 'preturi.html'], [t('nav.config'), 'configurator.html'], [t('nav.stock'), 'stoc.html'], [t('nav.offers'), 'oferte.html'], [t('nav.testdrive'), 'solicita.html?tip=test-drive'], [t('nav.offer'), 'solicita.html?tip=oferta'], [t('nav.brochures'), 'brosuri.html']]) +
      g(t('ft.service'), [['Ford Pro', 'ford-pro.html'], [t('nav.service'), 'service.html'], [t('nav.locations'), 'locatii.html'], [t('nav.news'), 'stiri.html'], [t('nav.contact'), 'contact.html']]) +
      g(t('ft.legal'), [['ft.privacy', 'confidentialitate'], ['ft.cookies', 'cookies'], ['ft.legalNotes', 'mentiuni-legale'], ['ft.anpc', 'anpc'], ['ft.legal', 'mentiune-legala']].map(x => [t(x[0]), 'legal.html?doc=' + x[1]])) + '</div></section>';
    return { title: t('sm.title'), html };
  };
  SP.pages.notfound = () => ({ title: t('404.t'), html: '<section class="section nf"><div class="container narrow"><p class="eyebrow">404</p><h1 class="h1">' + t('404.t') + '</h1><p class="lead">' + t('404.d') + '</p><div class="btnrow btnrow--c"><a class="btn btn--ink" href="index.html">' + t('404.home') + '</a></div></div></section>' });
})();
