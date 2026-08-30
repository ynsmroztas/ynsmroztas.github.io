(function () {
  const NS = "mitsec-site";
  const GC = "ynsmroztas";
  const key = (location.pathname.replace(/^\//, "").replace(/[^a-z0-9._-]+/gi, "-") || "home");
  const sess = "mitsec-hit-" + key;

  function setText(sel, text) {
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = text; });
  }

  function chip(bar, attr, text) {
    var el = bar.querySelector("[" + attr + "]");
    if (!el) {
      el = document.createElement("span");
      el.className = "chip";
      el.setAttribute(attr, "");
      bar.appendChild(el);
    }
    el.textContent = text;
  }

  function paint(views, live) {
    document.querySelectorAll(".livebar").forEach(function (bar) {
      if (views != null) chip(bar, "data-reads", views + " views");
      if (live != null) chip(bar, "data-live", live + " reading");
    });
    setText("[data-reads]", views != null ? views + " views" : "—");
  }

  function api(name, op) {
    return fetch("https://api.counterapi.dev/v1/" + NS + "/" + name + "/" + op)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) { return Number(d.count || d.value || 0); });
  }

  var doHit = !sessionStorage.getItem(sess);
  if (doHit) sessionStorage.setItem(sess, "1");
  api(key, doHit ? "up" : "hit").then(function (n) {
    paint(n, null);
  }).catch(function () {
    paint(null, null);
  });

  api("live-" + key, "up").then(function (n) {
    paint(null, n);
  }).catch(function () {});
  window.addEventListener("pagehide", function () {
    try { navigator.sendBeacon("https://api.counterapi.dev/v1/" + NS + "/live-" + key + "/down"); } catch (e) {}
  });

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var p = el.getAttribute("data-count");
    if (!p) return;
    api(p.replace(/[^a-z0-9._-]+/gi, "-"), "hit").then(function (n) {
      el.textContent = n + " views";
    }).catch(function () { el.textContent = "—"; });
  });

  if (!document.querySelector("script[data-goatcounter]")) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + GC + ".goatcounter.com/count");
    document.head.appendChild(s);
  }
})();
