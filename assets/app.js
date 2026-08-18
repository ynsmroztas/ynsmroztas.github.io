/* ============ mitsec site runtime ============ */
(async function () {

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem('mit-theme');
  if (saved) root.setAttribute('data-theme', saved);
  window.toggleTheme = () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('mit-theme', next);
    const b = document.getElementById('themeBtn');
    if (b) b.textContent = next === 'light' ? '☾' : '☀';
  };
  { const b = document.getElementById('themeBtn'); if (b && root.getAttribute('data-theme') === 'light') b.textContent = '☾'; }

  /* ---------- content.json -> hydrate ---------- */
  let D = null;
  try {
    const r = await fetch('content.json', { cache: 'no-store' });
    if (r.ok) { D = await r.json(); if (window.RENDER) RENDER.hydrate(document, D); }
  } catch (e) { /* file:// veya offline — build ciktisi kalir */ }

  /* ---------- matrix rain ---------- */
  const cv = document.getElementById('matrix');
  if (cv && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = cv.getContext('2d');
    let drops = [], fs = 15;
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}[]$#@'.split('');
    const size = () => { cv.width = innerWidth; cv.height = innerHeight; drops = Array(Math.floor(cv.width / fs)).fill(1); };
    size(); addEventListener('resize', size);
    setInterval(() => {
      ctx.fillStyle = 'rgba(5,7,10,.09)'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#00ff9c'; ctx.font = fs + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, drops[i] * fs);
        if (drops[i] * fs > cv.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
    }, 55);
  }

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.v + '%');
    io.unobserve(e.target);
  }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  /* ---------- mobile nav ---------- */
  const burger = document.getElementById('burger');
  if (burger) burger.onclick = () => document.querySelector('nav.main').classList.toggle('open');

  /* ---------- filter chips (event delegation) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const target = document.querySelector(group.dataset.filterGroup);
    group.addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      chip.classList.add('on');
      const f = chip.dataset.tag;
      target.querySelectorAll('[data-tag]').forEach(card => {
        card.style.display = (f === 'all' || card.dataset.tag === f) ? '' : 'none';
      });
    });
  });

  /* ---------- command palette (⌘K) ---------- */
  const bd = document.getElementById('palBd'),
        inp = document.getElementById('palInput'),
        list = document.getElementById('palList');
  const idx = [];
  if (D) {
    (D.nav || []).forEach(x => idx.push({ g: 'Navigation', t: x.n, u: x.u }));
    (D.tools || []).forEach(x => idx.push({ g: 'Tools', t: x.name, s: x.desc, u: 'tools.html' }));
    (D.posts || []).forEach(x => idx.push({ g: 'Writeups', t: x.title, s: x.desc, u: 'writeups.html' }));
    (D.cves || []).forEach(x => idx.push({ g: 'Research', t: x.id + ' — ' + x.target, s: x.desc, u: 'research.html' }));
    (D.social || []).forEach(x => idx.push({ g: 'Links', t: x.n, u: x.u, ext: true }));
  } else {
    document.querySelectorAll('nav.main a').forEach(a => idx.push({ g: 'Navigation', t: a.textContent, u: a.getAttribute('href') }));
  }
  idx.push({ g: 'Actions', t: 'Toggle theme', act: 'theme' });

  let sel = 0, cur = [];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function render(q) {
    q = (q || '').toLowerCase().trim();
    cur = (q ? idx.filter(i => (i.t + ' ' + (i.s || '') + ' ' + i.g).toLowerCase().includes(q)) : idx).slice(0, 30);
    sel = 0;
    let html = '', last = '';
    cur.forEach((i, n) => {
      if (i.g !== last) { html += `<div class="pal-group">${esc(i.g)}</div>`; last = i.g; }
      html += `<div class="pal-item${n === 0 ? ' sel' : ''}" data-n="${n}"><span>${esc(i.t)}</span><span class="k">${i.ext ? '↗' : '↵'}</span></div>`;
    });
    list.innerHTML = html || '<div class="pal-group">no results</div>';
  }
  const open = () => { bd.classList.add('open'); inp.value = ''; render(''); setTimeout(() => inp.focus(), 20); };
  const close = () => bd.classList.remove('open');
  const go = i => { if (!i) return; if (i.act === 'theme') { toggleTheme(); close(); return; } if (i.u) location.href = i.u; };
  window.openPalette = open;

  if (bd) {
    document.querySelectorAll('[data-pal]').forEach(b => b.onclick = open);
    bd.onclick = e => { if (e.target === bd) close(); };
    inp.oninput = () => render(inp.value);
    list.onclick = e => { const it = e.target.closest('.pal-item'); if (it) go(cur[+it.dataset.n]); };
    addEventListener('keydown', e => {
      const typing = /input|textarea/i.test(document.activeElement.tagName);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); bd.classList.contains('open') ? close() : open(); return; }
      if (e.key === '/' && !typing) { e.preventDefault(); open(); return; }
      if (!bd.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        sel = Math.max(0, Math.min(cur.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
        list.querySelectorAll('.pal-item').forEach((n, i) => n.classList.toggle('sel', i === sel));
        const s = list.querySelector('.pal-item.sel'); if (s) s.scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter') go(cur[sel]);
    });
  }

  /* ---------- hero typing ---------- */
  const t = document.getElementById('typer');
  if (t) {
    const lines = [
      ['p', 'mitsec@kali:~/recon$ '], ['c', 'subfinder -d target.com | httpx -silent | nextscope --stdin'], ['br', ''],
      ['o', '[*] 412 live hosts  ·  38 Next.js builds detected'], ['br', ''],
      ['ok', '[+] source-map recovery: 1,204 modules  ·  17 internal endpoints'], ['br', ''],
      ['ok', '[!] CVE-2025-55182 candidate -> app.target.com  (verified)'], ['br', ''],
      ['p', 'mitsec@kali:~/recon$ '], ['c', 'headerhunter --stdin --severity high --jsonl'], ['br', ''],
      ['o', '[*] 96 POST endpoints  ·  341 body params fuzzed'], ['br', ''],
      ['ok', '[+] SSTI confirmed  ·  canary 71*73=5183  ·  P1 filed'], ['br', '']
    ];
    let li = 0, ci = 0;
    (function tick() {
      if (li >= lines.length) { setTimeout(() => { t.innerHTML = ''; li = 0; ci = 0; tick(); }, 4200); return; }
      const [cls, txt] = lines[li];
      if (cls === 'br') { t.innerHTML += '<br>'; li++; return tick(); }
      if (ci === 0) t.innerHTML += `<span class="${cls}"></span>`;
      const span = t.lastElementChild;
      span.textContent = txt.slice(0, ++ci);
      if (ci >= txt.length) { li++; ci = 0; setTimeout(tick, 260); }
      else setTimeout(tick, cls === 'c' ? 26 : 8);
    })();
  }

  /* ---------- lab sandbox terminal ---------- */
  const lo = document.getElementById('labOut'), lin = document.getElementById('labIn');
  if (lo && lin) {
    const S = D || { tools: [], cves: [], stats: [], social: [] };
    const say = s => { lo.textContent += s + '\n'; lo.scrollTop = lo.scrollHeight; };
    const cmds = {
      help: () => say('available: help, whoami, tools, cves, stats, social, banner, clear'),
      whoami: () => say('yunus emre oztas (@ynsmroztas / mitsec) — security researcher, bug bounty hunter, offensive tool developer'),
      tools: () => S.tools.forEach(x => say(`  ${x.name.padEnd(16)} ${x.desc.slice(0, 66)}...`)),
      cves: () => S.cves.forEach(x => say(`  ${x.id.padEnd(18)} ${x.sev.padEnd(9)} CVSS ${x.cvss}  ${x.target}`)),
      stats: () => S.stats.forEach(x => say(`  ${String(x.n).padEnd(8)} ${x.l}`)),
      social: () => S.social.forEach(x => say(`  ${x.n.padEnd(14)} ${x.u}`)),
      banner: () => say('  ### mitsec // offensive security lab ###'),
      clear: () => lo.textContent = ''
    };
    say('mitsec sandbox v2.0 — type "help" for commands\n');
    lin.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const v = lin.value.trim(); lin.value = '';
      say('mitsec@lab:~$ ' + v);
      if (!v) return;
      (cmds[v.split(' ')[0]] || (() => say(`command not found: ${v} — try "help"`)))();
    });
  }
})();
