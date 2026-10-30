/* Aether Report 2026: an interactive study.
   Everything below is illustrative. The monthly river shape is invented; nothing is measured, fetched or stored. */

(function () {
  'use strict';

  /* ---------- The model ---------- */

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var RATING = 220;                                  // kW the plant makes at full flow
  var SHAPE = [0.78, 0.62, 0.45, 0.38, 0.55, 0.82, 0.95, 1.0, 0.96, 0.88, 0.80, 0.82];
  var FIXED = 110;                                   // kW that must stay up
  var BATCH = 40;                                    // kW of work that could run on any day
  var BATCH_CAP = 80;                                // most batch work the room can run in one month
  var HOURS = 730;                                   // hours in a month

  var river = SHAPE.map(function (s) { return s * RATING; });
  var spare = river.map(function (r) { return Math.min(BATCH_CAP, Math.max(0, r - FIXED)); });
  var scale = BATCH * 12 / sum(spare);
  var batchShifted = spare.map(function (s) { return s * scale; });
  var batchFlat = MONTHS.map(function () { return BATCH; });

  function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
  function uncovered(batch) {
    return river.map(function (r, i) { return Math.max(0, FIXED + batch[i] - r); });
  }

  var uncoveredFlat = uncovered(batchFlat);
  var uncoveredShifted = uncovered(batchShifted);

  /* ---------- Story steps: what the chart shows at each one ---------- */

  var STATES = [
    null,
    { hydro: 1, demand: 0, gap: 0, shift: 0, focus: 0, value: '84 kW', label: 'River output in April, the lowest month' },
    { hydro: 1, demand: 1, gap: 0, shift: 0, focus: 0, value: '150 kW', label: 'Server room load, every month' },
    { hydro: 1, demand: 1, gap: 1, shift: 0, focus: 0, value: '116.8 MWh', label: 'Not covered by the river. It covers 91.1% of the year.' },
    { hydro: 1, demand: 1, gap: 1, shift: 1, focus: 0, value: '27.3 MWh', label: 'Not covered once batch follows the river. It covers 97.9%.' },
    { hydro: 1, demand: 1, gap: 1, shift: 1, focus: 1, value: '11 and 26 kW', label: 'Still not covered, in March and April' }
  ];

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var stage = document.getElementById('stage');
  var svg = document.getElementById('chart');
  var legend = document.getElementById('legend');
  var readout = document.querySelector('.readout');
  var readoutValue = document.getElementById('readoutValue');
  var readoutLabel = document.getElementById('readoutLabel');
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));

  var NS = 'http://www.w3.org/2000/svg';
  function el(name, attrs, parent) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  /* ---------- Chart ---------- */

  var cur = { hydro: 0, demand: 0, gap: 0, shift: 0, focus: 0 };
  var target = { hydro: 0, demand: 0, gap: 0, shift: 0, focus: 0 };
  var geo = null;
  var bars = [];
  var YMAX = 230;

  function build() {
    var box = svg.getBoundingClientRect();
    var w = Math.round(box.width);
    var h = Math.round(box.height);
    if (w < 40 || h < 40) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

    var narrow = w < 520;
    var left = narrow ? 34 : 44, right = 4, top = 8, bottom = 26;
    var pw = w - left - right, ph = h - top - bottom;
    var gw = pw / 12;
    var bw = Math.max(5, Math.min(24, gw * 0.4));
    geo = { w: w, h: h, left: left, top: top, ph: ph, gw: gw, bw: bw };

    var y = function (v) { return top + ph - v / YMAX * ph; };

    [0, 50, 100, 150, 200].forEach(function (t) {
      el('line', { x1: left, x2: left + pw, y1: y(t), y2: y(t), 'class': 'tick' }, svg);
      var lab = el('text', { x: left - 8, y: y(t) + 5, 'text-anchor': 'end' }, svg);
      lab.textContent = t;
    });

    var rate = el('g', { 'class': 'rating-g' }, svg);
    el('line', { x1: left, x2: left + pw, y1: y(RATING), y2: y(RATING), 'class': 'rating' }, rate);
    var rl = el('text', { x: left + 6, y: y(RATING) - 6, 'class': 'rating-label' }, rate);
    rl.textContent = 'Plant rating, ' + RATING + ' kW';
    geo.rating = rate;

    bars = MONTHS.map(function (m, i) {
      var cx = left + gw * (i + 0.5);
      var g = el('g', {}, svg);
      var b = {
        g: g,
        river: el('rect', { 'class': 'river', x: cx - bw - 1, width: bw }, g),
        fixed: el('rect', { 'class': 'fixed', x: cx + 1, width: bw }, g),
        fixedGap: el('rect', { 'class': 'gap', x: cx + 1, width: bw }, g),
        batch: el('rect', { 'class': 'batch', x: cx + 1, width: bw }, g),
        batchGap: el('rect', { 'class': 'gap', x: cx + 1, width: bw }, g)
      };
      var t = el('text', { x: cx, y: h - 6, 'text-anchor': 'middle' }, svg);
      t.textContent = narrow ? m.charAt(0) : m;
      return b;
    });
    draw();
  }

  function setRect(node, lo, hi, visible) {
    // lo and hi are screen y positions of the segment's bottom and top
    var hgt = Math.max(0, lo - hi);
    node.setAttribute('y', hi);
    node.setAttribute('height', hgt);
    node.style.display = visible && hgt > 0.2 ? '' : 'none';
  }

  function draw() {
    if (!geo) return;
    var base = geo.top + geo.ph;
    var perUnit = geo.ph / YMAX;
    geo.rating.style.opacity = clamp(cur.hydro * 1.5, 0, 1);

    for (var i = 0; i < 12; i++) {
      var b = bars[i];
      var hp = clamp((cur.hydro * 15 - i) / 3, 0, 1);
      var dp = clamp((cur.demand * 15 - i) / 3, 0, 1);
      var batch = batchFlat[i] + (batchShifted[i] - batchFlat[i]) * cur.shift;
      var focusDim = cur.focus * (i === 2 || i === 3 ? 0 : 0.72);
      b.g.style.opacity = 1 - focusDim;

      setRect(b.river, base, base - river[i] * hp * perUnit, true);

      // The room's column, built from the data baseline upward and scaled in by dp.
      var fixedTop = FIXED, batchTop = FIXED + batch;
      var h = river[i];                               // river output decides what is covered
      var px = function (v) { return base - v * dp * perUnit; };

      setRect(b.fixed, px(0), px(fixedTop), true);
      setRect(b.batch, px(fixedTop), px(batchTop), true);

      // Uncovered parts are painted over the normal colours; their opacity is the story's third step.
      setRect(b.fixedGap, px(Math.min(h, fixedTop)), px(fixedTop), h < fixedTop);
      setRect(b.batchGap, px(Math.max(fixedTop, h)), px(batchTop), batchTop > h);
      b.fixedGap.style.opacity = cur.gap;
      b.batchGap.style.opacity = cur.gap;
    }
  }

  /* ---------- Tweening ---------- */

  var raf = 0, from = null, t0 = 0, DUR = 1000;
  function ease(p) { return 1 - Math.pow(1 - p, 3); }

  function go(next) {
    for (var k in cur) target[k] = next[k];
    cancelAnimationFrame(raf);
    if (reduce.matches) {
      for (var j in cur) cur[j] = target[j];
      draw();
      return;
    }
    from = {};
    for (var f in cur) from[f] = cur[f];
    t0 = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function tick(now) {
    var p = clamp((now - t0) / DUR, 0, 1), e = ease(p);
    for (var k in cur) cur[k] = from[k] + (target[k] - from[k]) * e;
    draw();
    if (p < 1) raf = requestAnimationFrame(tick);
  }

  /* ---------- Which step is being read ---------- */

  var active = -1;

  function setStep(n) {
    if (n === active) return;
    active = n;
    steps.forEach(function (s, i) { if (i <= n) s.classList.add('in'); });
    var st = STATES[n];
    if (!st) {
      stage.dataset.mode = 'photo';
      go({ hydro: 0, demand: 0, gap: 0, shift: 0, focus: 0 });
      return;
    }
    stage.dataset.mode = 'chart';
    go(st);
    readoutValue.textContent = st.value;
    readoutLabel.textContent = st.label;
    readout.classList.remove('swap');
    void readout.offsetWidth;
    readout.classList.add('swap');
    Array.prototype.forEach.call(legend.children, function (li) {
      li.classList.toggle('on', n >= Number(li.dataset.from));
    });
  }

  var ticking = false;
  function locate() {
    ticking = false;
    var vh = window.innerHeight;
    var line;
    if (window.matchMedia('(max-width: 860px)').matches) {
      line = stage.getBoundingClientRect().bottom + 70;
    } else {
      line = vh * 0.5;
    }
    var found = 0;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].getBoundingClientRect().top <= line) found = i;
    }
    // Past the story the plate is released; keep the last step.
    setStep(found);
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(locate); }
  }

  /* ---------- CSV of the illustrative model ---------- */

  var csvButton = document.getElementById('csvButton');
  if (csvButton) {
    csvButton.addEventListener('click', function () {
      var rows = ['month,river_output_kw,fixed_load_kw,batch_flat_kw,batch_river_schedule_kw,uncovered_flat_kw,uncovered_river_schedule_kw,data_status'];
      MONTHS.forEach(function (m, i) {
        rows.push([m, river[i].toFixed(1), FIXED, BATCH, batchShifted[i].toFixed(1), uncoveredFlat[i].toFixed(1), uncoveredShifted[i].toFixed(1), 'illustrative'].join(','));
      });
      var blob = new Blob([rows.join('\n') + '\n'], { type: 'text/csv' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'aether-report-2026-illustrative-model.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
  }

  /* ---------- Start ---------- */

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { build(); onScroll(); });
  if (window.ResizeObserver) new ResizeObserver(function () { build(); }).observe(svg);
  build();
  locate();
})();
