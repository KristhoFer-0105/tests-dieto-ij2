/* Esquemas anatómicos del tubo digestivo para preguntas de resecciones y anastomosis.
   window.drawGut(spec, titulo) devuelve un SVG + leyenda.
   spec: { duo:[a,b]|null, yey:[a,b]|null, ile:[a,b]|null, col:[a,b]|null, rec:bool, icv:bool,
           joins:[{from:"yey", to:"col"}], stoma:"yey"|"ile"|null }  (a,b = fracción conservada 0–1) */
(function () {
  "use strict";
  var C = { duo: "#d98b2b", yey: "#2f8fd8", ile: "#22a37e", col: "#9b59b6", rec: "#c0392b" };
  var NAME = { duo: "Duodeno", yey: "Yeyuno", ile: "Íleon", col: "Colon", rec: "Recto" };
  var G = {
    duo: [[392, 92], [425, 104], [432, 150], [412, 188], [352, 192], [318, 172]],
    yey: [[318, 172], [175, 172], [175, 207], [440, 207], [440, 242], [175, 242]],
    ile: [[175, 242], [175, 277], [440, 277], [440, 312], [175, 312], [175, 347], [462, 349]],
    col: [[474, 352], [480, 384], [500, 394], [522, 374], [522, 118], [505, 105], [120, 105], [102, 120], [102, 330], [112, 372], [170, 392], [240, 382], [278, 372]],
    rec: [[278, 372], [300, 398], [304, 446]]
  };
  function len(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }
  function total(p) { var s = 0; for (var i = 1; i < p.length; i++) s += len(p[i - 1], p[i]); return s; }
  function at(p, t) {
    var T = total(p) * t, s = 0;
    for (var i = 1; i < p.length; i++) { var l = len(p[i - 1], p[i]); if (s + l >= T || i === p.length - 1) { var f = l ? Math.min(1, (T - s) / l) : 0; return [p[i - 1][0] + (p[i][0] - p[i - 1][0]) * f, p[i - 1][1] + (p[i][1] - p[i - 1][1]) * f]; } s += l; }
    return p[p.length - 1];
  }
  function slice(p, a, b) {
    var TT = total(p), A = a * TT, B = b * TT, out = [at(p, a)], s = 0;
    for (var i = 1; i < p.length; i++) { s += len(p[i - 1], p[i]); if (s > A && s < B) out.push(p[i]); }
    out.push(at(p, b));
    return out;
  }
  function d(p) { return "M" + p.map(function (q) { return q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(" L"); }
  function tube(p, color) {
    return '<path d="' + d(p) + '" fill="none" stroke="' + color + '" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d(p) + '" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function ghost(p) { return '<path d="' + d(p) + '" fill="none" stroke="currentColor" stroke-opacity=".38" stroke-width="9" stroke-dasharray="7 6" stroke-linecap="round" stroke-linejoin="round"/>'; }

  window.drawGut = function (sp, title) {
    var kept = {};
    ["duo", "yey", "ile", "col"].forEach(function (k) { if (sp[k]) kept[k] = slice(G[k], sp[k][0], sp[k][1]); });
    if (sp.rec) kept.rec = G.rec.slice();
    var s = '<svg viewBox="0 0 640 470" role="img" aria-label="' + (title || "Esquema intestinal") + '" style="color:var(--fg)" xmlns="http://www.w3.org/2000/svg">';
    s += '<rect x="58" y="14" width="530" height="446" rx="70" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="2"/>';
    // Fantasma de la anatomía completa
    ["duo", "yey", "ile", "col", "rec"].forEach(function (k) { s += ghost(G[k]); });
    // Estómago (siempre conservado)
    s += '<path d="M262 34 C300 18 350 22 372 46 C392 68 398 84 392 94 C372 100 352 92 336 84 C312 90 286 92 268 80 C252 68 248 46 262 34 Z" fill="#8a8f98" fill-opacity=".55" stroke="currentColor" stroke-opacity=".45" stroke-width="2"/>';
    s += '<text x="300" y="64" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle">Estómago</text>';
    // Segmentos conservados
    ["col", "rec", "ile", "yey", "duo"].forEach(function (k) { if (kept[k]) s += tube(kept[k], C[k]); });
    // Anastomosis
    (sp.joins || []).forEach(function (j) {
      var A = kept[j.from], B = kept[j.to]; if (!A || !B) return;
      var p1 = A[A.length - 1], p2 = B[0];
      var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2 + (j.bend || 40);
      var path = "M" + p1[0].toFixed(1) + " " + p1[1].toFixed(1) + " Q" + mx.toFixed(1) + " " + my.toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
      s += '<path d="' + path + '" fill="none" stroke="' + C[j.from] + '" stroke-width="15" stroke-linecap="round"/>';
      s += '<circle cx="' + p2[0].toFixed(1) + '" cy="' + p2[1].toFixed(1) + '" r="12" fill="none" stroke="currentColor" stroke-width="3.5"/>';
      s += '<circle cx="' + p2[0].toFixed(1) + '" cy="' + p2[1].toFixed(1) + '" r="4" fill="currentColor"/>';
    });
    // Ostomía
    if (sp.stoma && kept[sp.stoma]) {
      var K = kept[sp.stoma], e = K[K.length - 1];
      s += '<path d="M' + e[0].toFixed(1) + " " + e[1].toFixed(1) + " Q" + ((e[0] + 585) / 2).toFixed(1) + " " + (e[1] + 70).toFixed(1) + ' 585 300" fill="none" stroke="' + C[sp.stoma] + '" stroke-width="15" stroke-linecap="round"/>';
      s += '<rect x="586" y="268" width="40" height="66" rx="14" fill="#c9b37a" fill-opacity=".55" stroke="currentColor" stroke-opacity=".6" stroke-width="2"/>';
      s += '<circle cx="588" cy="300" r="9" fill="' + C[sp.stoma] + '" stroke="currentColor" stroke-width="2"/>';
      s += '<text x="606" y="352" font-size="12" font-weight="700" fill="currentColor" text-anchor="middle">Estoma</text>';
    }
    // Válvula ileocecal
    if (sp.icv) {
      s += '<rect x="463" y="338" width="9" height="24" rx="3" fill="currentColor"/>';
      s += '<text x="468" y="330" font-size="11" font-weight="700" fill="currentColor" text-anchor="middle">Válvula ileocecal</text>';
    }
    // Referencias anatómicas fijas
    s += '<circle cx="318" cy="172" r="4" fill="currentColor"/><text x="318" y="160" font-size="11" fill="currentColor" text-anchor="middle">Ángulo de Treitz</text>';
    s += '<text x="320" y="436" font-size="12" font-weight="700" fill="currentColor">Recto</text><text x="304" y="463" font-size="11" fill="currentColor" text-anchor="middle">Ano</text>';
    if (title) s += '<text x="74" y="40" font-size="16" font-weight="800" fill="currentColor">' + title + '</text>';
    s += "</svg>";
    var lg = '<div class="glegend">' + ["duo", "yey", "ile", "col", "rec"].map(function (k) { return '<span><i style="background:' + C[k] + '"></i>' + NAME[k] + "</span>"; }).join("") +
      '<span><i class="gh"></i>Segmento resecado (punteado)</span><span><i class="an"></i>Unión quirúrgica</span></div>';
    return s + lg;
  };
})();
