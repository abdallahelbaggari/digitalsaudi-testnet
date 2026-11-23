/* DigitalSaudi — "All services" directory on Home.
   One clear map of everything in the app, grouped the same way as the Services tab, so every utility is
   easy to find. It only opens the existing tabs and groups; no utility is changed. */
(function () {
  'use strict';
  var DIR = [
    ['islamic', 'Islamic', 'mosque', 'Prayer times, Quran, Qibla, Umrah', function () { switchTab('tools'); dsSvcShow('islamic'); }],
    ['money', 'Pi & money', 'coins', 'Wallet, send Pi, currency, Zakat', function () { switchTab('tools'); dsSvcShow('money'); }],
    ['travel', 'Travel & papers', 'luggage', 'Visas, documents, transport', function () { switchTab('tools'); dsSvcShow('travel'); }],
    ['work', 'Work & life', 'briefcase', 'Jobs, CV, banking, housing', function () { switchTab('tools'); dsSvcShow('work'); }],
    ['gov', 'Government', 'landmark', 'Absher, Nafath, Qiwa, Nusuk', function () { switchTab('tools'); dsSvcShow('gov'); }],
    ['live', 'Live', 'live', 'News, football, markets, weather', function () { switchTab('live'); }],
    ['explore', 'Explore', 'compass', 'Places, cities, things to do', function () { switchTab('explore'); }],
    ['safety', 'Safety', 'shield', 'Emergency numbers, what to do', function () { switchTab('tools'); dsSvcShow('safety'); }],
    ['green', 'Green', 'leaf', 'Save water and power, recycling', function () { switchTab('tools'); dsSvcShow('green'); }]
  ];
  var tr = function (s) { try { return t(s); } catch (e) { return s; } };
  var icon = function (n) { try { return ico(n); } catch (e) { return ''; } };
  window.dsDirOpen = function (id) {
    var d = DIR.find(function (x) { return x[0] === id; }); if (!d) return;
    try { d[4](); } catch (e) {}
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
  };
  function build() {
    if (document.getElementById('dsDir')) return;
    var qa = document.getElementById('quickActions'); if (!qa) return;
    var box = document.createElement('div'); box.id = 'dsDir'; box.className = 'ds-dir';
    box.innerHTML =
      '<div class="ds-dir-h"><h2>' + esc(tr('All services')) + '</h2><span>' + esc(tr('Everything in one place')) + '</span></div>' +
      '<button type="button" class="ds-dir-q" onclick="openSearch()">' + icon('search') + '<span>' + esc(tr('Search services, guides and tools')) + '</span></button>' +
      '<div class="ds-dir-g">' + DIR.map(function (d) {
        return '<button type="button" class="ds-dir-t ds-c-' + d[0] + '" onclick="dsDirOpen(\'' + d[0] + '\')"><i>' + icon(d[2]) + '</i><b>' + esc(tr(d[1])) + '</b><small>' + esc(tr(d[3])) + '</small></button>';
      }).join('') + '</div>';
    qa.parentNode.insertBefore(box, qa.nextSibling);
  }
  var _enter = enterApp;
  enterApp = function () { var r = _enter.apply(this, arguments); setTimeout(build, 60); return r; };
  if (document.getElementById('app') && getComputedStyle(document.getElementById('app')).display !== 'none') setTimeout(build, 60);
})();
