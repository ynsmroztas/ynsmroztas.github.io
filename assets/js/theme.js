(function(){
  const KEY = "mitsec-theme";
  const ALL = ["scope","ion","quartz"];
  const apply = (t) => {
    if (ALL.indexOf(t) < 0) t = "scope";
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    document.querySelectorAll(".theme-btn").forEach(function(b){
      b.classList.toggle("on", b.getAttribute("data-t") === t);
    });
  };
  var start = "scope";
  try { start = localStorage.getItem(KEY) || "scope"; } catch (e) {}
  apply(start);
  var host = document.querySelector(".nav-in");
  if (host && !document.querySelector("[data-themes]")) {
    var box = document.createElement("div");
    box.className = "themes";
    box.setAttribute("data-themes", "");
    box.setAttribute("aria-label", "Color theme");
    ALL.forEach(function(id){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "theme-btn" + (id === start ? " on" : "");
      b.setAttribute("data-t", id);
      b.title = id;
      b.setAttribute("aria-label", id + " theme");
      b.addEventListener("click", function(){ apply(id); });
      box.appendChild(b);
    });
    var burger = host.querySelector(".burger");
    host.insertBefore(box, burger || null);
  }
})();
