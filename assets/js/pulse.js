(function () {
  if (document.querySelector("[data-pulse]")) return;
  var mark = document.createElement("meta");
  mark.setAttribute("data-pulse", "1");
  document.head.appendChild(mark);

  function css(href) {
    if (document.querySelector('link[href*="' + href.split("/").pop().split("?")[0] + '"]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }
  css("assets/css/pulse.css?v=2");
  css("assets/css/cover.css?v=1");

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

  document.querySelectorAll(".console[data-console]").forEach(function (box) {
    if (box.closest(".cassette")) return;
    var cass = document.createElement("div");
    cass.className = "cassette";
    cass.innerHTML = '<div class="cass-top"><i></i><i></i><i></i><span>mitsec · session tape</span></div>';
    box.parentNode.insertBefore(cass, box);
    cass.appendChild(box);
    box.classList.add("cass-screen");
    var reels = document.createElement("div");
    reels.className = "cass-reels";
    reels.innerHTML = "<b></b><b></b>";
    cass.appendChild(reels);
  });

  var article = document.querySelector("article.prose");
  var file = (location.pathname.split("/").pop() || "");
  if (article && /\.html$/.test(file) && file !== "index.html" && file !== "androscope.html" && !article.querySelector(".stills")) {
    var strip = document.createElement("div");
    strip.className = "stills";
    strip.innerHTML =
      '<figure><div class="still s1"><i></i></div><figcaption>surface</figcaption></figure>' +
      '<figure><div class="still s2"><i></i></div><figcaption>sink</figcaption></figure>' +
      '<figure><div class="still s3"><i></i></div><figcaption>posture</figcaption></figure>';
    var skel = article.querySelector(".skel");
    if (skel && skel.nextSibling) article.insertBefore(strip, skel.nextSibling);
    else if (skel) article.appendChild(strip);
    else {
      var tags = article.querySelector(".tag-row");
      if (tags && tags.nextSibling) article.insertBefore(strip, tags.nextSibling);
      else article.insertBefore(strip, article.firstChild);
    }
  }

  if (!window.THREE && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) && window.innerWidth >= 700) {
    var t = document.createElement("script");
    t.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js";
    t.onload = function () {
      var f = document.createElement("script");
      f.src = "assets/js/three-field.js";
      document.body.appendChild(f);
    };
    document.body.appendChild(t);
  }

  var stage = document.querySelector("[data-cover]");
  if (stage) {
    stage.addEventListener("mouseenter", function () { stage.setAttribute("data-hold", "1"); });
    stage.addEventListener("mouseleave", function () { stage.removeAttribute("data-hold"); });
  }

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
