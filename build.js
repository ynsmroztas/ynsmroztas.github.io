const fs = require('fs');
const OUT = __dirname;
const R = require(OUT + '/assets/render.js');
const D = JSON.parse(fs.readFileSync(OUT + '/content.json', 'utf8'));

const head = (title, desc, page) => `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="author" content="Yunus Emre Öztaş">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>%F0%9F%91%BE</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<canvas id="matrix"></canvas><div class="bg-grid"></div><div class="bg-glow"></div>

<header class="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="index.html"><span class="dot"></span>mit<b>sec</b></a>
    <nav class="main">${D.nav.map(n => `<a href="${n.u}"${n.u === page ? ' class="active"' : ''}>${n.n}</a>`).join('')}</nav>
    <div class="hdr-actions">
      <button class="kbtn" data-pal><span>⌕</span><span class="t">Search</span><span class="kbd">⌘K</span></button>
      <button class="icon-btn" id="themeBtn" onclick="toggleTheme()">☀</button>
      <button class="icon-btn burger" id="burger">≡</button>
    </div>
  </div>
</header>
`;

const foot = `
<footer>
  <div class="wrap foot-in">
    <div>© ${new Date().getFullYear()} Yunus Emre Öztaş — <span style="color:var(--neon)">mitsec</span></div>
    <div>built in the terminal · hosted on github pages</div>
    <div><a href="mailto:${D.email}">${D.email}</a></div>
  </div>
</footer>

<div class="pal-bd" id="palBd">
  <div class="pal">
    <input id="palInput" placeholder="Search tools, writeups, CVEs, links…" autocomplete="off">
    <div class="pal-list" id="palList"></div>
    <div class="pal-foot"><span>↑↓ navigate</span><span>↵ open</span><span>esc close</span></div>
  </div>
</div>

<script src="assets/render.js"></script>
<script src="assets/app.js"></script>
</body></html>`;

const index = head('mitsec // Yunus Emre Öztaş — Security Researcher', 'Bug bounty hunter and offensive tool developer. 100+ Hall of Fame entries, 2430+ vulnerabilities reported, 1100+ P1 critical findings.', 'index.html') + `
<main>
<div class="wrap">
  <section class="hero">
    <div>
      <div class="tagline"><span style="width:7px;height:7px;border-radius:50%;background:var(--neon);display:inline-block"></span> available for private programs</div>
      <h1>Breaking things<br>on purpose —<br><span class="g">then writing the fix.</span></h1>
      <p class="lead" id="heroLead">${R.blocks.heroLead(D)}</p>
      <div class="cta">
        <a class="btn primary" href="tools.html">⚡ Explore the arsenal</a>
        <a class="btn ghost" href="writeups.html">▤ Read writeups</a>
        <a class="btn ghost" href="mailto:${D.email}">✉ Get in touch</a>
      </div>
    </div>
    <div class="term rv">
      <div class="term-bar"><i></i><i></i><i></i><span>mitsec@kali — ~/recon</span></div>
      <div class="term-body" id="typer"></div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="stats" id="statGrid">${R.blocks.statGrid(D)}</div>
  </section>
</div>

<div class="marquee"><div class="marquee-in" id="hofMarquee">${R.blocks.hofMarquee(D)}</div></div>

<div class="wrap">
  <section id="tools">
    <div class="sec-head">
      <div><p class="eyebrow">Arsenal</p><h2>Tools I built &amp; use daily</h2></div>
      <a class="btn ghost" href="tools.html">all tools →</a>
    </div>
    <div class="grid g3" id="toolGridTop">${R.blocks.toolGridTop(D)}</div>
  </section>

  <section id="writeups">
    <div class="sec-head">
      <div><p class="eyebrow">Writeups</p><h2>Latest research notes</h2></div>
      <a class="btn ghost" href="writeups.html">all writeups →</a>
    </div>
    <div class="grid g3" id="postGridTop">${R.blocks.postGridTop(D)}</div>
  </section>

  <section id="research">
    <div class="sec-head"><div><p class="eyebrow">Disclosure</p><h2>CVE &amp; research timeline</h2></div></div>
    <div class="tl" id="cveList">${R.blocks.cveList(D)}</div>
  </section>

  <section id="skills">
    <div class="sec-head"><div><p class="eyebrow">Capability</p><h2>Where I go deep</h2></div></div>
    <div class="grid g2">
      <div class="card" id="skillsA">${R.blocks.skillsA(D)}</div>
      <div class="card" id="skillsB">${R.blocks.skillsB(D)}</div>
    </div>
  </section>

  <section id="contact">
    <div class="sec-head"><div><p class="eyebrow">Contact</p><h2>Let's talk</h2></div></div>
    <div class="social" id="socialGrid">${R.blocks.socialGrid(D)}</div>
  </section>
</div>
</main>` + foot;

