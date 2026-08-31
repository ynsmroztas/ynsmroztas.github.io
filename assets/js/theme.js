(function(){
  const KEY = "mitsec-theme";
  const DARK = [
    ["scope","Scope","#7cffb2"],
    ["ion","Ion","#7dc4ff"],
    ["abyss","Abyss","#2dd4bf"],
    ["noir","Noir","#fafafa"],
    ["amber","Amber","#fbbf24"],
    ["blood","Blood","#fb7185"],
    ["tokyo","Tokyo","#7aa2f7"]
  ];
  const LIGHT = [
    ["quartz","Quartz","#f3efe6"],
    ["paper","Paper","#2563eb"],
    ["ivory","Ivory","#b45309"]
  ];
  const ALL = DARK.concat(LIGHT).map(function(x){ return x[0]; });

  function markSvg(ph) {
    return '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><text x="16" y="24" text-anchor="middle" font-family="Syne,Arial Black,sans-serif" font-weight="800" font-size="16" fill="' + ph + '">A</text><circle cx="16" cy="12.5" r="5.2" stroke="' + ph + '" stroke-width="1.3"/><path d="M16 8.4v8.2M11.8 12.5h8.4" stroke="' + ph + '" stroke-width=".9"/><circle cx="16" cy="12.5" r="1.1" fill="' + ph + '"/></svg>';
  }

  function paintOrb() {
    var orb = document.querySelector(".theme-orb");
    if (!orb) return;
    var ph = getComputedStyle(document.documentElement).getPropertyValue("--ph").trim() || "#7cffb2";
    orb.innerHTML = markSvg(ph);
  }

  const apply = function(t){
    if (ALL.indexOf(t) < 0) t = "scope";
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    document.querySelectorAll(".theme-opt").forEach(function(b){
      b.classList.toggle("on", b.getAttribute("data-t") === t);
    });
    paintOrb();
    window.dispatchEvent(new Event("mitsec-theme"));
  };

  var start = "scope";
  try { start = localStorage.getItem(KEY) || "scope"; } catch (e) {}
  apply(start);

  var host = document.querySelector(".nav-in");
  if (!host || document.querySelector("[data-themes]")) return;

  var wrap = document.createElement("div");
  wrap.className = "themes";
  wrap.setAttribute("data-themes", "");

  var orb = document.createElement("button");
  orb.type = "button";
  orb.className = "theme-orb";
  orb.setAttribute("aria-label", "Themes");
  wrap.appendChild(orb);

  var pop = document.createElement("div");
  pop.className = "theme-pop";
  pop.setAttribute("role", "menu");

  function addGroup(title, list){
    var lab = document.createElement("b");
    lab.textContent = title;
    pop.appendChild(lab);
    var grid = document.createElement("div");
    grid.className = "theme-grid";
    list.forEach(function(item){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "theme-opt" + (item[0] === start ? " on" : "");
      b.setAttribute("data-t", item[0]);
      b.innerHTML = "<i style=\"background:" + item[2] + "\"></i>" + item[1];
      b.addEventListener("click", function(){ apply(item[0]); pop.classList.remove("on"); });
      grid.appendChild(b);
    });
    pop.appendChild(grid);
  }
  addGroup("Dark", DARK);
  addGroup("Light", LIGHT);
  wrap.appendChild(pop);

  orb.addEventListener("click", function(e){
    e.stopPropagation();
    pop.classList.toggle("on");
  });
  document.addEventListener("click", function(){ pop.classList.remove("on"); });
  pop.addEventListener("click", function(e){ e.stopPropagation(); });

  var burger = host.querySelector(".burger");
  host.insertBefore(wrap, burger || null);
  paintOrb();
})();
