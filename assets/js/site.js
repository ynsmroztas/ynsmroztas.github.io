(function () {
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

  const lines = [
    ["ok", "[PREPARE] AXML string pool indexed"],
    ["ok", "[PREPARE] DEX string_ids scanned"],
    ["dim", "[ASSESS] exported activity → MEDIUM"],
    ["hi", "[ASSESS] FH-ID issued"],
    ["ok", "[PLAN] surface-matched steps only"],
    ["dim", "[RUNTIME] wait · first frame held"],
    ["ok", "[RUNTIME] session transcript open"],
    ["dim", "[RADAR] no invented findings"],
    ["ok", "[SCOPE] lab.sample.app mapped"]
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
})();
