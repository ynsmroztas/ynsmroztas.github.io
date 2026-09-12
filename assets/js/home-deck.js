(function () {
  var cases = [
    { href: "gitlab-sniper.html", pill: "platform · leak class", title: "Unauthenticated GitLab file-read", blurb: "CVE-2026-85706. Workhorse missed the path. Puma routed it. File.open ran before authenticate!.", img: "assets/img/gitlab-sniper-term.svg", surface: "platform" },
    { href: "msa-deeplink.html", pill: "mobile · scheme", title: "Unclaimed ms-msa scheme", blurb: "CVE-2026-26123. Authenticator emitted the scheme and did not claim it.", img: "assets/img/deeplink-term.svg", surface: "mobile" },
    { href: "keycloak-reset.html", pill: "platform · ATO class", title: "Reset-credentials ATO class", blurb: "CVE-2026-18963. Keycloak forgot-password. Email step did not bind the session.", img: "assets/img/keysniper-term.svg", surface: "platform" },
    { href: "artifactory-join.html", pill: "platform · auth", title: "Empty join key, admin token", blurb: "CVE-2026-82329. Self-hosted Artifactory trusted a blank join key.", img: "assets/img/artifactory-term.svg", surface: "platform" },
    { href: "jsbridge-rce.html", pill: "webview · rce", title: "Bridge on the wrong origin", blurb: "Interface attached. loadUrl came from an extra.", img: "assets/img/sdk-proxy-term.svg", surface: "webview mobile" },
    { href: "dex-load.html", pill: "runtime · rce", title: "DEX from a writable path", blurb: "Loader mapped extract output. No payload on this page.", img: "assets/img/adb-term.svg", surface: "runtime" }
  ];
  var feat = document.querySelector("[data-featured]");
  var tape = document.querySelector("[data-tape]");
  if (tape) {
    tape.innerHTML = cases.map(function (c, i) {
      return '<button type="button" class="tape-item' + (i === 0 ? " on" : "") + '" data-i="' + i + '" data-surface="' + c.surface + '"><em>' + c.pill + "</em><b>" + c.title + "</b></button>";
    }).join("");
  }
  function show(i) {
    var c = cases[i];
    if (!c || !feat) return;
    feat.setAttribute("href", c.href);
    feat.innerHTML = '<img src="' + c.img + '" alt=""/><div class="body"><span class="pill">' + c.pill + "</span><h2>" + c.title + "</h2><p>" + c.blurb + '</p><span class="go">read the class →</span></div>';
    if (tape) tape.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-i") === String(i)); });
  }
  show(0);
  if (tape) tape.addEventListener("click", function (e) {
    var b = e.target.closest("[data-i]");
    if (b) show(b.getAttribute("data-i"));
  });
  var selected = [];
  var sats = document.querySelectorAll("[data-sat]");
  var cards = document.querySelectorAll("[data-surface]");
  function paint() {
    sats.forEach(function (b) { b.classList.toggle("on", selected.indexOf(b.getAttribute("data-sat")) >= 0); });
    cards.forEach(function (c) {
      var tags = (c.getAttribute("data-surface") || "").split(/\s+/);
      var hit = !selected.length || selected.some(function (s) { return tags.indexOf(s) >= 0; });
      c.classList.toggle("is-dim", !hit);
    });
  }
  sats.forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-sat");
      var i = selected.indexOf(k);
      if (i >= 0) selected.splice(i, 1); else selected.push(k);
      paint();
    });
  });
  paint();
})();
