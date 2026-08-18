/* Ortak render fonksiyonlari — hem build.js (Node) hem tarayici kullanir. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RENDER = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const sevCls = s => s === 'Critical' ? 'crit' : s === 'High' ? 'high' : 'n';

  const toolCard = t => `
      <article class="card rv in" data-tag="${esc(t.tag)}">
        <div class="top"><h3 class="mono">${esc(t.name)}</h3><span class="tag n">${esc(t.tag)}</span></div>
        <p>${esc(t.desc)}</p>
        <div class="foot"><span>${esc(t.lang)} · stdlib only</span><a href="${esc(t.url)}" target="_blank" rel="noopener" style="color:var(--neon)">github ↗</a></div>
      </article>`;

  const postCard = p => `
      <article class="card rv in" data-tag="${esc(p.tag)}">
        <div class="top"><span class="tag c">${esc(p.tag)}</span><span class="mono" style="font-size:12px;color:var(--tx-3)">${esc(p.date)}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="foot"><span>${esc(p.read)} read</span><a href="${esc(p.url || '#')}" style="color:var(--neon)">read →</a></div>
      </article>`;

  const cveItem = c => `
      <div class="tl-item rv in">
        <div class="y">${esc(c.y)}</div>
        <h3>${esc(c.id)} <span class="tag ${sevCls(c.sev)}">${esc(c.sev)} · CVSS ${esc(c.cvss)}</span></h3>
        <p class="muted" style="margin:0">${esc(c.target)} — ${esc(c.desc)}</p>
      </div>`;

  const statCard = s => `<div class="stat rv in"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`;
  const hofCard  = h => `<div class="card rv in" style="padding:16px 18px"><span class="mono" style="color:var(--neon)">${esc(h)}</span></div>`;
  const skillRow = s => `<div class="skill"><div class="lbl"><span>${esc(s.n)}</span><b>${esc(s.v)}%</b></div><div class="bar"><i data-v="${esc(s.v)}" style="width:${esc(s.v)}%"></i></div></div>`;
  const socialLink = s => `<a href="${esc(s.u)}" target="_blank" rel="noopener" class="rv in"><span style="color:var(--neon)">${esc(s.i)}</span> ${esc(s.n)}</a>`;
  const marquee = hof => [...hof, ...hof].map(h => `<span>${esc(h)}</span>`).join('');
  const chips = tags => `<button class="chip on" data-tag="all">all</button>` + tags.map(t => `<button class="chip" data-tag="${esc(t)}">${esc(t)}</button>`).join('');

  /* container id -> icerik uretici */
  const blocks = {
    statGrid:    D => D.stats.map(statCard).join(''),
    hofMarquee:  D => marquee(D.hof),
    hofGrid:     D => D.hof.map(hofCard).join(''),
    toolGridTop: D => D.tools.slice(0, 6).map(toolCard).join(''),
    toolGrid:    D => D.tools.map(toolCard).join(''),
    toolChips:   D => chips([...new Set(D.tools.map(t => t.tag))]),
    postGridTop: D => D.posts.slice(0, 3).map(postCard).join(''),
    postGrid:    D => D.posts.map(postCard).join(''),
    postChips:   D => chips([...new Set(D.posts.map(p => p.tag))]),
    cveList:     D => D.cves.map(cveItem).join(''),
    skillsA:     D => D.skills.slice(0, Math.ceil(D.skills.length / 2)).map(skillRow).join(''),
    skillsB:     D => D.skills.slice(Math.ceil(D.skills.length / 2)).map(skillRow).join(''),
    socialGrid:  D => D.social.map(socialLink).join(''),
    heroLead:    D => `I'm <b>Yunus Emre Öztaş</b> (${esc(D.handle)} / ${esc(D.alias)}) — a security researcher and bug bounty hunter. I hunt critical bugs across web, mobile and API surfaces, and I ship the zero-dependency tooling I use to find them.`
  };

  function hydrate(doc, D) {
    Object.keys(blocks).forEach(id => {
      const el = doc.getElementById(id);
      if (el) { el.innerHTML = blocks[id](D); el.classList.add('in'); }
    });
  }

  return { esc, toolCard, postCard, cveItem, statCard, hofCard, skillRow, socialLink, marquee, chips, blocks, hydrate };
});
