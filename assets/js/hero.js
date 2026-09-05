(function () {
  var el = document.querySelector("[data-typewriter]");
  if (el) {
    var full = el.getAttribute("data-typewriter") || "";
    var i = 0;
    var cur = document.createElement("span");
    cur.className = "cursor";
    function tick() {
      el.textContent = full.slice(0, i);
      el.appendChild(cur);
      i += 1;
      if (i <= full.length) setTimeout(tick, 38);
    }
    setTimeout(tick, 500);
  }

  var selected = [];
  var buttons = document.querySelectorAll("[data-pill]");
  var banner = document.querySelector("[data-pill-banner]");
  var cards = document.querySelectorAll(".case-grid .tool[data-surface]");
  function paint() {
    buttons.forEach(function (b) {
      b.classList.toggle("on", selected.indexOf(b.getAttribute("data-pill")) >= 0);
    });
    if (banner) {
      if (!selected.length) {
        banner.innerHTML = "<span>Select a surface. Cards stay. Nothing is deleted.</span>";
      } else {
        banner.innerHTML =
          "Ready on the wire: <b>" +
          selected.join(", ") +
          '</b><a href="writeups.html">open notes →</a>';
      }
    }
    cards.forEach(function (c) {
      var tags = (c.getAttribute("data-surface") || "").split(/\s+/);
      var hit = !selected.length || selected.some(function (s) { return tags.indexOf(s) >= 0; });
      c.classList.toggle("is-dim", !hit);
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-pill");
      var i = selected.indexOf(k);
      if (i >= 0) selected.splice(i, 1);
      else selected.push(k);
      paint();
    });
  });
  paint();
})();
