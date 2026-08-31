(function () {
  if (document.querySelector("[data-pulse]")) return;
  var mark = document.createElement("meta");
  mark.setAttribute("data-pulse", "1");
  document.head.appendChild(mark);

  if (!document.querySelector('link[href*="pulse.css"]')) {
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "assets/css/pulse.css?v=1";
    document.head.appendChild(l);
  }

  var grain = document.createElement("div");
  grain.className = "fx-grain";
  var glow = document.createElement("div");
  glow.className = "fx-glow";
  var oa = document.createElement("div");
  oa.className = "fx-orb a";
  var ob = document.createElement("div");
  ob.className = "fx-orb b";
  document.body.appendChild(oa);
  document.body.appendChild(ob);
  document.body.appendChild(glow);
  document.body.appendChild(grain);

  var gx = window.innerWidth * 0.7, gy = 120;
  window.addEventListener("pointermove", function (e) {
    gx = e.clientX; gy = e.clientY;
  }, { passive: true });
  (function follow() {
    glow.style.left = gx + "px";
    glow.style.top = gy + "px";
    requestAnimationFrame(follow);
  })();

  document.querySelectorAll(".tool").forEach(function (el) {
    if (el.querySelector(".sig")) return;
    var s = document.createElement("span");
    s.className = "sig";
    s.innerHTML = "<i></i><i></i><i></i><i></i>";
    el.appendChild(s);
  });

  document.querySelectorAll(".media-full, .shot-card").forEach(function (el) {
    if (el.querySelector(".scan")) return;
    var sc = document.createElement("span");
    sc.className = "scan";
    el.appendChild(sc);
  });

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (en.isIntersecting) en.target.classList.add("reveal");
    });
  }, { threshold: 0.08 }) : null;
  if (io) {
    document.querySelectorAll("section, .tool, .skel, .prose h2").forEach(function (el) {
      io.observe(el);
    });
  }
})();
