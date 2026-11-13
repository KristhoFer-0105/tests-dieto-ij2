/* Motor de los tests (modo práctica).
   Todas las preguntas visibles en la página; corrección inmediata con retroalimentación,
   análisis de distractores y opción de reintentar cada pregunta.
   Formatos: mc (alternativas), tf (verdadero/falso), match (asociar), order (ordenar), num (numérica), cloze (completar).
   Ítems compuestos: casos clínicos e imágenes (parts). */
(function () {
  "use strict";
  var Q = window.QUIZ;
  var L = ["A", "B", "C", "D", "E"];
  var LV = { "Básica": "lv1", "Intermedia": "lv2", "Avanzada": "lv3", "Aplicación clínica": "lv3" };
  var FMT = { mc: "Selección múltiple", tf: "Verdadero o falso", match: "Asociación", order: "Ordenar", num: "Respuesta numérica", cloze: "Completar" };
  var KEY = "dieto-ij2-v3-" + Q.key;
  var st = { ans: {}, chk: {} };
  try { var raw = JSON.parse(localStorage.getItem(KEY) || "null"); if (raw && raw.ans && raw.chk) st = raw; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
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
      var po = perm(p.steps.length, seed);
      if (po.every(function (v, i) { return v === i; })) po.reverse();
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
      blocks.push({ num: n, it: it, ids: ids, isCase: true });
    } else {
      units.push({ id: String(n), num: n, sub: "", par: null, p: prep(it, String(n)) });
      blocks.push({ num: n, it: it, ids: [String(n)], isCase: false });
    }
  });
  var byId = {}; units.forEach(function (u) { byId[u.id] = u; });

  /* ---------- Corrección ---------- */
  function answered(u) {
    var a = st.ans[u.id], t = u.p.type;
    if (a == null) return false;
    if (t === "mc") return typeof a === "number";
    if (t === "num") return String(a).trim() !== "";
    if (t === "order") return !!a.touched;
    return a.some(function (v) { return v !== null && v !== "" && v !== undefined; });
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
  function status(u) { if (!st.chk[u.id]) return ""; var s = score(u); return s === u.p.max ? "ok" : s > 0 ? "part" : "bad"; }
  function blockStatus(b) {
    var ss = b.ids.map(function (id) { return status(byId[id]); });
    if (ss.every(function (s) { return s === ""; })) return "";
    if (ss.some(function (s) { return s === ""; })) return "prog";
    if (ss.every(function (s) { return s === "ok"; })) return "ok";
    if (ss.some(function (s) { return s === "bad"; })) return "bad";
    return "part";
  }

  /* ---------- Renderizadores por formato ---------- */
  function setAns(u, v) { st.ans[u.id] = v; save(); }

  function rMC(u, box, review) {
    var p = u.p, a = st.ans[u.id];
    var opts = el("div", "opts");
    p.o.forEach(function (o, k) {
      var b = el("button", "opt", "<b>" + L[k] + ".</b><span>" + o + "</span>"); b.type = "button";
      if (review) {
        b.disabled = true;
        if (k === p.a) b.classList.add("ok");
        else if (a === k) b.classList.add("bad");
      } else {
        b.addEventListener("click", function () { st.ans[u.id] = k; st.chk[u.id] = 1; save(); refreshUnit(u); });
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
      if (review) row.appendChild(el("p", "just " + (a[i] === s.v ? "ok" : "bad"), (a[i] === s.v ? "✔ " : a[i] == null ? "— Sin responder. " : "✘ ") + "<b>Es " + (s.v ? "verdadera" : "falsa") + ":</b> " + s.f));
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
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") check(u); });
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

  /* ---------- Retroalimentación ---------- */
  function fbHTML(u) {
    var p = u.p, sc = score(u), h = "";
    var res = !answered(u) ? '<span class="bad">sin responder</span>' : sc === p.max ? '<span class="ok">correcta</span>' : sc > 0 ? '<span class="warn">parcialmente correcta</span>' : '<span class="bad">incorrecta</span>';
    if (p.type === "mc") {
      var a = st.ans[u.id];
      h += '<p class="key">Respuesta correcta: <span class="ok">' + L[p.a] + ". " + p.o[p.a] + "</span><br>Tu respuesta: " + (typeof a === "number" ? L[a] : "—") + " (" + res + ")</p>";
    } else {
      h += '<p class="key">Puntaje: ' + fmtN(sc) + " de " + p.max + " (" + res + ")</p>";
    }
    h += "<h4>Por qué es correcta</h4><p>" + p.f + "</p>";
    if (p.type === "mc") {
      h += "<h4>Por qué las otras alternativas no son correctas</h4><ul>" + p.o.map(function (o, k) { return k === p.a ? "" : "<li><b>" + L[k] + ".</b> " + (p.x[k] || "") + "</li>"; }).join("") + "</ul>";
    } else if (p.type === "tf") {
      var fs = p.s.map(function (s, i) { return s.v ? "" : "<li><b>Afirmación " + (i + 1) + ":</b> " + s.f + "</li>"; }).join("");
      if (fs) h += "<h4>Por qué las afirmaciones falsas no son correctas</h4><ul>" + fs + "</ul>";
    } else if (p.type === "match") {
      if (p.why) h += "<h4>Fundamento de cada asociación</h4><ul>" + p.rows.map(function (r, i) { return "<li><b>" + r.l + " → " + r.r + ".</b> " + (p.why[i] || "") + "</li>"; }).join("") + "</ul>";
      if (p.extra && p.extra.length) h += "<p><b>Distractor:</b> " + p.extra.map(function (e) { return "«" + e + "»"; }).join(", ") + " no corresponde a ninguno de los elementos.</p>";
    } else if (p.type === "cloze") {
      h += "<h4>Respuestas de cada espacio</h4><ul>" + p.blanks.map(function (b, i) { return "<li>Espacio " + (i + 1) + ": <b>" + b.a + "</b> · incorrectas: " + b.o.filter(function (x) { return x !== b.a; }).join(", ") + "</li>"; }).join("") + "</ul>";
    }
    h += '<p class="cont"><b>Contenido evaluado:</b> ' + p.t + "</p>";
    return h;
  }

  /* ---------- Tarjetas ---------- */
  function check(u) {
    if (!answered(u)) {
      var hint = document.querySelector("#u" + u.id + " .needans");
      if (hint) hint.hidden = false;
      return;
    }
    st.chk[u.id] = 1; save(); refreshUnit(u);
  }

  function partEl(u) {
    var p = u.p, review = !!st.chk[u.id];
    var box = el("div", "part");
    box.id = "u" + u.id;
    var lab = u.sub ? '<span class="lab">' + u.id + ")</span>" : "";
    var tags = u.sub ? ' <span class="tag">' + FMT[p.type] + "</span>" : "";
    box.appendChild(el("p", u.sub ? "pq" : "stem", lab + p.q + tags));
    R[p.type](u, box, review);
    var acts = el("div", "acts");
    if (review) {
      var s = score(u), cls = s === p.max ? "ok" : s > 0 ? "warn" : "bad";
      box.appendChild(el("div", "fb fb-" + cls, fbHTML(u)));
      var rt = el("button", "btn", "↺ Reintentar pregunta"); rt.type = "button";
      rt.addEventListener("click", function () { delete st.ans[u.id]; delete st.chk[u.id]; save(); refreshUnit(u); });
      acts.appendChild(rt);
    } else if (p.type !== "mc") {
      var ck = el("button", "btn primary", "Comprobar respuesta"); ck.type = "button";
      ck.addEventListener("click", function () { check(u); });
      acts.appendChild(ck);
      var nh = el("span", "needans", "Responde antes de comprobar."); nh.hidden = true; acts.appendChild(nh);
    }
    box.appendChild(acts);
    return box;
  }

  function headEl(b) {
    var it = b.it, h = el("div", "qh");
    h.appendChild(el("span", "num", String(b.num)));
    if (b.isCase) h.appendChild(el("span", "tag", it.kind));
    else h.appendChild(el("span", "tag", FMT[byId[b.ids[0]].p.type]));
    if (it.d) h.appendChild(el("span", "tag " + (LV[it.d] || ""), it.d));
    var bs = blockStatus(b);
    var lbl = { ok: "Correcta", bad: "Con errores", part: "Parcial", prog: "En curso" }[bs];
    if (b.isCase && bs === "ok") lbl = "Todo correcto";
    if (lbl) h.appendChild(el("span", "state " + (bs === "prog" ? "" : bs === "part" ? "warn" : bs), lbl));
    return h;
  }

  function blockEl(b) {
    var it = b.it;
    var card = el("article", "q");
    card.id = "q" + b.num;
    var bs = blockStatus(b);
    if (bs === "ok" || bs === "bad") card.classList.add(bs);
    if (bs === "part") card.classList.add("pt");
    card.appendChild(headEl(b));
    if (b.isCase) {
      card.appendChild(el("h3", "ctitle", it.title));
      var inner = el("div", "casebox");
      if (it.fig && window.drawGut) inner.appendChild(el("figure", "fig", window.drawGut(it.fig, "Imagen " + (it.figNum || b.num)) + (it.cap ? "<figcaption>" + it.cap + "</figcaption>" : "")));
      if (it.html) inner.appendChild(el("div", "", it.html));
      card.appendChild(inner);
    }
    b.ids.forEach(function (id) { card.appendChild(partEl(byId[id])); });
    return card;
  }

  function refreshUnit(u) {
    var old = document.getElementById("u" + u.id);
    if (old) old.replaceWith(partEl(u));
    var b = blocks[u.num - 1], card = document.getElementById("q" + b.num);
    if (card) {
      card.classList.remove("ok", "bad", "pt");
      var bs = blockStatus(b);
      if (bs === "ok" || bs === "bad") card.classList.add(bs);
      if (bs === "part") card.classList.add("pt");
      card.querySelector(".qh").replaceWith(headEl(b));
    }
    renderBar(); renderMap(); renderSummary();
  }

  /* ---------- Vistas ---------- */
  var main = document.getElementById("main"), gridEl = document.getElementById("grid");
  var filter = "all";

  document.title = Q.docTitle;
  document.getElementById("hero").innerHTML = '<div class="wrap"><div class="kicker">' + Q.module + " · Dietoterapia Infantojuvenil II · NUT-421</div><h1>" + Q.title + "</h1><p>" + Q.subtitle + '</p><div class="chips">' + Q.chips.map(function (c) { return "<span>" + c + "</span>"; }).join("") + '<span>Corrección inmediata</span></div></div>';

  function totals() {
    var pts = 0, max = 0, done = 0, dmax = 0;
    units.forEach(function (u) { max += u.p.max; if (st.chk[u.id]) { done++; dmax += u.p.max; pts += score(u); } });
    var r = max ? pts / max : 0;
    var nota = r < 0.6 ? 1 + 3 * r / 0.6 : 4 + 3 * (r - 0.6) / 0.4;
    return { pts: pts, max: max, done: done, dmax: dmax, pct: dmax ? Math.round(pts * 1000 / dmax) / 10 : null, nota: Math.round(nota * 10) / 10 };
  }

  function renderBar() {
    var T = totals();
    document.getElementById("stats").innerHTML =
      "<span><b>" + T.done + "/" + units.length + "</b> respondidas</span>" +
      "<span><b>" + fmtN(T.pts) + "/" + T.max + "</b> puntos</span>" +
      "<span><b>" + (T.pct == null ? "—" : fmtN(T.pct) + " %") + "</b> logro</span>" +
      "<span><b>" + (T.done ? fmtN(T.nota.toFixed(1)) : "—") + "</b> nota (60 %)</span>";
    document.getElementById("track").style.width = (T.done * 100 / units.length) + "%";
  }

  function visible(b) {
    var bs = blockStatus(b);
    if (filter === "pend") return bs === "" || bs === "prog";
    if (filter === "bad") return b.ids.some(function (id) { var s = status(byId[id]); return s === "bad" || s === "part"; });
    if (filter === "case") return b.isCase;
    return true;
  }

  function renderMap() {
    gridEl.innerHTML = "";
    blocks.forEach(function (b) {
      var bs = blockStatus(b);
      var n = el("button", "n" + (bs ? " " + ({ ok: "ok", bad: "bad", part: "part", prog: "part" }[bs]) : ""), String(b.num)); n.type = "button";
      n.title = b.isCase ? "Pregunta " + b.num + " · " + b.it.kind : "Pregunta " + b.num;
      n.addEventListener("click", function () {
        if (!visible(b)) setFilter("all");
        var t = document.getElementById("q" + b.num); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      gridEl.appendChild(n);
    });
  }

  var sumEl = el("details", "result summary");
  function renderSummary() {
    var T = totals(), open = sumEl.open;
    if (!T.done) { sumEl.innerHTML = "<summary>Resumen de resultados</summary><p>Aún no has respondido preguntas.</p>"; sumEl.open = open; return; }
    var areas = {};
    units.forEach(function (u) {
      if (!st.chk[u.id]) return;
      var ar = u.p.t.split(":")[0].trim(); if (!areas[ar]) areas[ar] = { pts: 0, max: 0, ids: [] };
      var s = score(u); areas[ar].pts += s; areas[ar].max += u.p.max; if (s < u.p.max) areas[ar].ids.push(u.id);
    });
    var weak = Object.keys(areas).filter(function (k) { return areas[k].ids.length; }).sort(function (a, b) { return areas[a].pts / areas[a].max - areas[b].pts / areas[b].max; });
    sumEl.innerHTML = "<summary>Resumen de resultados (" + T.done + " de " + units.length + " respondidas)</summary>" +
      '<div class="kpis"><div><b>' + fmtN(T.pts) + " / " + T.dmax + "</b><span>puntos en lo respondido</span></div><div><b>" + fmtN(T.pct) + ' %</b><span>logro</span></div><div><b class="nota ' + (T.nota >= 4 ? "ok" : "bad") + '">' + fmtN(T.nota.toFixed(1)) + "</b><span>nota sobre el total (" + T.max + " pts, 60 %)</span></div></div>" +
      "<h3>Contenidos que debes reforzar</h3>" + (weak.length ? "<ul class='weak'>" + weak.map(function (k) { var A = areas[k]; return "<li><b>" + k + "</b> — " + Math.round(A.pts * 100 / A.max) + " % de logro · preguntas " + A.ids.map(function (id) { return '<a href="#u' + id + '">' + id + "</a>"; }).join(", ") + "</li>"; }).join("") + "</ul>" : "<p>Sin errores en lo respondido.</p>") +
      "<h3>Tabla de respuestas</h3><div class='tbl'><table><thead><tr><th>N.º</th><th>Formato</th><th>Contenido evaluado</th><th>Puntaje</th><th>Resultado</th></tr></thead><tbody>" +
      units.map(function (u) {
        if (!st.chk[u.id]) return '<tr><td><a href="#u' + u.id + '">' + u.id + "</a></td><td>" + FMT[u.p.type] + "</td><td>" + u.p.t + "</td><td>—</td><td>Pendiente</td></tr>";
        var s = score(u), r = s === u.p.max ? "Correcta" : s > 0 ? "Parcial" : "Incorrecta", c = s === u.p.max ? "ok" : s > 0 ? "warn" : "bad";
        return '<tr><td><a href="#u' + u.id + '">' + u.id + "</a></td><td>" + FMT[u.p.type] + "</td><td>" + u.p.t + "</td><td>" + fmtN(s) + "/" + u.p.max + '</td><td class="' + c + '">' + r + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    sumEl.open = open;
  }

  function renderAll() {
    main.innerHTML = "";
    var shown = 0, lastSec = null;
    blocks.forEach(function (b) {
      var sec = b.it.sec || null;
      if (!visible(b)) { if (sec) lastSec = sec; return; }
      if (sec && sec !== lastSec && filter === "all") main.appendChild(el("h2", "sec", sec));
      if (sec) lastSec = sec;
      main.appendChild(blockEl(b)); shown++;
    });
    if (!shown) main.appendChild(el("p", "empty", "No hay preguntas en este filtro."));
    renderSummary(); main.appendChild(sumEl);
    renderBar(); renderMap();
  }

  function setFilter(f) {
    filter = f;
    document.querySelectorAll(".f[data-f]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-f") === f ? "true" : "false"); });
    renderAll();
  }
  document.querySelectorAll(".f[data-f]").forEach(function (b) { b.addEventListener("click", function () { setFilter(b.getAttribute("data-f")); }); });
  if (!blocks.some(function (b) { return b.isCase; })) { var cb = document.querySelector('.f[data-f="case"]'); if (cb) cb.hidden = true; }

  document.getElementById("reset").addEventListener("click", function () {
    var old = document.querySelector(".confirm"); if (old) { old.remove(); return; }
    var box = el("div", "confirm");
    box.innerHTML = "<h3>¿Borrar todas tus respuestas de este test?</h3><p>Podrás comenzar de nuevo desde cero.</p>";
    var row = el("div", "acts");
    var ok = el("button", "btn primary", "Sí, borrar todo"); ok.type = "button";
    var no = el("button", "btn", "Cancelar"); no.type = "button";
    ok.addEventListener("click", function () { st = { ans: {}, chk: {} }; save(); renderAll(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    no.addEventListener("click", function () { box.remove(); });
    row.appendChild(ok); row.appendChild(no); box.appendChild(row);
    main.insertBefore(box, main.firstChild);
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.getElementById("printBtn").addEventListener("click", function () { sumEl.open = true; window.print(); });

  renderAll();
})();
