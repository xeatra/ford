/* =====================================================================
   PAGES — home · models · model · prices · configurator · stock · vehicle · request · offers · offer
   ===================================================================== */
(function () {
  const SP = window.SP; SP.pages = SP.pages || {};
  const t = SP.t, L = v => SP.L(v), I = SP.icon, esc = SP.esc, eur = v => SP.eur(v);
  const en = () => SP.lang === 'en';
  const pad = n => String(n).padStart(2, '0');
  const priced = m => m.count > 0;
  const fuelsOf = m => m.fuels.map(f => L(SP.FUEL[f])).join(' · ');
  /* key figures derived from the importer version data */
  const keyFig = v => {
    const vs = v.versions; if (!vs.length) return [];
    const cps = vs.map(x => x.cp).filter(Boolean), kwh = [...new Set(vs.map(x => x.kwh).filter(Boolean))];
    const out = [];
    if (cps.length) out.push([Math.min(...cps) === Math.max(...cps) ? String(Math.max(...cps)) : Math.min(...cps) + '–' + Math.max(...cps), 'CP', t('k.power')]);
    if (kwh.length) out.push([kwh.join(' / '), 'kWh', t('k.battery')]);
    { const drs = [...new Set(vs.map(x => x.dr).filter(Boolean))]; if (drs.length) out.push([drs.join(' / '), '', t('k.drive')]); }
    out.push([String(vs.length), '', t('k.versions')]);
    return out.slice(0, 4);
  };
  const keyRow = v => '<dl class="keys">' + keyFig(v).map(k => '<div><dt>' + k[0] + (k[1] ? '<small>' + k[1] + '</small>' : '') + '</dt><dd>' + k[2] + '</dd></div>').join('') + '</dl>';
  const ptLabel = x => x.promo ? t('p.promo') : '';
  const isN = x => x.fuel === 'ev';
  const vLabel = (m, x) => x.label || x.name.replace(m.name, '').trim() || L(SP.FUEL[x.fuel]);

  /* ================================================================ HOME (ford.ro-style: video hero, range tabs, link cards) */
  SP.pages.home = function () {
    const H = SP.HERO;
    const hero = '<section class="vhero"><video class="vhero__v" data-hv autoplay muted loop playsinline preload="metadata" poster="' + H.poster + '"><source media="(max-width: 700px)" src="' + H.mobile + '" type="video/mp4"><source src="' + H.desktop + '" type="video/mp4"></video><div class="vhero__shade"></div>' +
      '<div class="container vhero__in"><p class="eyebrow">' + t('home.heroK') + '</p><h1 class="h1">' + t('home.heroT') + '</h1><p class="vhero__d">' + t('home.heroD') + '</p>' +
      '<div class="btnrow"><a class="btn btn--white" href="configurator.html">' + t('home.heroC1') + I('arrow') + '</a><a class="btn btn--glass" href="preturi.html">' + t('home.heroC2') + '</a></div>' +
      '<button type="button" class="vhero__pp" data-hp aria-label="Pause">' + I('pause') + '</button></div></section>';

    const segs = ['cars', 'ev', 'pro'];
    const range = '<section class="section"><div class="container">' + SP.shead(t('home.range'), t('home.rangeT'), null, [t('mega.all'), 'modele.html']) +
      '<div class="segtabs" role="tablist">' + segs.map((k, i) => '<button role="tab" type="button" aria-selected="' + (i === 0) + '" data-sg="' + k + '">' + L(SP.SEG[k]) + '<small>' + SP.segModels(k).length + '</small></button>').join('') + '</div>' +
      '<div class="rrow" data-rrow></div></div></section>';

    const links = [['Test%20Drive', 'home.l1', 'home.l1d', 'solicita.html?tip=test-drive'], ['Stock_PV', 'home.l2', 'home.l2d', 'stoc.html'], ['Offers', 'home.l3', 'home.l3d', 'oferte.html'], ['Dealer', 'home.l4', 'home.l4d', 'locatii.html']];
    const lcards = '<section class="section section--soft"><div class="container">' + SP.shead(t('home.links'), SP.DEALER.name, null) + '<div class="lnk4">' +
      links.map(x => '<a class="lnk" href="' + x[3] + '"><img src="' + SP.LINK(x[0]) + '" alt="" loading="lazy"><span><strong>' + t(x[1]) + '</strong><small>' + t(x[2]) + '</small></span>' + I('arrow') + '</a>').join('') + '</div></div></section>';

    const cm = SP.MODELS.filter(m => SP.CFG[m.id]);
    const cfg = '<section class="cfgband"><div class="container cfgband__in"><div><p class="eyebrow">' + t('home.cfgK') + '</p><h2 class="h2">' + t('home.cfgT') + '</h2><p class="lead">' + t('home.cfgD') + '</p>' +
      '<div class="btnrow"><a class="btn btn--ink" href="configurator.html">' + t('nav.config') + I('arrow') + '</a><a class="btn btn--line" href="preturi.html">' + t('nav.prices') + '</a></div></div>' +
      '<ul class="cfgband__l">' + cm.map(m => '<li><a href="configurator.html?m=' + m.id + '"><img src="' + m.cut + '" alt="" loading="lazy"><span><strong>' + m.name + '</strong><small>' + SP.CFG[m.id].series.length + ' ' + t('cfg.sSeries').toLowerCase() + ' · ' + SP.fromLabel(m) + '</small></span>' + I('arrow') + '</a></li>').join('') + '</ul></div></section>';

    const order = { stock: 0, demo: 1, transit: 2 };
    const stock = '<section class="section"><div class="container">' + SP.shead(t('home.stock'), t('home.stockT'), null, [t('c.viewAll') + ' (' + SP.STOCK.length + ')', 'stoc.html']) +
      '<div class="grid4">' + SP.STOCK.slice().sort((a, b) => order[a.status] - order[b.status]).filter((v, i, a) => a.findIndex(x => x.modelId === v.modelId) === i).slice(0, 4).map(SP.stockCard).join('') + '</div></div></section>';

    const offers = '<section class="section section--soft"><div class="container">' + SP.shead(t('home.offers'), t('home.offersT'), null, [t('c.viewAll'), 'oferte.html']) +
      '<div class="grid3">' + SP.OFFERS.slice(0, 3).map(SP.offerCard).join('') + '</div></div></section>';

    const pro = '<section class="band band--pro"><img class="band__bg" src="' + SP.gpas(SP.PRO_IMG) + '" alt="" loading="lazy"><div class="container band__in"><div class="band__txt"><p class="eyebrow">' + t('home.proK') + '</p><h2 class="h2">' + t('home.proT') + '</h2><p>' + t('home.proD') + '</p><div class="btnrow"><a class="btn btn--white" href="ford-pro.html">' + t('home.proC') + I('arrow') + '</a><a class="btn btn--glass" href="solicita.html?tip=flota">' + t('pro.fleet') + '</a></div></div>' +
      '<ul class="savings">' + SP.segModels('pro').slice(0, 5).map(m => '<li><a href="model.html?m=' + m.id + '"><img src="' + m.cut + '" alt="" loading="lazy"><span><strong>' + m.name + '</strong><small>' + SP.fromLabel(m) + '</small></span>' + I('arrow') + '</a></li>').join('') + '</ul></div></section>';

    const svc = '<section class="split2"><img src="' + SP.LINK('Dealer') + '" alt="" loading="lazy"><div class="split2__b"><p class="eyebrow">' + t('nav.service') + '</p><h2 class="h2">' + t('home.svcT') + '</h2><p class="lead">' + t('home.svcD') + '</p>' +
      '<ul class="ticks">' + ['home.sv1', 'home.sv2', 'home.sv3'].map(k => '<li>' + I('check') + t(k) + '</li>').join('') + '</ul><div class="btnrow"><a class="btn btn--ink" href="service.html#programare">' + t('nav.booking') + I('arrow') + '</a><a class="btn btn--line" href="service.html#rechemare">' + t('nav.recall') + '</a></div></div></section>';

    const locs = '<section class="section"><div class="container">' + SP.shead(t('nav.locations'), t('home.locT'), null, [t('c.viewAll'), 'locatii.html']) + '<div class="grid2">' +
      SP.LOCATIONS.map(l => '<a class="lcard" href="locatie.html?id=' + l.id + '"><img src="' + l.img + '" alt="" loading="lazy"><div><h3>' + L(l.name) + '</h3><p>' + I('pin') + l.address + '</p><p>' + I('phone') + l.phone + '</p><span class="link link--sm">' + t('lo.view') + I('arrow') + '</span></div></a>').join('') + '</div></div></section>';

    return {
      title: '', html: hero + range + lcards + cfg + stock + offers + pro + svc + locs,
      bind(root) {
        const v = root.querySelector('[data-hv]'), pp = root.querySelector('[data-hp]');
        pp.addEventListener('click', () => { if (v.paused) { v.play(); pp.innerHTML = I('pause'); } else { v.pause(); pp.innerHTML = I('play'); } });
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); pp.innerHTML = I('play'); }
        const row = root.querySelector('[data-rrow]');
        const draw = k => { row.innerHTML = SP.segModels(k).map(SP.rangeCard).join(''); root.querySelectorAll('[data-sg]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.sg === k))); };
        root.querySelectorAll('[data-sg]').forEach(b => b.addEventListener('click', () => draw(b.dataset.sg)));
        draw('cars');
      }
    };
  };
  /* ford.ro-style range card: cut-out, name, list "de la" + promo */
  SP.rangeCard = m => '<a class="rcar" href="model.html?m=' + m.id + '"><span class="rcar__img"><img src="' + m.cut + '" alt="' + m.name + '" loading="lazy"></span><span class="rcar__chips">' + m.fuels.map(SP.fuelChip).join('') + (m.isNew ? '<span class="chip chip--new">' + t('c.new') + '</span>' : '') + '</span><strong>' + m.name + '</strong>' +
    '<span class="rcar__p">' + SP.fromLabel(m) + (m.from ? ' <small>' + t(m.seg === 'pro' && !SP.biz ? 'c.vatIncl' : 'c.vat') + '</small>' : '') + '</span>' + (SP.bestLabel(m) ? '<span class="rcar__b">' + SP.bestLabel(m) + '</span>' : '<span class="rcar__b rcar__b--e"></span>') +
    '<span class="rcar__cta"><span class="btn btn--ink btn--sm">' + t('c.explore') + '</span>' + (SP.CFG[m.id] ? '<span class="link link--sm">' + t('c.configure') + I('arrow') + '</span>' : '') + '</span></a>';

  /* ================================================================ ALL MODELS */
  SP.pages.models = function () {
    const fuels = ['all', 'ice', 'diesel', 'mhev', 'hev', 'phev', 'ev'], bodies = ['all', 'cars', 'ev', 'pro'];
    const st = { f: 'all', b: SP.SEG[SP.param('seg')] ? SP.param('seg') : 'all', view: 'grid' };
    const html = SP.phead(t('nav.models'), t('mo.title'), t('mo.sub')) + '<section class="section section--tight"><div class="container">' +
      '<div class="mfilt"><div class="fchips" role="tablist" aria-label="' + t('st.fuel') + '">' + fuels.map((f, i) => '<button role="tab" aria-selected="' + (i === 0) + '" data-f="' + f + '">' + (f === 'all' ? t('f.all') : L(SP.FUEL[f])) + '</button>').join('') + '</div>' +
      '<div class="mfilt__r"><label class="sr" for="mo-b">' + t('mo.seg') + '</label><select id="mo-b" class="sel-sm" data-b>' + bodies.map(b => '<option value="' + b + '"' + (st.b === b ? ' selected' : '') + '>' + (b === 'all' ? t('mo.allSeg') : L(SP.SEG[b])) + '</option>').join('') + '</select>' +
      '<div class="seg seg--sm" role="tablist">' + [['grid', 'mo.grid'], ['tiles', 'mo.tiles']].map((x, i) => '<button role="tab" aria-selected="' + (i === 0) + '" data-v="' + x[0] + '">' + t(x[1]) + '</button>').join('') + '</div></div></div>' +
      '<p class="muted mfilt__c" data-c></p><div data-list></div><p class="note">' + t('p.note1') + '</p></div></section>';
    function draw(root) {
      const l = SP.MODELS.filter(m => (st.f === 'all' || m.fuels.includes(st.f)) && (st.b === 'all' || SP.segModels(st.b).includes(m)));
      root.querySelector('[data-c]').textContent = l.length + ' ' + t('home.models');
      root.querySelector('[data-list]').innerHTML = l.length ? (st.view === 'grid' ? '<div class="grid3">' + l.map(SP.modelCard).join('') + '</div>' : '<div class="tiles">' + l.map(SP.modelTile).join('') + '</div>') : '<div class="empty">' + I('car') + '<p>' + t('st.none') + '</p></div>';
    }
    return {
      title: t('mo.title'), html,
      bind(root) {
        root.querySelectorAll('[data-f]').forEach(x => x.addEventListener('click', () => { st.f = x.dataset.f; root.querySelectorAll('[data-f]').forEach(y => y.setAttribute('aria-selected', String(y === x))); draw(root); }));
        root.querySelectorAll('[data-v]').forEach(x => x.addEventListener('click', () => { st.view = x.dataset.v; root.querySelectorAll('[data-v]').forEach(y => y.setAttribute('aria-selected', String(y === x))); draw(root); }));
        root.querySelector('[data-b]').addEventListener('change', e => { st.b = e.target.value; draw(root); });
        draw(root);
      }
    };
  };

  /* ================================================================ version list (shared by model + prices + offer) */
  SP.versionRows = (v, opts) => {
    opts = opts || {};
    const rows = v.versions.filter(x => (!opts.gb || x.gb === opts.gb) && (!opts.dr || x.dr === opts.dr) && (!opts.n || isN(x)));
    if (!rows.length) return '<div class="empty">' + I('sliders') + '<p>' + t('p.noMatch') + '</p></div>';
    const minBest = Math.min(...rows.map(x => x.best));
    return '<div class="vlist">' + rows.map(x => {
      const save = x.list - x.best;
      return '<article class="vrow' + (x.best === minBest && rows.length > 1 ? ' is-best' : '') + '" data-vid="' + x.id + '">' + (x.best === minBest && rows.length > 1 ? '<span class="vrow__flag">' + t('p.cheapest') + '</span>' : '') +
        '<div class="vrow__h"><p class="kicker">' + v.name + '</p><h3>' + esc(L(x.trim)) + '</h3><p class="vrow__e">' + esc(L(x.engine)) + '</p>' +
        '<ul class="vrow__tags"><li>' + (x.gb === 'auto' ? t('p.auto') : t('p.manual')) + '</li><li>' + x.dr + '</li>' + (x.cp ? '<li>' + x.cp + ' CP</li>' : '') + (x.kwh ? '<li>' + x.kwh + ' kWh</li>' : '') + (x.est ? '<li class="est">' + t('cfg.est') + '</li>' : '') + '</ul></div>' +
        '<ul class="ticks ticks--sm vrow__f">' + (x.f || []).slice(0, 6).map(h => '<li>' + I('check') + esc(h) + '</li>').join('') + '</ul>' +
        '<div class="vrow__p">' + (x.promo ? '<span class="vrow__l"><small>' + t('p.rec') + ' *</small><s>' + eur(x.list) + '</s></span><span class="vrow__m"><small>' + ptLabel(x) + ' **' + '</small><strong>' + eur(x.promo) + '</strong></span><span class="save">' + t('c.saved') + ' ' + eur(save) + '</span>'
          : '<span class="vrow__m"><small>' + t('p.rec') + ' *</small><strong>' + eur(x.list) + '</strong></span>') + '<small class="muted">' + t('c.vatIncl') + ' · ' + t('v.rate') + ' ' + eur(SP.monthly(x.best)) + '/' + t('c.month') + '</small></div>' +
        '<div class="vrow__a"><a class="btn btn--ink btn--sm" href="solicita.html?tip=oferta&m=' + v.family.id + '&v=' + x.id + '">' + t('c.offer') + '</a><a class="btn btn--line btn--sm" href="configurator.html?m=' + v.family.id + (x.sc ? '&s=' + encodeURIComponent(x.sc) + '&e=' + encodeURIComponent(x.ec) : '') + '">' + t(SP.CFG[v.family.id] ? 'c.configure' : 'c.offer') + '</a>' +
        (opts.compare ? '<label class="cmpchk"><input type="checkbox" data-cmp="' + x.id + '"' + (opts.picked && opts.picked.includes(x.id) ? ' checked' : '') + '><span>' + t('p.compare') + '</span></label>' : '') + '</div></article>';
    }).join('') + '</div>';
  };
  SP.priceNotes = () => '<div class="pnotes"><p>* ' + t('p.n1') + '</p><p>** ' + t('p.n2') + '</p><p>' + t('p.n3') + ' ' + SP.date(SP.PRICES_VALID) + '.</p></div>';

  /* ================================================================ MODEL */
  SP.pages.model = function () {
    const m = SP.model(SP.param('m')) || SP.MODELS[3];
    let v = m.variants.find(x => x.id === SP.param('p')) || m.variants[0];
    const stock = SP.STOCK.filter(x => x.modelId === m.id), word = m.name.replace(' Electric', '');
    const anchors = [['overview', 'prezentare'], ['versions', 'versiuni'], ['gallery', 'galerie'], ['stock', 'stoc']];
    const hero = '<section class="mstage"><div class="container mstage__in"><p class="mstage__word" aria-hidden="true" style="--len:' + Math.max(word.length, 4) + '">' + word + '</p><img class="mstage__car" data-mcar src="' + v.cut + '" alt="' + m.name + '" fetchpriority="high">' +
      '<div class="mstage__info"><a class="link link--sm" href="modele.html">' + I('arrowL') + t('mega.all') + '</a><p class="eyebrow">' + pad(m.no) + ' / ' + pad(SP.MODELS.length) + ' · ' + fuelsOf(m) + '</p><h1 class="h1">' + m.name + '</h1><p class="lead">' + L(m.tagline) + '</p>' +
      '<p class="mstage__p">' + (priced(m) ? t('c.from') + ' <strong>' + eur(m.from) + '</strong> ' + t('c.withVat') + (m.best < m.from ? '<span>' + t('c.promoFrom') + ' ' + eur(m.best) + '</span>' : '') : '<strong>' + SP.fromLabel(m) + '</strong>') + '</p>' +
      '<div class="btnrow">' + (priced(m) ? '<a class="btn btn--ink" href="preturi.html?m=' + m.id + '">' + t('c.seePrices') + I('arrow') + '</a><a class="btn btn--line" href="configurator.html?m=' + m.id + '">' + t('c.configure') + '</a>' : '<a class="btn btn--ink" href="#notifica">' + t('c.notify') + I('arrow') + '</a>') + '<a class="btn btn--line" href="solicita.html?tip=test-drive&m=' + m.id + '">' + t('c.testdrive') + '</a></div></div></div></section>';
    const sub = '<nav class="subnav"><div class="container subnav__in"><strong>' + m.name + '</strong><ul>' + anchors.map(a => '<li><a href="#' + a[1] + '">' + t('m.' + a[0]) + '</a></li>').join('') + '</ul><a class="btn btn--ink btn--sm" href="' + (priced(m) ? 'preturi.html?m=' + m.id : 'solicita.html?tip=oferta&m=' + m.id) + '">' + (priced(m) ? t('c.seePrices') : t('c.notify')) + '</a></div></nav>';
    const photo = '<section class="mphoto"><img src="' + m.hero + '" alt="' + m.name + '" loading="lazy"></section>';
    const overview = '<section class="section" id="prezentare"><div class="container ov"><div><p class="eyebrow">' + t('m.overview') + '</p><p class="ov__intro">' + L(m.intro) + '</p></div><div data-keys>' + keyRow(v) + '</div></div></section>';
    const vtabs = m.variants.length > 1 ? '<div class="seg ptabs" role="tablist">' + m.variants.map(x => '<button role="tab" aria-selected="' + (x === v) + '" data-pv="' + x.id + '">' + vLabel(m, x) + '<small>' + L(SP.FUEL[x.fuel]) + (x.from ? ' · ' + t('c.from') + ' ' + eur(x.from) : '') + '</small></button>').join('') + '</div>' : '';
    const versions = priced(m) ? '<section class="section section--soft" id="versiuni"><div class="container">' + SP.shead(t('m.versions'), t('m.versionsT') + ' ' + m.name, t('m.versionsD'), [t('p.full'), 'preturi.html?m=' + m.id]) + vtabs + '<div data-vl>' + SP.versionRows(v) + '</div>' + SP.priceNotes() + '</div></section>'
      : '<section class="section section--soft" id="notifica"><div class="container req"><div class="panel"><p class="eyebrow">' + (m.status === 'soon' ? t('c.soon') : t('c.onRequest')) + '</p><h2 class="h3">' + (m.status === 'soon' ? t('m.soonT') : t('m.reqT')) + ' ' + m.name + '</h2><p class="muted">' + (m.status === 'soon' ? t('m.soonD') : t('m.reqD')) + '</p>' + SP.leadForm({ type: m.status === 'soon' ? 'waitlist' : 'offer', model: m.id, hideModel: true, ctx: m.id, message: true }) + '</div><aside class="req__a"><div class="rcard"><img src="' + m.cut + '" alt=""><div><h3>' + m.name + '</h3><p>' + L(m.tagline) + '</p></div></div></aside></div></section>';
    const gal = '<section class="section" id="galerie"><div class="container">' + SP.shead(t('m.gallery'), m.name, null) + '<div class="gal" data-gal></div></div></section>';
    const st = '<section class="section section--soft" id="stoc"><div class="container">' + SP.shead(t('m.stock'), m.name + ' ' + t('m.inStockT'), null, [t('c.viewAll'), 'stoc.html?m=' + m.id]) +
      (stock.length ? '<div class="grid4">' + stock.map(SP.stockCard).join('') + '</div>' : '<p class="muted">' + t('m.noStock') + '</p>') + '</div></section>';
    const others = '<section class="section"><div class="container">' + SP.shead(t('nav.models'), t('m.others'), null, [t('mega.all'), 'modele.html']) + '<div class="tiles tiles--6">' + SP.MODELS.filter(x => x !== m).slice(0, 6).map(SP.modelTile).join('') + '</div></div></section>';
    const galHtml = x => x.gallery.map((g, i) => '<a class="gal__i" href="#" data-lightbox=\'' + JSON.stringify(x.gallery) + '\' data-index="' + i + '"><img src="' + g + '" alt="' + x.name + '" loading="lazy"></a>').join('');
    return {
      title: m.name, html: hero + sub + photo + overview + versions + gal + st + others,
      bind(root) {
        const drawGal = () => { const g = root.querySelector('[data-gal]'); g.innerHTML = galHtml(v); g.querySelectorAll('[data-lightbox]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); SP.lightbox(JSON.parse(el.dataset.lightbox), +el.dataset.index); })); };
        root.querySelectorAll('[data-pv]').forEach(b => b.addEventListener('click', () => {
          v = m.variants.find(x => x.id === b.dataset.pv);
          root.querySelectorAll('[data-pv]').forEach(x => x.setAttribute('aria-selected', String(x === b)));
          root.querySelector('[data-vl]').innerHTML = SP.versionRows(v); root.querySelector('[data-keys]').innerHTML = keyRow(v);
          const car = root.querySelector('[data-mcar]'); car.classList.add('is-fade'); setTimeout(() => { car.src = v.cut; car.classList.remove('is-fade'); }, 160);
          drawGal();
        }));
        drawGal();
      }
    };
  };

  /* ================================================================ PRICES — choose the model → powertrain → versions (instead of a flat list) */
  SP.pages.prices = function () {
    const s = { m: null, v: null, gb: '', dr: '', n: false, sort: 'asc', cmp: [] };
    const pm = SP.model(SP.param('m'));
    if (pm && priced(pm)) { s.m = pm.id; const want = SP.version(SP.param('v')); s.v = want && want.variant.family === pm ? want.variant.id : pm.variants[0].id; }
    const html = '<section class="phead phead--prices"><div class="container"><p class="eyebrow">' + t('nav.prices') + '</p><h1 class="h1">' + t('p.title') + '</h1><p class="phead__sub">' + t('p.sub') + '</p></div></section>' +
      '<section class="section section--tight"><div class="container">' +
      '<ol class="psteps"><li data-ps="1"><span>1</span>' + t('p.s1') + '</li><li data-ps="2"><span>2</span>' + t('p.s2') + '</li><li data-ps="3"><span>3</span>' + t('p.s3') + '</li></ol>' +
      '<div class="pick" aria-label="' + t('p.s1') + '">' + SP.MODELS.map(m => '<button type="button" class="pick__m" data-pm="' + m.id + '"' + (priced(m) ? '' : ' disabled') + '><img src="' + m.cut + '" alt="" loading="lazy"><strong>' + m.name + '</strong><small>' + SP.fromLabel(m) + '</small></button>').join('') + '</div>' +
      '<div data-pres></div></div></section><div class="cmpbar" data-cmpbar hidden></div>';

    function result(root) {
      const box = root.querySelector('[data-pres]');
      root.querySelectorAll('[data-pm]').forEach(b => b.classList.toggle('is-on', b.dataset.pm === s.m));
      root.querySelectorAll('[data-ps]').forEach(li => { const n = +li.dataset.ps; li.className = s.m ? (n === 1 ? 'is-done' : 'is-on') : (n === 1 ? 'is-on' : ''); });
      if (!s.m) {
        box.innerHTML = '<div class="phint">' + I('arrow') + '<p>' + t('p.hint') + '</p></div><div class="pall"><h2 class="h4">' + t('p.overview') + '</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + t('f.model') + '</th><th>' + t('st.fuel') + '</th><th class="num">' + t('p.rec') + ' *</th><th class="num">' + t('p.best') + '</th><th></th></tr></thead><tbody>' +
          SP.MODELS.map(m => '<tr><td><strong>' + m.name + '</strong></td><td>' + fuelsOf(m) + '</td><td class="num">' + (priced(m) ? t('c.from') + ' ' + eur(m.from) : SP.fromLabel(m)) + '</td><td class="num">' + (priced(m) ? '<strong>' + t('c.from') + ' ' + eur(m.best) + '</strong>' : '—') + '</td><td class="num">' + (priced(m) ? '<button type="button" class="link link--sm" data-go="' + m.id + '">' + t('p.choose') + I('arrow') + '</button>' : '<a class="link link--sm" href="model.html?m=' + m.id + '">' + t('c.details') + I('arrow') + '</a>') + '</td></tr>').join('') + '</tbody></table></div>' + SP.priceNotes() + '</div>';
        box.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { pick(root, b.dataset.go); root.querySelector('[data-pres]').scrollIntoView({ behavior: 'smooth' }); }));
        cmpbar(); return;
      }
      const m = SP.model(s.m), v = m.variants.find(x => x.id === s.v);
      const gbs = [...new Set(v.versions.map(x => x.gb))], drs = [...new Set(v.versions.map(x => x.dr))], hasN = v.versions.some(isN);
      if (!gbs.includes(s.gb)) s.gb = ''; if (!drs.includes(s.dr)) s.dr = ''; if (!hasN) s.n = false;
      const fsel = (k, lab, opts) => opts.length > 1 ? '<div class="field field--inline"><label for="pf-' + k + '">' + lab + '</label><select id="pf-' + k + '" data-pf="' + k + '"><option value="">' + t('st.any') + '</option>' + opts.map(o => '<option value="' + o[0] + '"' + (s[k] === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div>' : '';
      const ordered = Object.assign({}, v, { versions: v.versions.slice().sort((a, b) => s.sort === 'asc' ? a.best - b.best : s.sort === 'desc' ? b.best - a.best : 0) });
      box.innerHTML = '<div class="pres"><div class="pres__hd"><img src="' + v.cut + '" alt="' + v.name + '"><div><p class="eyebrow">' + pad(m.no) + ' · ' + L(SP.FUEL[v.fuel]) + '</p><h2 class="h2">' + v.name + '</h2><p class="pres__p">' + t('p.rec') + ' ' + t('c.from') + ' <strong>' + eur(v.from) + '</strong>' + (v.best < v.from ? ' · ' + t('p.best') + ' ' + t('c.from') + ' <strong class="pres__b">' + eur(v.best) + '</strong>' : '') + '</p>' +
        '<div class="btnrow"><a class="link link--sm" href="model.html?m=' + m.id + '&p=' + v.id + '">' + t('c.explore') + ' ' + m.name + I('arrow') + '</a><a class="link link--sm" href="stoc.html?m=' + m.id + '">' + t('nav.stock') + ' ' + m.name + I('arrow') + '</a><a class="link link--sm" href="solicita.html?tip=test-drive&m=' + m.id + '">' + t('c.testdrive') + I('arrow') + '</a></div></div></div>' +
        (m.variants.length > 1 ? '<div class="seg ptabs" role="tablist" aria-label="' + t('p.s2') + '">' + m.variants.map(x => '<button role="tab" aria-selected="' + (x === v) + '" data-pv="' + x.id + '">' + vLabel(m, x) + '<small>' + L(SP.FUEL[x.fuel]) + ' · ' + t('c.from') + ' ' + eur(x.from) + '</small></button>').join('') + '</div>' : '') +
        '<div class="pfbar"><strong>' + v.versions.length + ' ' + t('p.versions') + '</strong>' + fsel('gb', t('p.gb'), gbs.map(g => [g, g === 'auto' ? t('p.auto') : t('p.manual')])) + fsel('dr', t('p.dr'), drs.map(d => [d, d])) +
        (hasN ? '<label class="check check--inline"><input type="checkbox" data-pn' + (s.n ? ' checked' : '') + '><span>' + t('p.onlyN') + '</span></label>' : '') +
        '<div class="field field--inline"><label for="pf-sort">' + t('st.sort') + '</label><select id="pf-sort" data-pf="sort"><option value="asc"' + (s.sort === 'asc' ? ' selected' : '') + '>' + t('st.asc') + '</option><option value="desc"' + (s.sort === 'desc' ? ' selected' : '') + '>' + t('st.desc') + '</option><option value="trim"' + (s.sort === 'trim' ? ' selected' : '') + '>' + t('p.byTrim') + '</option></select></div></div>' +
        SP.versionRows(ordered, { gb: s.gb, dr: s.dr, n: s.n, compare: true, picked: s.cmp }) + SP.priceNotes() + '</div>';
      box.querySelectorAll('[data-pv]').forEach(b => b.addEventListener('click', () => { s.v = b.dataset.pv; result(root); }));
      box.querySelectorAll('[data-pf]').forEach(x => x.addEventListener('change', () => { s[x.dataset.pf] = x.value; result(root); }));
      const pn = box.querySelector('[data-pn]'); if (pn) pn.addEventListener('change', () => { s.n = pn.checked; result(root); });
      box.querySelectorAll('[data-cmp]').forEach(c => c.addEventListener('change', () => {
        const id = c.dataset.cmp;
        if (c.checked) { if (s.cmp.length >= 3) { c.checked = false; SP.toast(t('p.max3')); return; } s.cmp.push(id); } else s.cmp = s.cmp.filter(x => x !== id);
        cmpbar();
      }));
      try { history.replaceState(null, '', 'preturi.html?m=' + s.m + (s.v !== m.variants[0].id ? '&v=' + v.versions[0].id : '') + (SP.param('lang') ? '&lang=' + SP.param('lang') : '')); } catch (e) { }
      cmpbar();
    }
    function cmpbar() {
      const bar = document.querySelector('[data-cmpbar]'); if (!bar) return;
      if (!s.cmp.length) { bar.hidden = true; document.body.classList.remove('has-cmp'); return; }
      bar.hidden = false; document.body.classList.add('has-cmp');
      bar.innerHTML = '<div class="container cmpbar__in"><ul>' + s.cmp.map(id => { const x = SP.version(id); return '<li><img src="' + x.variant.cut + '" alt=""><span><strong>' + x.variant.name + '</strong>' + esc(L(x.trim)) + ' · ' + eur(x.best) + '</span><button type="button" data-un="' + id + '" aria-label="' + t('nav.close') + '">' + I('x') + '</button></li>'; }).join('') + '</ul><button type="button" class="btn btn--white btn--sm" data-cmpgo' + (s.cmp.length < 2 ? ' disabled' : '') + '>' + t('p.compareN') + ' (' + s.cmp.length + ')' + I('arrow') + '</button></div>';
      bar.querySelectorAll('[data-un]').forEach(b => b.addEventListener('click', () => { s.cmp = s.cmp.filter(x => x !== b.dataset.un); const c = document.querySelector('[data-cmp="' + b.dataset.un + '"]'); if (c) c.checked = false; cmpbar(); }));
      bar.querySelector('[data-cmpgo]').addEventListener('click', compare);
    }
    function compare() {
      const vs = s.cmp.map(SP.version);
      const el = document.createElement('div'); el.className = 'modal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
      const row = (k, f) => '<tr><th>' + k + '</th>' + vs.map(x => '<td>' + f(x) + '</td>').join('') + '</tr>';
      el.innerHTML = '<div class="modal__p"><div class="modal__h"><h2 class="h4">' + t('p.compareT') + '</h2><button type="button" class="drawer__x" data-mx aria-label="' + t('nav.close') + '">' + I('x') + '</button></div><div class="tbl-wrap"><table class="tbl cmpt"><thead><tr><th></th>' + vs.map(x => '<th><img src="' + x.variant.cut + '" alt=""><strong>' + x.variant.name + '</strong><span>' + esc(L(x.trim)) + '</span></th>').join('') + '</tr></thead><tbody>' +
        row(t('p.engine'), x => esc(L(x.engine))) + row(t('p.gb'), x => x.gb === 'auto' ? t('p.auto') : t('p.manual')) + row(t('p.dr'), x => x.dr) + row(t('p.rec'), x => eur(x.list)) + row(t('p.best'), x => '<strong>' + eur(x.best) + '</strong>' + (x.pt ? '<small> · ' + ptLabel(x) + '</small>' : '')) + row(t('c.saved'), x => x.list > x.best ? eur(x.list - x.best) : '—') +
        row(t('cfg.equip'), x => '<ul class="ticks ticks--sm">' + x.f.map(f => '<li>' + I('check') + esc(f) + '</li>').join('') + '</ul>') +
        '<tr><th></th>' + vs.map(x => '<td><a class="btn btn--ink btn--sm" href="solicita.html?tip=oferta&m=' + x.variant.family.id + '&v=' + x.id + '">' + t('c.offer') + '</a></td>').join('') + '</tr></tbody></table></div><p class="note">' + t('p.cmpNote') + '</p></div>';
      const key = e => { if (e.key === 'Escape') close(); };
      const close = () => { el.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', key); };
      el.addEventListener('click', e => { if (e.target === el || e.target.closest('[data-mx]')) close(); });
      document.addEventListener('keydown', key);
      document.body.appendChild(el); document.body.classList.add('noscroll');
    }
    function pick(root, id) { const m = SP.model(id); s.m = id; s.v = m.variants[0].id; s.gb = s.dr = ''; s.n = false; result(root); }
    return {
      title: t('p.title'), html,
      bind(root) {
        root.querySelectorAll('[data-pm]').forEach(b => b.addEventListener('click', () => { if (s.m === b.dataset.pm) return; pick(root, b.dataset.pm); const r = root.querySelector('[data-pres]'); if (r.getBoundingClientRect().top > innerHeight * .7) r.scrollIntoView({ behavior: 'smooth' }); }));
        result(root);
      }
    };
  };

  /* ================================================================ STOCK */
  SP.pages.stock = function () {
    const st = { model: SP.param('m') || '', fuel: '', status: '', gb: '', max: '', sort: 'rec' };
    const sel = (k, lab, opts) => '<div class="field"><label for="s-' + k + '">' + lab + '</label><select id="s-' + k + '" data-s="' + k + '"><option value="">' + t('st.any') + '</option>' + opts.map(o => '<option value="' + o[0] + '"' + (st[k] === String(o[0]) ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div>';
    const html = SP.phead(t('st.eyebrow'), t('st.title'), t('st.sub')) + '<section class="section section--tight"><div class="container">' +
      '<div class="stbar"><div class="fchips" role="tablist">' + [['', t('f.all')]].concat(['ice', 'hev', 'phev', 'ev'].map(f => [f, L(SP.FUEL[f])])).map(b => '<button role="tab" aria-selected="' + (b[0] === st.fuel) + '" data-qf="' + b[0] + '">' + b[1] + '</button>').join('') + '</div>' +
      '<div class="stbar__r"><span class="muted" data-count></span><button class="btn btn--line btn--sm fbtn" data-fo>' + I('sliders') + t('st.filters') + '</button><label class="sr" for="s-sort">' + t('st.sort') + '</label><select id="s-sort" class="sel-sm" data-s="sort"><option value="rec">' + t('st.rec') + '</option><option value="asc">' + t('st.asc') + '</option><option value="desc">' + t('st.desc') + '</option></select></div></div>' +
      '<div class="stock"><aside class="filters" data-filters><div class="filters__h"><strong>' + t('st.filters') + '</strong><button class="link link--sm" data-reset>' + t('st.reset') + '</button><button class="filters__x" data-fc aria-label="' + t('nav.close') + '">' + I('x') + '</button></div>' +
      sel('model', t('st.model'), SP.MODELS.filter(m => SP.STOCK.some(v => v.modelId === m.id)).map(m => [m.id, m.name])) + sel('fuel', t('st.fuel'), ['ice', 'hev', 'phev', 'ev'].map(f => [f, L(SP.FUEL[f])])) +
      sel('gb', t('p.gb'), [['manual', t('p.manual')], ['auto', t('p.auto')]]) + sel('status', t('st.status'), ['stock', 'transit', 'demo'].map(s => [s, t('status.' + s)])) +
      sel('max', t('st.max'), [20000, 25000, 30000, 40000, 50000, 70000].map(p => [p, eur(p)])) + '<button class="btn btn--ink btn--block filters__go" data-fc>' + t('st.show') + '</button></aside><div class="grid3" data-res></div></div></div></section>';
    function apply(root) {
      let l = SP.STOCK.filter(v => (!st.model || v.modelId === st.model) && (!st.fuel || v.variant.fuel === st.fuel) && (!st.gb || v.version.gb === st.gb) && (!st.status || v.status === st.status) && (!st.max || v.price <= +st.max));
      if (st.sort === 'asc') l.sort((a, b) => a.price - b.price); if (st.sort === 'desc') l.sort((a, b) => b.price - a.price);
      root.querySelector('[data-count]').textContent = l.length + ' ' + t('st.results');
      root.querySelectorAll('[data-qf]').forEach(x => x.setAttribute('aria-selected', String(x.dataset.qf === st.fuel)));
      root.querySelector('[data-res]').innerHTML = l.length ? l.map(SP.stockCard).join('') : '<div class="empty">' + I('car') + '<p>' + t('st.none') + '</p><a class="btn btn--ink" href="configurator.html">' + t('nav.config') + '</a></div>';
    }
    return {
      title: t('st.title'), html,
      bind(root) {
        root.querySelectorAll('[data-qf]').forEach(b => b.addEventListener('click', () => { st.fuel = b.dataset.qf; root.querySelector('[data-s="fuel"]').value = st.fuel; apply(root); }));
        root.addEventListener('change', e => { const k = e.target.dataset && e.target.dataset.s; if (k) { st[k] = e.target.value; apply(root); } });
        root.querySelector('[data-reset]').addEventListener('click', () => { ['model', 'fuel', 'gb', 'status', 'max'].forEach(k => { st[k] = ''; root.querySelector('[data-s="' + k + '"]').value = ''; }); apply(root); });
        const f = root.querySelector('[data-filters]');
        root.querySelector('[data-fo]').addEventListener('click', () => { f.classList.add('is-open'); document.body.classList.add('noscroll'); });
        root.querySelectorAll('[data-fc]').forEach(b => b.addEventListener('click', () => { f.classList.remove('is-open'); document.body.classList.remove('noscroll'); }));
        apply(root);
      }
    };
  };

  /* ================================================================ VEHICLE */
  SP.pages.vehicle = function () {
    const v = SP.STOCK.find(x => x.id === SP.param('id')) || SP.STOCK[0];
    const m = v.model, x = v.version, adv = SP.TEAM[v.advisor], loc = SP.LOCATIONS.find(l => l.id === v.location);
    const gal = JSON.stringify(v.gallery);
    const facts = [['v.version', esc(L(x.trim))], ['p.engine', esc(L(x.engine))], ['st.fuel', L(SP.FUEL[v.variant.fuel])], ['p.gb', x.gb === 'auto' ? t('p.auto') : t('p.manual')], ['p.dr', x.dr], ['v.year', v.year], ['v.km', SP.num(v.km) + ' km'], ['v.color', L(v.color.name)], ['v.vin', v.vin.slice(0, 11) + '••••••'], ['v.loc', L(loc.short)]];
    const html = '<div class="container crumbs"><a class="link link--sm" href="stoc.html">' + I('arrowL') + t('v.back') + '</a></div>' +
      '<section class="section section--tight"><div class="container vd"><div class="vd__g"><a class="vd__main" href="#" data-lightbox=\'' + gal + '\' data-index="0">' + SP.statusChip(v.status) + '<img data-main src="' + v.gallery[0] + '" alt="' + esc(v.variant.name) + '"></a>' +
      '<div class="vd__th">' + v.gallery.map((g, i) => '<button type="button" data-th="' + i + '"' + (i ? '' : ' class="is-on"') + '><img src="' + g + '" alt="" loading="lazy"></button>').join('') + '</div></div>' +
      '<div class="vd__i"><p class="eyebrow">' + v.id + ' · ' + t('status.' + v.status) + '</p><h1 class="vd__t">' + v.variant.name + ' <span>' + esc(L(x.trim)) + '</span></h1><p class="muted">' + esc(L(x.engine)) + '</p>' +
      '<div class="pbox">' + (v.priceList > v.price ? '<div><span>' + t('p.rec') + ' + ' + (en() ? 'paint' : 'vopsea') + '</span><s>' + eur(v.priceList) + '</s></div>' : '') + '<div class="pbox__m"><span>' + (en() ? 'Price' : 'Preț') + '</span><strong>' + eur(v.price) + '</strong></div><div><span>' + t('c.vatIncl') + (v.version.promo ? ' · ' + t('p.promo') + ' **' : '') + '</span><span>' + t('v.rate') + ' ' + eur(SP.monthly(v.price)) + '/' + t('c.month') + '</span></div>' +
      (v.extraDiscount ? '<p class="pbox__d">' + I('tag') + t('v.discount') + ': −' + eur(v.extraDiscount) + '</p>' : '') + '</div>' +
      '<dl class="facts">' + facts.map(f => '<div><dt>' + t(f[0]) + '</dt><dd>' + f[1] + '</dd></div>').join('') + '</dl>' +
      '<div class="btnrow"><a class="btn btn--ink" href="#oferta">' + t('c.offer') + I('arrow') + '</a><a class="btn btn--line" href="#test-drive">' + t('c.testdrive') + '</a></div>' +
      '<div class="adv"><span class="avatar">' + adv.name.split(' ').map(y => y[0]).join('') + '</span><div><small>' + t('v.advisor') + '</small><strong>' + adv.name + '</strong><span>' + L(adv.role) + '</span></div><a class="iconbtn" href="tel:' + adv.phone.replace(/\s/g, '') + '" aria-label="' + t('c.call') + '">' + I('phone') + '</a><a class="iconbtn" href="https://wa.me/' + SP.DEALER.whatsapp.replace(/\D/g, '') + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + I('whatsapp') + '</a></div></div></div></section>' +
      '<section class="section section--soft"><div class="container">' + SP.shead(t('v.fromSP'), v.variant.name + ' ' + esc(L(x.trim)), L(m.intro)) +
      '<div class="vsheet"><div><h3 class="h4">' + t('m.highlights') + '</h3><ul class="ticks">' + (x.f || []).map(h => '<li>' + I('check') + esc(h) + '</li>').join('') + '</ul></div>' +
      '<div><h3 class="h4">' + t('v.otherVersions') + '</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + t('v.version') + '</th><th class="num">' + t('p.rec') + '</th><th class="num">' + t('p.best') + '</th></tr></thead><tbody>' + v.variant.versions.map(y => '<tr' + (y === x ? ' class="is-on"' : '') + '><td>' + esc(L(y.trim)) + '<br><small class="muted">' + esc(L(y.engine)) + '</small></td><td class="num">' + eur(y.list) + '</td><td class="num"><strong>' + eur(y.best) + '</strong></td></tr>').join('') + '</tbody></table></div>' +
      '<a class="link" href="preturi.html?m=' + m.id + '">' + t('p.full') + I('arrow') + '</a></div></div>' + SP.priceNotes() + '</div></section>' +
      '<section class="section"><div class="container forms2"><div class="panel" id="oferta"><h2 class="h4">' + t('v.reqOffer') + '</h2>' + SP.leadForm({ type: 'offer', ctx: v.id, message: true }) + '</div><div class="panel" id="test-drive"><h2 class="h4">' + t('v.td') + '</h2>' + SP.leadForm({ type: 'testdrive', ctx: v.id }) + '</div></div></section>' +
      '<section class="section section--soft"><div class="container">' + SP.shead(t('home.stock'), t('v.similar'), null, [t('v.configure'), 'configurator.html?m=' + m.id]) + '<div class="grid4">' + SP.STOCK.filter(y => y.id !== v.id && (y.modelId === v.modelId || y.variant.fuel === v.variant.fuel)).slice(0, 4).map(SP.stockCard).join('') + '</div></div></section>';
    return {
      title: v.variant.name + ' ' + L(x.trim), html,
      bind(root) { const main = root.querySelector('[data-main]'), a = root.querySelector('.vd__main'); root.querySelectorAll('[data-th]').forEach(b => b.addEventListener('click', () => { main.src = v.gallery[+b.dataset.th]; a.dataset.index = b.dataset.th; main.classList.toggle('is-photo', +b.dataset.th > 0); root.querySelectorAll('[data-th]').forEach(y => y.classList.toggle('is-on', y === b)); })); }
    };
  };

  /* ================================================================ REQUEST: test drive / quote / call me */
  SP.pages.request = function () {
    const map = { 'test-drive': 'td', oferta: 'offer', suna: 'call' };
    let type = map[SP.param('tip')] || 'offer'; const mid = SP.param('m'), vid = SP.param('v');
    const tabs = [['td', 'req.td', 'wheel'], ['offer', 'req.offer', 'doc'], ['call', 'req.call', 'phone']];
    const html = SP.phead(t('nav.contact'), t('req.title'), t('req.sub')) + '<section class="section section--tight"><div class="container req">' +
      '<div><div class="rtabs" role="tablist">' + tabs.map(x => '<button role="tab" aria-selected="' + (x[0] === type) + '" data-rt="' + x[0] + '">' + I(x[2]) + t(x[1]) + '</button>').join('') + '</div><div class="panel" data-rf></div></div>' +
      '<aside class="req__a" data-ra></aside></div></section>';
    return {
      title: t('req.title'), html,
      bind(root) {
        let model = SP.model(mid) ? mid : 'kuga';
        const draw = () => {
          const x = SP.version(vid);
          root.querySelector('[data-rf]').innerHTML = SP.leadForm({ type, model, ctx: x ? x.id : '', when: type === 'call', message: type !== 'call', submit: type === 'td' ? t('req.td') : type === 'call' ? t('req.call') : t('req.offer') });
          const f = root.querySelector('[data-rf] form'); f.removeAttribute('data-lead');
          const s = f.querySelector('[name="model"]'); if (s) s.addEventListener('change', () => { model = s.value; aside(); });
          f.addEventListener('submit', e => { e.preventDefault(); if (!SP.validate(f)) return; /* Integration point: POST /api/leads (type, model, version id) */ f.outerHTML = SP.done(t('f.ok'), t('f.okD'), '#' + SP.ref('WEB')); });
          aside();
        };
        const aside = () => {
          const m = SP.model(model) || SP.MODELS[0], x = SP.version(vid), useX = x && x.variant.family === m;
          root.querySelector('[data-ra]').innerHTML = '<div class="rcard"><img src="' + (useX ? x.variant.cut : m.cut) + '" alt=""><div><h3>' + (useX ? x.variant.name + ' ' + esc(L(x.trim)) : m.name) + '</h3><p>' + (useX ? esc(L(x.engine)) : L(m.tagline)) + '</p><p class="rcard__p">' + (useX ? '<strong>' + eur(x.best) + '</strong> ' + t('c.vat') + (x.promo ? ' · <s>' + eur(x.list) + '</s>' : '') : SP.fromLabel(m) + (m.from ? ' ' + t('c.vat') : '')) + '</p><a class="link link--sm" href="model.html?m=' + m.id + '">' + t('c.explore') + I('arrow') + '</a></div></div>' +
            '<ul class="contactl"><li>' + I('phone') + '<span><strong>' + SP.DEALER.phone + '</strong>' + t('ct.sales') + '</span></li><li>' + I('clock') + '<span><strong>24h</strong>' + (en() ? 'reply time' : 'timp de răspuns') + '</span></li><li>' + I('shield') + '<span><strong>5 ' + (en() ? 'years' : 'ani') + '</strong>' + t('req.warranty') + '</span></li></ul>';
        };
        root.querySelectorAll('[data-rt]').forEach(b => b.addEventListener('click', () => { type = b.dataset.rt; root.querySelectorAll('[data-rt]').forEach(x => x.setAttribute('aria-selected', String(x === b))); draw(); }));
        draw();
      }
    };
  };

  /* ================================================================ OFFERS */
  SP.pages.offers = function () {
    const f = SP.OFFERS.find(o => o.featured), cats = ['all', 'auto', 'finance', 'service'];
    const top = SP.MODELS.filter(m => m.maxSave > 0).sort((a, b) => b.maxSave - a.maxSave);
    const html = SP.phead(t('nav.offers'), t('of.title'), t('of.sub')) + '<section class="section section--tight"><div class="container">' +
      '<article class="feat"><img src="' + f.img + '" alt=""><div class="feat__b"><p class="eyebrow">' + t('of.featured') + '</p><h2 class="h2">' + L(f.title) + '</h2><p class="lead">' + L(f.lead) + '</p><div class="btnrow"><a class="btn btn--ink" href="preturi.html">' + t('home.heroC2') + I('arrow') + '</a><a class="btn btn--line" href="oferta.html?id=' + f.id + '">' + t('of.apply') + '</a></div><small class="muted">' + t('c.valid') + ' ' + SP.date(f.valid) + '</small></div></article>' +
      '<h2 class="h4 of__h">' + t('of.byModel') + '</h2><div class="tiles tiles--6">' + top.map(m => '<a class="mtile" href="preturi.html?m=' + m.id + '"><span class="mtile__img"><img src="' + m.cut + '" alt="" loading="lazy"></span><span class="mtile__n">' + m.name + '</span><small>' + t('c.from') + ' ' + eur(m.best) + '</small><small class="mtile__r">' + t('of.upTo') + ' −' + eur(m.maxSave) + '</small></a>').join('') + '</div>' +
      '<div class="fchips of__chips" role="tablist">' + cats.map((c, i) => '<button role="tab" aria-selected="' + (i === 0) + '" data-oc="' + c + '">' + t('of.cat.' + c) + '</button>').join('') + '</div><div class="grid3" data-ol>' + SP.OFFERS.map(SP.offerCard).join('') + '</div>' + SP.priceNotes() + '</div></section>';
    return { title: t('of.title'), html, bind(root) { root.querySelectorAll('[data-oc]').forEach(b => b.addEventListener('click', () => { root.querySelectorAll('[data-oc]').forEach(x => x.setAttribute('aria-selected', String(x === b))); root.querySelector('[data-ol]').innerHTML = SP.OFFERS.filter(o => b.dataset.oc === 'all' || o.cat === b.dataset.oc).map(SP.offerCard).join(''); })); } };
  };
  SP.pages.offer = function () {
    const o = SP.OFFERS.find(x => x.id === SP.param('id')) || SP.OFFERS[0], m = o.model ? SP.model(o.model) : null;
    const pv = m && priced(m) ? (m.variants.find(v => v.versions.some(x => x.promo)) || m.variants[0]) : null;
    const html = '<section class="ohero"><img src="' + o.img + '" alt=""><div class="container ohero__in"><a class="link link--sm link--w" href="oferte.html">' + I('arrowL') + t('of.title') + '</a><span class="chip chip--glass">' + esc(o.tag) + '</span><h1 class="h1">' + L(o.title) + '</h1><p class="lead">' + L(o.lead) + '</p></div></section>' +
      (pv ? '<section class="section section--soft"><div class="container">' + SP.shead(t('nav.prices'), pv.name, null, [t('p.full'), 'preturi.html?m=' + m.id]) + SP.versionRows(pv) + SP.priceNotes() + '</div></section>' : '') +
      '<section class="section"><div class="container req"><div class="panel"><h2 class="h4">' + t('of.apply') + '</h2>' + SP.leadForm({ type: 'offer', model: o.model || 'kuga', ctx: o.id, message: true }) + '</div><aside class="req__a">' + (m ? '<div class="rcard"><img src="' + m.cut + '" alt=""><div><h3>' + m.name + '</h3><p>' + L(m.tagline) + '</p><a class="link link--sm" href="model.html?m=' + m.id + '">' + t('c.explore') + I('arrow') + '</a></div></div>' : '') + '<p class="note">' + t('of.terms') + ' ' + t('c.valid') + ' ' + SP.date(o.valid) + '.</p></aside></div></section>';
    return { title: L(o.title), html };
  };
})();