const tools = head('Tools — mitsec', 'Zero-dependency offensive security tooling by @ynsmroztas.', 'tools.html') + `
<main><div class="wrap">
  <section>
    <p class="eyebrow">Arsenal</p><h2>Offensive tooling</h2>
    <p class="muted" style="max-width:62ch">Every tool is pure Python stdlib — no pip, no vendoring. Colored terminal output, JSON/JSONL export, stdin pipeline support and severity-based exit codes, so they chain straight into <span class="mono" style="color:var(--neon)">subfinder | httpx | tool --stdin</span>.</p>
    <div class="filters" data-filter-group="#toolGrid" id="toolChips" style="margin-top:24px">${R.blocks.toolChips(D)}</div>
    <div class="grid g3" id="toolGrid">${R.blocks.toolGrid(D)}</div>
  </section>
</div></main>` + foot;

const writeups = head('Writeups — mitsec', 'Technical writeups on web, mobile and API exploitation.', 'writeups.html') + `
<main><div class="wrap">
  <section>
    <p class="eyebrow">Writeups</p><h2>Research &amp; exploitation notes</h2>
    <p class="muted" style="max-width:62ch">Full chains, dead ends included. Everything here comes from disclosed or authorized work.</p>
    <div class="filters" data-filter-group="#postGrid" id="postChips" style="margin-top:24px">${R.blocks.postChips(D)}</div>
    <div class="grid g3" id="postGrid">${R.blocks.postGrid(D)}</div>
  </section>
</div></main>` + foot;

const research = head('Research — mitsec', 'CVE disclosures and Hall of Fame recognitions.', 'research.html') + `
<main><div class="wrap">
  <section>
    <p class="eyebrow">Disclosure</p><h2>CVEs &amp; recognition</h2>
    <div class="stats" id="statGrid" style="margin:26px 0 40px">${R.blocks.statGrid(D)}</div>
    <div class="tl" id="cveList">${R.blocks.cveList(D)}</div>
    <h3 style="margin:44px 0 16px" class="mono">Hall of Fame</h3>
    <div class="grid g3" id="hofGrid">${R.blocks.hofGrid(D)}</div>
  </section>
</div></main>` + foot;

const lab = head('Lab — mitsec', 'Interactive sandbox terminal.', 'lab.html') + `
<main><div class="wrap">
  <section>
    <p class="eyebrow">Lab</p><h2>Sandbox terminal</h2>
    <p class="muted" style="max-width:62ch">A harmless in-browser shell. Try <span class="mono" style="color:var(--neon)">help</span>, <span class="mono" style="color:var(--neon)">tools</span>, <span class="mono" style="color:var(--neon)">cves</span>.</p>
    <div class="term rv" style="margin-top:26px">
      <div class="term-bar"><i></i><i></i><i></i><span>mitsec@lab — sandbox</span></div>
      <div style="padding:16px">
        <div class="lab-out" id="labOut"></div>
        <div class="lab-in"><span class="mono" style="color:var(--neon);align-self:center">$</span><input id="labIn" placeholder="type a command…" autocomplete="off" spellcheck="false"></div>
      </div>
    </div>
  </section>
</div></main>` + foot;

fs.writeFileSync(OUT + '/index.html', index);
fs.writeFileSync(OUT + '/tools.html', tools);
fs.writeFileSync(OUT + '/writeups.html', writeups);
fs.writeFileSync(OUT + '/research.html', research);
fs.writeFileSync(OUT + '/lab.html', lab);
console.log('built ok');
