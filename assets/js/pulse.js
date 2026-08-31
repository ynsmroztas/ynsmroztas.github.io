(function () {
  if (document.querySelector("[data-pulse]")) return;
  var mark = document.createElement("meta");
  mark.setAttribute("data-pulse", "1");
  document.head.appendChild(mark);

  function css(href) {
    if (document.querySelector('link[href*="' + href.split("/").pop().split("?")[0] + '"]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }
  css("assets/css/pulse.css?v=3");
  css("assets/css/cover.css?v=1");

  var hide = document.createElement("style");
  hide.textContent = ".stills{display:none!important}";
  document.head.appendChild(hide);
  document.querySelectorAll(".stills").forEach(function (el) { el.remove(); });

  var grain = document.createElement("div");
  grain.className = "fx-grain";
  var glow = document.createElement("div");
  glow.className = "fx-glow";
  var oa = document.createElement("div");
  oa.className = "fx-orb a";
  var ob = document.createElement("div");
  ob.className = "fx-orb b";
  document.body.appendChild(oa);
  document.body.appendChild(ob);
  document.body.appendChild(glow);
  document.body.appendChild(grain);

  var gx = window.innerWidth * 0.7, gy = 120;
  window.addEventListener("pointermove", function (e) {
    gx = e.clientX; gy = e.clientY;
  }, { passive: true });
  (function follow() {
    glow.style.left = gx + "px";
    glow.style.top = gy + "px";
    requestAnimationFrame(follow);
  })();

  document.querySelectorAll(".tool").forEach(function (el) {
    if (el.querySelector(".sig")) return;
    var s = document.createElement("span");
    s.className = "sig";
    s.innerHTML = "<i></i><i></i><i></i><i></i>";
    el.appendChild(s);
  });

  document.querySelectorAll(".media-full, .shot-card").forEach(function (el) {
    if (el.querySelector(".scan")) return;
    var sc = document.createElement("span");
    sc.className = "scan";
    el.appendChild(sc);
  });

  document.querySelectorAll(".console[data-console]").forEach(function (box) {
    if (box.closest(".cassette")) return;
    var cass = document.createElement("div");
    cass.className = "cassette";
    cass.innerHTML = '<div class="cass-top"><i></i><i></i><i></i><span>mitsec · session tape</span></div>';
    box.parentNode.insertBefore(cass, box);
    cass.appendChild(box);
    box.classList.add("cass-screen");
    var reels = document.createElement("div");
    reels.className = "cass-reels";
    reels.innerHTML = "<b></b><b></b>";
    cass.appendChild(reels);
  });

  var WIRE = [
    ["conscrypt-mainline.html", "Conscrypt owns the CA list"],
    ["wallet-link.html", "Wallet link, static id"],
    ["intent-redir.html", "Intent redirection"],
    ["fileprovider.html", "FileProvider, root-path"],
    ["webview-intent.html", "WebView, intent://"],
    ["sdk-proxy.html", "SDK exported the proxy"],
    ["deeplink-auth.html", "Deeplink into auth"],
    ["oauth-scheme.html", "Custom scheme, no PKCE"],
    ["creds-query.html", "Password in the query string"],
    ["mtls-lab.html", "mTLS on the device"],
    ["jwt-hardcoded.html", "Hardcoded Entra token"],
    ["wireless-adb.html", "Wireless debugging trust"]
  ];
  var file = (location.pathname.split("/").pop() || "");
  var article = document.querySelector("article.prose");
  var idx = -1;
  for (var i = 0; i < WIRE.length; i++) if (WIRE[i][0] === file) idx = i;
  if (article && idx !== -1 && !article.querySelector("[data-wire-nav]")) {
    var prev = idx > 0 ? WIRE[idx - 1] : null;
    var next = idx < WIRE.length - 1 ? WIRE[idx + 1] : null;
    var nav = document.createElement("nav");
    nav.setAttribute("data-wire-nav", "");
    nav.className = "wire-nav";
    nav.innerHTML =
      (prev ? '<a class="prev" href="' + prev[0] + '"><em>prev</em><span>' + prev[1] + "</span></a>" : "<span></span>") +
      '<a class="index" href="writeups.html">all notes</a>' +
      (next ? '<a class="next" href="' + next[0] + '"><em>next</em><span>' + next[1] + "</span></a>" : "<span></span>");
    article.appendChild(nav);
    if (!document.getElementById("wire-nav-css")) {
      var st = document.createElement("style");
      st.id = "wire-nav-css";
      st.textContent =
        ".wire-nav{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:stretch;margin:40px 0 8px;padding-top:22px;border-top:1px solid var(--line)}" +
        ".wire-nav a{border:1px solid var(--line-2);border-radius:14px;padding:12px 14px;background:var(--panel);color:inherit;display:flex;flex-direction:column;gap:4px}" +
        ".wire-nav a:hover{border-color:var(--ph)}" +
        ".wire-nav em{font-style:normal;font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ph)}" +
        ".wire-nav span{color:#fff;font-size:14px}" +
        ".wire-nav .next{text-align:right}" +
        ".wire-nav .index{align-self:center;padding:10px 14px;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}" +
        "@media(max-width:700px){.wire-nav{grid-template-columns:1fr;}.wire-nav .next{text-align:left}}";
      document.head.appendChild(st);
    }
  }

  if (!window.THREE && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) && window.innerWidth >= 700) {
    var t = document.createElement("script");
    t.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js";
    t.onload = function () {
      var f = document.createElement("script");
      f.src = "assets/js/three-field.js";
      document.body.appendChild(f);
    };
    document.body.appendChild(t);
  }

  var stage = document.querySelector("[data-cover]");
  if (stage) {
    stage.addEventListener("mouseenter", function () { stage.setAttribute("data-hold", "1"); });
    stage.addEventListener("mouseleave", function () { stage.removeAttribute("data-hold"); });
  }

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (en.isIntersecting) en.target.classList.add("reveal");
    });
  }, { threshold: 0.08 }) : null;
  if (io) {
    document.querySelectorAll("section, .tool, .skel, .prose h2").forEach(function (el) {
      io.observe(el);
    });
  }
})();
