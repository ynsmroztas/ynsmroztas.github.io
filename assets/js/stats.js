(function () {
  if (!document.querySelector('script[data-goatcounter]')) {
    var g = document.createElement("script");
    g.dataset.goatcounter = "https://ynsmroztas.goatcounter.com/count";
    g.async = true;
    g.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(g);
  }

  if (!document.getElementById("pgstat-css")) {
    var css = document.createElement("style");
    css.id = "pgstat-css";
    css.textContent =
      ".pgstat{border-top:1px solid var(--line);background:color-mix(in srgb,var(--panel) 88%,transparent);margin-top:36px}" +
      ".pgstat-in{max-width:1120px;margin:0 auto;padding:22px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}" +
      ".pgstat-in span{border:1px solid var(--line-2);border-radius:14px;padding:16px 14px;background:var(--ink-2)}" +
      ".pgstat-in b{display:block;font-family:var(--display),Syne,sans-serif;font-size:clamp(26px,3vw,34px);color:var(--ph);line-height:1;letter-spacing:-.03em}" +
      ".pgstat-in i{display:block;margin-top:8px;font-style:normal;font-family:var(--mono),monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)}" +
      "@media(max-width:700px){.pgstat-in{grid-template-columns:1fr}}";
    document.head.appendChild(css);
  }

  var bar = document.querySelector("[data-pgstat]");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "pgstat";
    bar.setAttribute("data-pgstat", "");
    bar.innerHTML =
      '<div class="pgstat-in">' +
      '<span><b data-st-total>0</b><i>total visits</i></span>' +
      '<span><b data-st-today>0</b><i>today</i></span>' +
      '<span><b data-st-now>1</b><i>on site now</i></span>' +
      "</div>";
    var foot = document.querySelector("footer");
    if (foot && foot.parentNode) foot.parentNode.insertBefore(bar, foot);
    else document.body.appendChild(bar);
  }

  function fmt(n) {
    n = Math.max(0, parseInt(n, 10) || 0);
    try { return n.toLocaleString("en-US"); } catch (e) { return String(n); }
  }
  function set(sel, n) {
    var el = document.querySelector(sel);
    if (el) el.textContent = fmt(n);
  }
  function num(x) {
    if (x == null) return 0;
    if (typeof x === "number") return x;
    return parseInt(String(x).replace(/[^\d]/g, ""), 10) || 0;
  }

  var day = new Date().toISOString().slice(0, 10);
  var seenAll = "mitsec-hit-all";
  var seenDay = "mitsec-hit-" + day;
  var bumpAll = !sessionStorage.getItem(seenAll);
  var bumpDay = !sessionStorage.getItem(seenDay);
  if (bumpAll) sessionStorage.setItem(seenAll, "1");
  if (bumpDay) sessionStorage.setItem(seenDay, "1");

  var NS = "ynsmroztas-github-io";

  function abacus(key, op) {
    var url = "https://abacus.jasoncameron.dev/" + op + "/" + NS + "/" + encodeURIComponent(key);
    return fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(); });
  }

  function goat(path) {
    return fetch("https://ynsmroztas.goatcounter.com/counter/" + encodeURIComponent(path) + ".json")
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) { return num(d.count || d.count_unique); });
  }

  function visitor() {
    var q = "domain=ynsmroztas.github.io&page_path=" + encodeURIComponent(location.pathname || "/");
    return fetch("https://visitor.6developer.com/visit?" + q)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); });
  }

  visitor().then(function (d) {
    if (d.totalCount != null) set("[data-st-total]", d.totalCount);
    if (d.todayCount != null) set("[data-st-today]", d.todayCount);
  }).catch(function () {
    Promise.all([
      goat("/").catch(function () { return 0; }),
      goat(location.pathname || "/").catch(function () { return 0; }),
      abacus("total", bumpAll ? "hit" : "get").then(function (d) { return num(d.value || d.count); }).catch(function () { return 0; })
    ]).then(function (vals) {
      set("[data-st-total]", Math.max.apply(null, vals));
    });
    abacus("day-" + day, bumpDay ? "hit" : "get").then(function (d) {
      set("[data-st-today]", d.value || d.count);
    }).catch(function () {
      goat(location.pathname || "/").then(function (n) { set("[data-st-today]", n); }).catch(function () {});
    });
  });

  var liveKey = "now";
  abacus(liveKey, "hit").then(function (d) {
    set("[data-st-now]", Math.max(1, num(d.value || d.count)));
  }).catch(function () {
    set("[data-st-now]", 1);
  });

  function leave() {
    try {
      navigator.sendBeacon("https://abacus.jasoncameron.dev/hit/" + NS + "/" + liveKey + "/down");
    } catch (e) {}
    try {
      fetch("https://abacus.jasoncameron.dev/down/" + NS + "/" + liveKey, { method: "GET", keepalive: true });
    } catch (e2) {}
  }
  window.addEventListener("pagehide", leave);
  window.addEventListener("beforeunload", leave);

  setInterval(function () {
    abacus(liveKey, "get").then(function (d) {
      set("[data-st-now]", Math.max(1, num(d.value || d.count)));
    }).catch(function () {});
  }, 20000);
})();
