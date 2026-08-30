(function () {
  const NS = "mitsec-site";
  const path = (location.pathname.replace(/^\//, "").replace(/[^a-z0-9._-]+/gi, "-") || "home");
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const seen = "mitsec-v-" + path;
  const seenDay = "mitsec-d-" + path + "-" + day;

  function api(name, op) {
    return fetch("https://api.counterapi.dev/v1/" + NS + "/" + encodeURIComponent(name) + "/" + op)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) { return Number(d.count || d.value || 0); });
  }

  function read(name, bump) {
    return api(name, bump ? "up" : "hit").catch(function () {
      return bump ? api(name, "up") : Promise.resolve(0);
    });
  }

  var bar = document.querySelector("[data-pgstat]");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "pgstat";
    bar.setAttribute("data-pgstat", "");
    bar.innerHTML =
      '<div class="pgstat-in">' +
        '<span><b data-st-total>—</b><i>total reads</i></span>' +
        '<span><b data-st-today>—</b><i>today</i></span>' +
        '<span><b data-st-now>—</b><i>reading now</i></span>' +
      "</div>";
    var foot = document.querySelector("footer");
    if (foot) foot.parentNode.insertBefore(bar, foot);
    else document.body.appendChild(bar);
  }

  var bumpTotal = !sessionStorage.getItem(seen);
  var bumpDay = !sessionStorage.getItem(seenDay);
  if (bumpTotal) sessionStorage.setItem(seen, "1");
  if (bumpDay) sessionStorage.setItem(seenDay, "1");

  read(path, bumpTotal).then(function (n) {
    var el = document.querySelector("[data-st-total]");
    if (el) el.textContent = n;
  });
  read(path + "-" + day, bumpDay).then(function (n) {
    var el = document.querySelector("[data-st-today]");
    if (el) el.textContent = n;
  });
  api("now-" + path, "up").then(function (n) {
    var el = document.querySelector("[data-st-now]");
    if (el) el.textContent = n;
  }).catch(function () {});
  window.addEventListener("pagehide", function () {
    try { navigator.sendBeacon("https://api.counterapi.dev/v1/" + NS + "/now-" + path + "/down"); } catch (e) {}
  });
})();
