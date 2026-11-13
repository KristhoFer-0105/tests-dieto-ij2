/* Motor de los tests en modo certamen.
   Formatos: mc (alternativas), tf (verdadero/falso), match (asociar), order (ordenar), num (numérica), cloze (completar).
   Ítems compuestos: casos clínicos e imágenes (parts). Una pregunta a la vez; la corrección se entrega al final. */
(function () {
  "use strict";
  var Q = window.QUIZ;
  var L = ["A", "B", "C", "D", "E"];
  var LV = { "Básica": "lv1", "Intermedia": "lv2", "Avanzada": "lv3", "Aplicación clínica": "lv3" };
  var FMT = { mc: "Selección múltiple", tf: "Verdadero o falso", match: "Asociación", order: "Ordenar", num: "Respuesta numérica", cloze: "Completar" };
  var KEY = "dieto-ij2-v2-" + Q.key;
  var st = { ans: {}, sub: false, cur: 0 };
  try { var raw = JSON.parse(localStorage.getItem(KEY) || "null"); if (raw && raw.ans) st = raw; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function perm(n, seed) { var r = rng(seed), p = []; for (var i = 0; i < n; i++) p.push(i); for (var k = n - 1; k > 0; k--) { var j = Math.floor(r() * (k + 1)); var t = p[k]; p[k] = p[j]; p[j] = t; } return p; }
  function num(s) { if (s == null) return NaN; s = String(s).trim().replace(/\s/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", "."); return s === "" ? NaN : Number(s); }
  function fmtN(x) { return String(x).replace(".", ","); }

  /* ---------- Preparación de unidades ---------- */
  function prep(p, id) {
    var c = {}; for (var k in p) c[k] = p[k];
    c.type = p.type || "mc";
    var seed = hash(Q.key + "#" + id);
    if (c.type === "mc") {
      var pm = p.k ? p.o.map(function (_, i) { return i; }) : perm(p.o.length, seed);
      c.o = pm.map(function (i) { return p.o[i]; });
      c.x = pm.map(function (i) { return p.x ? p.x[i] : ""; });
      c.a = pm.indexOf(p.a);
      c.max = 1;
    } else if (c.type === "tf") { c.max = p.s.length; }
    else if (c.type === "match") {
      var ch = []; p.rows.forEach(function (r) { if (ch.indexOf(r.r) < 0) ch.push(r.r); });
      (p.extra || []).forEach(function (e) { if (ch.indexOf(e) < 0) ch.push(e); });
      var pc = perm(ch.length, seed); c.choices = pc.map(function (i) { return ch[i]; });
      c.max = p.rows.length;
    } else if (c.type === "order") {
      var po = perm(p.steps.length, seed), same = po.every(function (v, i) { return v === i; });
      if (same) po.reverse();
      c.init = po; c.max = p.steps.length;
    } else if (c.type === "num") { c.max = 1; }
    else if (c.type === "cloze") {
      c.bl = p.blanks.map(function (b, i) { var pb = perm(b.o.length, seed + i * 7); return pb.map(function (j) { return b.o[j]; }); });
      c.max = p.blanks.length;
    }
    return c;
  }

  var units = [], blocks = [];
  Q.items.forEach(function (it, i) {
    var n = i + 1;
    if (it.parts) {
      var ids = [];
      it.parts.forEach(function (p, k) { var id = n + String.fromCharCode(97 + k); units.push({ id: id, num: n, sub: String.fromCharCode(97 + k), par: it, p: prep(p, id) }); ids.push(id); });
      blocks.push({ num: n, it: it, ids: ids });
    } else {
      units.push({ id: String(n), num: n, sub: "", par: null, p: prep(it, String(n)) });
      blocks.push({ num: n, it: it, ids: [String(n)] });
    }
  });
  var byId = {}; units.forEach(function (u, i) { u.idx = i; byId[u.id] = u; });
  if (st.cur >= units.length) st.cur = 0;

  /* ---------- Corrección ---------- */
  function answered(u) {
    var a = st.ans[u.id], t = u.p.type;
    if (a == null) return false;
    if (t === "mc") return typeof a === "number";
    if (t === "num") return String(a).trim() !== "";
    if (t === "order") return !!a.touched;
    if (t === "tf" || t === "match" || t === "cloze") return a.some(function (v) { return v !== null && v !== "" && v !== undefined; });
    return false;
  }
  function complete(u) {
    var a = st.ans[u.id], t = u.p.type;
    if (!answered(u)) return false;
    if (t === "tf" || t === "match" || t === "cloze") return a.every(function (v) { return v !== null && v !== "" && v !== undefined; }) && a.length === u.p.max;
    return true;
  }
  function score(u) {
    var p = u.p, a = st.ans[u.id], t = p.type;
    if (!answered(u)) return 0;
    if (t === "mc") return a === p.a ? 1 : 0;
    if (t === "num") { var v = num(a); return !isNaN(v) && Math.abs(v - p.ans) <= (p.tol || 0) + 1e-9 ? 1 : 0; }
    if (t === "tf") return p.s.reduce(function (s, x, i) { return s + (a[i] === x.v ? 1 : 0); }, 0);
    if (t === "match") return p.rows.reduce(function (s, r, i) { return s + (a[i] === r.r ? 1 : 0); }, 0);
    if (t === "cloze") return p.blanks.reduce(function (s, b, i) { return s + (a[i] === b.a ? 1 : 0); }, 0);
    if (t === "order") return a.ord.reduce(function (s, v, i) { return s + (v === i ? 1 : 0); }, 0);
    return 0;
  }
  function totals() {
    var pts = 0, max = 0;
    units.forEach(function (u) { pts += score(u); max += u.p.max; });
    var r = max ? pts / max : 0;
    var nota = r < 0.6 ? 1 + 3 * r / 0.6 : 4 + 3 * (r - 0.6) / 0.4;
    return { pts: pts, max: max, pct: Math.round(r * 1000) / 10, nota: Math.round(nota * 10) / 10 };
  }

  /* ---------- Renderizadores ---------- */
  function setAns(u, v) { st.ans[u.id] = v; save(); renderBar(); renderMap(); }

  function rMC(u, box, review) {
    var p = u.p, a = st.ans[u.id];
    var opts = el("div", "opts");
    p.o.forEach(function (o, k) {
      var b = el("button", "opt", "<b>" + L[k] + ".</b><span>" + o + "</span>"); b.type = "button";
      if (review) {
        b.disabled = true;
        if (k === p.a) b.classList.add(a === k ? "ok" : "sol");
        else if (a === k) b.classList.add("bad");
      } else {
        if (a === k) b.classList.add("sel");
        b.addEventListener("click", function () { setAns(u, k); opts.querySelectorAll(".opt").forEach(function (x, j) { x.classList.toggle("sel", j === k); }); });
      }
      opts.appendChild(b);
    });
    box.appendChild(opts);
  }

  function rTF(u, box, review) {
    var p = u.p, a = st.ans[u.id] || p.s.map(function () { return null; });
    var list = el("div", "tfl");
    p.s.forEach(function (s, i) {
      var row = el("div", "tfr");
      row.appendChild(el("p", "", "<b>" + (i + 1) + ".</b> " + s.p));
      var bs = el("div", "tfbs");
      [["V", true], ["F", false]].forEach(function (pair) {
        var b = el("button", "tfb", pair[0]); b.type = "button";
        if (review) {
          b.disabled = true;
          if (pair[1] === s.v) b.classList.add(a[i] === s.v ? "ok" : "sol");
          else if (a[i] === pair[1]) b.classList.add("bad");
        } else {
          if (a[i] === pair[1]) b.classList.add("sel");
          b.addEventListener("click", function () {
            var cur = (st.ans[u.id] || p.s.map(function () { return null; })).slice(); cur[i] = pair[1]; setAns(u, cur);
            bs.querySelectorAll(".tfb").forEach(function (x) { x.classList.toggle("sel", x === b); });
          });
        }
        bs.appendChild(b);
      });
      row.appendChild(bs);
      if (review) row.appendChild(el("p", "just " + (a[i] === s.v ? "ok" : "bad"), "<b>" + (s.v ? "Verdadero" : "Falso") + ".</b> " + s.f));
      list.appendChild(row);
    });
    box.appendChild(list);
  }

  function rMatch(u, box, review) {
    var p = u.p, a = st.ans[u.id] || p.rows.map(function () { return ""; });
    var list = el("div", "mlist");
    p.rows.forEach(function (r, i) {
      var row = el("div", "mrow");
      row.appendChild(el("span", "", r.l));
      var s = el("select", "sel-in");
      s.appendChild(new Option("— elegir —", ""));
      p.choices.forEach(function (c) { s.appendChild(new Option(c, c)); });
      s.value = a[i] || "";
      if (review) {
        s.disabled = true; s.classList.add(a[i] === r.r ? "ok" : "bad");
        var w = el("div", ""); w.appendChild(s);
        if (a[i] !== r.r) w.appendChild(el("small", "corr", "Correcta: " + r.r));
        row.appendChild(w);
      } else {
        s.addEventListener("change", function () { var cur = (st.ans[u.id] || p.rows.map(function () { return ""; })).slice(); cur[i] = s.value; setAns(u, cur); });
        row.appendChild(s);
      }
      list.appendChild(row);
    });
    box.appendChild(list);
  }

  function rOrder(u, box, review) {
    var p = u.p, a = st.ans[u.id] || { ord: p.init.slice(), touched: false };
    var list = el("ol", "olist");
    function draw() {
      list.innerHTML = "";
      a.ord.forEach(function (si, pos) {
        var li = el("li", "orow" + (review ? (si === pos ? " ok" : " bad") : ""));
        li.appendChild(el("span", "otx", p.steps[si]));
        if (!review) {
          var up = el("button", "btn mini", "↑"), dn = el("button", "btn mini", "↓");
          up.type = dn.type = "button"; up.disabled = pos === 0; dn.disabled = pos === a.ord.length - 1;
          up.setAttribute("aria-label", "Subir"); dn.setAttribute("aria-label", "Bajar");
          up.addEventListener("click", function () { mv(pos, -1); }); dn.addEventListener("click", function () { mv(pos, 1); });
          var g = el("span", "ob"); g.appendChild(up); g.appendChild(dn); li.appendChild(g);
        }
        list.appendChild(li);
      });
    }
    function mv(pos, d) { var o = a.ord.slice(), t = o[pos]; o[pos] = o[pos + d]; o[pos + d] = t; a = { ord: o, touched: true }; setAns(u, a); draw(); }
    draw();
    box.appendChild(list);
    if (review) box.appendChild(el("div", "corr", "<b>Orden correcto:</b><ol>" + p.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>"));
  }

  function rNum(u, box, review) {
    var p = u.p, a = st.ans[u.id] || "";
    var row = el("div", "numrow");
    var inp = el("input", ""); inp.type = "text"; inp.inputMode = "decimal"; inp.value = a; inp.setAttribute("aria-label", "Respuesta numérica");
    row.appendChild(inp); if (p.unit) row.appendChild(el("span", "unit", p.unit));
    if (review) {
      inp.disabled = true; inp.classList.add(score(u) ? "ok" : "bad");
      row.appendChild(el("span", "corr", "Correcta: " + fmtN(p.ans) + (p.unit ? " " + p.unit : "") + (p.tol ? " (± " + fmtN(p.tol) + ")" : "")));
    } else {
      inp.addEventListener("input", function () { setAns(u, inp.value); });
      row.appendChild(el("span", "hint", "Usa coma o punto decimal"));
    }
    box.appendChild(row);
  }

  function rCloze(u, box, review) {
    var p = u.p, a = st.ans[u.id] || p.blanks.map(function () { return ""; });
    var html = p.text.replace(/\{(\d+)\}/g, function (_, i) { return '<span class="slotc" data-i="' + i + '"></span>'; });
    var div = el("p", "cloze", html);
    div.querySelectorAll(".slotc").forEach(function (sp) {
      var i = +sp.getAttribute("data-i");
      var s = el("select", "sel-in"); s.appendChild(new Option("—", ""));
      u.p.bl[i].forEach(function (o) { s.appendChild(new Option(o, o)); });
      s.value = a[i] || "";
      if (review) {
        s.disabled = true; s.classList.add(a[i] === p.blanks[i].a ? "ok" : "bad");
        sp.appendChild(s);
        if (a[i] !== p.blanks[i].a) sp.appendChild(el("small", "corr", " → " + p.blanks[i].a));
      } else {
        s.addEventListener("change", function () { var cur = (st.ans[u.id] || p.blanks.map(function () { return ""; })).slice(); cur[i] = s.value; setAns(u, cur); });
        sp.appendChild(s);
      }
    });
    box.appendChild(div);
  }

  var R = { mc: rMC, tf: rTF, match: rMatch, order: rOrder, num: rNum, cloze: rCloze };

  function fbHTML(u) {
    var p = u.p, sc = score(u), h = "";
    var res = !answered(u) ? '<span class="bad">sin responder</span>' : sc === p.max ? '<span class="ok">correcta</span>' : sc > 0 ? '<span class="warn">parcial</span>' : '<span class="bad">incorrecta</span>';
    if (p.type === "mc") {
      var a = st.ans[u.id];
      h += '<p class="key">Pauta: pregunta ' + u.id + " → alternativa " + L[p.a] + " · Tu respuesta: " + (typeof a === "number" ? L[a] : "—") + " (" + res + ")</p>";
    } else {
      h += '<p class="key">Pregunta ' + u.id + " · Puntaje: " + fmtN(sc) + " de " + p.max + " (" + res + ")</p>";
    }
    h += "<h4>Retroalimentación</h4><p>" + p.f + "</p>";
    if (p.type === "mc") {
      h += "<h4>Análisis de distractores</h4><ul>" + p.o.map(function (o, k) { return k === p.a ? "" : "<li><b>" + L[k] + ".</b> " + (p.x[k] || "") + "</li>"; }).join("") + "</ul>";
    }
    if (p.type === "match" && p.why) h += "<h4>Fundamento de cada asociación</h4><ul>" + p.rows.map(function (r, i) { return p.why[i] ? "<li><b>" + r.l + " → " + r.r + ".</b> " + p.why[i] + "</li>" : ""; }).join("") + "</ul>";
    h += '<p class="cont"><b>Contenido evaluado:</b> ' + p.t + "</p>";
    return h;
  }

  function caseBox(u, open) {
    var it = u.par;
    var d = el("details", "casewrap"); d.open = open;
    d.appendChild(el("summary", "", '<span class="tag">' + it.kind + "</span> " + it.title));
    var inner = el("div", "casebox");
    if (it.fig && window.drawGut) inner.appendChild(el("figure", "fig", window.drawGut(it.fig, "Imagen " + (it.figNum || u.num)) + (it.cap ? "<figcaption>" + it.cap + "</figcaption>" : "")));
    if (it.html) inner.appendChild(el("div", "", it.html));
    d.appendChild(inner);
    return d;
  }

  function unitCard(u, review) {
    var p = u.p;
    var card = el("article", "q");
    card.id = "u" + u.id;
    var h = el("div", "qh");
    h.appendChild(el("span", "num", u.id));
    h.appendChild(el("span", "tag", FMT[p.type]));
    var d = p.d || (u.par && u.par.d);
    if (d) h.appendChild(el("span", "tag " + (LV[d] || ""), d));
    if (review) {
      var sc = score(u), cl = sc === p.max ? "ok" : sc > 0 ? "part" : "bad";
      card.classList.add(cl === "part" ? "pt" : cl);
      h.appendChild(el("span", "state " + (cl === "part" ? "warn" : cl), fmtN(sc) + "/" + p.max + " pts"));
    }
    card.appendChild(h);
    if (u.par) card.appendChild(caseBox(u, !review || u.sub === "a"));
    var box = el("div", "part");
    box.appendChild(el("p", "stem", (u.sub ? '<span class="lab">' + u.sub + ")</span>" : "") + p.q));
    R[p.type](u, box, review);
    card.appendChild(box);
    if (review) card.appendChild(el("div", "fb", fbHTML(u)));
    return card;
  }

  /* ---------- Vistas ---------- */
  var main = document.getElementById("main"), gridEl = document.getElementById("grid");

  document.title = Q.docTitle;
  document.getElementById("hero").innerHTML = '<div class="wrap"><div class="kicker">' + Q.module + " · Dietoterapia Infantojuvenil II · NUT-421</div><h1>" + Q.title + "</h1><p>" + Q.subtitle + '</p><div class="chips">' + Q.chips.map(function (c) { return "<span>" + c + "</span>"; }).join("") + '<span>Corrección al entregar</span></div></div>';

  function renderBar() {
    var nA = units.filter(answered).length;
    var stats = document.getElementById("stats");
    if (st.sub) {
      var T = totals();
      stats.innerHTML = "<span><b>" + fmtN(T.pts) + "/" + T.max + "</b> puntos</span><span><b>" + fmtN(T.pct) + " %</b> logro</span><span><b>" + fmtN(T.nota.toFixed(1)) + "</b> nota (60 %)</span>";
    } else {
      stats.innerHTML = "<span><b>" + nA + "/" + units.length + "</b> respondidas</span><span>Pregunta <b>" + units[st.cur].id + "</b></span>";
    }
    document.getElementById("track").style.width = (st.sub ? 100 : nA * 100 / units.length) + "%";
  }

  function renderMap() {
    gridEl.innerHTML = "";
    units.forEach(function (u, i) {
      var cls = "n";
      if (st.sub) { var s = score(u); cls += s === u.p.max ? " ok" : s > 0 ? " part" : " bad"; }
      else { if (answered(u)) cls += complete(u) ? " done" : " part"; if (i === st.cur) cls += " cur"; }
      var b = el("button", cls, u.id); b.type = "button";
      b.addEventListener("click", function () {
        if (st.sub) { var t = document.getElementById("u" + u.id); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }
        else { st.cur = i; save(); renderExam(); }
      });
      gridEl.appendChild(b);
    });
  }

  function renderExam() {
    main.innerHTML = "";
    var u = units[st.cur];
    var sec = blocks[u.num - 1].it.sec;
    for (var j = u.num - 1; !sec && j >= 0; j--) sec = blocks[j].it.sec;
    if (sec) main.appendChild(el("p", "secnote", sec));
    main.appendChild(unitCard(u, false));
    var nav = el("div", "navbar");
    var prev = el("button", "btn big", "← Anterior"); prev.type = "button"; prev.disabled = st.cur === 0;
    prev.addEventListener("click", function () { st.cur--; save(); renderExam(); scrollTop(); });
    nav.appendChild(prev);
    nav.appendChild(el("span", "pos", (st.cur + 1) + " de " + units.length));
    if (st.cur < units.length - 1) {
      var next = el("button", "btn big primary", "Siguiente →"); next.type = "button";
      next.addEventListener("click", function () { st.cur++; save(); renderExam(); scrollTop(); });
      nav.appendChild(next);
    } else {
      var fin = el("button", "btn big primary", "Revisar y entregar"); fin.type = "button";
      fin.addEventListener("click", askSubmit); nav.appendChild(fin);
    }
    main.appendChild(nav);
    renderBar(); renderMap();
  }

  function scrollTop() { var b = document.querySelector(".bar"); window.scrollTo({ top: b ? b.offsetTop : 0, behavior: "smooth" }); }

  function askSubmit() {
    var pend = units.filter(function (u) { return !complete(u); });
    var box = el("div", "confirm");
    box.innerHTML = "<h3>¿Entregar el certamen?</h3><p>" + (pend.length ? "Tienes <b>" + pend.length + "</b> pregunta(s) sin responder o incompletas: " + pend.map(function (u) { return u.id; }).join(", ") + ". Se corregirán como están." : "Respondiste todas las preguntas.") + " Después de entregar verás la corrección completa.</p>";
    var row = el("div", "acts");
    var ok = el("button", "btn big primary", "Entregar y ver corrección"); ok.type = "button";
    var no = el("button", "btn big", "Seguir respondiendo"); no.type = "button";
    ok.addEventListener("click", function () { st.sub = true; save(); renderResults(); scrollTop(); });
    no.addEventListener("click", function () { box.remove(); });
    row.appendChild(ok); row.appendChild(no); box.appendChild(row);
    var old = main.querySelector(".confirm"); if (old) old.remove();
    main.appendChild(box); box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  var onlyBad = false;
  function renderResults() {
    main.innerHTML = "";
    var T = totals();
    var sum = el("section", "result");
    sum.innerHTML = '<h2>Resultado del certamen</h2><div class="kpis"><div><b>' + fmtN(T.pts) + " / " + T.max + "</b><span>puntaje</span></div><div><b>" + fmtN(T.pct) + ' %</b><span>logro</span></div><div><b class="nota ' + (T.nota >= 4 ? "ok" : "bad") + '">' + fmtN(T.nota.toFixed(1)) + "</b><span>nota (exigencia 60 %)</span></div></div>";
    main.appendChild(sum);

    // Contenidos a reforzar
    var areas = {};
    units.forEach(function (u) {
      var ar = u.p.t.split(":")[0].trim(); if (!areas[ar]) areas[ar] = { pts: 0, max: 0, ids: [] };
      var s = score(u); areas[ar].pts += s; areas[ar].max += u.p.max; if (s < u.p.max) areas[ar].ids.push(u.id);
    });
    var weak = Object.keys(areas).filter(function (k) { return areas[k].ids.length; }).sort(function (a, b) { return areas[a].pts / areas[a].max - areas[b].pts / areas[b].max; });
    var ref = el("section", "result");
    ref.innerHTML = "<h2>Contenidos que debes reforzar</h2>" + (weak.length ? "<ul class='weak'>" + weak.map(function (k) { var A = areas[k]; return "<li><b>" + k + "</b> — " + Math.round(A.pts * 100 / A.max) + " % de logro · preguntas " + A.ids.join(", ") + "</li>"; }).join("") + "</ul>" : "<p>¡Excelente! No hay contenidos con errores.</p>");
    main.appendChild(ref);

    // Tabla
    var tb = el("section", "result");
    tb.innerHTML = "<h2>Tabla de respuestas</h2><div class='tbl'><table><thead><tr><th>N.º</th><th>Formato</th><th>Contenido evaluado</th><th>Puntaje</th><th>Resultado</th></tr></thead><tbody>" +
      units.map(function (u) {
        var s = score(u), r = !answered(u) ? "Sin responder" : s === u.p.max ? "Correcta" : s > 0 ? "Parcial" : "Incorrecta";
        var c = s === u.p.max ? "ok" : s > 0 ? "warn" : "bad";
        return '<tr><td><a href="#u' + u.id + '">' + u.id + "</a></td><td>" + FMT[u.p.type] + "</td><td>" + u.p.t + "</td><td>" + fmtN(s) + "/" + u.p.max + '</td><td class="' + c + '">' + r + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    main.appendChild(tb);

    var tools = el("div", "acts");
    var f1 = el("button", "f", onlyBad ? "Ver todas" : "Ver solo errores"); f1.type = "button";
    f1.addEventListener("click", function () { onlyBad = !onlyBad; renderResults(); });
    var pr = el("button", "f", "Imprimir"); pr.type = "button"; pr.addEventListener("click", function () { window.print(); });
    var rs = el("button", "f reset", "Nuevo intento"); rs.type = "button"; rs.addEventListener("click", askReset);
    tools.appendChild(f1); tools.appendChild(pr); tools.appendChild(rs);
    main.appendChild(el("h2", "sec", "Corrección fundamentada"));
    main.appendChild(tools);
    units.forEach(function (u) { if (onlyBad && score(u) === u.p.max) return; main.appendChild(unitCard(u, true)); });
    renderBar(); renderMap();
  }

  function askReset() {
    var box = el("div", "confirm");
    box.innerHTML = "<h3>¿Comenzar un nuevo intento?</h3><p>Se borrarán tus respuestas y la corrección actual.</p>";
    var row = el("div", "acts");
    var ok = el("button", "btn big primary", "Sí, comenzar de nuevo"); ok.type = "button";
    var no = el("button", "btn big", "Cancelar"); no.type = "button";
    ok.addEventListener("click", function () { st = { ans: {}, sub: false, cur: 0 }; save(); renderExam(); scrollTop(); });
    no.addEventListener("click", function () { box.remove(); });
    row.appendChild(ok); row.appendChild(no); box.appendChild(row);
    main.insertBefore(box, main.firstChild); scrollTop();
  }

  document.getElementById("submitBtn").addEventListener("click", function () { if (st.sub) return; st.cur = units.length - 1; renderExam(); askSubmit(); });
  document.getElementById("reset").addEventListener("click", askReset);

  if (st.sub) renderResults(); else renderExam();
})();
