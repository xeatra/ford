/* =====================================================================
   CONFIGURATOR — ford.ro-style flow, fed by SP.CFG (Ford România catalogue)
   Serie → (Caroserie) → Motorizare → Exterior → Interior → Opționale → Rezumat
   Price breakdown as on ford.ro: list · options · Rabla de la Ford ·
   customer advantage · promotional price · dealer accessories · dealer price.
   In production SP.CFG is served by Sales Partner from the importer catalogue
   (GET /api/catalog/{model}); the lead goes to POST /api/leads (type=configuration).
   ===================================================================== */
(function () {
  const SP = window.SP; SP.pages = SP.pages || {};
  const t = SP.t, L = v => SP.L(v), I = SP.icon, esc = SP.esc, eur = v => SP.eur(v);

  /* ---------- model picker ---------- */
  function picker() {
    const full = SP.MODELS.filter(m => SP.CFG[m.id]), other = SP.MODELS.filter(m => !SP.CFG[m.id] && m.status !== 'soon');
    const card = (m, f) => '<a class="cpk' + (f ? ' cpk--full' : '') + '" href="configurator.html?m=' + m.id + '"><span class="cpk__img"><img src="' + m.cut + '" alt="" loading="lazy"></span><span class="cpk__b"><small>' + L(SP.SEG[m.seg]) + '</small><strong>' + m.name + '</strong><span>' + SP.fromLabel(m) + '</span>' + (SP.bestLabel(m) ? '<em>' + SP.bestLabel(m) + '</em>' : '') + '</span><span class="cpk__go">' + (f ? t('c.configure') : t('c.offer')) + I('arrow') + '</span></a>';
    return {
      title: t('cfg.title'),
      html: SP.phead(t('nav.config'), t('cfg.pick'), t('cfg.pickD')) + '<section class="section section--tight"><div class="container">' +
        '<h2 class="h4 cpk__h"><span class="chip chip--new">' + t('cfg.full') + '</span></h2><div class="cpks">' + full.map(m => card(m, true)).join('') + '</div>' +
        '<h2 class="h4 cpk__h"><span class="chip">' + t('cfg.quote') + '</span></h2><div class="cpks cpks--sm">' + other.map(m => card(m, false)).join('') + '</div>' +
        '<p class="note">' + t('cfg.dataNote') + '</p></div></section>'
    };
  }

  /* ---------- quote-only models ---------- */
  function quote(m) {
    return {
      title: t('cfg.title') + ' ' + m.name,
      html: '<section class="section"><div class="container req"><div class="panel"><p class="eyebrow">' + t('cfg.quote') + '</p><h1 class="h3">' + t('cfg.reqT') + ' ' + m.name + '</h1><p class="muted">' + t('cfg.reqD') + '</p>' +
        SP.leadForm({ type: 'offer', model: m.id, hideModel: true, ctx: 'configurator:' + m.id, message: true }) + '</div>' +
        '<aside class="req__a"><div class="rcard"><img src="' + m.cut + '" alt=""><div><h3>' + m.name + '</h3><p>' + SP.fromLabel(m) + (SP.bestLabel(m) ? ' · ' + SP.bestLabel(m) : '') + '</p><a class="link link--sm" href="model.html?m=' + m.id + '">' + t('c.explore') + I('arrow') + '</a></div></div></aside></div></section>'
    };
  }

  SP.pages.configurator = function () {
    const m = SP.model(SP.param('m'));
    if (!m) return picker();
    const C = SP.CFG[m.id];
    if (!C) return quote(m);

    const STEPS = ['series'].concat(C.bodies ? ['body'] : []).concat(['engine', 'ext', 'int', 'opt']);
    const SK = { series: 'cfg.sSeries', body: 'cfg.sBody', engine: 'cfg.sEngine', ext: 'cfg.sExt', int: 'cfg.sInt', opt: 'cfg.sOpt' };
    const HK = { series: 'cfg.hSeries', body: 'cfg.hBody', engine: 'cfg.hEngine', ext: 'cfg.hExt', int: 'cfg.hInt', opt: 'cfg.hOpt' };
    const want = SP.param('s');
    const s = { step: 0, si: Math.max(0, C.series.findIndex(x => x.c === want)), bi: 0, ei: 0, ci: 0, ii: 0, opt: [], acc: [], rabla: true, pay: 'cash', down: 20, img: 0 };
    if (SP.param('e')) s.ei = Math.max(0, C.series[s.si].e.findIndex(e => e.c === SP.param('e')));
    const S = () => C.series[s.si], E = () => S().e[s.ei] || S().e[0], Col = () => S().col[s.ci] || S().col[0], Int = () => S().int[s.ii] || S().int[0] || { n: '—', p: 0 };
    const accs = () => SP.ACCESSORIES.filter(a => a.fits === 'all' || a.fits.some(f => m.fuels.includes(f)) || (a.fits.includes('pro') && m.seg === 'pro'));
    const optSum = () => s.opt.reduce((a, i) => a + (S().opt[i] ? S().opt[i].p : 0), 0);
    const P = () => {
      const e = E(), body = C.bodies ? C.bodies[s.bi].d : 0;
      const list = e.list + body, opts = (Col().p || 0) + (Int().p || 0) + optSum();
      const rabla = s.rabla && !SP.biz ? (e.rabla || 0) : 0, adv = e.adv || 0;
      const promo = list + opts - rabla - adv, acc = s.acc.reduce((a, id) => a + (accs().find(x => x.id === id) || { price: 0 }).price, 0);
      return { list, opts, listOpt: list + opts, rabla, adv, promo, acc, dealer: promo + acc, est: e.est };
    };
    const code = () => [m.id, S().c, C.bodies ? 'B' + s.bi : '', E().c, Col().chip || s.ci, 'I' + s.ii, s.opt.length ? 'O' + s.opt.join('.') : '', s.acc.length ? 'A' + s.acc.join('.') : '', s.rabla && !SP.biz ? 'RABLA' : '', SP.biz ? 'B2B' : 'B2C'].filter(Boolean).join('-').toUpperCase();
    const imgs = () => { const c = Col(); return (c.img && c.img.length ? c.img : [m.cut]); };
    const stockLike = SP.STOCK.filter(v => v.modelId === m.id);

    const html = '<section class="fcfg"><div class="fcfg__stage">' +
      '<div class="fcfg__top"><a class="link link--sm" href="configurator.html">' + I('arrowL') + t('cfg.change') + '</a><span class="fcfg__cust">' + SP.custSeg('cust--cfg') + '</span></div>' +
      '<div class="fcfg__img"><button type="button" class="fcfg__nav fcfg__nav--p" data-ip aria-label="prev">' + I('left') + '</button><img data-stage alt=""><button type="button" class="fcfg__nav fcfg__nav--n" data-in aria-label="next">' + I('right') + '</button></div>' +
      '<div class="fcfg__dots" data-dots></div>' +
      '<div class="fcfg__cap"><h1 class="fcfg__name"><span>' + m.name + '</span> <b data-sname></b></h1><p data-cap></p></div></div>' +
      '<aside class="fcfg__panel"><nav class="fcfg__tabs" aria-label="' + t('cfg.title') + '">' + STEPS.map((k, i) => '<button type="button" data-goto="' + i + '">' + t(SK[k]) + '</button>').join('') + '</nav>' +
      '<div class="fcfg__body" data-body></div>' +
      '<div class="fcfg__bar"><div class="fcfg__price"><small data-plabel></small><strong data-total></strong><button type="button" class="link link--sm" data-pd>' + t('cfg.pBtn') + I('down') + '</button></div><div class="fcfg__act"><button class="btn btn--line btn--sm" data-prev aria-label="' + t('c.back') + '">' + I('arrowL') + '</button><button class="btn btn--ink btn--sm" data-next></button></div>' +
      '<div class="fcfg__pd" data-pdbox hidden></div></div></aside></section>' +
      '<section class="section section--soft" id="rezumat" hidden data-summary></section>';

    const chipImg = c => c.chip ? '<img src="' + SP.chip(c.chip) + '" alt="" loading="lazy">' : '';
    const price = n => n ? '+ ' + eur(n) : t('cfg.free');
    function body() {
      const k = STEPS[s.step], head = '<p class="fcfg__k">' + t('cfg.stepOf') + ' ' + (s.step + 1) + ' ' + t('cfg.of') + ' ' + STEPS.length + '</p><h2 class="h3">' + t(HK[k]) + '</h2>';
      if (k === 'series') return head + '<button type="button" class="link link--sm fcfg__cmp" data-cmp>' + t('cfg.compare') + I('sliders') + '</button>' +
        C.series.map((x, i) => { const from = Math.min(...x.e.map(e => e.list)), best = Math.min(...x.e.map(e => e.list - (e.adv || 0) - (SP.biz ? 0 : (e.rabla || 0)))); return '<label class="fopt"><input type="radio" name="series" value="' + i + '"' + (i === s.si ? ' checked' : '') + '><span><span class="fopt__h"><strong>' + esc(x.n) + '</strong><i class="fopt__r"></i></span><span class="fopt__p">' + t('c.from') + ' <b>' + eur(best) + '</b>' + (best < from ? ' <s>' + eur(from) + '</s>' : '') + '</span>' +
          '<ul class="fopt__l">' + x.hi.slice(0, i === s.si ? 8 : 3).map(h => '<li>' + esc(h) + '</li>').join('') + '</ul></span></label>'; }).join('');
      if (k === 'body') return head + C.bodies.map((b, i) => '<label class="fopt"><input type="radio" name="body" value="' + i + '"' + (i === s.bi ? ' checked' : '') + '><span><span class="fopt__h"><strong>' + esc(L(b.n)) + '</strong><i class="fopt__r"></i></span><span class="fopt__p">' + price(b.d) + '</span>' + (b.note ? '<small class="muted">' + esc(L(b.note)) + '</small>' : '') + '</span></label>').join('');
      if (k === 'engine') { const base = Math.min(...S().e.map(e => e.list)); return head + S().e.map((e, i) => '<label class="fopt"><input type="radio" name="engine" value="' + i + '"' + (i === s.ei ? ' checked' : '') + '><span><span class="fopt__h"><strong>' + esc(e.n) + '</strong><i class="fopt__r"></i></span>' +
        '<span class="fopt__tags">' + [e.cp ? e.cp + ' CP' : '', L(SP.FUEL[e.fuel]), e.gb, e.dr].filter(Boolean).map(x => '<em>' + esc(x) + '</em>').join('') + '</span><span class="fopt__p">' + (e.list > base ? '+ ' + eur(e.list - base) : t('c.included')) + (e.est ? ' <small class="muted">· ' + t('cfg.est') + '</small>' : '') + '</span></span></label>').join(''); }
      if (k === 'ext') return head + '<p class="fcfg__sel"><strong>' + esc(Col().n) + '</strong> · ' + price(Col().p) + '</p><div class="swatches">' + S().col.map((c, i) => '<label class="sw" title="' + esc(c.n) + '"><input type="radio" name="col" value="' + i + '"' + (i === s.ci ? ' checked' : '') + '><span>' + chipImg(c) + '</span></label>').join('') + '</div>' +
        '<ul class="flist">' + S().col.map((c, i) => '<li class="' + (i === s.ci ? 'is-on' : '') + '"><span>' + esc(c.n) + '</span><em>' + price(c.p) + '</em></li>').join('') + '</ul>';
      if (k === 'int') return head + S().int.map((x, i) => '<label class="fopt"><input type="radio" name="int" value="' + i + '"' + (i === s.ii ? ' checked' : '') + '><span><span class="fopt__h"><strong>' + esc(x.n) + '</strong><i class="fopt__r"></i></span><span class="fopt__p">' + price(x.p) + '</span></span></label>').join('');
      /* options: factory (grouped as on ford.ro) + dealer accessories */
      const groups = {}; S().opt.forEach((o, i) => { (groups[o.g] = groups[o.g] || []).push([o, i]); });
      return head + '<label class="copt copt--chk fcfg__rabla"' + (SP.biz ? ' hidden' : '') + '><input type="checkbox" name="rabla"' + (s.rabla ? ' checked' : '') + '><span class="copt__box">' + I('check') + '</span><span class="copt__n">' + t('cfg.rabla') + '<small>' + t('cfg.rablaD') + '</small></span><em>' + (E().rabla ? '− ' + eur(E().rabla) : '—') + '</em></label>' +
        '<h3 class="lbl">' + t('cfg.factory') + '</h3>' + (Object.keys(groups).length ? Object.keys(groups).map(g => '<details class="ogrp" open><summary>' + esc(g) + '<small>' + groups[g].length + '</small>' + I('down') + '</summary><div class="clist">' + groups[g].map(([o, i]) => '<label class="copt copt--chk"><input type="checkbox" name="opt" value="' + i + '"' + (s.opt.includes(i) ? ' checked' : '') + '><span class="copt__box">' + I('check') + '</span><span class="copt__n">' + esc(o.n) + '</span><em>' + price(o.p) + '</em></label>').join('') + '</div></details>').join('') : '<p class="muted">—</p>') +
        '<h3 class="lbl">' + t('cfg.dealerAcc') + '</h3><p class="note">' + t('cfg.dealerAccD') + '</p><div class="clist">' + accs().map(a => '<label class="copt copt--chk"><input type="checkbox" name="acc" value="' + a.id + '"' + (s.acc.includes(a.id) ? ' checked' : '') + '><span class="copt__box">' + I('check') + '</span><span class="copt__n">' + L(a.name) + '</span><em>+ ' + eur(a.price) + '</em></label>').join('') + '</div>';
    }
    function breakdown() {
      const p = P(), r = (k, v, cls) => '<tr class="' + (cls || '') + '"><th>' + t(k) + '</th><td>' + v + '</td></tr>';
      return '<div class="pd__h"><strong>' + t('cfg.priceT') + '</strong><button type="button" class="drawer__x" data-pdx aria-label="' + t('nav.close') + '">' + I('x') + '</button></div><table class="pd">' +
        r('cfg.pList', eur(p.list)) + r('cfg.pOpt', eur(p.opts)) + '<tr class="pd__sub"><th colspan="2">' + esc(Col().n) + ' · ' + esc(Int().n) + (s.opt.length ? ' · +' + s.opt.length : '') + '</th></tr>' +
        r('cfg.pListOpt', eur(p.listOpt), 'pd__b') + (SP.biz ? '' : r('cfg.pRabla', p.rabla ? '− ' + eur(p.rabla) : '—')) + r('cfg.pAdv', p.adv ? '− ' + eur(p.adv) : '—') +
        r('cfg.pPromo', eur(p.promo), 'pd__b') + r('cfg.pAcc', eur(p.acc)) + r('cfg.pDealer', eur(p.dealer), 'pd__t') + '</table><p class="note">' + (p.est ? t('cfg.estNote') + ' ' : '') + t('cfg.pNote') + ' ' + t(SP.biz ? 'c.noVat' : 'c.vatIncl') + '.</p>';
    }
    function drawStage(root) {
      const list = imgs(); if (s.img >= list.length) s.img = 0;
      const img = root.querySelector('[data-stage]'), src = list[s.img];
      if (img.getAttribute('src') !== src) { img.classList.add('is-fade'); setTimeout(() => { img.src = src; img.alt = m.name + ' ' + S().n; img.classList.remove('is-fade'); }, 140); }
      root.querySelector('[data-dots]').innerHTML = list.length > 1 ? list.map((_, i) => '<button type="button" data-dot="' + i + '" class="' + (i === s.img ? 'is-on' : '') + '" aria-label="' + (i + 1) + '"></button>').join('') : '';
      root.querySelectorAll('[data-dot]').forEach(b => b.addEventListener('click', () => { s.img = +b.dataset.dot; drawStage(root); }));
      root.querySelectorAll('.fcfg__nav').forEach(b => b.hidden = list.length < 2);
    }
    function draw(root) {
      const p = P();
      root.querySelector('[data-sname]').textContent = S().n;
      root.querySelector('[data-cap]').innerHTML = esc(E().n) + ' · ' + esc(Col().n) + ' · ' + t('cfg.delivery') + ': <b>' + (stockLike.length ? stockLike.length + ' ' + t('cfg.inStock') : t('cfg.deliveryV')) + '</b>';
      drawStage(root);
      root.querySelectorAll('[data-goto]').forEach(b => { const n = +b.dataset.goto; b.className = n === s.step ? 'is-on' : n < s.step ? 'is-done' : ''; });
      root.querySelector('[data-body]').innerHTML = body();
      root.querySelector('[data-body]').scrollTop = 0;
      root.querySelector('[data-plabel]').textContent = t(p.promo < p.listOpt ? 'cfg.pPromo' : 'cfg.pList') + (p.acc ? ' + ' + t('cfg.pAcc').toLowerCase() : '') + ' · ' + t(SP.biz ? 'c.noVat' : 'c.vatIncl');
      root.querySelector('[data-total]').innerHTML = eur(p.dealer) + (p.dealer < p.listOpt + p.acc ? ' <s>' + eur(p.listOpt + p.acc) + '</s>' : '');
      const pd = root.querySelector('[data-pdbox]'); if (!pd.hidden) pd.innerHTML = breakdown(), bindPd(root);
      root.querySelector('[data-prev]').disabled = s.step === 0;
      root.querySelector('[data-next]').innerHTML = (s.step === STEPS.length - 1 ? t('cfg.finish') : t('c.next') + ': ' + t(SK[STEPS[s.step + 1]])) + I('arrow');
      root.querySelectorAll('[data-body] input').forEach(inp => inp.addEventListener('change', () => {
        const v = inp.value;
        if (inp.name === 'series') { const prevE = E(); s.si = +v; s.ei = Math.max(0, S().e.findIndex(e => e.c === prevE.c)); s.ci = Math.min(s.ci, S().col.length - 1); s.ii = 0; s.opt = []; }
        if (inp.name === 'body') s.bi = +v; if (inp.name === 'engine') s.ei = +v;
        if (inp.name === 'col') { s.ci = +v; s.img = 0; } if (inp.name === 'int') s.ii = +v; if (inp.name === 'rabla') s.rabla = inp.checked;
        if (inp.name === 'opt') s.opt = [...root.querySelectorAll('[name="opt"]:checked')].map(x => +x.value);
        if (inp.name === 'acc') s.acc = [...root.querySelectorAll('[name="acc"]:checked')].map(x => x.value);
        const keep = root.querySelector('[data-body]').scrollTop; draw(root); if (inp.name === 'opt' || inp.name === 'acc' || inp.name === 'rabla') root.querySelector('[data-body]').scrollTop = keep;
      }));
      const cmp = root.querySelector('[data-cmp]'); if (cmp) cmp.addEventListener('click', compare);
      const sum = root.querySelector('[data-summary]'); if (!sum.hidden) summary(root, true);
    }
    function bindPd(root) { const x = root.querySelector('[data-pdx]'); if (x) x.addEventListener('click', () => { root.querySelector('[data-pdbox]').hidden = true; }); }
    function compare() {
      const el = document.createElement('div'); el.className = 'modal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
      const all = C.series, n = Math.max(...all.map(x => x.hi.length));
      el.innerHTML = '<div class="modal__p"><div class="modal__h"><h2 class="h4">' + t('cfg.cmpT') + ' · ' + m.name + '</h2><button type="button" class="drawer__x" data-mx aria-label="' + t('nav.close') + '">' + I('x') + '</button></div><div class="tbl-wrap"><table class="tbl cmpt"><thead><tr>' +
        all.map(x => '<th><img src="' + ((x.col[0] && x.col[0].img && x.col[0].img[0]) || m.cut) + '" alt=""><strong>' + esc(x.n) + '</strong><span>' + t('c.from') + ' ' + eur(Math.min(...x.e.map(e => e.list))) + '</span></th>').join('') + '</tr></thead><tbody><tr>' +
        all.map(x => '<td><ul class="ticks ticks--sm">' + x.hi.map(h => '<li>' + I('check') + esc(h) + '</li>').join('') + '</ul></td>').join('') + '</tr><tr>' +
        all.map((x, i) => '<td><button type="button" class="btn btn--ink btn--sm" data-pick="' + i + '">' + t('c.configure') + '</button></td>').join('') + '</tr></tbody></table></div><p class="note">' + t('p.cmpNote') + '</p></div>';
      const key = e => { if (e.key === 'Escape') close(); };
      const close = () => { el.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', key); };
      el.addEventListener('click', e => { const pk = e.target.closest('[data-pick]'); if (pk) { const r = document.getElementById('main'); s.si = +pk.dataset.pick; s.ei = 0; s.ci = 0; s.ii = 0; s.opt = []; close(); draw(r); return; } if (e.target === el || e.target.closest('[data-mx]')) close(); });
      document.addEventListener('keydown', key); document.body.appendChild(el); document.body.classList.add('noscroll');
    }
    function summary(root, quiet) {
      const sec = root.querySelector('[data-summary]'), p = P(), row = (k, v, pr) => '<tr><th>' + k + '</th><td>' + v + '</td><td class="num">' + pr + '</td></tr>';
      if (!quiet && !sec.hidden && sec.dataset.code === code()) { sec.scrollIntoView({ behavior: 'smooth' }); return; }
      if (quiet && sec.dataset.code === code()) return;
      sec.hidden = false; sec.dataset.code = code();
      sec.innerHTML = '<div class="container sum"><div><p class="eyebrow">' + t('cfg.summary') + '</p><h2 class="h2">' + m.name + ' ' + esc(S().n) + '</h2><div class="sum__img"><img src="' + imgs()[0] + '" alt=""></div>' +
        '<div class="tbl-wrap"><table class="tbl sum__t"><tbody>' +
        row(t('cfg.sSeries'), esc(S().n), '') + (C.bodies ? row(t('cfg.sBody'), esc(L(C.bodies[s.bi].n)), C.bodies[s.bi].d ? eur(C.bodies[s.bi].d) : '') : '') + row(t('cfg.sEngine'), esc(E().n), eur(E().list)) +
        row(t('cfg.sExt'), esc(Col().n), Col().p ? eur(Col().p) : t('c.included')) + row(t('cfg.sInt'), esc(Int().n), Int().p ? eur(Int().p) : t('c.included')) +
        s.opt.map(i => row(t('cfg.sOpt'), esc(S().opt[i].n), eur(S().opt[i].p))).join('') +
        '<tr class="is-sub"><th>' + t('cfg.pListOpt') + '</th><td></td><td class="num">' + eur(p.listOpt) + '</td></tr>' +
        (p.rabla ? row(t('cfg.pRabla'), '', '− ' + eur(p.rabla)) : '') + (p.adv ? row(t('cfg.pAdv'), '', '− ' + eur(p.adv)) : '') +
        '<tr class="is-sub"><th>' + t('cfg.pPromo') + '</th><td></td><td class="num">' + eur(p.promo) + '</td></tr>' +
        s.acc.map(id => { const a = accs().find(y => y.id === id); return row(t('cfg.pAcc'), L(a.name), eur(a.price)); }).join('') +
        '</tbody><tfoot><tr><th>' + t('cfg.pDealer') + '</th><td><small>' + t('cfg.totalNote') + '</small></td><td class="num"><strong>' + eur(p.dealer) + '</strong></td></tr></tfoot></table></div>' +
        '<div class="sumfin"><p class="lbl">' + t('cfg.pay') + '</p><div class="seg seg--sm" role="tablist">' + [['cash', 'cfg.cash'], ['credit', 'cfg.credit'], ['leasing', 'cfg.leasing']].map(x => '<button role="tab" type="button" data-pay="' + x[0] + '" aria-selected="' + (s.pay === x[0]) + '">' + t(x[1]) + '</button>').join('') + '</div>' +
        (s.pay !== 'cash' ? '<div class="field"><label for="cfg-down">' + t('cfg.down') + ': <strong>' + s.down + '%</strong></label><input id="cfg-down" type="range" min="10" max="60" step="5" data-down value="' + s.down + '"></div><p class="sumfin__m">' + t('cfg.monthly') + ' <strong>' + eur(SP.monthly(p.dealer, s.down / 100)) + '/' + t('c.month') + '</strong></p><p class="note">' + t('cfg.finNote') + '</p>' : '') + '</div>' +
        '<p class="note">' + t('cfg.code') + ': <code>' + code() + '</code></p>' +
        (stockLike.length ? '<div class="sumstock"><p class="lbl">' + t('cfg.stockMatch') + '</p><div class="grid2">' + stockLike.slice(0, 2).map(SP.stockCard).join('') + '</div></div>' : '') + '</div>' +
        '<div class="panel"><h3 class="h4">' + t('cfg.send') + '</h3><p class="muted">' + t('cfg.sendD') + '</p>' + SP.leadForm({ type: 'configuration', ctx: code(), submit: t('cfg.send'), message: true }) + '</div></div>';
      const f = sec.querySelector('form'); f.removeAttribute('data-lead');
      f.addEventListener('submit', e => { e.preventDefault(); if (!SP.validate(f)) return; /* Integration point: POST /api/leads (type=configuration, payload = configuration code + priced items) */ f.outerHTML = SP.done(t('cfg.done'), t('f.okD'), '#' + SP.ref('CFG')); });
      sec.querySelectorAll('[data-pay]').forEach(b => b.addEventListener('click', () => { s.pay = b.dataset.pay; sec.dataset.code = ''; summary(root, true); }));
      const dn = sec.querySelector('[data-down]'); if (dn) dn.addEventListener('change', () => { s.down = +dn.value; sec.dataset.code = ''; summary(root, true); });
      if (!quiet) sec.scrollIntoView({ behavior: 'smooth' });
    }
    return {
      title: t('cfg.title') + ' ' + m.name, html,
      bind(root) {
        root.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => { s.step = +b.dataset.goto; draw(root); }));
        root.querySelector('[data-prev]').addEventListener('click', () => { if (s.step > 0) { s.step--; draw(root); } });
        root.querySelector('[data-next]').addEventListener('click', () => { if (s.step < STEPS.length - 1) { s.step++; draw(root); } else summary(root); });
        root.querySelector('[data-ip]').addEventListener('click', () => { const n = imgs().length; s.img = (s.img - 1 + n) % n; drawStage(root); });
        root.querySelector('[data-in]').addEventListener('click', () => { const n = imgs().length; s.img = (s.img + 1) % n; drawStage(root); });
        root.querySelector('[data-pd]').addEventListener('click', () => { const pd = root.querySelector('[data-pdbox]'); pd.hidden = !pd.hidden; if (!pd.hidden) { pd.innerHTML = breakdown(); bindPd(root); } });
        draw(root);
      }
    };
  };
})();
