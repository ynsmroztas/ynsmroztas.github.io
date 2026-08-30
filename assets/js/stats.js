(function () {
  const NS = "mitsec-site";
  const GC = "https://ynsmroztas.goatcounter.com";
  const path = location.pathname || "/";
  const key = (path.replace(/^\//, "").replace(/[^a-z0-9._-]+/gi, "-") || "home");
  const sess = "mitsec-hit-" + key;

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
    document.querySelectorAll("[data-reads]").forEach(function (el) {
      if (views != null) el.textContent = views + " views";
    });
  }

  function api(name, op) {
    return fetch("https://api.counterapi.dev/v1/" + NS + "/" + name + "/" + op)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) { return Number(d.count || d.value || 0); });
  }

  function gcCount(p) {
    return fetch(GC + "/counter/" + encodeURIComponent(p) + ".json")
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) {
        var raw = String(d.count || d.count_unique || "0").replace(/[^0-9]/g, "");
        return Number(raw || 0);
      });
  }

  if (!document.querySelector("script[data-goatcounter]")) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", GC + "/count");
    document.head.appendChild(s);
  }

  function fromGcThenFallback() {
    gcCount(path).then(function (n) {
      paint(n, null);
    }).catch(function () {
      var doHit = !sessionStorage.getItem(sess);
      if (doHit) sessionStorage.setItem(sess, "1");
      api(key, doHit ? "up" : "hit").then(function (n) { paint(n, null); }).catch(function () {});
    });
  }
  setTimeout(fromGcThenFallback, 800);

  api("live-" + key, "up").then(function (n) { paint(null, n); }).catch(function () {});
  window.addEventListener("pagehide", function () {
    try { navigator.sendBeacon("https://api.counterapi.dev/v1/" + NS + "/live-" + key + "/down"); } catch (e) {}
  });

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var p = el.getAttribute("data-count") || "";
    var gcPath = p === "home" ? "/" : "/" + p.replace(/^\//, "");
    gcCount(gcPath).then(function (n) {
      el.textContent = n + " views";
    }).catch(function () {
      api(p.replace(/[^a-z0-9._-]+/gi, "-") || "home", "hit").then(function (n) {
        el.textContent = n + " views";
      }).catch(function () { el.textContent = "—"; });
    });
  });
})();
