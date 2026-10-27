(function () {
  "use strict";

  var view = document.getElementById("view");
  var qInput = document.getElementById("q");
  var state = { q: "", cat: "Toate", sort: "recent" };

  /* ---------- utilitare ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function safeUrl(u) {
    return /^(https?:|mailto:|img\/|\.\/|\/)/i.test(u || "") ? u : "#";
  }
  function fmtDate(d) {
    if (!d) return "";
    var dt = new Date(d);
    if (isNaN(dt)) return esc(d);
    return dt.toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" });
  }
  function iconHtml(app, size) {
    var c = app.color || ["#6366f1", "#8b5cf6"];
    if (app.icon) {
      return '<span class="icon ' + size + '"><img src="' + esc(safeUrl(app.icon)) + '" alt=""></span>';
    }
    var letter = esc((app.name || "?").trim().charAt(0).toUpperCase());
    return '<span class="icon ' + size + '" style="background:linear-gradient(135deg,' + esc(c[0]) + "," + esc(c[1] || c[0]) + ')">' + letter + "</span>";
  }
  var DL_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>';

  /* ---------- date derivate ---------- */
  function categories() {
    var set = {};
    APPS.forEach(function (a) { if (a.category) set[a.category] = true; });
    return ["Toate"].concat(Object.keys(set).sort());
  }
  function matches(app) {
    if (state.cat !== "Toate" && app.category !== state.cat) return false;
    if (!state.q) return true;
    var hay = norm([app.name, app.tagline, app.category, (app.tags || []).join(" "), (app.description || []).join(" ")].join(" "));
    return norm(state.q).split(/\s+/).filter(Boolean).every(function (w) { return hay.indexOf(w) !== -1; });
  }
  function sorted(list) {
    var l = list.slice();
    if (state.sort === "name") l.sort(function (a, b) { return a.name.localeCompare(b.name, "ro"); });
    else l.sort(function (a, b) { return new Date(b.date || 0) - new Date(a.date || 0); });
    return l;
  }

  /* ---------- carduri ---------- */
  function cardHtml(app, i) {
    return (
      '<a class="card" href="#/app/' + encodeURIComponent(app.id) + '" style="animation-delay:' + Math.min(i, 12) * 40 + 'ms">' +
        '<div class="card-head">' + iconHtml(app, "sm") +
          "<div><h3>" + esc(app.name) + '</h3><span class="cat">' + esc(app.category) + "</span></div></div>" +
        "<p>" + esc(app.tagline) + "</p>" +
        '<div class="card-foot"><span>' + esc(app.platform || "") + '</span><span class="pill">v' + esc(app.version || "1.0") + "</span></div>" +
      "</a>"
    );
  }

  /* ---------- pagina principală ---------- */
  function renderHome() {
    document.title = SITE.name;
    var cats = categories();
    view.innerHTML =
      '<section class="hero"><h1>' + esc(SITE.title) + "</h1><p>" + esc(SITE.subtitle) + "</p></section>" +
      '<div class="toolbar">' +
        '<div class="chips" id="chips">' +
          cats.map(function (c) {
            return '<button class="chip' + (c === state.cat ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
          }).join("") +
        "</div>" +
        '<span class="count" id="count"></span>' +
        '<select class="select" id="sort" aria-label="Sortare">' +
          '<option value="recent"' + (state.sort === "recent" ? " selected" : "") + ">Cele mai noi</option>" +
          '<option value="name"' + (state.sort === "name" ? " selected" : "") + ">Alfabetic</option>" +
        "</select>" +
      "</div>" +
      '<div class="grid" id="grid"></div>';

    document.getElementById("chips").addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      Array.prototype.forEach.call(this.children, function (x) { x.classList.toggle("active", x === b); });
      renderGrid();
    });
    document.getElementById("sort").addEventListener("change", function () { state.sort = this.value; renderGrid(); });
    renderGrid();
  }

  function renderGrid() {
    var grid = document.getElementById("grid");
    if (!grid) return;
    var list = sorted(APPS.filter(matches));
    document.getElementById("count").textContent = list.length + (list.length === 1 ? " aplicație" : " aplicații");
    if (!list.length) {
      grid.innerHTML =
        '<div class="empty" style="grid-column:1/-1"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
        "<h3>Nicio aplicație găsită</h3><p>Încearcă alt cuvânt sau alege altă categorie.</p></div>";
      return;
    }
    grid.innerHTML = list.map(cardHtml).join("");
  }

  /* ---------- pagina aplicației ---------- */
  function renderApp(id) {
    var app = APPS.filter(function (a) { return a.id === id; })[0];
    if (!app) {
      document.title = "Negăsit · " + SITE.name;
      view.innerHTML = '<div class="empty"><h3>Aplicația nu a fost găsită</h3><p><a href="#/" style="color:var(--accent)">← Înapoi la toate aplicațiile</a></p></div>';
      return;
    }
    document.title = app.name + " · " + SITE.name;

    var dls = (app.downloads || []).map(function (d) {
      return (
        '<a class="btn' + (d.secondary ? " secondary" : "") + '" href="' + esc(safeUrl(d.url)) + '" target="_blank" rel="noopener">' +
          DL_ICON + '<span class="t">' + esc(d.label) + (d.note ? "<small>" + esc(d.note) + "</small>" : "") + "</span></a>"
      );
    }).join("");

    var info = [
      ["Versiune", app.version], ["Mărime", app.size], ["Actualizat", fmtDate(app.date)],
      ["Platformă", app.platform], ["Licență", app.license], ["Cerințe", app.requirements]
    ].filter(function (r) { return r[1]; }).map(function (r) {
      return "<div><dt>" + r[0] + "</dt><dd>" + (r[0] === "Actualizat" ? r[1] : esc(r[1])) + "</dd></div>";
    }).join("");

    var related = APPS.filter(function (a) { return a.id !== app.id && a.category === app.category; }).slice(0, 3);
    if (!related.length) related = APPS.filter(function (a) { return a.id !== app.id; }).slice(0, 3);

    view.innerHTML =
      '<nav class="crumbs"><a href="#/">Toate aplicațiile</a> &nbsp;/&nbsp; ' + esc(app.category) + " &nbsp;/&nbsp; " + esc(app.name) + "</nav>" +
      '<header class="detail-head">' + iconHtml(app, "lg") +
        '<div class="meta"><h1>' + esc(app.name) + '</h1><p class="tagline">' + esc(app.tagline) + "</p>" +
          '<div class="tags">' + [app.category].concat(app.tags || []).map(function (t) { return '<span class="pill">' + esc(t) + "</span>"; }).join("") + "</div></div>" +
        '<div class="downloads">' + dls + "</div>" +
      "</header>" +
      '<div class="layout"><div>' +
        (app.screenshots && app.screenshots.length
          ? '<section class="panel"><h2>Capturi de ecran</h2><div class="shots">' +
              app.screenshots.map(function (s, i) {
                return '<button type="button" data-src="' + esc(safeUrl(s)) + '" aria-label="Mărește imaginea ' + (i + 1) + '"><img src="' + esc(safeUrl(s)) + '" alt="' + esc(app.name) + " – captură " + (i + 1) + '" loading="lazy"></button>';
              }).join("") + "</div></section>"
          : "") +
        '<section class="panel"><h2>Despre aplicație</h2>' +
          (app.description || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>" +
        (app.features && app.features.length
          ? '<section class="panel"><h2>Funcționalități</h2><ul class="features">' + app.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></section>"
          : "") +
        (app.changelog && app.changelog.length
          ? '<section class="panel"><h2>Istoric versiuni</h2><div class="changelog">' +
              app.changelog.map(function (c) {
                return "<div><h4>v" + esc(c.version) + "<span>" + fmtDate(c.date) + "</span></h4><ul>" +
                  (c.changes || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
              }).join("") + "</div></section>"
          : "") +
      '</div><aside class="side"><div class="panel"><h2>Detalii</h2><dl class="info">' + info + "</dl>" +
        (dls ? '<div style="margin-top:18px">' + dls + "</div>" : "") +
        '<p class="notice"></p></div></aside></div>' +
      (related.length
        ? '<section class="related"><h2>Alte aplicații</h2><div class="grid" style="padding-bottom:0">' + related.map(cardHtml).join("") + "</div></section>"
        : "");

    view.querySelectorAll(".shots button").forEach(function (b) {
      b.addEventListener("click", function () { openLightbox(b.dataset.src); });
    });
    window.scrollTo(0, 0);
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  function openLightbox(src) { lb.querySelector("img").src = src; lb.hidden = false; }
  function closeLightbox() { lb.hidden = true; lb.querySelector("img").removeAttribute("src"); }
  lb.addEventListener("click", closeLightbox);

  /* ---------- rutare ---------- */
  function route() {
    var m = location.hash.match(/^#\/app\/(.+)$/);
    if (m) renderApp(decodeURIComponent(m[1]));
    else renderHome();
    if (!m && qInput.value !== state.q) qInput.value = state.q;
  }
  window.addEventListener("hashchange", route);

  /* ---------- căutare ---------- */
  qInput.addEventListener("input", function () {
    state.q = qInput.value.trim();
    if (/^#\/app\//.test(location.hash)) location.hash = "#/";
    else renderGrid();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (!lb.hidden) closeLightbox(); else if (document.activeElement === qInput) qInput.blur(); }
    if (e.key === "/" && document.activeElement !== qInput && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      e.preventDefault(); qInput.focus();
    }
  });

  /* ---------- temă ---------- */
  document.getElementById("themeBtn").addEventListener("click", function () {
    var root = document.documentElement;
    var cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- init ---------- */
  document.getElementById("brandName").textContent = SITE.name;
  document.getElementById("footerText").textContent = SITE.footer;
  document.getElementById("footerLinks").innerHTML = (SITE.links || []).map(function (l) {
    return '<a href="' + esc(safeUrl(l.url)) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
  }).join("");
  route();
})();
