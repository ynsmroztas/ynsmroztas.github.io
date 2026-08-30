(function () {
  const NS = "mitsec-site";
  const path = (location.pathname.replace(/^\//, "").replace(/[^a-z0-9._-]+/gi, "-") || "home");
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const seen = "mitsec-v-" + path;
  const seenDay = "mitsec-d-" + path + "-" + day;

  if (!document.getElementById("pgstat-css")) {
    var css = document.createElement("style");
    css.id = "pgstat-css";
    css.textContent = ".pgstat{border-top:1px solid var(--line,#243);background:var(--panel,rgba(0,0,0,.25));margin-top:48px}.pgstat-in{max-width:1120px;margin:0 auto;padding:22px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.pgstat-in span{border:1px solid var(--line-2,#345);border-radius:14px;padding:16px 14px}.pgstat-in b{display:block;font-family:Syne,sans-serif;font-size:28px;color:var(--ph,#7cffb2);line-height:1}.pgstat-in i{display:block;margin-top:6px;font-style:normal;font-family:IBM Plex Mono,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim,#89a)}.pgstat-in span:nth-child(1) b{animation:none}@media(max-width:700px){.pgstat-in{grid-template-columns:1fr}}";
    document.head.appendChild(css);
  }

  function api(name, op) {
    return fetch("https://api.counterapi.dev/v1/" + NS + "/" + encodeURIComponent(name) + "/" + op)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) { return Number(d.count || d.value || 0); });
  }

  var bar = document.querySelector("[data-pgstat]");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "pgstat";
    bar.setAttribute("data-pgstat", "");
    bar.innerHTML = '<div class="pgstat-in"><span><b data-st-total>—</b><i>total reads</i></span><span><b data-st-today>—</b><i>today</i></span><span><b data-st-now>—</b><i>reading now</i></span></div>';
    var foot = document.querySelector("footer");
    if (foot) foot.parentNode.insertBefore(bar, foot);
    else document.body.appendChild(bar);
  }

  var bumpTotal = !sessionStorage.getItem(seen);
  var bumpDay = !sessionStorage.getItem(seenDay);
  if (bumpTotal) sessionStorage.setItem(seen, "1");
  if (bumpDay) sessionStorage.setItem(seenDay, "1");

  api(path, bumpTotal ? "up" : "hit").then(function (n) {
    var el = document.querySelector("[data-st-total]");
    if (el) el.textContent = n;
  }).catch(function () {});
  api(path + "-" + day, bumpDay ? "up" : "hit").then(function (n) {
    var el = document.querySelector("[data-st-today]");
    if (el) el.textContent = n;
  }).catch(function () {});
  api("now-" + path, "up").then(function (n) {
    var el = document.querySelector("[data-st-now]");
    if (el) el.textContent = n;
  }).catch(function () {});
  window.addEventListener("pagehide", function () {
    try { navigator.sendBeacon("https://api.counterapi.dev/v1/" + NS + "/now-" + encodeURIComponent(path) + "/down"); } catch (e) {}
  });
})();
