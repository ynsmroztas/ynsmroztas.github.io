(function () {
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function markSvg(ph) {
    return '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><text x="16" y="24" text-anchor="middle" font-family="Syne,Arial Black,sans-serif" font-weight="800" font-size="16" fill="' + ph + '">A</text><circle cx="16" cy="12.5" r="5.2" stroke="' + ph + '" stroke-width="1.3"/><path d="M16 8.4v8.2M11.8 12.5h8.4" stroke="' + ph + '" stroke-width=".9"/><circle cx="16" cy="12.5" r="1.1" fill="' + ph + '"/></svg>';
  }

  function favSvg(ph, ink) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="' + ink + '"/><text x="32" y="46" text-anchor="middle" font-family="Syne,Arial Black,sans-serif" font-weight="800" font-size="34" fill="' + ph + '">A</text><circle cx="32" cy="28" r="11" fill="none" stroke="' + ph + '" stroke-width="1.8"/><path d="M32 19.5v17 M23.5 28h17" stroke="' + ph + '" stroke-width="1.3"/><circle cx="32" cy="28" r="2" fill="' + ph + '"/></svg>';
  }

  function paintBrand() {
    var ph = cssVar("--ph", "#7cffb2");
    var ink = cssVar("--ink", "#06070a");
    var brand = document.querySelector(".brand");
    if (brand) {
      var mark = brand.querySelector(".mark");
      if (!mark) {
        mark = document.createElement("span");
        mark.className = "mark";
        brand.insertBefore(mark, brand.firstChild);
      }
      mark.innerHTML = markSvg(ph);
      var dot = brand.querySelector("i");
      if (dot) dot.style.display = "none";
    }
    var href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(favSvg(ph, ink));
    var ico = document.querySelector('link[rel="icon"]');
    if (!ico) {
      ico = document.createElement("link");
      ico.rel = "icon";
      ico.type = "image/svg+xml";
      document.head.appendChild(ico);
    }
    ico.href = href;
    var apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (!apple) {
      apple = document.createElement("link");
      apple.rel = "apple-touch-icon";
      document.head.appendChild(apple);
    }
    apple.href = href;
  }

  paintBrand();
  window.addEventListener("mitsec-theme", paintBrand);

  function upsertMeta(attr, key, val) {
    var sel = "meta[" + attr + "=\"" + key + "\"]";
    var el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", val);
  }
  function upsertLink(rel, href) {
    var el = document.head.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }
  var pageUrl = location.href.split("#")[0];
  var descEl = document.querySelector('meta[name="description"]');
  var desc = (descEl && descEl.content) || document.querySelector(".lead, .sub, .deck") && (document.querySelector(".lead, .sub, .deck").textContent || "").trim() || "mitsec — field cases and AndroScope by Yunus Emre Öztaş.";
  upsertMeta("name", "referrer", "strict-origin-when-cross-origin");
  upsertMeta("name", "description", desc);
  upsertMeta("property", "og:type", "article");
  upsertMeta("property", "og:title", document.title);
  upsertMeta("property", "og:description", desc);
  upsertMeta("property", "og:url", pageUrl);
  upsertMeta("property", "og:image", new URL("assets/img/favicon.svg", pageUrl).href);
  upsertMeta("name", "twitter:card", "summary");
  upsertMeta("name", "twitter:title", document.title);
  upsertMeta("name", "twitter:description", desc);
  upsertMeta("name", "twitter:site", "@ynsmroztas");
  upsertLink("canonical", pageUrl);

  if (!document.querySelector("[data-proof]")) {
    var proof = document.createElement("div");
    proof.className = "proof";
    proof.setAttribute("data-proof", "");
    proof.innerHTML = '<div class="proof-in"><em>proof</em><a href="https://github.com/ynsmroztas" rel="me noopener" target="_blank">GitHub</a><a href="https://x.com/ynsmroztas" rel="me noopener" target="_blank">X</a><a href="https://hackerone.com/ynsmroztas" rel="me noopener" target="_blank">HackerOne</a><a href="https://bugcrowd.com/ynsmroztas" rel="me noopener" target="_blank">Bugcrowd</a><a href="https://app.intigriti.com/researcher/ynsmroztas" rel="me noopener" target="_blank">Intigriti</a><a href="security.txt">security.txt</a></div>';
    var band = document.createElement("div");
    band.className = "contact-band";
    band.innerHTML = '<div class="wrap"><p>Private programs, lab work, collaboration.</p><a class="btn" href="mailto:m.i.t@mit.tc">m.i.t@mit.tc</a></div>';
    var foot = document.querySelector("footer");
    if (foot && foot.parentNode) {
      foot.parentNode.insertBefore(proof, foot);
      foot.parentNode.insertBefore(band, foot);
    } else {
      document.body.appendChild(proof);
      document.body.appendChild(band);
    }
  }

  const btn = document.querySelector("[data-burger]");
  const links = document.querySelector("[data-links]");
  if (btn && links) btn.addEventListener("click", function () { links.classList.toggle("open"); });

  const clocks = document.querySelectorAll("[data-clock]");
  const tickClock = function () {
    const t = new Date();
    clocks.forEach(function (el) { el.textContent = t.toTimeString().slice(0, 8); });
  };
  tickClock();
  setInterval(tickClock, 1000);

  function radarRGB() {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--radar").trim();
    return v || "124,255,178";
  }

  document.querySelectorAll("[data-radar]").forEach(function (canvas) {
    const wrap = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let css = 280;
    const fit = function () {
      const r = wrap.getBoundingClientRect();
      css = Math.max(200, Math.floor(Math.min(r.width || 280, r.height || r.width || 280)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(css * dpr);
      canvas.height = Math.floor(css * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);
    if (window.ResizeObserver) new ResizeObserver(fit).observe(wrap);
    const blips = Array.from({ length: 8 }, function () {
      return { a: Math.random() * Math.PI * 2, r: 0.2 + Math.random() * 0.65, life: Math.random() };
    });
    let ang = 0;
    const draw = function () {
      const rgb = radarRGB();
      const w = css, h = css, cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(" + rgb + ",0.22)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, R * (i / 4), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);
      const g = ctx.createLinearGradient(0, 0, R, 0);
      g.addColorStop(0, "rgba(" + rgb + ",0)");
      g.addColorStop(0.55, "rgba(" + rgb + ",0.08)");
      g.addColorStop(1, "rgba(" + rgb + ",0.55)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R, -0.85, 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(" + rgb + ",0.95)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, 0);
      ctx.stroke();
      ctx.restore();
      blips.forEach(function (b) {
        const sweep = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        let diff = Math.abs(b.a - sweep);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        if (diff < 0.2) b.life = 1;
        b.life *= 0.984;
        const x = cx + Math.cos(b.a) * R * b.r;
        const y = cy + Math.sin(b.a) * R * b.r;
        ctx.fillStyle = "rgba(" + rgb + "," + (0.14 + b.life * 0.86) + ")";
        ctx.beginPath();
        ctx.arc(x, y, 2.6 + b.life * 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "rgb(" + rgb + ")";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
      ang += 0.022;
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(function () { fit(); draw(); });
  });

  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-cover-card]"));
  if (cards.length) {
    var n = 0;
    var dots = document.querySelector("[data-cover-dots]");
    function wrapDelta(d, len) {
      var x = ((d + len) % len);
      if (x > len / 2) x -= len;
      return x;
    }
    function paint(i) {
      n = (i + cards.length) % cards.length;
      cards.forEach(function (card, k) {
        var pos = wrapDelta(k - n, cards.length);
        if (pos > 1) pos = 2;
        if (pos < -1) pos = -2;
        card.setAttribute("data-pos", String(pos));
      });
      if (dots) {
        dots.querySelectorAll("button").forEach(function (d, k) {
          d.classList.toggle("on", k === n);
        });
      }
    }
    if (dots) {
      cards.forEach(function (_, i) {
        var d = document.createElement("button");
        d.type = "button";
        d.setAttribute("aria-label", "Case " + (i + 1));
        d.addEventListener("click", function () { paint(i); });
        dots.appendChild(d);
      });
    }
    paint(0);
    setInterval(function () { paint(n + 1); }, 4200);
  }

  const lines = [
    ["hi", "[WIRE] hardcoded JWT · public JS · Admin role"],
    ["ok", "[WIRE] query-string password · RN bridge"],
    ["ok", "[WIRE] custom scheme · missing PKCE"],
    ["dim", "[WIRE] mTLS observer · PKCS12 vs KeyStore"],
    ["ok", "[REDACT] vendor host stripped"],
    ["ok", "[SCOPE] lab names only"]
  ];
  document.querySelectorAll("[data-console]").forEach(function (box) {
    let i = 0;
    const push = function () {
      const pair = lines[i % lines.length];
      const row = document.createElement("div");
      row.className = pair[0];
      row.textContent = pair[1];
      box.appendChild(row);
      while (box.children.length > 8) box.removeChild(box.firstChild);
      box.scrollTop = box.scrollHeight;
      i += 1;
    };
    push();
    setInterval(push, 1400);
  });

  if (!document.querySelector("script[src*='stats.js']")) {
    var st = document.createElement("script");
    st.src = "assets/js/stats.js";
    document.body.appendChild(st);
  }
})();
