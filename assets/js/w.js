(function () {
  function killStills() {
    document.querySelectorAll(".stills").forEach(function (el) { el.remove(); });
  }
  if (!document.getElementById("kill-stills")) {
    var s = document.createElement("style");
    s.id = "kill-stills";
    s.textContent = ".stills,.still{display:none!important;height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}";
    document.head.appendChild(s);
  }
  killStills();
  setTimeout(killStills, 50);
  setTimeout(killStills, 400);
  if (window.MutationObserver) {
    new MutationObserver(killStills).observe(document.body, { childList: true, subtree: true });
  }

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
  if (!article || article.querySelector("[data-wire-nav]")) return;
  var idx = -1;
  for (var i = 0; i < WIRE.length; i++) if (WIRE[i][0] === file) idx = i;
  if (idx < 0) return;
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
      ".wire-nav a{border:1px solid var(--line-2);border-radius:14px;padding:12px 14px;background:var(--panel);color:inherit;display:flex;flex-direction:column;gap:4px;text-decoration:none}" +
      ".wire-nav a:hover{border-color:var(--ph)}" +
      ".wire-nav em{font-style:normal;font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ph)}" +
      ".wire-nav span{color:#fff;font-size:14px}" +
      ".wire-nav .next{text-align:right}" +
      ".wire-nav .index{align-self:center;padding:10px 14px;font-family:IBM Plex Mono,monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}" +
      "@media(max-width:700px){.wire-nav{grid-template-columns:1fr}.wire-nav .next{text-align:left}}";
    document.head.appendChild(st);
  }
})();
