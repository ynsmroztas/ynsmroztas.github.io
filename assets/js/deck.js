(function(){
  const menu = document.querySelector("[data-op-menu]");
  const detail = document.querySelector("[data-op-detail]");
  const prompt = document.querySelector("[data-op-prompt]");
  const filters = document.querySelector("[data-deck-filters]");
  if (!menu || !detail) return;
  const labels = {menu:"OPERATOR MENU",A:"SURFACE & RECON",B:"APP ATTACK SURFACE",C:"TRAFFIC & SECRETS",D:"NATIVE & RUNTIME",E:"DEFENSE"};
  const groups = ["menu","A","B","C","D","E"];
  function openMod(DECK, id, btn){
    const m = DECK.find(x => x.id === id);
    if (!m) return;
    menu.querySelectorAll(".op-item").forEach(el => el.classList.remove("on"));
    if (btn) btn.classList.add("on");
    detail.innerHTML = '<div class="tag">'+m.group+(m.star?' · start-here':'')+'</div><h3>'+String(m.n).padStart(2,"0")+' · '+m.title+'</h3><p>'+m.desc+'</p><div class="why"><b style="color:var(--ph)">lab.sample.app · </b>Starred rows are the start-here set for a typical native app with deeplinks and native libs. Authorized lab build only.</div>';
    if (prompt) prompt.textContent = " " + String(m.n) + " · " + m.title;
  }
  function paint(DECK, gid){
    menu.innerHTML = "";
    (gid ? [gid] : groups).forEach(g => {
      const items = DECK.filter(m => m.gid === g);
      if (!items.length) return;
      const h = document.createElement("h5");
      h.textContent = labels[g] || g;
      menu.appendChild(h);
      items.forEach(m => {
        const b = document.createElement("button");
        b.className = "op-item";
        b.type = "button";
        b.innerHTML = '<span class="n">'+String(m.n).padStart(2,"0")+'</span><span>'+m.title+'</span>'+(m.star?'<span class="star">★</span>':'');
        b.addEventListener("click", () => openMod(DECK, m.id, b));
        menu.appendChild(b);
      });
    });
  }
  fetch("assets/js/deck-data.json").then(r => r.json()).then(DECK => {
    if (filters){
      [["all","All"],["menu","Menu"],["A","A recon"],["B","B surface"],["C","C traffic"],["D","D native"],["E","E defense"]].forEach(([id,label],i) => {
        const b = document.createElement("button");
        b.textContent = label;
        if (i===0) b.className = "on";
        b.addEventListener("click", () => {
          filters.querySelectorAll("button").forEach(x => x.classList.remove("on"));
          b.classList.add("on");
          paint(DECK, id === "all" ? null : id);
        });
        filters.appendChild(b);
      });
    }
    paint(DECK, null);
    openMod(DECK, (DECK.find(m => m.id === "D49") || DECK[0]).id);
  });
})();
