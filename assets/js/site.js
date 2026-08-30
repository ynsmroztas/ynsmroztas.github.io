(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const btn = document.querySelector("[data-burger]");
  const links = document.querySelector("[data-links]");
  if (btn && links) btn.addEventListener("click", () => links.classList.toggle("open"));

  const clocks = document.querySelectorAll("[data-clock]");
  const tickClock = () => {
    const t = new Date();
    clocks.forEach((el) => { el.textContent = t.toTimeString().slice(0, 8); });
  };
  tickClock();
  setInterval(tickClock, 1000);

  document.querySelectorAll("[data-radar]").forEach((canvas) => {
    const wrap = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    let css = 320;
    const fit = () => {
      const r = wrap.getBoundingClientRect();
      css = Math.max(180, Math.floor(Math.min(r.width || 320, r.height || r.width || 320)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = css * dpr;
      canvas.height = css * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);
    const blips = Array.from({ length: 7 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 0.22 + Math.random() * 0.62,
      life: Math.random(),
    }));
    let ang = 0;
    const draw = () => {
      const w = css, h = css, cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(124,255,178,0.18)";
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
      g.addColorStop(0, "rgba(124,255,178,0)");
      g.addColorStop(0.65, "rgba(124,255,178,0.06)");
      g.addColorStop(1, "rgba(124,255,178,0.5)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R, -0.7, 0.04);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(124,255,178,0.95)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, 0);
      ctx.stroke();
      ctx.restore();
      blips.forEach((b) => {
        const sweep = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        let diff = Math.abs(b.a - sweep);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        if (diff < 0.18) b.life = 1;
        b.life *= 0.985;
        const x = cx + Math.cos(b.a) * R * b.r;
        const y = cy + Math.sin(b.a) * R * b.r;
        ctx.fillStyle = "rgba(124,255,178," + (0.12 + b.life * 0.88) + ")";
        ctx.beginPath();
        ctx.arc(x, y, 2.4 + b.life * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#7cffb2";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
      if (!reduce) ang += 0.018;
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(() => { fit(); draw(); });
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
  ];
  document.querySelectorAll("[data-console]").forEach((box) => {
    let i = 0;
    const push = () => {
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
    setInterval(push, reduce ? 4000 : 1600);
  });
})();
