(function () {
  document.querySelectorAll(".pgstat, [data-pgstat]").forEach(function (el) {
    el.remove();
  });
  document.querySelectorAll('script[data-goatcounter], script[src*="gc.zgo.at"]').forEach(function (el) {
    el.remove();
  });

  if (document.querySelector("[data-xwire]")) return;

  if (!document.getElementById("xwire-css")) {
    var css = document.createElement("style");
    css.id = "xwire-css";
    css.textContent =
      ".xwire{border-top:1px solid var(--line);background:var(--ink-2);padding:36px 0 28px}" +
      ".xwire .wrap{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:22px;align-items:start}" +
      ".xwire .h-k{margin:0 0 8px}" +
      ".xwire h2{margin:0 0 14px}" +
      ".xwire .lead{margin:0 0 16px}" +
      ".xpicks{display:flex;flex-direction:column;gap:10px}" +
      ".xpicks a{display:block;border:1px solid var(--line-2);border-radius:14px;padding:14px 16px;background:var(--panel);color:inherit}" +
      ".xpicks a:hover{border-color:var(--ph)}" +
      ".xpicks em{display:block;font-style:normal;font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ph);margin-bottom:6px}" +
      ".xpicks p{margin:0;color:var(--mute);font-size:14px}" +
      ".xtimeline{min-height:420px;border:1px solid var(--line-2);border-radius:16px;overflow:hidden;background:#000}" +
      "@media(max-width:860px){.xwire .wrap{grid-template-columns:1fr}}";
    document.head.appendChild(css);
  }

  var box = document.createElement("section");
  box.className = "xwire";
  box.setAttribute("data-xwire", "");
  box.innerHTML =
    '<div class="wrap">' +
      "<div>" +
        '<p class="h-k">Live from X</p>' +
        "<h2>@ynsmroztas</h2>" +
        '<p class="lead">Threads, field notes, and whatever else landed on the timeline.</p>' +
        '<div class="xpicks">' +
          '<a href="https://x.com/ynsmroztas/status/2090748385657590217" target="_blank" rel="me noopener"><em>21 Aug 2026 · thread</em><p>P2 ATO class: custom-scheme OAuth, no PKCE. How to hunt it on Android.</p></a>' +
          '<a href="https://x.com/ynsmroztas/status/2074929881754833052" target="_blank" rel="me noopener"><em>08 Jul 2026</em><p>Android 0-days, sandbox escapes, AndroScope coming to GitHub in limited form.</p></a>' +
          '<a href="https://x.com/ynsmroztas/status/2074933107325915329" target="_blank" rel="me noopener"><em>08 Jul 2026 · AndroScope</em><p>Rootless gadget workflow. PREPARE → ASSESS → RUNTIME on an unrooted phone.</p></a>' +
          '<a href="https://x.com/ynsmroztas" target="_blank" rel="me noopener"><em>full profile</em><p>Open x.com/ynsmroztas →</p></a>' +
        "</div>" +
      "</div>" +
      '<div class="xtimeline">' +
        '<a class="twitter-timeline" data-theme="dark" data-height="520" data-chrome="noheader nofooter noborders transparent" href="https://x.com/ynsmroztas">Posts by @ynsmroztas</a>' +
      "</div>" +
    "</div>";

  var foot = document.querySelector("footer");
  if (foot && foot.parentNode) foot.parentNode.insertBefore(box, foot);
  else document.body.appendChild(box);

  if (!document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://platform.twitter.com/widgets.js";
    s.charset = "utf-8";
    document.body.appendChild(s);
  }
})();
