/* Motor de los tests: lee window.QUIZ y construye preguntas, retroalimentación, mapa y pauta. */
(function () {
  "use strict";
  var Q = window.QUIZ;
  var L = ["A", "B", "C", "D", "E"];
  var LV = { "Básica": "lv1", "Intermedia": "lv2", "Aplicación clínica": "lv3" };
  var KEY = "dieto-ij2-" + Q.key;
  var st = {};
  try { st = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { st = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  // Mezcla determinista de alternativas: la pauta es la misma para todos los estudiantes
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffled(p, id) {
    if (p.k) return p;
    var r = rng(hash(Q.key + "#" + id)), perm = p.o.map(function (_, i) { return i; });
    for (var i = perm.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var tmp = perm[i]; perm[i] = perm[j]; perm[j] = tmp; }
    var c = {}; for (var key in p) c[key] = p[key];
    c.o = perm.map(function (k) { return p.o[k]; });
    c.x = perm.map(function (k) { return p.x ? p.x[k] : ""; });
    c.a = perm.indexOf(p.a);
    return c;
  }

  // Aplana preguntas en unidades evaluables (cada parte de caso es una unidad)
  var units = [];
  var blocks = [];
  Q.items.forEach(function (it, i) {
    var num = i + 1;
    if (it.parts) {
      var ids = [];
      it.parts.forEach(function (p, k) {
        var id = num + String.fromCharCode(97 + k);
        units.push({ id: id, num: num, p: shuffled(p, id) });
        ids.push(id);
      });
      blocks.push({ num: num, it: it, ids: ids, isCase: true });
    } else {
      var id1 = String(num);
      units.push({ id: id1, num: num, p: shuffled(it, id1) });
      blocks.push({ num: num, it: it, ids: [id1], isCase: false });
    }
  });
  var byId = {};
  units.forEach(function (u) { byId[u.id] = u; });

  // Cabecera
  document.title = Q.docTitle;
  var hero = document.getElementById("hero");
  hero.innerHTML = '<div class="wrap"><div class="kicker">' + Q.module + ' · Dietoterapia Infantojuvenil II · NUT-421</div>' +
    "<h1>" + Q.title + "</h1><p>" + Q.subtitle + '</p><div class="chips">' +
    Q.chips.map(function (c) { return "<span>" + c + "</span>"; }).join("") + "</div></div>";

  var main = document.getElementById("main");
  var gridEl = document.getElementById("grid");
  var filter = "all";

  function status(id) {
    var s = st[id];
    if (!s) return "";
    if (s.r) return "sol";
    return s.c === byId[id].p.a ? "ok" : "bad";
  }
  function blockStatus(b) {
    var ss = b.ids.map(status);
    if (ss.every(function (s) { return s === ""; })) return "";
    if (ss.some(function (s) { return s === ""; })) return "part";
    if (ss.every(function (s) { return s === "ok"; })) return "ok";
    if (ss.some(function (s) { return s === "bad"; })) return "bad";
    return "sol";
  }

  function fbHTML(u) {
    var p = u.p, s = st[u.id];
    var mine = "";
    if (s && !s.r) {
      mine = s.c === p.a ? ' · Tu respuesta: <span class="ok">' + L[s.c] + " (correcta)</span>"
        : ' · Tu respuesta: <span class="bad">' + L[s.c] + " (incorrecta)</span>";
    } else if (s && s.r) {
      mine = " · Respuesta revisada sin contestar";
    }
    var dl = p.o.map(function (o, k) {
      if (k === p.a) return "";
      return "<li><b>" + L[k] + ".</b> " + (p.x && p.x[k] ? p.x[k] : "") + "</li>";
    }).join("");
    return '<p class="key">Pauta: pregunta ' + u.id + " → alternativa " + L[p.a] + mine + "</p>" +
      "<h4>Retroalimentación</h4><p>" + p.f + "</p>" +
      "<h4>Análisis de distractores</h4><ul>" + dl + "</ul>" +
      '<p class="cont"><b>Contenido evaluado:</b> ' + p.t + "</p>";
  }

  function renderUnit(u, host, label) {
    var p = u.p;
    var box = el("div", "part");
    box.id = "u" + u.id;
    box.appendChild(el("p", label ? "pq" : "stem", (label ? '<span class="lab">' + label + ")</span>" : "") + p.q));
    var opts = el("div", "opts");
    var s = st[u.id];
    p.o.forEach(function (o, k) {
      var b = el("button", "opt", "<b>" + L[k] + ".</b><span>" + o + "</span>");
      b.type = "button";
      if (s) {
        b.disabled = true;
        if (k === p.a) b.classList.add(s.r ? "sol" : "ok");
        else if (!s.r && k === s.c) b.classList.add("bad");
      }
      b.addEventListener("click", function () {
        if (st[u.id]) return;
        st[u.id] = { c: k };
        save(); refresh(u.num);
      });
      opts.appendChild(b);
    });
    box.appendChild(opts);
    if (!s) {
      var acts = el("div", "acts");
      var rv = el("button", "btn", "Ver respuesta sin contestar");
      rv.type = "button";
      rv.addEventListener("click", function () { st[u.id] = { r: 1 }; save(); refresh(u.num); });
      acts.appendChild(rv);
      box.appendChild(acts);
    } else {
      box.appendChild(el("div", "fb", fbHTML(u)));
      var acts2 = el("div", "acts");
      var rs = el("button", "btn", "Volver a intentar");
      rs.type = "button";
      rs.addEventListener("click", function () { delete st[u.id]; save(); refresh(u.num); });
      acts2.appendChild(rs);
      box.appendChild(acts2);
    }
    host.appendChild(box);
  }

  function renderBlock(b) {
    var it = b.it;
    var card = el("article", "q");
    card.id = "q" + b.num;
    var bs = blockStatus(b);
    if (bs && bs !== "part") card.classList.add(bs);
    var h = el("div", "qh");
    h.appendChild(el("span", "num", String(b.num)));
    if (b.isCase) h.appendChild(el("span", "tag", it.kind));
    else if (it.d) h.appendChild(el("span", "tag " + (LV[it.d] || ""), it.d));
    h.appendChild(el("span", "tag", b.isCase ? it.area : it.t.split(":")[0]));
    var lbl = { ok: "Correcta", bad: "Con errores", sol: "Revisada", part: "En curso" }[bs] || "";
    if (b.isCase && bs === "ok") lbl = "Todo correcto";
    if (lbl) h.appendChild(el("span", "state " + (bs === "part" ? "" : bs), lbl));
    card.appendChild(h);
    if (b.isCase) {
      card.appendChild(el("h3", "", it.title)).style.cssText = "margin:0 0 8px;font:800 19px var(--display);color:var(--strong)";
      card.appendChild(el("div", "casebox", it.html));
      b.ids.forEach(function (id, k) { renderUnit(byId[id], card, id); });
    } else {
      renderUnit(byId[b.ids[0]], card, "");
    }
    return card;
  }

  function visible(b) {
    var bs = blockStatus(b);
    if (filter === "pend") return bs === "" || bs === "part";
    if (filter === "bad") return b.ids.some(function (id) { return status(id) === "bad"; });
    if (filter === "case") return b.isCase;
    return true;
  }

  function renderAll() {
    main.innerHTML = "";
    var shown = 0, lastSec = null;
    blocks.forEach(function (b) {
      if (!visible(b)) return;
      var sec = b.it.sec || null;
      if (sec && sec !== lastSec && filter === "all") { main.appendChild(el("h2", "sec", sec)); }
      lastSec = sec;
      main.appendChild(renderBlock(b));
      shown++;
    });
    if (!shown) main.appendChild(el("p", "empty", "No hay preguntas en este filtro."));
    main.appendChild(pautaEl());
  }

  function pautaEl() {
    var d = el("details", "pauta");
    d.innerHTML = "<summary>Pauta de respuestas completa (" + units.length + " ítems)</summary>" +
      '<p style="margin:8px 0 0;color:var(--muted);font-size:14px">Número de pregunta y alternativa correcta. Los casos clínicos se identifican con letra (ej. 46a).</p>' +
      '<div class="pgrid">' + units.map(function (u) {
        return "<span>" + u.id + " → <b>" + L[u.p.a] + "</b></span>";
      }).join("") + "</div>";
    return d;
  }

  function renderGrid() {
    gridEl.innerHTML = "";
    blocks.forEach(function (b) {
      var n = el("button", "n " + blockStatus(b), String(b.num));
      n.type = "button";
      n.title = b.isCase ? it2txt(b) : "Pregunta " + b.num;
      n.addEventListener("click", function () {
        if (!visible(b)) setFilter("all");
        var t = document.getElementById("q" + b.num);
        if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      gridEl.appendChild(n);
    });
  }
  function it2txt(b) { return "Pregunta " + b.num + " · " + b.it.kind; }

  function renderStats() {
    var ans = 0, ok = 0, rev = 0;
    units.forEach(function (u) {
      var s = st[u.id];
      if (!s) return;
      if (s.r) { rev++; return; }
      ans++;
      if (s.c === u.p.a) ok++;
    });
    var done = ans + rev;
    document.getElementById("sDone").textContent = done + "/" + units.length;
    document.getElementById("sOk").textContent = ok;
    document.getElementById("sPct").textContent = ans ? Math.round(ok * 100 / ans) + "%" : "—";
    // Escala chilena 1,0–7,0 con 60 % de exigencia, calculada sobre el total de ítems del test
    var r = ok / units.length;
    var nota = ans ? (r < 0.6 ? 1 + 3 * r / 0.6 : 4 + 3 * (r - 0.6) / 0.4) : null;
    document.getElementById("sNota").textContent = nota ? nota.toFixed(1).replace(".", ",") : "—";
    document.getElementById("track").style.width = (done * 100 / units.length) + "%";
  }

  function refresh(num) {
    if (num != null && filter === "all") {
      var b = blocks[num - 1];
      var old = document.getElementById("q" + num);
      if (old) old.replaceWith(renderBlock(b));
    } else {
      renderAll();
    }
    renderGrid(); renderStats();
  }

  function setFilter(f) {
    filter = f;
    document.querySelectorAll(".f[data-f]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-f") === f ? "true" : "false");
    });
    renderAll(); renderGrid();
  }
  document.querySelectorAll(".f[data-f]").forEach(function (b) {
    b.addEventListener("click", function () { setFilter(b.getAttribute("data-f")); });
  });
  document.getElementById("reset").addEventListener("click", function () {
    if (!confirm("¿Borrar todas tus respuestas de este test?")) return;
    st = {}; save(); renderAll(); renderGrid(); renderStats();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("printBtn").addEventListener("click", function () {
    document.querySelectorAll("details.pauta").forEach(function (d) { d.open = true; });
    window.print();
  });

  if (!blocks.some(function (b) { return b.isCase; })) {
    var cb = document.querySelector('.f[data-f="case"]');
    if (cb) cb.hidden = true;
  }
  renderAll(); renderGrid(); renderStats();
})();
